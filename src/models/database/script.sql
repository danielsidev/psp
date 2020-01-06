--Clients ----start------------------------------------------------------------
create table clients(
  id_client serial primary key not null,
  fullname_client character(100) not null,
  cnpj bigint not null
);
insert into clients(fullname_client, cnpj) values('Empresa A', 96484274000172);
insert into clients(fullname_client, cnpj) values('Empresa B', 80438358000130);
insert into clients(fullname_client, cnpj) values('Empresa C', 67071763000102);
--Clients ----end------------------------------------------------------------

--Transactions ----start----------------------------------------
create table transactions(
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
--Transactions ----end----------------------------------------

--Payables ----start----------------------------------------
create table payables(
  id_payable serial primary key not null,
  id_transaction integer not null,
  id_client integer not null,
  payment_status character(15) not null,
  payment_value numeric not null,
  payment_date date,
  transaction_date timestamp
);
--Payables ----end-----------------------------------------