import React, {useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import '../../App.css';
import axios from 'axios';

import Input from '../Form/Input';

function FormPF() {
    const formRef = useRef(null);

  async function handeSubmit(data, {reset} ) {
    try {
        const schema = Yup.object().shape({
            name: Yup.string().required('O nome é obrigatório'),
            surname: Yup.string().required('O Sobrenome é obrigatório'),
            bornDate: Yup.date().default(function () {return new Date();}).required('A data de nascimento é obrigatória'),
            gender: Yup.string().required('O gênero é obrigatório'),
            cpf: Yup.string().required('O CPF é obrigatório'),
            phoneNumber: Yup.string().required('O número é obrigatório'),
            cep: Yup.string().required('O CEP é obrigatório'),
            email: Yup.string().required('O email é obrigatório'),
            password: Yup.string().required('A senha é obrigatório'),
        })
        await schema.validate(data, {
            abortEarly: false
        });

        axios.post("http://localhost:3333/create_pf_user", data).then(res => {
            alert("Usuário cadastrado", JSON.stringify(res.data))
        })
        
        reset();
    }
    catch (err) {
        if(err instanceof Yup.ValidationError) {
            const errorMessages = {};

            err.inner.forEach(error => {
                errorMessages[error.path] = error.message;
            })
            formRef.current.setErrors(errorMessages);
        }
    }
  }

  return (
    <>
    <h2>Cadastro Pessoa Física</h2>
        <Form ref={formRef} onSubmit={handeSubmit}>
          <Input name="name" placeholder="Primeiro Nome"/>
          <Input name="surname" placeholder="Sobrenome"/>
          <Input type="date"name="bornDate" placeholder="Nascimento"/>
          <Input name="gender"placeholder="Gênero" />
          <Input name="cpf"placeholder="CPF" />
          <Input name="phoneNumber" placeholder="Celular"/>
          <Input name="landLine" placeholder="Telefone Fixo"/>

          <Input name="cep" placeholder="CEP"/>
          <Input name="city" placeholder="Cidade"/>
          <Input name="state" placeholder="Estado"/>
          <Input name="neighbohood" placeholder="Bairro"/>
          <Input name="houseNumber" placeholder="Número da Casa"/>
          <Input name="complement" placeholder="Complemento"/>
          <Input name="referencePoint" placeholder="Ponto de Referência"/>

          <Input name="email" placeholder="Email"/>
          <Input type="password" name="password" placeholder="Senha"/>

          <button type="submit">Enviar</button>
        </Form>
    </>
  );
}

export default FormPF;