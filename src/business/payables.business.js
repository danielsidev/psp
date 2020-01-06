let PayablesController = require('../controllers/payables.controller');
let Util = require('../util/util');
class PayablesBusiness{
    constructor(){
        this.payment_methods = ['debit_card', 'credit_card'];
        this.payment_status = null;
        this.payment_date = null;
        this.payment_days = null;
        this.tax_credit_card = 0.05;
        this.tax_debit_card = 0.03;
        this.payment_value = 0.0;
    }

    async verifyRegisterPayable(payables){
        let util = new Util();
        let invalid = util.checkInvalidList(payables);
        try {
            if(invalid){
                console.log(`Fields invalid: ${invalid}`);
                throw new Error(`Fields invalid`);
            }else{                
                console.log(`payables ok: ${JSON.stringify(payables)}`);
                return payables;
            }    
        } catch (error) {
            console.log(`verifyRegisterPayable :: ERROR ${error}`);
            throw new Error(`Fields invalid`);
        }
    }

}

module.exports = PayablesBusiness;