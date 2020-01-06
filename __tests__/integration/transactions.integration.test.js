const request  = require('supertest'); 
let TransactionsController = require('../../src/controllers/transactions.controller');
const moment = require('moment-timezone');

describe('Create Transaction', () => {

    it('should create a new transaction by debit_card', async () => {
        let data = {
            "id_client":1,
            "payment_method":"debit_card",
            "transaction_value":"500",
            "description":"Tenis Nike",
            "card_number":"1132 3456 0989 9003",
            "cardholder_name":"FERNANDA DIAS",
            "cvv":465,
             "validate_date":"2021-12"
        }
        let transaction = new  TransactionsController();
        let response  = await transaction.createTransaction(data);
        expect(response.command).toBe(`COMMIT`);    
    });


    it('should create a new transaction by credit_card', async () => {
        let data = {
            "id_client":1,
            "payment_method":"credit_card",
            "transaction_value":"3000",
            "description":"TV 50 Polegadas 4k",
            "card_number":"3452 1243 8756 3487",
            "cardholder_name":"JOAO SILVA",
            "cvv":501,
             "validate_date":"2027-06"
        }
        let transaction = new  TransactionsController();
        let response  = await transaction.createTransaction(data);
        expect(response.command).toBe(`COMMIT`);    
    });

 });

 


 describe('Recovery Data', () => {

    it('should get transactions > 0 ', async () => {
        let transaction = new  TransactionsController();
        let response  = await transaction.getTransactions();
        expect(response.length).toBeGreaterThan(0);
    });

 });