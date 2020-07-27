import React, { useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import '../../App.css';
import axios from 'axios';

import Input from '../Form/Input';

function FormPF() {
    const formRef = useRef(null);
    const formRefHouseNumber = useRef(null);

    const [firstForm, setFirstForm] = useState({});
    const [address, setAddress] = useState({});
    const [step, setStep] = useState(1);

    async function continueToCEPValidator(data, { reset }) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('O nome é obrigatório'),
                surname: Yup.string().required('O Sobrenome é obrigatório'),
                bornDate: Yup.date().default(function () { return new Date(); }).required('A data de nascimento é obrigatória'),
                gender: Yup.string().required('O gênero é obrigatório'),
                cpf: Yup.string().required('O CPF é obrigatório'),
                phoneNumber: Yup.string().required('O número é obrigatório'),
                email: Yup.string().email('Insira um e-mail válido!').required('O email é obrigatório'),
                password: Yup.string().required('A senha é obrigatória'),
                cep: Yup.number('Insira somente números no CEP!')
                .required('O CEP é obrigatório!'),
            })
            await schema.validate(data, {
                abortEarly: false
            });

            setFirstForm(data);

            var validacep = /^[0-9]{8}$/;

            if(!validacep.test(data.cep)){
                alert("CEP inválido!");
                return;
            }

            const res = await axios.get("http://viacep.com.br/ws/" + data.cep + "/json");

            if(res.data.erro){
                alert("CEP inválido!");
                return;
            }

            setAddress(res.data);

            setStep(2);

            reset();
        }
        catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                })
                formRef.current.setErrors(errorMessages);
            }
        }
    }

    async function handleSubmit(data, { reset }) {
        try {
            const schema = Yup.object().shape({
                houseNumber: Yup.number("Insira um número").required("O número é obrigatório!"),
            })
            await schema.validate(data, {
                abortEarly: false
            });
            const dataToSubmit = {
                ...data,
                ...firstForm,
                city: address.localidade,
                neighbohood: address.bairro,
                state: address.uf,
                street: address.logradouro
            }

            console.log(dataToSubmit);
            axios.post("http://localhost:3333/create_pf_user", dataToSubmit).then(res => {
                alert("Usuário cadastrado", JSON.stringify(res.data))
            })

            // {data, firstForm, address}

            setStep(1);

            reset();
        }
        catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach(error => {
                    errorMessages[error.path] = error.message;
                })
                formRefHouseNumber.current.setErrors(errorMessages);
            }
        }
    }

    return (
        <>
            <h2>Cadastro Pessoa Física</h2>
            {
            step === 1 ? 
            <Form ref={formRef} onSubmit={continueToCEPValidator}>
                <p>Primeiro nome</p>
                <Input name="name" placeholder="Primeiro Nome" />
                <p>Último nome</p>
                <Input name="surname" placeholder="Sobrenome" />
                <p>Data de Nascimento</p>
                <Input type="date" name="bornDate" placeholder="Nascimento" />
                <p>Gênero</p>
                <Input name="gender" placeholder="Gênero" />
                <p>CPF</p>
                <Input name="cpf" placeholder="CPF" />
                <p>Celular</p>
                <Input name="phoneNumber" placeholder="Celular" />
                <p>Telefone fixo</p>
                <Input name="landLine" placeholder="Telefone Fixo" /> 
                <p>E-mail</p>
                <Input name="email" placeholder="Email" />
                <p>Senha</p>
                <Input type="password" name="password" placeholder="Senha" />

                <p>CEP</p> 
                <Input name="cep" placeholder="CEP" />

                <button type="submit">Continuar</button>
            </Form>
            :
            <Form ref={formRefHouseNumber} onSubmit={handleSubmit}>
                <p>
                    {address.logradouro}, {address.bairro}, 
                    {address.localidade}-{address.uf}
                
                </p>
                <p>Número da casa</p>
                <Input name="houseNumber" placeholder="Número da Casa" />
                <p>Complemento</p>
                <Input name="complement" placeholder="Complemento" />
                <p>Ponto de Referência</p>
                <Input name="referencePoint" placeholder="Ponto de Referência" />
                
                <button type="submit">Enviar</button>
            </Form>
            }
        </>
    );
}

export default FormPF;