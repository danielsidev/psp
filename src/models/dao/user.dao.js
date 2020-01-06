const PostgreSqlClient = require('../database/postgresql.client');
class UserDao extends PostgreSqlClient{
    constructor(){
        super();
        this.table = `clients`;
        this.queryFields = ``;
        this.queryValues = [];
        this.client = null;
        }

     getAllUsers(limit, offset){
        this.queryFields = `SELECT * FROM ${this.table} limit $1 offset $2`;
        this.queryValues = [limit, offset];
        return this.getClient().then((client)=>{
            client.query(this.queryFields, this.queryValues ,(err, result) => {
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

    getUserById(id){
        return this.getClient().then((client)=>{
            client.query("SELECT * FROM users where id= $1",[id], (err, result) => {
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

    async getUsers(limit, offset){
        try {        
            this.queryFields = `SELECT * FROM ${this.table} limit $1 offset $2`;
            this.queryValues = [limit, offset];

            this.client = await this.getPool();
            await this.client.query('BEGIN');
            let res = await this.client.query(this.queryFields, this.queryValues );
            await this.client.query('COMMIT');
            console.log(res.rows);
            return res.rows;
        } catch (error) {
            this.client.release();
            await this.client.query('ROLLBACK');
            throw error
        } finally {
            this.client.release();
        }
    }

}

module.exports = UserDao;