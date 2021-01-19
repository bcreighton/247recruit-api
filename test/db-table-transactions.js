const dbTableTransactions = {
    cleanDB(db) {
        return db('notes').truncate()
        .then(() => db('followed_agents').truncate())
            // Remove all foreign key constraints to allow for removal of all data in the db tables
            // Knex provides issues with the naming convention of foreign keys.
            // psql creation uses 'fkey', Knex creation uses 'foreign'
            // This creates an issue when the database has to be rebuilt
            // Can be avoided by useing Knex migration and db creation.
            // Standard SQL will recreate this issue
        .then(() => db.raw('ALTER TABLE notes DROP CONSTRAINT notes_agent_id_foreign'))
        .then(() => db.raw('ALTER TABLE notes DROP CONSTRAINT notes_username_id_foreign'))
        .then(() => db.raw('ALTER TABLE followed_agents DROP CONSTRAINT followed_agents_agent_id_foreign'))
        .then(() => db.raw('ALTER TABLE followed_agents DROP CONSTRAINT followed_agents_username_id_foreign'))
        .then(() => db.raw('ALTER TABLE users DROP CONSTRAINT users_brokerage_foreign'))
        .then(() => db.raw('ALTER TABLE brokerages DROP CONSTRAINT brokerages_broker_id_foreign'))
        .then(() => db.raw('ALTER TABLE agents DROP CONSTRAINT agents_brokerage_foreign'))
            // Clear data from tables following foreign key constraint removal
        .then(() => db('users').truncate())
        .then(() => db('brokerages').truncate())
        .then(() => db('agents').truncate())
            // Re-establish foreign key relationships that were removed above.
        .then(() => {
            return db.schema.table('agents', table => {
                table.foreign('brokerage')
                    .references('brokerages.id');
            })
        })
        .then(() => {
            return db.schema.table('brokerages', table => {
                table.foreign('broker_id')
                    .references('agents.id');
            })
        })
        .then(() => {
            return db.schema.table('users', table => {
                table.foreign('brokerage')
                    .references('brokerages.id');
            })
        })
        .then(() => {
            return db.schema.table('followed_agents', table => {
                table.foreign('username_id')
                    .references('users.id');
                table.foreign('agent_id')
                    .references('agents.id');
            })
        })
        .then(() => {
            return db.schema.table('notes', table => {
                table.foreign('username_id')
                    .references('users.id');
                table.foreign('agent_id')
                    .references('agents.id');
            })
        })
    }
}

module.exports = dbTableTransactions;