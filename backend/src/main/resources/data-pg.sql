INSERT INTO player (player_id, activity, ban_status, email, enabled, experience, pass_hash, photo_link, points, username) VALUES
('65161300defc4b17be366fb7da702fd8', FALSE, 0, 'igrac1@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--qY8yqiLl--/v1607972386/pictures/eddavmzlm8fiucf3hkgo.png', 431, 'igrac1'),
('b9e8191545604c5db6ac5f15c3e381cd', FALSE, 0, 'igrac2@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--Uy_SSTvY--/v1607972386/pictures/gaucukq1ymcykdw84bnc.png', 187, 'igrac2'),
('720fb7f15b17486faada1cad2b8ab632', FALSE, 0, 'igrac3@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--HpD_sqSr--/v1607972386/pictures/xawnnowvszwjzqcrpjqx.png', 298, 'igrac3'),

('925125b01c454886a162bab2dd730adc', FALSE, 0, 'kartograf1@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--bfp67p1l--/v1607972385/pictures/lvmf96nbrzvnei5kymth.png', 176, 'kartograf1'),
('461cb17965924d9881e3cfcb35994822', FALSE, 0, 'kartograf2@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--fbJmFHsS--/v1607972385/pictures/hk4em7t5alcmewua4iqw.png', 305, 'kartograf2'),
('a27a7989753f4bf5bce8eda18fc0915c', FALSE, 0, 'kartograf3@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--H6nhzECW--/v1607972385/pictures/ijqnrbkaty1g1jufkly1.png', 211, 'kartograf3'),

('0458c926ea9b4d64b7c1bb8d99e57199', FALSE, 0, 'admin1@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--I8Xv5_mS--/v1607972385/pictures/stq7nhfrowlfuls90vy9.png', 1021, 'admin1'),
('73cdd3855a054cbdbf1cfc8273980323', FALSE, 0, 'admin2@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--G0SbulEs--/v1607972385/pictures/g7ahymf2v0qromo15qx6.png', 932, 'admin2'),
('64fe37bddf564d059433346788485b05', FALSE, 0, 'admin3@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--OSINBx_o--/v1607972385/pictures/vruw9og43ymsemd2jvm6.png', 765, 'admin3');

INSERT INTO cartograph (confirmed, iban, id_photo_link, player_id) VALUES
(TRUE, 'HR1824020066639272277', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '925125b01c454886a162bab2dd730adc'),
(FALSE, 'HR5624020061815262937', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '461cb17965924d9881e3cfcb35994822'),
(FALSE, 'HR6723400097264842444', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', 'a27a7989753f4bf5bce8eda18fc0915c');

INSERT INTO admin (iban, id_photo_link, player_id) VALUES
('HR1925000092781141814', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '0458c926ea9b4d64b7c1bb8d99e57199'),
('HR5224020062577714825', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '73cdd3855a054cbdbf1cfc8273980323'),
('HR2324840081238429587', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '64fe37bddf564d059433346788485b05');

INSERT INTO category (category_id, category_name, category_points) VALUES
('47f58b362fce479aa7099653a20f966a', 'Grad', 25),
('2a4c3fe11a184881a4430de517aa2db5', 'Naselje', 30),
('03417c375ef34b5280eea606839cf8a1', 'Umjetnička instalacija', 35),
('88a770c981e54b9695b2448618a5e13a', 'Vrh planine', 40);

INSERT INTO location (location_id, coordinates, location_desc, location_name, location_photo_link, location_status, category_id) VALUES
('6152fbe05c94429b8ac80e2a17676717', '45.09512524633465;14.121508598327637', 'Opis Labina.', 'Labin', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--jFm3YYnt--/v1608254551/pictures/leoitge70k5s9eeyfyjm.jpg', 0, '47f58b362fce479aa7099653a20f966a'),
('0e54010cda8b4fd7b16fa9d7e1f1ca8e', '45.49311926297023;15.55569648742676', 'Opis Karlovca.', 'Karlovac', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--1vjleUWW--/v1608254551/pictures/sbsgni06rzofbv00g37x.jpg', 0, '47f58b362fce479aa7099653a20f966a'),
('8b0df3bcd3624febaca560cda860a4c7', '43.05814908754195;17.652282714843754', 'Opis Metkovića.', 'Metković', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--doNLIehE--/v1608254552/pictures/d70rhsoxg7idnxhdqik9.jpg', 0, '47f58b362fce479aa7099653a20f966a'),
('661ca7a82dc8405c93d1dcfd7a0546ae', '45.81318363862028;15.977227091789247', 'Opis Zagreba.', 'Zagreb', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--CJrsBTAO--/v1608254551/pictures/ru1goa6btgyxqyfbpicx.jpg', 0, '47f58b362fce479aa7099653a20f966a'),
('6fc2141f7e1c481ba1c865284f871174', '45.683098068982;18.406262397766117', 'Opis Belišća.', 'Belišće', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--Ma-1F4-L--/v1608254553/pictures/u6noxxm9mjnpsb9lmkki.jpg', 0, '47f58b362fce479aa7099653a20f966a');

INSERT INTO fight (fight_id, duration, start, loser_id, winner_id) VALUES
('08f5cba62bb44dd4bcb78ccb62968bb1', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', '65161300defc4b17be366fb7da702fd8', '64fe37bddf564d059433346788485b05'),
('18167130d70b4e4e8e3363cd9f06deb7', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', 'b9e8191545604c5db6ac5f15c3e381cd', '73cdd3855a054cbdbf1cfc8273980323'),
('fe7fbccf9fb147008dc837001c947169', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', '720fb7f15b17486faada1cad2b8ab632', '0458c926ea9b4d64b7c1bb8d99e57199'),

('41c167a418894a2a833738082063390b', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', '925125b01c454886a162bab2dd730adc', 'a27a7989753f4bf5bce8eda18fc0915c'),
('8cf8194afc114db0893d8a63eb50ccac', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', '461cb17965924d9881e3cfcb35994822', '461cb17965924d9881e3cfcb35994822'),
('5c4b056f5b7a432593e9bfd832d79a74', 180000000000, TIMESTAMP '2020-12-20 23:45:59.735282', 'a27a7989753f4bf5bce8eda18fc0915c', '925125b01c454886a162bab2dd730adc'),

('0b205d7931454a71be6ac11c32f27807', 180000000000, TIMESTAMP '2020-12-20 23:45:59.735282', '0458c926ea9b4d64b7c1bb8d99e57199', '720fb7f15b17486faada1cad2b8ab632'),
('bfa5323960214f8094bf8dce6ef6ec33', 180000000000, TIMESTAMP '2020-12-20 23:45:59.735282', '73cdd3855a054cbdbf1cfc8273980323', 'b9e8191545604c5db6ac5f15c3e381cd'),
('473d28e8e9ca44808d500017fae7c771', 180000000000, TIMESTAMP '2020-12-20 23:45:59.735282', '64fe37bddf564d059433346788485b05', '65161300defc4b17be366fb7da702fd8');