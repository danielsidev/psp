const PostgreSqlClient = require('../database/postgresql.client');
class PayablesDao extends PostgreSqlClient{
    constructor(){
        super();
        this.table = `payables`;
        this.fields = `id_transaction, payment_status, payment_value, payment_date, transaction_date, id_client`;
        this.queryFields = ``;
        this.queryValues = [];
        this.client = null;
    }

    getTable(){
        return this.table;
    }

    getFields(){
        return this.fields;
    }


    async getPayablesTotals(id){
        try {
            this.client = await this.getPool();
            this.queryFields = `Select payment_status, sum(payment_value) as total from payables where id_client=$1 group by payment_status;`;
            let response = await this.client.query(this.queryFields, [id]);
            return response.rows;
        } catch (error) {
            console.log(`We can not get payables totals :: error : ${error}`);
            throw new Error(`We can not get payables totals :: error : ${error}`);
        }
    }

    async setPayable(payable){
        try {
             
            this.queryFields = `insert into ${this.table}(${this.fields}) values($1, $2, $3, $4, $5, $6)`;
            this.queryValues = payable;
            this.client = await this.getPool();
            await this.client.query('BEGIN');
            await this.client.query(this.queryFields, this.queryValues );
            let response = await this.client.query('COMMIT');
            console.log(`Insert into payables with success!`);
            return response;
        } catch (error) {
            await this.client.query('ROLLBACK');
            console.log(`Set Transction ERROR: ${error}`);
            throw new Error(`We can not register transaction::error: ${error}`);
        } finally {
           this.client.release();
        }
    }
}

module.exports = PayablesDao;