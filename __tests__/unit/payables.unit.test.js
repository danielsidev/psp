let PayablesController = require('../../src/controllers/payables.controller');
const moment = require('moment');

describe('Payment Methods', () => {

    it('should verify if debit card is a payment method', () => {
        let pay   =  new PayablesController();
        let response =     pay.verifyPaymentMethod('debit_card');
        expect(response).toBe(true);    
    });

    it('should verify if credit card is a payment method', () => {
        let pay      = new PayablesController();
        let response = pay.verifyPaymentMethod('credit_card');
        expect(response).toBe(true);    
    });

 });


 describe('Discount Calculate', () => {
    it('should calculate the discount of 3%', () => {
        let pay   =  new PayablesController();
        let value = 100.00;
        let tax   = pay.tax_debit_card;
        let discount = 0;
            discount = pay.getDiscountAmount(value, tax);
        expect(discount).toBe(3);
        
    });
    it('should calculate the discount of 5%', () => {
        let pay   =  new PayablesController();
        let value = 100.00;
        let tax   = pay.tax_credit_card;
        let discount = 0;
            discount = pay.getDiscountAmount(value, tax);
        expect(discount).toBe(5);    
    });
});
describe('Payment Value', () => {
    it('should calculate payment value for debit card', () => {
        let pay =  new PayablesController();
            pay.setProcessTax(100.00, 'debit_card');
        let paymentValue = pay.getPaymentValue(); 
        expect(paymentValue).toBe(97);
    });

    it('should calculate payment value for credit card', () => {
        let pay =  new PayablesController();
            pay.setProcessTax(100.00, 'credit_card');
        let paymentValue = pay.getPaymentValue(); 
        expect(paymentValue).toBe(95);
    });
});
describe('Payment Date', () => {
    it('should calculate payment date for debit card', () => {
        let pay =  new PayablesController();
            pay.setPaymentStatus(pay.payment_methods[0]);
            pay.setPaymentDate();
        let paymentDate = pay.getPaymentDate();
        let payDate = paymentDate.format("YYYY-MM-DD"); 
        let d = moment(moment(), "YYYY-MM-DD").add(0, 'days');
        let day = d.format("YYYY-MM-DD");
        expect(payDate).toBe(day);
    });

    it('should calculate payment date for credit card', () => {
        let pay =  new PayablesController();
            pay.setPaymentStatus(pay.payment_methods[1]);
            pay.setPaymentDate();
        let paymentDate = pay.getPaymentDate();
        let payDate = paymentDate.format("YYYY-MM-DD"); 
        let d = moment(moment(), "YYYY-MM-DD").add(30, 'days');
        let day = d.format("YYYY-MM-DD");
        expect(payDate).toBe(day);
    });
});
