CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    brokerage INTEGER REFERENCES brokerages(id) NOT NULL
);