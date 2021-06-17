-- TRUNCATE all table to ensure there is no data prior to seeding
TRUNCATE notes, followed_agents, users, brokerages, agents RESTART IDENTITY CASCADE;

-- insert all data into tables
-- insert agents
INSERT INTO agents
    (name, license_num, email, phone, license_exp, sponsor_date, list_units, list_vol, sell_units, sell_vol, tot_units, tot_vol)
    VALUES 
        ('Brewer Pech', 898367, 'bpech0@uol.com.br', '336-647-2318', '1/18/2021', '6/11/2003', 678, '455038262.91', 761, '34523699.77', 230, '68987221.18'),
        ('Rossie Veysey', 792265, 'rveysey1@moonfruit.com', '638-879-3302', '8/8/2021', '7/16/2006', 400, '324688746.79', 85, '37858152.60', 2211, '555562123.84'),
        ('Terza Reschke', 806638, 'tres@al.com', '638-879-3343', '2/26/2024', '1/29/2020', 920, '363739951.80', 54, '475705.36', 2074, '242774226.86'),
        ('Waly Rechke', 234897, 'waly@engadget.com', '481-975-9500', '8/24/2021', '10/29/2009', 1092, '593432876.40', 521, '23392311.10', 348, '261348024.14'),
        ('Damarisnachowski', 633197, 'wrenachowski4@youtube.com', '416-470-5376', '1/15/2025', '7/31/2003', 777, '24722566.49', 864, '8769565.70', 731, '788906837.41'),
        ('Elwira Joscelyn', 633607, 'ejoscelyn5@zdnet.com', '334-727-6965', '2/13/2023', '8/1/2014', 1025, '108924778.17', 498, '3016342.19', 1394, '31458118.71'),
        ('Itch Tubridy', 552674, 'itubridy6@nyu.edu', '151-935-4300', '12/13/2022', '12/11/2014', 487, '492768671.52', 964, '22470947.56', 1355, '259872299.84'),
        ('Herrick Helian', 148297, 'hhelian7@sciencedaily.com', '718-629-5528', '3/2/2024', '3/21/2019', 126, '191127090.61', 460, '22662976.37', 589, '358244812.05'),
        ('Sidnee Joye', 485234, 'sjoye8@samsung.com', '900-678-2638', '4/12/2025', '3/11/1996', 982, '131076033.15', 326, '18015144.98', 552, '495814789.66'),
        ('Lynnea Willgoss', 894407, 'lwillgoss9@eepurl.com', '797-367-3269', '2/12/2023', '10/15/2015', 1027, '551077473.75', 274, '34048156.03', 845, '650649484.96'),
        ('Ellene Pash', 723108, 'epasha@hatena.ne.jp', '608-623-4093', '3/9/2023', '6/27/2011', 1284, '210242017.38', 86, '35034519.26', 1626, '272793069.58'),
        ('Shepherd Hackworth', 310841, 'shackworthb@nih.gov', '752-606-0781', '6/22/2023', '2/20/2012', 737, '390132331.40', 222, '32077055.47', 1877, '534543961.30'),
        ('Marlane Trevaskus', 861167, 'mtrevaskusc@sciencedirect.com', '771-941-6159', '10/25/2024', '4/4/1997', 439, '555205094.84', 994, '41281983.89', 981, '880874889.39'),
        ('Veronica Colten', 118118, 'vcoltend@t.co', '930-650-0114', '7/13/2023', '3/29/2003', 903, '235965627.70', 699, '6027919.93', 2155, '124215743.67'),
        ('Blanca Klasen', 392389, 'bklasene@tmall.com', '585-779-3232', '4/18/2023', '3/15/2018', 580, '767722154.35', 282, '41387827.60', 1063, '101539426.19'),
        ('Alissa Purser', 334857, 'apurserf@omniture.com', '994-342-7292', '2/20/2022', '9/9/2006', 1168, '872748917.61', 895, '23191824.73', 1027, '858346502.23'),
        ('Yuma Roskeilly', 299222, 'yroskeillyg@ted.com', '953-766-1919', '10/19/2023', '3/11/2020', 1351, '832826636.02', 974, '47602245.85', 2415, '452296987.89'),
        ('Danit Huison', 385631, 'dhuisonh@reddit.com', '219-459-8290', '5/1/2021', '8/8/2018', 172, '822499131.58', 55, '40173181.31', 2382, '793416454.53'),
        ('Reeva Duffill', 351645, 'rduffilli@arstechnica.com', '393-448-8385', '3/4/2023', '10/20/2012', 71, '629395802.89', 111, '3430925.91', 1516, '143193115.48'),
        ('Dannye Barkway', 841338, 'dbarkwayj@ezinearticles.com', '479-661-3498', '12/13/2025', '10/30/2011', 1489, '753438453.19', 34, '28167382.60', 10, '393768981.84'),
        ('Dona Hallatt', 708804, 'dhallattk@sciencedaily.com', '295-899-8728', '10/11/2021', '7/13/2010', 423, '934592830.40', 534, '24865807.02', 1767, '394360074.37'),
        ('Grannie Caruth', 459375, 'gcaruthl@senate.gov', '119-800-6894', '11/8/2023', '8/13/1996', 630, '279236549.50', 70, '46396684.65', 413, '360718153.93'),
        ('Ariadne Indruch', 843975, 'aindruchm@yahoo.com', '707-474-5207', '9/11/2021', '3/3/1995', 407, '777590126.24', 796, '39278966.66', 115, '649268029.28'),
        ('Duane McGraw', 770844, 'dmcgrawn@army.mil', '821-587-4575', '10/4/2021', '3/27/1998', 155, '456847576.14', 764, '39478374.73', 1008, '832219746.24'),
        ('Prentice Dilon', 347892, 'pdilono@guardian.co.uk', '836-777-9737', '2/3/2023', '11/28/2002', 584, '508131259.97', 330, '10422679.24', 1773, '336155689.66'),
        ('Othilia Snodin', 320461, 'osnodinp@nih.gov', '172-773-9331', '6/3/2024', '7/25/2000', 222, '646054695.29', 140, '28168924.19', 1737, '121627976.74'),
        ('Grier Phillot', 444063, 'gphillotq@joomla.org', '592-716-1993', '2/20/2024', '9/3/2011', 355, '4805775.95', 998, '8961956.57', 2217, '966074077.95'),
        ('Godiva Jagiela', 553215, 'gjagielar@rambler.ru', '278-116-9502', '8/29/2022', '7/20/2012', 1454, '700867798.28', 821, '25638975.35', 932, '405232764.44'),
        ('Chev Adamczyk', 854793, 'cadamczyks@bandcamp.com', '297-701-4507', '7/11/2023', '11/3/2007', 675, '407290446.93', 332, '35042295.60', 1379, '674023188.65'),
        ('Kiersten McPartlin', 397232, 'kmcpartlint@icq.com', '924-125-8564', '7/31/2024', '9/11/1999', 1010, '424928452.31', 663, '29604985.21', 706, '403553933.10'),
        ('Kyla Bearn', 601315, 'kbearnu@yellowbook.com', '839-935-2789', '4/23/2024', '11/17/2001', 111, '351292535.74', 514, '41119117.60', 988, '251223663.49'),
        ('Bobbee Rodrigo', 747400, 'brodrigov@nymag.com', '105-519-9034', '4/22/2023', '7/16/2016', 1190, '671935022.57', 739, '40512773.21', 231, '693631925.45'),
        ('Marquita Torel', 743788, 'mtorelw@tinyurl.com', '898-413-9499', '6/28/2024', '1/12/1997', 1468, '777060600.77', 705, '49840111.15', 279, '494877528.90'),
        ('Jamison Rowland', 464562, 'jrowlandx@ucsd.edu', '149-134-0093', '8/16/2025', '4/10/2011', 331, '498096799.85', 477, '23228171.49', 1660, '205098145.78'),
        ('Karoly Insko', 858883, 'kinskoy@techcrunch.com', '236-838-4868', '12/8/2023', '9/10/2009', 521, '283844082.35', 563, '49099016.68', 2008, '659513063.03'),
        ('Kelbee Suddards', 407739, 'ksuddardsz@bloglovin.com', '665-488-4283', '11/3/2021', '4/8/1997', 867, '119313056.33', 556, '15239389.61', 1000, '753290089.01'),
        ('Tabitha Freen', 875920, 'tfreen10@devhub.com', '287-346-7036', '5/4/2024', '4/22/1996', 20, '912697995.69', 526, '23881020.82', 2172, '138835230.80'),
        ('Rodney Mateo', 127998, 'rmateo11@chronoengine.com', '722-806-0882', '12/6/2024', '4/27/1995', 1144, '925151657.65', 688, '21486252.57', 1928, '6846603.86'),
        ('Nolan Laxtonne', 539794, 'nlaxtonne12@live.com', '923-844-1391', '11/19/2024', '9/3/2020', 599, '185709957.54', 393, '771218.98', 67, '472174395.43'),
        ('Brett Gronou', 190071, 'bgronou13@wunderground.com', '239-980-3984', '3/12/2025', '11/17/2009', 38, '481254063.91', 887, '16026041.92', 543, '912702142.30'),
        ('Madlin Farren', 732025, 'mfarren14@cbslocal.com', '403-952-4539', '5/21/2024', '8/5/1998', 822, '998237289.57', 521, '15438849.69', 1608, '426655551.34'),
        ('Cordie Errichiello', 377111, 'cerrichiello15@hao123.com', '177-603-8445', '7/28/2024', '10/26/2002', 1228, '415791502.82', 303, '34300444.47', 454, '469508483.74'),
        ('Windham Back', 894559, 'wback16@nba.com', '794-693-9895', '12/11/2021', '1/6/2012', 681, '672881043.86', 226, '44790321.31', 1812, '68312570.49'),
        ('Sinclare Langlois', 489641, 'slanglois17@fda.gov', '716-881-7338', '3/6/2021', '1/15/2020', 1359, '160326524.79', 514, '34872454.90', 513, '112133447.93'),
        ('Norbert Stendall', 261146, 'nstendall18@intel.com', '683-625-3826', '6/2/2021', '5/8/1998', 1344, '957089715.86', 483, '23986566.24', 428, '11785522.53'),
        ('Rhoda Kalinke', 887796, 'rkalinke19@ed.gov', '673-303-5197', '5/3/2025', '10/10/2006', 810, '721068497.59', 380, '45881786.49', 111, '807475647.17'),
        ('Johnathon Giamitti', 557822, 'jgiamitti1a@nytimes.com', '190-790-6706', '8/9/2021', '11/21/2009', 1149, '542341959.66', 403, '6439020.08', 262, '890281653.09'),
        ('Abrahan Jobke', 967589, 'ajobke1b@house.gov', '713-187-5950', '6/10/2025', '12/12/2009', 468, '165822774.34', 916, '42680637.79', 149, '536266966.34'),
        ('Faulkner Dalgetty', 820312, 'fdalgetty1c@nba.com', '923-772-1775', '1/25/2022', '10/4/2020', 575, '150506669.41', 966, '25377751.45', 2244, '315665400.06'),
        ('Carmelina Gookey', 435113, 'cgookey1d@weather.com', '698-102-8315', '8/1/2022', '11/8/2009', 642, '703739798.44', 986, '34873156.57', 847, '96455008.32');


