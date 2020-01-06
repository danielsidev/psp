let PayablesController = require('../controllers/payables.controller');
class PayablesMiddleware{

    static async getPayablesTotals(req, res, next){
        let payable =  new PayablesController();
        try {
            let id = req.params.id;
            let payables =  await payable.recoveryPayablesTotals(id);
            res.status(200).json({success:true, message:`We can get payables totals with success!`,response:payables}); 
        } catch (error) {
            console.log(`PayablesBusiness :: getPayablesTotals :: ERROR: ${error}`);
            res.status(400).json({success:false, message:`We can not get the payables. Please, try later!`});   
        }    
    }
}

module.exports = PayablesMiddleware;