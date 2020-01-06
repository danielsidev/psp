# API - PSP
Um provedor de serviços de pagamento.

### Instalação

Requer [Node.js](https://nodejs.org/) v12+ e [Typescript](https://www.typescriptlang.org/) v3+ para rodar.

Abra um terminal, na raiz do projeto, e instale as dependências. 
```sh
$ npm install 
```
#### Database
A aplicação foi feita com o PostgreSQL.
É necessário possuir um banco postgresql instalado.
O nome do banco e o usuário da aplicação encontram-se em variáriveis de ambiente que para ambiente local foram setadas no script npm run local.
Para os ambientes dev, homolog e production, encontram-se no arquivo ecosystem.config.js.
Essas informações foram alocadas nesse arquivo a título de teste desses ambientes em uma máquina local. 
Para um teste real, em um servidor online, esses valores devem ser apagados e as variváveis de ambiente que a aplicação utiliza devem ser criadas no servidor.

Após a instalação das dependências deve-se criar um banco com o nome , usuário e senha informados na variáveis de ambiente.

Com o banco criado rode o comando:
```sh
$ npm run migration
```
Isso criará as tabelas e irá popular um delas para os testes.

### Testes
##### Unitários 
Execute o comando:
```sh
$ npm run test-unit
```
##### Integração
Execute o comando:
```sh
$ npm run test-integration
```
### Para ambiente Local com node/nodemon

```sh
$ npm run local
```
### Para ambiente Dev, Homolog ou Production com PM2, respectivamente:

```sh
$ npm run dev
```
```sh
$ npm run hmg
```
```sh
$ npm run prod  
```
 
 ---
 # Postman 
 ---
 Para verfiicar os endpoints da aplicação, deve-se immportar no Postman a collection Pagar.me.postman_collection.json que encontra-se na raiz do projeto /postman na raiz do projeto.
 >./postman/Pagar.me.postman_collection.json
 
 ---
# Sobre Autenticação
Esse serviço não foi feito com autenticação( o que é bem simples e mais comum para serviços via API com JWT ), por que presumiu-se que o mesmo seria avaliado somente seguindo as informações que constavam nas regras de negócio. E como as  regras não solicitavam autenticação, esta não foi feita. No entanto, dado a modularização do serviço, uma autenticação é facilmente acoplada.

 ---
 # Rotas da Aplicação
 #### Host: localhost:7000
 
## Criação de Transação
Ao acionar esse endpoint teremos um registro de transação e pagamento realizados, seguindo as regras de cálculo de taxas e data de pagamento estipulados na regra de negócio.
|Request| POST|
|---|---| 
|Content-Type|application/json| 
|Rota|/transaction|

```
Examplo: http://localhost:7000/transaction
 {
	"id_client":1,
    "payment_method":"credit_card",
    "transaction_value":"3000.99",
    "description":"TV 50 Polegadas 4k",
    "card_number":"1132 3456 0989 9000",
    "cardholder_name":"LUCAS MATOS",
    "cvv":465,
     "validate_date":"2021-12"
}
```
|Response JSON| Status 200| 
|---|---|  

```
{
    "success": true,
    "message": "Transacton registerd with success!"
}
```
|Response JSON| Status 400| 
|---|---|  

```
{
    "success": false,
    "error": ""We can not registerd the transaction. Please, try later!"
}
```
---
## Consulta as Transações
Realiza a busca paginada de transações
|Request| GET|
|---|---| 
|Content-Type|application/json| 
|Rota|/transactions/limit/offset/:limit/:offset| 

```
Exemplo: http://localhost:7000/transactions/limit/offset/1/0
{
    "success": true,
    "message": "We can get transactions with success!",
    "response": [
        {
            "id_transaction": 11,
            "id_client": 1,
            "payment_method": "debit_card  ",
            "transaction_value": "150.5",
            "description": "Tênis Nike",
            "card_number": 1245,
            "cardholder_name": "JOAO M SANTOS                                     ",
            "cvv": 199,
            "validate_date": "2026-12-30T02:00:00.000Z",
            "datetime_transaction": "2019-12-28T21:10:45.308Z"
        }
    ]
}
```
|Response JSON| Status 200| 
|---|---|  

```
{
    "success": true,
    "message": "We can get transactions with success!",
    "response": []
}

```
|Response JSON| Status 400| 
|---|---|  
```
{
    "success": false,
    "message": "We can not get the transactions. Please, try later!",
}
```
---
## Consulta os Totais de Pagamentos
Realiza a busca dos totais e pagamentos feitos divididos em dois montantes: waiting_funds e avaible pelo id do cliente.
|Request| GET|
|---|---| 
|Content-Type|application/json| 
|Rota|/transactions/payables/totals:id| 

```
Exemplo: http://localhost:7000/payables/totals/1
{
    "success": true,
    "message": "We can get payables totals with success!",
    "response": [
        {
            "available": "485"
        },
        {
            "waiting_funds": "5701.8809999999994"
        }
    ]
}
```
|Response JSON| Status 200| 
|---|---|  

```
{
    "success": true,
    "message": "We can get payables totals with success!",
    "response": []
}

```
|Response JSON| Status 400| 
|---|---|  
```
{
    "success": false,
    "message": "We can not get the payables. Please, try later!"
}
```
---
