let TransactionsController = require('../controllers/transactions.controller');
let TransactionsBusiness = require('../business/transactions.business');
class TransactionMiddleware{

    static async registerTransaction(req, res, next){
        let transaction = new TransactionsController();
        let business = new TransactionsBusiness();
        try {
            let body = await business.verifyRegisterTransaction(req);
            let response = await transaction.createTransaction(body);
            console.log(`TransactionsBusiness::registerTransaction::RESPONSE ${response.command}`);
            res.status(200).json({success:true, message:`Transacton registerd with success!`});        
        } catch (error) {
            console.log(`TransactionsBusiness::registerTransaction::ERROR: ${error}`);
            res.status(400).json({success:false, message:`We can not registerd the transaction. Please, try later!`});
        }


    }

    static async getTransactions(req, res, next){
        let business = new TransactionsBusiness();
        let transaction =  new TransactionsController();
        try {
            let response = await business.verifyGetTransactions(req);
            let transactions =  await transaction.getTransactions(response.limit, response.offset);
                res.status(200).json({success:true, message:`We can get transactions with success!`,response:transactions});            
        } catch (error) {
            console.log(`CATCH ===== TransactionsBusiness::getTransactions::ERROR: ${error}`);
            res.status(400).json({success:false, message:`We can not get the transactions. Please, try later!`});  
        }
    }
}

module.exports = TransactionMiddleware;