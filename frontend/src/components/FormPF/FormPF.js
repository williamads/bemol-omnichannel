import React, {useRef } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import '../../App.css';

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
        })
        console.log(data);
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
        <Form ref={formRef} onSubmit={handeSubmit}>
          <Input name="name" />
          <Input name="surname" />
          <Input type="date"name="bornDate" />
          <Input name="gender" />
          <Input name="cpf" />
          <Input name="phoneNumber" />
          <Input name="landLine" />

          <Input name="cep" />
          <Input name="street" />
          <Input name="houseNumber" />
          <Input name="neighbohood" />
          <Input name="complement" />
          <Input name="state" />
          <Input name="city" />
          <Input name="referencePoint" />

          <Input name="email" />
          <Input type="password" name="password" />

          <button type="submit">Enviar</button>
        </Form>
    </>
  );
}

export default FormPF;