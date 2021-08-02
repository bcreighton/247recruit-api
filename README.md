# 24/7 REcruit
Targeted Real Estate Agent recruiting simplified! This pilot application is a the foundation of a larger vision behind the requirements of effective recruting in the Real Estate Brokerage business. 

This is the backend for `24/7 REcruit`.  A live version of the app can be found at [https://247recruit-app.vercel.app/](https://247recruit-app.vercel.app/)

The front end client can be found at [https://github.com/bcreighton/247recruit-app](https://github.com/bcreighton/247recruit-app).

## Introduction

Recruiting the Real Estate Brokerage business is a physical sport; has has only increased in competition over the last 5 - 10 years. in today's fast paced environment it's extremely difficult to get the attention of valuable, producing, and profitable agents in any marketplace. 24/7 REcruit looks to solve this by linking MLS, liscensing, KPIs for potential movement, and tips and tricks developed from years of Real Estate Broker coaching; 24/7 REcruit is meant to speed up the recruiting process by helping Brokers and Recruits to get to "no" quicker, so they can focus on the yeses in the marketplace.

#### Disclaimer: This is a demo/pilot application and does not use real world real estate agent data, MLS data, and/or state licensing data. Transactions and Volume numbers will not always equate to real world numbers.

## Quick App Demo

![Imgur](https://i.imgur.com/2rvePvS.gif)

## Technology

#### Back End

* Node and Express
  * RESTful Api
* Testing
  * Supertest (integration)
  * Mocha and Chai (unit)
* Database
  * Postgres
  * Knex.js - SQL wrapper

#### Production

* Deployed via Heroku

## Set up

Major dependencies for this repo include Postgres and Node.

To get setup locally, do the following:

1. Clone this repository to your machine, `cd` into the directory and run `npm install`

2. Create the dev and test databases: `createdb -U postgres -d 247recruit` and `createdb -U postgres -d 247recruit-test`

3. Generate an API Token here: [https://www.uuidgenerator.net/version4](https://www.uuidgenerator.net/version4)

4. Create a `.env` file in the project root

Inside these files you'll need the following:

````
NODE_ENV=development
PORT=8000

DATABASE_URL="postgresql://postgres@localhost/247recruit"
TEST_DATABASE_URL="postgresql://postgres@localhost/247recruit-test"
API_TOKEN="INSERT GENERATED API TOKEN"
````

5. Run the migrations for dev - `npm run migrate`
6. Run the migrations for test - `NODE_ENV=test npm run migrate`
7. Seed the database for dev

* `psql -U <db-user> -d 247recruit -f ./seeds/seed.247recruit.sql`

Now, run this same command again for the test database as well.

7. Run the tests - `npm t`
8. Start the app - `npm run dev`