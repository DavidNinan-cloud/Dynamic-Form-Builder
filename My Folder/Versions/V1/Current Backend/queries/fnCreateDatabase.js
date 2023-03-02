const query = `


CREATE TABLE IF NOT EXISTS "users" (
    user_id varchar NOT NULL PRIMARY KEY,
    user_name varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    hashed_password varchar,
    refresh_token varchar,
    isadmin boolean NOT NULL
  );
  
CREATE TABLE IF NOT EXISTS "user_fund_details" (
    user_id varchar NOT NULL,
    PRIMARY KEY(user_id),  
    user_invested numeric(10,5) NOT NULL,
    user_commission numeric(10,5) NOT NULL,
    user_expense numeric(10,5) NOT NULL,
    user_taxes numeric(10,5) NOT NULL,
    user_units numeric(10,5) NOT NULL,
    CONSTRAINT fk_user_id  
    FOREIGN KEY(user_id)   
    REFERENCES users(user_id)   
);

CREATE TABLE IF NOT EXISTS "user_fund_transactions" (
    user_id varchar NOT NULL,
    transactions_id INT GENERATED ALWAYS AS IDENTITY NOT NULL,  
    PRIMARY KEY(transactions_id),  
    date timestamp without time zone NOT NULL,
    credited boolean NOT NULL,
    at_nav numeric(10,5) NOT NULL,
    units numeric(10,5) NOT NULL,

    CONSTRAINT fk_user_id  
    FOREIGN KEY(user_id)   
    REFERENCES users(user_id)  
);
  CREATE TABLE IF NOT EXISTS "user_fund_expenses" (
    user_id varchar NOT NULL,
    transactions_id INT GENERATED ALWAYS AS IDENTITY NOT NULL,  
    PRIMARY KEY(transactions_id),  
    date timestamp without time zone NOT NULL,
    user_expense numeric(10,5) NOT NULL,
    CONSTRAINT fk_user_id  
    FOREIGN KEY(user_id)   
    REFERENCES users(user_id)  
  );
  CREATE TABLE IF NOT EXISTS "user_fund_commission" (
    user_id varchar NOT NULL,
    transactions_id INT GENERATED ALWAYS AS IDENTITY NOT NULL,  
    PRIMARY KEY(transactions_id),  
    date timestamp without time zone NOT NULL,
    user_commission numeric(10,5) NOT NULL,
    CONSTRAINT fk_user_id  
    FOREIGN KEY(user_id)   
    REFERENCES users(user_id)  
  );
  CREATE TABLE IF NOT EXISTS "deleted_users" (
    deleted_id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    PRIMARY KEY(deleted_id),
    user_id varchar NOT NULL ,
    user_name varchar NOT NULL,
    email varchar NOT NULL,
    isadmin boolean NOT NULL
  );
  CREATE TABLE IF NOT EXISTS "fund_details" (
    fund_id varchar NOT NULL PRIMARY KEY,
    fund_name varchar NOT NULL,
    fund_commission numeric(10,5) NOT NULL,
    fund_expense_ratio numeric(10,5) NOT NULL,
    fund_nav numeric(10,5) NOT NULL,
    units_declared numeric(10,5) NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "fund_nav" (
    nav_rate numeric(10,5) NOT NULL,
    date timestamp without time zone NOT NULL,
    fund_id varchar NOT NULL,
    fund_nav_id INT GENERATED ALWAYS AS IDENTITY NOT NULL PRIMARY KEY,  
    CONSTRAINT fk_fund_id  
    FOREIGN KEY(fund_id)   
    REFERENCES fund_details(fund_id)  
  );

  INSERT INTO "users" (
    user_id,
    user_name,
    hashed_password,
    email,
    isadmin) VALUES (
      '3167e278-6b02-43d9-9d46-d7c9452007b2',
      'David Ninan',
      '$2b$10$/nuanp0sJG4OFWuGbrwYV.2cYP/5HclmfMiKxk7PuRqy2/MUT7S0i',
      'nainand6@gmail.com',
      true) ON CONFLICT (user_id) DO NOTHING;


      INSERT INTO "user_fund_details" (
        user_id,
        user_invested,
        user_commission,
        user_expense,
        user_taxes,
        user_units) VALUES (
          '3167e278-6b02-43d9-9d46-d7c9452007b2',
          0,
          0,
          0,
          0,
          0) ON CONFLICT (user_id) DO NOTHING;

    INSERT INTO "fund_details" (
      fund_id,
      fund_name,
      fund_commission,
      fund_expense_ratio,
      fund_nav,
      units_declared) VALUES (
        1,
        'Class A Fund',
        0,
        0,
        0,
        0) ON CONFLICT (fund_id) DO NOTHING;
        
`  



// 'date' date NOT NULL
// ALTER TABLE "user_fund_details" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
  
  
// ALTER TABLE "fund_nav" ADD FOREIGN KEY ("fund_id") REFERENCES "fund_details" ("fund_id");
// 
//   ALTER TABLE "user_fund_transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

// CREATE TABLE IF NOT EXISTS employees (
//     id VARCHAR NOT NULL PRIMARY KEY,
//     firstname VARCHAR(255),
//     lastname VARCHAR(255)
// );
// CREATE TABLE IF NOT EXISTS users (
//     email VARCHAR(255) PRIMARY KEY,
//     hashed_password VARCHAR,
//     refreshToken VARCHAR
// );


// INSERT INTO employees(firstname, lastname) 
// Values('aniya', 'pan');

// `
// INSERT INTO employees(id, firstname, lastname) 
// Values(1, 'peter', 'joe');

// INSERT INTO users(email, hashed_password, refreshToken) 
// Values('davidnainan007@gmail.com, '$2b$10$/nuanp0sJG4OFWuGbrwYV.2cYP/5HclmfMiKxk7PuRqy2/MUT7S0i', '');

module.exports = query