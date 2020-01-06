let TransactionsController = require('../controllers/transactions.controller');
let Util = require('../util/util');
class TransactionBusiness{
    constructor(){}

    async verifyRegisterTransaction(req){
        let util = new Util();
        let params = util.listConstruct(req.body);
        let invalid = util.checkInvalidList(params);
        try {
            if(invalid){
                console.log(`Fields invalid: ${invalid}`);
                throw new Error(`Fields invalid`);
            }else{                
                return req.body;
            }    
        } catch (error) {
            console.log(`verifyRegisterTransaction :: ERROR ${error}`);
            throw new Error(`Fields invalid`);
        }
    }

     async verifyGetTransactions(req){
        let util = new Util();
        let params = [req.params.limit, req.params.offset];        
        let invalid = util.checkInvalidList(params);
        try {
            if(invalid){
                console.log(`Limit or Offset invalid: ${invalid}`);
                throw new Error(`Limit or Offset invalid`);
            }else{                
                return {
                        limit:parseInt(params[0]), 
                        offset:parseInt(params[1])
                    };
            }    
        } catch (error) {
            console.log(`verifyGetTransactions :: ERROR ${error}`);
            throw new Error(`Limit or Offset invalid`);
        }
    }
}

module.exports = TransactionBusiness;