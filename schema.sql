--
-- users table
--
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    user_id 						    SERIAL PRIMARY KEY, 
    first_name                          VARCHAR(220) NOT NULL,
    last_name                           VARCHAR(220) NOT NULL,
    user_email                          VARCHAR(220) NOT NULL, 
    user_password                       VARCHAR(220) NOT NULL,
    create_date                         TIMESTAMP NOT NULL
);