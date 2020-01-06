const PostgreSqlClient = require('../database/postgresql.client');
class Migration extends PostgreSqlClient{
    constructor(){
        super();
        this.client = null;
        this.main();

    }

    async main(){
        await this.createTablePayables();
        await this.createTableTransactions();
        await this.createTableClients(); 
        await this.seedTableClients();
        this.finished();       
    }

    async createTablePayables(){
        try {
            this.client = await this.getPool();
            this.queryFields = `create table if not exists payables(
                id_payable serial primary key not null,
                id_transaction integer not null,
                id_client integer not null,
                payment_status character(15) not null,
                payment_value numeric not null,
                payment_date date,
                transaction_date timestamp
              );`;
            await this.client.query(this.queryFields);
            console.log(`Create Table Payables wiht Success!`);
        } catch (error) {
            this.client.release();
            console.log(`We can not create table payables :: error : ${error}`);
            throw new Error(`We can not create table payables :: error : ${error}`);
        } finally{
            this.client.release();
        }
    }


    async createTableTransactions(){
        try {
            this.client = await this.getPool();
            this.queryFields = `create table if not exists transactions(
                                id_transaction serial primary key not null,
                                id_client integer not null,
                                payment_method character(12) not null,
                                transaction_value numeric not null,
                                description text not null,
                                card_number integer not null,
                                cardholder_name character(50) not null,
                                cvv integer not null,
                                validate_date date,
                                datetime_transaction timestamp
                                );
                            `;
            await this.client.query(this.queryFields);
            console.log(`Create Table Transactions wiht Success!`);
        } catch (error) {
            this.client.release();
            console.log(`We can not create table transactions :: error : ${error}`);
            throw new Error(`We can not create table transactions :: error : ${error}`);
        }finally{
            this.client.release();
        }
    }

    async createTableClients(){
        try {
            this.client = await this.getPool();
            this.queryFields = `create table if not exists clients(
                                id_client serial primary key not null,
                                fullname_client character(100) not null,
                                cnpj bigint not null
                                );
                            `;
            await this.client.query(this.queryFields);
            console.log(`Create Table Cliente wiht Success!`);

        } catch (error) {
            this.client.release();
            console.log(`We can not create table client :: error : ${error}`);
            throw new Error(`We can not create table client :: error : ${error}`);
        }finally{
            this.client.release();
        }
    }

    async seedTableClients(){
        try {
            this.client = await this.getPool();
            this.queryFields = `        
                                insert into clients(fullname_client, cnpj) values('Empresa A', 96484274000172);
                                insert into clients(fullname_client, cnpj) values('Empresa B', 80438358000130);
                                insert into clients(fullname_client, cnpj) values('Empresa C', 67071763000102);
                            `;
            await this.client.query(this.queryFields);
            console.log(`Seed Client wiht Success!`);
        } catch (error) {
            this.client.release();
            console.log(`We can not seed the table client :: error : ${error}`);
            throw new Error(`We can not seed the table client :: error : ${error}`);
        }finally{
            this.client.release();
        }
    }

    finished(){
        process.exit();
    }
}

new Migration();