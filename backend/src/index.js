const express = require("express");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

const usersPF = [];
const usersPJ = [];

app.get('/get_pf_users', (request, response) => {
    return response.json(usersPF);
});

app.post('/create_pf_user', (request, response) => {
    const { name, surname, bornDate, gender, cpf, phoneNumber, landline } = request.body;

    const { cep, street, neighbohood, 
        houseNumber, complement, state, 
        city, referencePoint 
    } = request.body;
    
    const { email, password } = request.body;

    const user = {
        id: uuid(),
        personalInformation: {
            name,
            surname,
            bornDate,
            gender,
            cpf,
            phoneNumber,
            landline
        },
        adress: {
            cep,
            street,
            neighbohood, 
            houseNumber, 
            complement, 
            state, 
            city, 
            referencePoint
        },
        credencials: {
            email,
            password
        }
    };

    usersPF.push(user);

    return response.status(200).json(user);
});


app.get('/get_pj_users', (request, response) => {
    return response.json(usersPJ);
});

app.post('/create_pj_user', (request, response) => {
    const { name, companyName, cnpj, stateRegistration, phoneNumber, landline } = request.body;

    const { cep, street, neighbohood, 
        houseNumber, complement, state, 
        city, referencePoint 
    } = request.body;
    
    const { email, password } = request.body;

    const user = {
        id: uuid(),
        personalInformation: {
            name,
            companyName,
            cnpj,
            stateRegistration,
            phoneNumber,
            landline
        },
        adress: {
            cep,
            street,
            neighbohood, 
            houseNumber, 
            complement, 
            state, 
            city, 
            referencePoint
        },
        credencials: {
            email,
            password
        }
    };

    usersPJ.push(user);

    return response.status(200).json(user);
});

app.listen(3333, () => {
    console.log('Back-end started!');
});