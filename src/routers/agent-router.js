const express = require('express');

const agentRouter = express.Router();

const tempAgents = [
    {
        "id":"ff6da226-530c-11eb-ae93-0242ac130002",
        "name":"Karen Chappell [SALE] ",
        "officeName":"Camillo Properties",
        "licenseDate":"2/27/2013",
        "licenseExp":"2/28/2021",
        "phone":"713-539-3790",
        "listingSideUnits":"1514",
        "listingSideVolume":"$2,390,120",
        "sellingSideUnits":"0",
        "sellingSideVolume":"$0",
        "transSideUnits":"1514",
        "transSideVolume":"$2,390,120"
    },
    {
        "id":"0795e77e-530d-11eb-ae93-0242ac130002",
        "name":"Richard Hale [BRK] ",
        "officeName":"Perry Development Management",
        "licenseDate":"6/16/1988",
        "licenseExp":"8/31/2021",
        "phone":"&nbsp;",
        "listingSideUnits":"1473",
        "listingSideVolume":"$577,086,069",
        "sellingSideUnits":"105",
        "sellingSideVolume":"$39,703,930",
        "transSideUnits":"1578",
        "transSideVolume":"$616,789,999"
    },
    {
        "id":"a91f7ed4-530d-11eb-ae93-0242ac130002",
        "name":"Lance Loken [SALE] ",
        "officeName":"Keller Williams Platinum",
        "licenseDate":"9/17/2010",
        "licenseExp":"9/30/2021",
        "phone":"&nbsp;",
        "listingSideUnits":"1189",
        "listingSideVolume":"$303,238,683",
        "sellingSideUnits":"212",
        "sellingSideVolume":"$59,241,233",
        "transSideUnits":"1401",
        "transSideVolume":"$362,479,916"
    },
    {
        "id":"d2e7bda6-b543-40f9-8982-acd1fdb9b712",
        "name":"Jack Lipar [SALE] ",
        "officeName":"LGI Homes",
        "licenseDate":"11/13/2008",
        "licenseExp":"11/30/2020",
        "phone":"281-923-5166",
        "listingSideUnits":"902",
        "listingSideVolume":"$204,499,410",
        "sellingSideUnits":"0",
        "sellingSideVolume":"$0",
        "transSideUnits":"902",
        "transSideVolume":"$204,499,410"
    },
    {
        "id":"d2e7bda6-b543-40f9-8982-acd1fdb9b712",
        "name":"Michael Dickerson [SALE] ",
        "officeName":"Progress Residential Property",
        "licenseDate":"5/6/2009",
        "licenseExp":"5/31/2021",
        "phone":"800-218-4796",
        "listingSideUnits":"758",
        "listingSideVolume":"$1,256,607",
        "sellingSideUnits":"555",
        "sellingSideVolume":"$921,376",
        "transSideUnits":"1313",
        "transSideVolume":"$2,177,983"
    },
    {
        "id":"d2e7bda6-b543-40f9-8982-acd1fdb9b712",
        "name":"Jared Turner [SALE] ",
        "officeName":"Turner Mangum,LLC",
        "licenseDate":"3/5/2013",
        "licenseExp":"3/31/2021",
        "phone":"832-421-0077",
        "listingSideUnits":"729",
        "listingSideVolume":"$208,841,312",
        "sellingSideUnits":"136",
        "sellingSideVolume":"$37,831,956",
        "transSideUnits":"865",
        "transSideVolume":"$246,673,268"
    },
]

agentRouter
    .route('/api/agent')
    .get((req, res) => res.status(200).json(tempAgents));

agentRouter
    .route('/api/agent/:id')
    .get((req, res) => {
        const { id } = req.params;
        const agent = tempAgents.find(a => a.id == id);

        if (!agent) res.status(400).send('Agent not found');

        res.status(200).json(agent);
    });

module.exports = agentRouter;