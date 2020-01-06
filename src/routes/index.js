let TransactionMiddleware = require('../middlewares/transactions.middleware');
let PayablesMiddleware = require('../middlewares/payables.middleware');
class RegisterRoutes {

    constructor(app) { 
        this.app = app;
    }
    setRoutes() {
        this.app.use(function(err, req, res, next) {
            console.error(err);
            res.status(500).send('internal server error');
          });
        this.app.get('/',(req,res) => res.render('index.html'));
        this.app.post( "/transaction",TransactionMiddleware.registerTransaction);
        this.app.get( "/transactions/limit/offset/:limit/:offset",TransactionMiddleware.getTransactions);
        this.app.get( "/payables/totals/:id",PayablesMiddleware.getPayablesTotals);
    }
}

module.exports = RegisterRoutes;