-- insert brokerages
INSERT INTO brokerages
    (brokerage_name, broker_id, street, city, st)
    VALUES
        ('Cormier LLC', 37, '3673 Nova Road', 'Corpus Christi', 'TX'),
        ('Leffler Inc', 22, '77205 Forest Dale Trail', 'Houston', 'TX'),
        ('McLaughlin, Willms and Mitchell', 8, '3181 Burning Wood Place', 'Austin', 'TX'),
        ('Yundt, Hansen and Rau', 15, '70 Bunting Park', 'Houston', 'TX'),
        ('Lockman, Greenfelder and Marquardt', 7, '50 Declaration Lane', 'Houston', 'TX'),
        ('Dickinson-Leffler', 21, '5837 Grayhawk Place', 'El Paso', 'TX'),
        ('Olson Group', 32, '59893 Lunder Way', 'San Antonio', 'TX'),
        ('Spinka, Effertz and Muller', 16, '01503 Ilene Plaza', 'El Paso', 'TX'),
        ('Lebsack Inc', 22, '6 Sutteridge Court', 'Houston', 'TX'),
        ('Stehr-Powlowski', 15, '31 Crownhardt Trail', 'Humble', 'TX'),
        ('Schuster-Ondricka', 23, '63713 Mallard Street', 'El Paso', 'TX'),
        ('Schaden, Goldner and Berge', 50, '66 Roxbury Drive', 'San Antonio', 'TX'),
        ('Toy Group', 7, '568 Mallory Center', 'San Antonio', 'TX'),
        ('Morar, Harber and Balistreri', 35, '0 Towne Drive', 'Garland', 'TX'),
        ('Kreiger, Kuhic and Walker', 12, '258 Ohio Parkway', 'El Paso', 'TX');

