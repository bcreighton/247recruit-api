const knex = require('knex');
const app = require('./app');
const { PORT, DB_URL } = require('./config');
const AgentService = require('./services/agent-service');


const db = knex({
  client: 'pg',
  connection: DB_URL,
});

console.log(AgentService.getAgents());

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});