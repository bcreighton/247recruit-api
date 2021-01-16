ALTER TABLE agents
    ADD COLUMN brokerage INTEGER REFERENCES brokerages(id);