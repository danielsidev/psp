//test.skip('skip', () => {});

let TransactionsController = require('../../src/controllers/transactions.controller');

describe('Transaction Prepare Data', () => {
    it('should calculate payment date for debit card', () => {
        let data = {
            "transaction_value":"3000.99",
            "card_number":"1132 3456 0989 9000",
            "cvv":465,
            "validate_date":"2021-12"
        };
        let transaction =  new TransactionsController();
        let response =  transaction.prepareTransaction(data);
        expect(response).toBe(true);
    });

});
