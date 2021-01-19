const NoteService = {
    getNotes(knex) {
        return knex.select('*').from('notes')
    }
};

module.exports = NoteService;