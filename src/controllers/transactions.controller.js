let TransactionsDao = require('../models/dao/transactions.dao');
let PayablesController = require('./payables.controller');
let moment = require('moment-timezone');
class TransactionsController{
    constructor(){
        this.id_client = null;
        this.payment_method = null;
        this.transaction_value = 0.0;
        this.description = null;
        this.card_number = 0;
        this.cardholder_name= null
        this.cvv= 0;
        this.validate_date = null;
        this.now = null;
    }

    prepareTransaction(data){
        let check = [];
        if(data.card_number!==""){
            this.card_number = parseInt(data.card_number.substr(-4));
            check.push(true);
        }
         if(data.transaction_value!==""){
            this.transaction_value = parseFloat(data.transaction_value);
            check.push(true);
        }
        if(data.cvv!==""){
            this.cvv = parseFloat(data.cvv);
            check.push(true);
        }
        if(data.validate_date!==""){
            if(data.validate_date.length===7 && data.validate_date.indexOf('-')> 0){
                this.validate_date = data.validate_date+"-30"
                check.push(true);
            }
        }
        this.now = moment().tz("America/Sao_Paulo").format('YYYY-MM-DDTHH:mm:ss.SSS');
        if(check.length ===4){
            return true;
        }else{
            return false;
        }
    }

    async createTransaction(data){
        try {
                if(this.prepareTransaction(data) && data.id_client >0){                    
                    let pay = new PayablesController();
                    pay.setProcessTax(this.transaction_value, data.payment_method);
                    pay.setPaymentStatus(data.payment_method);
                    pay.setPaymentDate();
                    let payable = [
                        null,
                        pay.getPaymentStatus(),
                        pay.getPaymentValue(),
                        pay.getPaymentDate(),
                        this.now,
                        data.id_client 
                    ];
                    let transaction = [
                        data.id_client, 
                        data.payment_method,
                        this.transaction_value, 
                        data.description, 
                        this.card_number,
                        data.cardholder_name,
                        this.cvv,
                        this.validate_date,
                        this.now
                       ];
                    let tran = new TransactionsDao();
                    let response =  await tran.setTransaction(transaction, payable);           
                    return response;
                }else{
                    throw new Error("Invalid data!");
                }

           } catch (error) {
               console.log(`TransactionsController::createTransaction::ERROR: ${error}`);
               throw new Error(error);
           }
    }

    async getTransactions(limit, offset){
            let tran = new TransactionsDao();
            try {
                let transactions =  await tran.getTransactionsPage(limit, offset);
                return transactions;
            } catch (error) {
                return error;                
            }
    }
}

module.exports = TransactionsController;