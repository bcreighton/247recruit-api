CREATE TABLE followed_agents (
    agent_id INTEGER REFERENCES agents(id),
    username_id INTEGER REFERENCES users(id),
    PRIMARY KEY (agent_id, username_id)
);