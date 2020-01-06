
let PayablesDao = require('../models/dao/payables.dao');
const moment = require('moment');
class PayablesController{

    constructor(){
        this.payment_methods = ['debit_card', 'credit_card'];
        this.payment_status = null;
        this.payment_date = null;
        this.payment_days = null;
        this.tax_credit_card = 0.05;
        this.tax_debit_card = 0.03;
        this.payment_value = 0.0;
    }

    getPaymentValue(){
        return this.payment_value;
    }

    getPaymentStatus(){
        return this.payment_status;
    }

    getPaymentDate(){
        return this.payment_date;
    }

    getPaymentMethods(){
        return this.payment_methods;
    }

    getPaymentDays(){
        return this.payment_days;
    }

    verifyPaymentMethod(payment_method){
        return (this.payment_methods.includes(payment_method));
    }
    setPaymentDate(){
        if(this.payment_status === 'paid') {
                this.payment_days = 0;
        }else if(this.payment_status ==='waiting_funds'){
            this.payment_days = 30;
        }
        this.payment_date = moment(moment(), "YYYY-MM-DD").add(this.payment_days, 'days');                 

    }
    getDiscountAmount(value, tax){
        let discountAmount = parseFloat(value) * parseFloat(tax);
        return discountAmount;
    }
    setProcessTax(transaction_value,payment_method){
        if(this.verifyPaymentMethod(payment_method)){
            let discount = 0;
            switch(payment_method) {
                case 'debit_card':     
                    discount = this.getDiscountAmount(transaction_value, this.tax_debit_card);               
                    this.payment_value = parseFloat(transaction_value) - discount;
                    break;
                case 'credit_card':
                    discount = this.getDiscountAmount(transaction_value, this.tax_credit_card);               
                    this.payment_value = parseFloat(transaction_value) - discount;
                break;
            }
        }else{
            throw new Error('Payment method does not exist')
        }
    }
    setPaymentStatus(payment_method){
        if(this.verifyPaymentMethod(payment_method)){
            switch(payment_method) {
                case 'debit_card':
                    this.payment_status='paid';    
                    break;
                case 'credit_card':
                    this.payment_status='waiting_funds';                
                break;
            }
        }else{
            throw new Error('Payment method does not exist')
        }
    }

    async recoveryPayablesTotals(id){
        try {
            let idClient = parseInt(id);
            if(idClient>0){
                let pay = new PayablesDao();
                let payables = await pay.getPayablesTotals(idClient); 
                let totals = [];
                payables.map((p)=>{
                    p.payment_status = p.payment_status.replace(/\s/g, '');
                    if(p.payment_status=='waiting_funds'){
                        totals.push({"waiting_funds":p.total});
                    }
                    if(p.payment_status=='paid'){
                        totals.push({"available":p.total});
                    }
                });       
                return totals;    
            }else{
                throw new Error(` Client doesn't exist`); 
            }

        } catch (error) {
            throw new Error(error);               
        }
        

    }

    async createPayable(data){        
         try {
            let pay = new PayablesDao();
            let response =  await pay.setPayable(data);
            return response;
         } catch (error) {
            console.log(`PayablesController::createPayables::ERROR: ${error}`);
            return error;
         }

    }
}


module.exports = PayablesController;