-- Add brokerages to the agents
UPDATE agents SET brokerage = 9 WHERE id = 1;
UPDATE agents SET brokerage = 1 WHERE id = 2;
UPDATE agents SET brokerage = 2 WHERE id = 3;
UPDATE agents SET brokerage = 1 WHERE id = 4;
UPDATE agents SET brokerage = 7 WHERE id = 5;
UPDATE agents SET brokerage = 5 WHERE id = 6;
UPDATE agents SET brokerage = 1 WHERE id = 7;
UPDATE agents SET brokerage = 5 WHERE id = 8;
UPDATE agents SET brokerage = 7 WHERE id = 9;
UPDATE agents SET brokerage = 8 WHERE id = 10;
UPDATE agents SET brokerage = 5 WHERE id = 11;
UPDATE agents SET brokerage = 9 WHERE id = 12;
UPDATE agents SET brokerage = 7 WHERE id = 13;
UPDATE agents SET brokerage = 9 WHERE id = 14;
UPDATE agents SET brokerage = 7 WHERE id = 15;
UPDATE agents SET brokerage = 3 WHERE id = 16;
UPDATE agents SET brokerage = 1 WHERE id = 17;
UPDATE agents SET brokerage = 7 WHERE id = 18;
UPDATE agents SET brokerage = 3 WHERE id = 19;
UPDATE agents SET brokerage = 2 WHERE id = 20;
UPDATE agents SET brokerage = 1 WHERE id = 21;
UPDATE agents SET brokerage = 10 WHERE id = 22;
UPDATE agents SET brokerage = 4 WHERE id = 23;
UPDATE agents SET brokerage = 2 WHERE id = 24;
UPDATE agents SET brokerage = 1 WHERE id = 25;
UPDATE agents SET brokerage = 4 WHERE id = 26;
UPDATE agents SET brokerage = 9 WHERE id = 27;
UPDATE agents SET brokerage = 2 WHERE id = 28;
UPDATE agents SET brokerage = 7 WHERE id = 29;
UPDATE agents SET brokerage = 10 WHERE id = 30;
UPDATE agents SET brokerage = 1 WHERE id = 31;
UPDATE agents SET brokerage = 3 WHERE id = 32;
UPDATE agents SET brokerage = 10 WHERE id = 33;
UPDATE agents SET brokerage = 6 WHERE id = 34;
UPDATE agents SET brokerage = 6 WHERE id = 35;
UPDATE agents SET brokerage = 2 WHERE id = 36;
UPDATE agents SET brokerage = 5 WHERE id = 37;
UPDATE agents SET brokerage = 4 WHERE id = 38;
UPDATE agents SET brokerage = 7 WHERE id = 39;
UPDATE agents SET brokerage = 6 WHERE id = 40;
UPDATE agents SET brokerage = 5 WHERE id = 41;
UPDATE agents SET brokerage = 10 WHERE id = 42;
UPDATE agents SET brokerage = 6 WHERE id = 43;
UPDATE agents SET brokerage = 10 WHERE id = 44;
UPDATE agents SET brokerage = 10 WHERE id = 45;
UPDATE agents SET brokerage = 10 WHERE id = 46;
UPDATE agents SET brokerage = 10 WHERE id = 47;
UPDATE agents SET brokerage = 6 WHERE id = 48;
UPDATE agents SET brokerage = 8 WHERE id = 49;
UPDATE agents SET brokerage = 4 WHERE id = 50;

