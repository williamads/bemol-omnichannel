import React, {useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import '../../App.css';
import axios from 'axios';

import Input from '../Form/Input';

function FormPJ() {
    const formRef = useRef(null);

  async function handeSubmit(data, {reset} ) {
    try {
        const schema = Yup.object().shape({
            companyName: Yup.string().required('O nome é obrigatório'),
            cnpj: Yup.string().required('O CNPJ é obrigatório'),
            phoneNumber: Yup.string().required('O número é obrigatório'),
            cep: Yup.string().required('O CEP é obrigatório'),
            email: Yup.string().required('O email é obrigatório'),
            password: Yup.string().required('A senha é obrigatório'),
        })
        await schema.validate(data, {
            abortEarly: false
        });

        console.log(data.cep);

        console.log(data);

        axios.post("http://localhost:3333/create_pj_user", data).then(res => {
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
    <h2>Cadastro Pessoa Jurídica</h2>
        <Form ref={formRef} onSubmit={handeSubmit}>
          <Input name="companyName" placeholder="Razão Social"/>
          <Input name="cnpj"placeholder="CNPJ" />
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

export default FormPJ;