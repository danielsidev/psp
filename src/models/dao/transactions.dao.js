const PostgreSqlClient = require('../database/postgresql.client');
const PayablesDao = require('./payables.dao');
const PayablesBusiness = require('../../business/payables.business');
class TransactionsDao extends PostgreSqlClient{
    constructor(){
        super();
        this.table = `transactions`;
        this.fields = `id_client, payment_method, transaction_value, description,  card_number, cardholder_name, cvv, validate_date, datetime_transaction`;
        this.queryFields = ``;
        this.queryValues = [];
        this.client = null;
        this.transac = null;
        this.id = null;
        this.payable = new PayablesDao();
    }
    getTable(){
        return this.table;
    }
    /**
     * @description Get all transactions 
     * @return {Array<Object>} result 
     */
     async getAllTransactions(){
        this.queryFields = `select * from ${this.table}`;
        return this.getClient().then((client)=>{
            client.query(this.queryFields, (err, result) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                  }
                  client.end();
                  return result.rows;                  
            });
        }).catch((err)=>{
            console.log(err);
        });

    }
    /**
     * @description Get transactions with limit and offset
     * @param {Integer} limit
     * @param {Integer} offset
     * @return {Array<Object>} result 
     */
    async getTransactionsPage(limit, offset){

        return new Promise((resolve, reject)=>{
            this.queryFields = `select * from ${this.table} limit $1 offset $2`;
            this.queryValues = [limit, offset];
            this.getClient().then((client)=>{
                client.query(this.queryFields,this.queryValues, (err, result) => {
                    if (err) {
                         console.error('Error executing query', err.stack)
                         reject(`Error executing query :: error : ${err.stack}`);
                      }
                      client.end();
                      resolve(result.rows);                  
                });
            }).catch((error)=>{
                console.log(error);
                reject(`We can not get transactions::error: ${error}`);
            });
        });


    }
    /**
     * @description Get transaction by id
     * @param {Integer} id
     * @return {Array<Object>} result 
     */
    getTransctionById(id){
        this.queryFields = `select * from ${this.table} where id=$1`;
        this.queryValues = [id];
        return this.getClient().then((client)=>{
            client.query(this.queryFields, this.queryValues, (err, result) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                  }
                  console.log(result.rows);
                  client.end();
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    /**
     * @description Insert new transaction
     * @param {Array} transaction 
     * @return {Array<Object>} result
     */
    async setTransaction(transaction, payable){
        try { 
            this.queryFields = `insert into ${this.table}(${this.fields}) values($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
            this.queryValues = transaction;       
            this.client = await this.getPool();
            await this.client.query('BEGIN');
            await this.client.query(this.queryFields, this.queryValues );
             let transac = await this.client.query(`select id_transaction from ${this.table} order by id_transaction desc limit 1`);
             let id = transac.rows[0].id_transaction;
             payable[0] = id;
             let payablesBusiness = new PayablesBusiness();
             let bodyPayable = await payablesBusiness.verifyRegisterPayable(payable);
            await this.client.query(`insert into ${this.payable.table}(${this.payable.fields}) values ($1, $2, $3, $4, $5, $6)`, bodyPayable );    
            let response = await this.client.query('COMMIT');
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

module.exports = TransactionsDao;