--insert users
INSERT INTO users
    (username, password, first_name, last_name, email, phone, brokerage)
    VALUES
        ('akettow0', 'abc123', 'Anatole', 'Kettow', 'akettow0@usda.gov', '319-708-7342', 2),
        ('lbackhurst1', 'abc123', 'Liva', 'Backhurst', 'lbackhurst1@wiley.com', '129-926-4207', 8),
        ('pyakubovich2', 'abc123', 'Page', 'Yakubovich', 'pyakubovich2@ftc.gov', '304-655-0285', 9),
        ('njado3', 'Nata', 'abc123', 'Jado', 'njado3@bigcartel.com', '747-963-2290', 4),
        ('gbeavington4', 'abc123', 'Gretta', 'Beavington', 'gbeavington4@uiuc.edu', '225-577-0756', 8),
        ('xdumbrill5', 'abc123', 'Ximenes', 'Dumbrill', 'xdumbrill5@edublogs.org', '350-234-0107', 3),
        ('amoylane6', 'abc123', 'Arney', 'Moylane', 'amoylane6@jigsy.com', '797-863-1502', 9),
        ('kwitcombe7', 'abc123', 'Keen', 'Witcombe', 'kwitcombe7@booking.com', '901-657-3283', 5),
        ('fpiddock8', 'abc123', 'Floris', 'Piddock', 'fpiddock8@flickr.com', '248-647-6767', 2),
        ('ddemann9', 'abc123', 'Daphene', 'Demann', 'ddemann9@mashable.com', '214-643-4699', 7),
        ('csarginta', 'abc123', 'Clareta', 'Sargint', 'csarginta@liveinternet.ru', '490-610-2359', 2),
        ('wmarkovichb', 'abc123', 'Winny', 'Markovich', 'wmarkovichb@google.com.au', '131-398-9583', 2),
        ('bdohrc', 'abc123', 'Brandais', 'Dohr', 'bdohrc@bloglovin.com', '818-181-8967', 3),
        ('scasellad', 'abc123', 'Shaylah', 'Casella', 'scasellad@twitter.com', '186-393-9620', 2),
        ('tcuerdalle', 'abc123', 'Tonnie', 'Cuerdall', 'tcuerdalle@cnn.com', '525-994-2653', 10),
        ('lsandemanf', 'abc123', 'Leon', 'Sandeman', 'lsandemanf@dailymotion.com', '518-162-2488', 9),
        ('ncornierg', 'abc123', 'Nessi', 'Cornier', 'ncornierg@google.ca', '674-600-5169', 2),
        ('jbooih', 'abc123', 'Joby', 'Booi', 'jbooih@umn.edu', '527-608-7436', 7),
        ('mhilbournei', 'abc123', 'Missie', 'Hilbourne', 'mhilbournei@w3.org', '831-142-4806', 10),
        ('kbarkleyj', 'abc123', 'Kiel', 'Barkley', 'kbarkleyj@shinystat.com', '131-364-0037', 1),
        ('lfawdryk', 'abc123', 'Lemar', 'Fawdry', 'lfawdryk@ucoz.com', '574-110-3018', 6),
        ('cclineckl', 'abc123', 'Chryste', 'Clineck', 'cclineckl@sitemeter.com', '752-752-4998', 1),
        ('gbolamm', 'abc123', 'Genna', 'Bolam', 'gbolamm@oakley.com', '285-474-8501', 3),
        ('gheakeyn', 'abc123', 'Geno', 'Heakey', 'gheakeyn@bigcartel.com', '578-636-6705', 4),
        ('ginnotto', 'abc123', 'Gustaf', 'Innott', 'ginnotto@tripod.com', '971-230-7149', 2),
        ('bgribbinsp', 'abc123', 'Byrann', 'Gribbins', 'bgribbinsp@1und1.de', '723-143-2098', 4),
        ('svesqueq', 'abc123', 'Stinky', 'Vesque', 'svesqueq@loc.gov', '720-324-2799', 6),
        ('wfieldsendr', 'abc123', 'Wyndham', 'Fieldsend', 'wfieldsendr@bluehost.com', '748-577-6601', 4),
        ('tgrimes', 'abc123', 'Tobi', 'Grime', 'tgrimes@seesaa.net', '468-141-1721', 5),
        ('achrishopt', 'abc123', 'Allard', 'Chrishop', 'achrishopt@ehow.com', '353-890-2712', 5),
        ('fruddyu', 'abc123', 'Fiona', 'Ruddy', 'fruddyu@fc2.com', '282-829-9337', 7),
        ('cshopcottv', 'abc123', 'Cullin', 'Shopcott', 'cshopcottv@weather.com', '703-983-3799', 5),
        ('mroundw', 'abc123', 'Mickie', 'Round', 'mroundw@icio.us', '204-537-9811', 1),
        ('sbolstridgex', 'abc123', 'Sandra', 'Bolstridge', 'sbolstridgex@stanford.edu', '648-256-0419', 2),
        ('gjozsefy', 'abc123', 'Grete', 'Jozsef', 'gjozsefy@nih.gov', '363-923-8966', 6),
        ('cburrilz', 'abc123', 'Caresa', 'Burril', 'cburrilz@state.gov', '377-412-9060', 7),
        ('screbott10', 'abc123', 'Selie', 'Crebott', 'screbott10@dmoz.org', '960-992-4617', 6),
        ('mmorrison11', 'abc123', 'Margalo', 'Morrison', 'mmorrison11@printfriendly.com', '907-250-8379', 10),
        ('gshirlaw12', 'abc123', 'Gwenora', 'Shirlaw', 'gshirlaw12@sphinn.com', '632-670-6449', 8),
        ('espeake13', 'abc123', 'Edi', 'Speake', 'espeake13@wunderground.com', '583-847-5853', 9),
        ('pwadham14', 'abc123', 'Palmer', 'Wadham', 'pwadham14@tinyurl.com', '481-425-9796', 8),
        ('dtripon15', 'abc123', 'Dene', 'Tripon', 'dtripon15@jigsy.com', '371-595-6540', 3),
        ('grebeiro16', 'abc123', 'Greta', 'Rebeiro', 'grebeiro16@elpais.com', '843-953-2490', 2),
        ('hrubberts17', 'abc123', 'Hayes', 'Rubberts', 'hrubberts17@sogou.com', '832-588-6184', 8),
        ('ltraill18', 'abc123', 'Loise', 'Traill', 'ltraill18@pen.io', '330-730-5376', 9),
        ('hfane19', 'abc123', 'Harley', 'Fane', 'hfane19@homestead.com', '195-295-8555', 6),
        ('gvisco1a', 'abc123', 'Ginnie', 'Visco', 'gvisco1a@who.int', '742-726-5203', 7),
        ('glight1b', 'abc123', 'Gisella', 'Light', 'glight1b@vkontakte.ru', '965-705-6871', 10),
        ('chaseman1c', 'abc123', 'Cthrine', 'Haseman', 'chaseman1c@lulu.com', '141-636-7386', 8),
        ('scluff1d', 'abc123', 'Shayla', 'Cluff', 'scluff1d@topsy.com', '729-835-2845', 8),
        ('galeixo1e', 'abc123', 'Gnni', 'Aleixo', 'galeixo1e@loc.gov', '348-340-7519', 9),
        ('hgian1f', 'abc123', 'Haley', 'Gian', 'hgian1f@prlog.org', '872-855-7961', 1),
        ('speerless1g', 'abc123', 'Sapphira', 'Peerless', 'speerless1g@nps.gov', '171-419-7494', 6),
        ('cseleway1h', 'abc123', 'Carroll', 'Seleway', 'cseleway1h@mail.ru', '602-555-0110', 7),
        ('ajosipovic1i', 'abc123', 'Agneta', 'Josipovic', 'ajosipovic1i@altervista.org', '148-214-2801', 5),
        ('glangmuir1j', 'abc123', 'Georgena', 'Langmuir', 'glangmuir1j@umn.edu', '641-815-4083', 7),
        ('fbosward1k', 'abc123', 'Fredia', 'Bosward', 'fbosward1k@php.net', '835-539-7483', 9),
        ('lcook1l', 'abc123', 'Leonhard', 'Cook', 'lcook1l@salon.com', '267-522-8919', 4),
        ('acampana1m', 'abc123', 'Aguste', 'Campana', 'acampana1m@dedecms.com', '394-530-4780', 10),
        ('brobardey1n', 'abc123', 'Brynne', 'Robardey', 'brobardey1n@indiegogo.com', '363-178-9789', 3),
        ('tdarth1o', 'abc123', 'Torrey', 'Darth', 'tdarth1o@narod.ru', '940-673-8908', 7),
        ('nbucksey1p', 'abc123', 'Nicolas', 'Bucksey', 'nbucksey1p@free.fr', '930-634-5524', 4),
        ('ayegorchenkov1q', 'abc123', 'Agneta', 'Yegorchenkov', 'ayegorchenkov1q@wikia.com', '608-385-1491', 3),
        ('tstolberger1r', 'abc123', 'Tomasine', 'Stolberger', 'tstolberger1r@japanpost.jp', '920-712-9180', 2),
        ('bshirlaw1s', 'abc123', 'Brynna', 'Shirlaw', 'bshirlaw1s@etsy.com', '174-757-4889', 9),
        ('rnetting1t', 'abc123', 'Rozanna', 'Netting', 'rnetting1t@mail.ru', '744-620-8105', 1),
        ('tmoth1u', 'abc123', 'Tori', 'Moth', 'tmoth1u@un.org', '116-516-0547', 1),
        ('cwisdom1v', 'abc123', 'Cherise', 'Wisdom', 'cwisdom1v@cornell.edu', '854-332-7029', 6),
        ('mvanhalle1w', 'abc123', 'Mycah', 'Van Halle', 'mvanhalle1w@acquirethisname.com', '318-927-9282', 9),
        ('dblagdon1x', 'abc123', 'Diahann', 'Blagdon', 'dblagdon1x@phoca.cz', '925-751-7013', 10),
        ('rpothecary1y', 'abc123', 'Reed', 'Pothecary', 'rpothecary1y@ucsd.edu', '312-361-1867', 6),
        ('mpirt1z', 'abc123', 'Mitchel', 'Pirt', 'mpirt1z@ihg.com', '839-982-1237', 6),
        ('iruddy20', 'abc123', 'Ikey', 'Ruddy', 'iruddy20@weather.com', '607-434-2859', 10),
        ('stuftin21', 'abc123', 'Suzann', 'Tuftin', 'stuftin21@vistaprint.com', '630-956-8225', 1),
        ('galten22', 'abc123', 'Geordie', 'Alten', 'galten22@theglobeandmail.com', '524-831-1537', 8),
        ('qlarkins23', 'abc123', 'Quinlan', 'Larkins', 'qlarkins23@microsoft.com', '916-524-0789', 5),
        ('ckinningley24', 'abc123', 'Charlotte', 'Kinningley', 'ckinningley24@webeden.co.uk', '920-390-3680', 6),
        ('ssimeoli25', 'abc123', 'Symon', 'Simeoli', 'ssimeoli25@sogou.com', '217-837-2533', 3),
        ('jmedforth26', 'abc123', 'Jacquenetta', 'Medforth', 'jmedforth26@slideshare.net', '255-256-9082', 7),
        ('xboik27', 'abc123', 'Xymenes', 'Boik', 'xboik27@jiathis.com', '689-172-2856', 1),
        ('cofeeny28', 'abc123', 'Cazzie', 'O''Feeny', 'cofeeny28@vistaprint.com', '518-718-6446', 3),
        ('kmcilmorow29', 'abc123', 'Kris', 'McIlmorow', 'kmcilmorow29@go.com', '733-240-2157', 3),
        ('jmcentee2a', 'abc123', 'Joelie', 'McEntee', 'jmcentee2a@epa.gov', '895-282-3580', 4),
        ('ndivill2b', 'abc123', 'Nell', 'Divill', 'ndivill2b@drupal.org', '581-413-5243', 8),
        ('lcurrell2c', 'abc123', 'Latisha', 'Currell', 'lcurrell2c@time.com', '233-663-3772', 4),
        ('rprest2d', 'abc123', 'Renate', 'Prest', 'rprest2d@home.pl', '273-870-4268', 1),
        ('jmaccague2e', 'abc123', 'Janos', 'MacCague', 'jmaccague2e@guardian.co.uk', '588-632-4258', 4),
        ('ygeorghiou2f', 'abc123', 'Ysabel', 'Georghiou', 'ygeorghiou2f@e-recht24.de', '149-484-0221', 4),
        ('mdykes2g', 'abc123', 'Marty', 'Dykes', 'mdykes2g@clickbank.net', '321-623-7089', 10),
        ('teyre2h', 'abc123', 'Trudy', 'Eyre', 'teyre2h@amazon.co.uk', '365-608-9284', 8),
        ('gsarll2i', 'abc123', 'Gwenora', 'Sarll', 'gsarll2i@sun.com', '110-578-8997', 2),
        ('jgewer2j', 'abc123', 'Jacenta', 'Gewer', 'jgewer2j@psu.edu', '633-491-9792', 8),
        ('glethlay2k', 'abc123', 'Giordano', 'Lethlay', 'glethlay2k@princeton.edu', '801-691-2063', 10),
        ('vcumbridge2l', 'abc123', 'Vivianna', 'Cumbridge', 'vcumbridge2l@eventbrite.com', '951-719-7757', 9),
        ('spilfold2m', 'abc123', 'Shae', 'Pilfold', 'spilfold2m@google.fr', '621-341-4417', 5),
        ('esteers2n', 'abc123', 'Erinna', 'Steers', 'esteers2n@irs.gov', '986-789-1532', 10),
        ('gpickthorn2o', 'abc123', 'Georgi', 'Pickthorn', 'gpickthorn2o@nyu.edu', '774-953-2883', 10),
        ('bmenicomb2p', 'abc123', 'Byron', 'Menicomb', 'bmenicomb2p@ovh.net', '673-555-3320', 9),
        ('epinel2q', 'abc123', 'Ephrayim', 'Pinel', 'epinel2q@blogtalkradio.com', '527-723-2840', 2),
        ('minder2r', 'abc123', 'Meryl', 'Inder', 'minder2r@europa.eu', '653-424-4669', 8);

