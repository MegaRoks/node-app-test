--
-- users table
--
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id 						    SERIAL PRIMARY KEY, 
    first_name                          VARCHAR(220) NOT NULL,
    last_name                           VARCHAR(220) NOT NULL,
    user_email                          VARCHAR(220) NOT NULL, 
    user_password                       VARCHAR(220) NOT NULL,
    create_date                         TIMESTAMP NOT NULL
);

--
-- users table
--
DROP TABLE IF EXISTS files CASCADE;
CREATE TABLE files(
    file_id 						    SERIAL PRIMARY KEY, 
    file_name                           VARCHAR(220) NOT NULL, 
    file_path                           VARCHAR(220) NOT NULL, 
    user_id                             INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    url_code                            VARCHAR(40) NOT NULL,
    count_downloads                     INTEGER NOT NULL DEFAULT 0,
    create_date                         TIMESTAMP NOT NULL
);