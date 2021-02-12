module.exports = {
    testAgents: [
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
            password: "abc123",
            first_name: "Sean",
            last_name: "Rogan",
            email: "srogan0@springer.com",
            phone: "927-708-1215",
            brokerage: 1
        }, 
        {
            id: 2,
            username: "glashford1",
            password: "abc123",
            first_name: "Graig",
            last_name: "Lashford",
            email: "glashford1@mapy.cz",
            phone: "718-167-1942",
            brokerage: 2
        }, 
        {
            id: 3,
            username: "mdemaid2",
            password: "abc123",
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
            title: "enim blandit mi in",
            content: "Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.",
            username_id: 1,
            agent_id: 2
        }, 
        {
            id: 2,
            title: "adipiscing elit",
            content: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
            username_id: 2,
            agent_id: 2
        }, 
        {
            id: 3,
            title: "ornare consequat",
            content: "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
            username_id: 2,
            agent_id: 2
        }, 
        {
            id: 4,
            title: "turpis enim",
            content: "Vestibulum sed magna at nunc commodo placerat.",
            username_id: 3,
            agent_id: 3
        }, 
        {
            id: 5,
            title: "fusce consequat nulla",
            content: "Aenean fermentum.",
            username_id: 1,
            agent_id: 1
        }, 
        {
            id: 6,
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
};