-- insert followed agents
INSERT INTO followed_agents
    (agent_id, username_id)
    VALUES
        (37, 89),
        (39, 23),
        (4, 62),
        (4, 29),
        (1, 59),
        (36, 82),
        (23, 23),
        (16, 83),
        (29, 63),
        (33, 19),
        (1, 58),
        (1, 56),
        (44, 95),
        (12, 76),
        (10, 37),
        (44, 73),
        (32, 94),
        (15, 15),
        (24, 21),
        (35, 76),
        (17, 91),
        (2, 24),
        (43, 16),
        (43, 81),
        (32, 63),
        (1, 69),
        (24, 53),
        (34, 46),
        (17, 2),
        (45, 91),
        (32, 25),
        (22, 91),
        (46, 63),
        (12, 37),
        (14, 46),
        (27, 100),
        (36, 63),
        (10, 44),
        (22, 64),
        (26, 2),
        (29, 17),
        (33, 11),
        (12, 46),
        (34, 89),
        (30, 11),
        (22, 79),
        (24, 89),
        (40, 25),
        (27, 43),
        (14, 76),
        (23, 26),
        (31, 48),
        (32, 12),
        (45, 89),
        (14, 61),
        (11, 78),
        (50, 35),
        (33, 37),
        (19, 7),
        (17, 83),
        (35, 48),
        (4, 85),
        (33, 99),
        (2, 68),
        (36, 25),
        (20, 22),
        (13, 40),
        (14, 16),
        (28, 20),
        (3, 12),
        (15, 10),
        (38, 16),
        (22, 93),
        (10, 5),
        (21, 94),
        (8, 27),
        (35, 94),
        (7, 75),
        (25, 72),
        (36, 81),
        (3, 11),
        (22, 69),
        (12, 42),
        (43, 77),
        (50, 4),
        (5, 87),
        (44, 47),
        (26, 63),
        (27, 64),
        (48, 11),
        (31, 39),
        (13, 60),
        (4, 30),
        (49, 32),
        (1, 75),
        (48, 13),
        (34, 24),
        (13, 59),
        (27, 81),
        (46, 34);