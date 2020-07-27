# Bemol Omnichannel

### Descrição do problema, solução e tecnologias usadas
Feature de criação de usuário supondo sistema omnichannel. Para isso, foi feita uma API Rest em NodeJS, sendo assim, tem é um sistema headless, que pode ser usando tanto em aplicações web, mobile ou qualquer outra que faça requisições http e usem JSON. 

Para o teste da API foi feita uma inteface web usando ReactJS.

### Setup utilizado no desenvolvimento da feature
- Ubuntu 20
- VSCode
- NodeJS
- ReactJS
- Insomnia

### Execusão do projeto
Este passo-a-passo de execusão foi pensado para um sistema linux, mas pode facilmente ser adaptado para outros sitemas. 

Primeiramente você precisa clonar este projeto. Considerando que isso foi feito, seguimos.

Para a execução do projeto, é preciso ter o yarn instalado. Para isso recomendo seguir os passos do próprio site do yarn: https://classic.yarnpkg.com/pt-BR/docs/install/

## Rodando o Back-end

Para instalar as dependências, pelo terminal, entre na pasta "backend" e execute o seguinte comando:
```
$ yarn
```

Após as dependências terem sido instaladas, podemos executar o backend com o seguinte comando:
```
$ yarn dev
```

## Rodando o Front-end

Depois de o back-end estar rodando, abra um outro terminal e prossiga.

Para instalar as dependências, pelo terminal, entre na pasta "frontend" e execute o seguinte comando:
```
$ yarn
```

Após as dependências terem sido instaladas, podemos executar o front-end com o seguinte comando:
```
$ yarn start
```

Agora já podemos testar a feature pelo browzer.

Como não foi implementado uma tela para visualizar os usuários cadastrados, fiz um end point na API para listar os usuário de cada tipo (PF ou PJ): http://localhost:3333/get_pf_users ou http://localhost:3333/get_pj_users 
