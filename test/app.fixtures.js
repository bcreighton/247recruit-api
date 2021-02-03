module.exports = {
    testAgents: [
        {
            id: 1,
            agent_name: "Shanan",
            license_num: 270801,
            email: "sstamp0@cnet.com",
            phone: "488-624-5979",
            license_exp: '2023-07-04T06:00:00.000Z',
            sponsor_date: '2000-07-28T06:00:00.000Z',
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
            license_exp: '2024-01-14T07:00:00.000Z',
            sponsor_date: '2003-07-04T06:00:00.000Z',
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
            license_exp: '2022-11-19T07:00:00.000Z',
            sponsor_date: '1995-06-23T06:00:00.000Z',
            list_units: 851,
            list_vol: "592284960.81",
            sell_units: 263,
            sell_vol: "4527359.33",
            tot_units: 2498,
            tot_vol: "936798597.33"
        }
    ],

    testBrokerages: [
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
    ],

    testUsers: [
        {
            id: 1,
            username: "srogan0",
            first_name: "Sean",
            last_name: "Rogan",
            email: "srogan0@springer.com",
            phone: "927-708-1215",
            brokerage: 1
        }, 
        {
            id: 2,
            username: "glashford1",
            first_name: "Graig",
            last_name: "Lashford",
            email: "glashford1@mapy.cz",
            phone: "718-167-1942",
            brokerage: 2
        }, 
        {
            id: 3,
            username: "mdemaid2",
            first_name: "Man",
            last_name: "Demaid",
            email: "mdemaid2@icq.com",
            phone: "831-747-7875",
            brokerage: 3
        }
    ],

    testNotes: [
        {
            id: 1,
            timestamp: '2016-01-03T06:43:46.000Z',
            title: "enim blandit mi in",
            content: "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.",
            username_id: 1,
            agent_id: 2
        }, 
        {
            id: 2,
            timestamp: '2016-12-31T20:00:10.000Z',
            title: "adipiscing elit",
            content: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
            username_id: 2,
            agent_id: 2
        }, 
        {
            id: 3,
            timestamp: '2017-10-25T13:07:42.000Z',
            title: "ornare consequat",
            content: "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
            username_id: 2,
            agent_id: 2
        }, 
        {
            id: 4,
            timestamp: '2018-02-24T11:44:53.000Z',
            title: "turpis enim",
            content: "Vestibulum sed magna at nunc commodo placerat.",
            username_id: 3,
            agent_id: 3
        }, 
        {
            id: 5,
            timestamp: '2020-05-25T21:10:02.000Z',
            title: "fusce consequat nulla",
            content: "Aenean fermentum.",
            username_id: 1,
            agent_id: 1
        }, 
        {
            id: 6,
            timestamp: '2017-08-24T12:06:56.000Z',
            title: "in faucibus orci",
            content: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
            username_id: 2,
            agent_id: 1
        }
    ],

    testFollowedAgents: [
        {
            agent_id: 3,
            username_id: 3
        }, 
        {
            agent_id: 3,
            username_id: 2
        }, 
        {
            agent_id: 2,
            username_id: 3
        }, 
        {
            agent_id: 1,
            username_id: 1
        }
    ],

    maliciousData: {
        agent: {
            id: 911,
            agent_name: 'Naughty Naughty <script>alert("xss");</script>',
            license_num: 270801,
            email: "sstamp0@cnet.com",
            phone: "488-624-5979",
            license_exp: '2023-07-04T06:00:00.000Z',
            sponsor_date: '2000-07-28T06:00:00.000Z',
            list_units: 345,
            list_vol: "441895217.34",
            sell_units: 51,
            sell_vol: "45341408.10",
            tot_units: 2451,
            tot_vol: "58228599.22"
        },
        user: {
            id: 911,
            username: 'Naughty Naughty <script>alert("xss");</script>',
            first_name: "Sean",
            last_name: "Rogan",
            email: "srogan0@springer.com",
            phone: "927-708-1215",
            brokerage: 1
        },
        brokerage: {
            id: 911,
            brokerage_name: 'Naughty Naughty <script>alert("xss");</script>',
            broker_id: 1,
            street: 'Naughty Naughty <script>alert("xss");</script>',
            city: 'Naughty Naughty <script>alert("xss");</script>',
            st: "TX"
        },
        note: {
            id:911,
            timestamp: '2016-01-03T06:43:46.000Z',
            title: 'Naughty Naughty <script>alert("xss");</script>',
            content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
            username_id: 3,
            agent_id: 2
        },
    }
};