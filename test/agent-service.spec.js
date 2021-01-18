const { expect } = require("chai");
const AgentService = require('../src/services/agent-service');
const knex = require('knex');

describe(`Agent service object`, () => {
    let db;
    let testAgents = [
        {
            id: 1,
            agent_name: "Shanan",
            license_num: 270801,
            email: "sstamp0@cnet.com",
            phone: "488-624-5979",
            license_exp: new Date('2023-07-04T06:00:00.000Z'),
            sponsor_date: new Date('2000-07-28T06:00:00.000Z'),
            list_units: 345,
            list_vol: "441895217.34",
            sell_units: 51,
            sell_vol: "45341408.10",
            tot_units: 2451,
            tot_vol: "58228599.22"
        }, 
        {
            id: 2,
            agent_name: "Christos",
            license_num: 616536,
            email: "cskpsey1@pagesperso-orange.fr",
            phone: "768-598-7152",
            license_exp: new Date('2024-01-14T07:00:00.000Z'),
            sponsor_date: new Date('2003-07-04T06:00:00.000Z'),
            list_units: 821,
            list_vol: "735329708.76",
            sell_units: 730,
            sell_vol: "40311014.10",
            tot_units: 579,
            tot_vol: "992058872.95"
        },
        {
            id: 3,
            agent_name: "Penni",
            license_num: 977485,
            email: "ptregido2@globo.com",
            phone: "106-173-0218",
            license_exp: new Date('2022-11-19T07:00:00.000Z'),
            sponsor_date: new Date('1995-06-23T06:00:00.000Z'),
            list_units: 851,
            list_vol: "592284960.81",
            sell_units: 263,
            sell_vol: "4527359.33",
            tot_units: 2498,
            tot_vol: "936798597.33"
        }
    ]

    let testBrokerages = [
        {
            id: 1,
            brokerage_name: "Durgan-Rippin",
            broker_id: 1,
            street: "8 Magdeline Center",
            city: "El Paso",
            st: "TX"
        },
        {
            id: 2,
            brokerage_name: "Mante-Dickinson",
            broker_id: 3,
            street: "7644 Arkansas Road",
            city: "Fort Worth",
            st: "TX"
        },
        {
            id: 3,
            brokerage_name: "Nolan, Parisian and McDermott",
            broker_id: 2,
            street: "12 Autumn Leaf Center",
            city: "Amarillo",
            st: "TX"
        }
    ]

    // Establish db connection

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        });
    });

    // Clear all data from the db tables

    before(() => db('notes').truncate());
    before(() => db('followed_agents').truncate());

    // Remove all foreign key constraints to allow for removal of all data in the db tables
    // Knex provides issues with the naming convention of foreign keys.
    // psql creation uses 'fkey', Knex creation uses 'foreign'
    // This creates an issue when the database has to be rebuilt
    // Can be avoided by useing Knex migration and db creation.
    // Standard SQL will recreate this issue
    before(() => db.raw(
        'ALTER TABLE notes DROP CONSTRAINT notes_agent_id_foreign'
    ));
    before(() => db.raw(
        'ALTER TABLE notes DROP CONSTRAINT notes_username_id_foreign'
    ));
    before(() => db.raw(
        'ALTER TABLE followed_agents DROP CONSTRAINT followed_agents_agent_id_foreign'
    ));
    before(() => db.raw(
        'ALTER TABLE followed_agents DROP CONSTRAINT followed_agents_username_id_foreign'
    ));
    before(() => db.raw(
        'ALTER TABLE users DROP CONSTRAINT users_brokerage_foreign'
    ));
    before(() => db.raw(
        'ALTER TABLE brokerages DROP CONSTRAINT brokerages_broker_id_foreign'
    ));
    before(() => db.raw(
        'ALTER TABLE agents DROP CONSTRAINT agents_brokerage_foreign'
    ));

    // Clear data from tables following foreign key constraint removal
    before(() => db('users').truncate());
    before(() => db('brokerages').truncate());
    before(() => db('agents').truncate());

    // Re-establish foreign key relationships that were removed above.
    before(() => {
        return db.schema.table('agents', table => {
            table.foreign('brokerage')
                .references('brokerages.id');
        })
    })

    before(() => {
        return db.schema.table('brokerages', table => {
            table.foreign('broker_id')
                .references('agents.id');
        })
    })

    before(() => {
        return db.schema.table('users', table => {
            table.foreign('brokerage')
                .references('brokerages.id');
        })
    })

    before(() => {
        return db.schema.table('followed_agents', table => {
            table.foreign('username_id')
                .references('users.id');
            table.foreign('agent_id')
                .references('agents.id');
        })
    })

    before(() => {
        return db.schema.table('notes', table => {
            table.foreign('username_id')
                .references('users.id');
            table.foreign('agent_id')
                .references('agents.id');
        })
    })

    // insert test data into the appropriate
    before(() => {
        return (
            db
            .into('agents')
            .insert(testAgents)
            .then(() => {
                return db.into('brokerages')
                .insert(testBrokerages)
            })
        )
    });

    before(() => {
        return db('agents')
            .where('id', '=', 1)
            .update('brokerage', 1)
            .then(() => {
                return db('agents')
                    .where('id', '=', 2)
                    .update('brokerage', 2)
            })
            .then(() => {
                return db('agents')
                    .where('id', '=', 3)
                    .update('brokerage', 3)
            });
    });
    
    after(() => db.destroy());

    describe(`getAgents()`, () => {
        it(`resolves all agents from 'agents' table`, () => {
            updatedTestAgents = testAgents.map((a, n = 1) => {
                let kv = {brokerage: parseInt(`${n+1}`)};
                let obj = {...a, ...kv};
                return obj;
            }) 
            debugger;
            return AgentService.getAgents(db)
                .then(actual => {
                    expect(actual).to.eql(updatedTestAgents.map(a => ({
                        ...a,
                        license_exp: new Date(a.license_exp),
                        sponsor_date: new Date(a.sponsor_date)
                    })));
                });
        });
    });
});