INSERT INTO "PUBLIC"."PLAYER" VALUES
(X'65161300defc4b17be366fb7da702fd8', FALSE, 0, 'igrac1@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--qY8yqiLl--/v1607972386/pictures/eddavmzlm8fiucf3hkgo.png', 431, 'igrac1'),
(X'b9e8191545604c5db6ac5f15c3e381cd', FALSE, 0, 'igrac2@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--Uy_SSTvY--/v1607972386/pictures/gaucukq1ymcykdw84bnc.png', 187, 'igrac2'),
(X'720fb7f15b17486faada1cad2b8ab632', FALSE, 0, 'igrac3@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--HpD_sqSr--/v1607972386/pictures/xawnnowvszwjzqcrpjqx.png', 298, 'igrac3'),

(X'925125b01c454886a162bab2dd730adc', FALSE, 0, 'kartograf1@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--bfp67p1l--/v1607972385/pictures/lvmf96nbrzvnei5kymth.png', 176, 'kartograf1'),
(X'461cb17965924d9881e3cfcb35994822', FALSE, 0, 'kartograf2@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--fbJmFHsS--/v1607972385/pictures/hk4em7t5alcmewua4iqw.png', 305, 'kartograf2'),
(X'a27a7989753f4bf5bce8eda18fc0915c', FALSE, 0, 'kartograf3@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--H6nhzECW--/v1607972385/pictures/ijqnrbkaty1g1jufkly1.png', 211, 'kartograf3'),

(X'0458c926ea9b4d64b7c1bb8d99e57199', FALSE, 0, 'admin1@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--I8Xv5_mS--/v1607972385/pictures/stq7nhfrowlfuls90vy9.png', 1021, 'admin1'),
(X'73cdd3855a054cbdbf1cfc8273980323', FALSE, 0, 'admin2@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--G0SbulEs--/v1607972385/pictures/g7ahymf2v0qromo15qx6.png', 932, 'admin2'),
(X'64fe37bddf564d059433346788485b05', FALSE, 0, 'admin3@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--OSINBx_o--/v1607972385/pictures/vruw9og43ymsemd2jvm6.png', 765, 'admin3');

INSERT INTO "PUBLIC"."CARTOGRAPH" VALUES
(TRUE, 'HR1824020066639272277', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', X'925125b01c454886a162bab2dd730adc'),
(FALSE, 'HR5624020061815262937', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', X'461cb17965924d9881e3cfcb35994822'),
(FALSE, 'HR6723400097264842444', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', X'a27a7989753f4bf5bce8eda18fc0915c');

INSERT INTO "PUBLIC"."ADMIN" VALUES
('HR1925000092781141814', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', X'0458c926ea9b4d64b7c1bb8d99e57199'),
('HR5224020062577714825', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', X'73cdd3855a054cbdbf1cfc8273980323'),
('HR2324840081238429587', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', X'64fe37bddf564d059433346788485b05');

INSERT INTO "PUBLIC"."CATEGORY" VALUES
(X'47f58b362fce479aa7099653a20f966a', 'Grad', 25),
(X'2a4c3fe11a184881a4430de517aa2db5', 'Naselje', 30),
(X'03417c375ef34b5280eea606839cf8a1', STRINGDECODE('Umjetni\u010dka instalacija'), 35),
(X'88a770c981e54b9695b2448618a5e13a', 'Vrh planine', 40);

INSERT INTO "PUBLIC"."LOCATION" VALUES
(X'6152fbe05c94429b8ac80e2a17676717', '45.09512524633465;14.121508598327637', 'Opis Labina.', 'Labin', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--jFm3YYnt--/v1608254551/pictures/leoitge70k5s9eeyfyjm.jpg', 0, X'47f58b362fce479aa7099653a20f966a'),
(X'0e54010cda8b4fd7b16fa9d7e1f1ca8e', '45.49311926297023;15.55569648742676', 'Opis Karlovca.', 'Karlovac', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--1vjleUWW--/v1608254551/pictures/sbsgni06rzofbv00g37x.jpg', 0, X'47f58b362fce479aa7099653a20f966a'),
(X'8b0df3bcd3624febaca560cda860a4c7', '43.05814908754195;17.652282714843754', 'Opis Metkovića.', STRINGDECODE('Metkovi\u0107'), 'https://res.cloudinary.com/ferllowship/image/authenticated/s--doNLIehE--/v1608254552/pictures/d70rhsoxg7idnxhdqik9.jpg', 0, X'47f58b362fce479aa7099653a20f966a'),
(X'661ca7a82dc8405c93d1dcfd7a0546ae', '45.81318363862028;15.977227091789247', 'Opis Zagreba.', 'Zagreb', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--CJrsBTAO--/v1608254551/pictures/ru1goa6btgyxqyfbpicx.jpg', 0, X'47f58b362fce479aa7099653a20f966a'),
(X'6fc2141f7e1c481ba1c865284f871174', '45.683098068982;18.406262397766117', 'Opis Belišća.', STRINGDECODE('Beli\u0161\u0107e'), 'https://res.cloudinary.com/ferllowship/image/authenticated/s--Ma-1F4-L--/v1608254553/pictures/u6noxxm9mjnpsb9lmkki.jpg', 0, X'47f58b362fce479aa7099653a20f966a');

INSERT INTO "PUBLIC"."FIGHT" VALUES
(X'08f5cba62bb44dd4bcb78ccb62968bb1', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', X'65161300defc4b17be366fb7da702fd8', X'64fe37bddf564d059433346788485b05'),
(X'18167130d70b4e4e8e3363cd9f06deb7', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', X'b9e8191545604c5db6ac5f15c3e381cd', X'73cdd3855a054cbdbf1cfc8273980323'),
(X'fe7fbccf9fb147008dc837001c947169', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', X'720fb7f15b17486faada1cad2b8ab632', X'0458c926ea9b4d64b7c1bb8d99e57199'),

(X'41c167a418894a2a833738082063390b', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', X'925125b01c454886a162bab2dd730adc', X'a27a7989753f4bf5bce8eda18fc0915c'),
(X'8cf8194afc114db0893d8a63eb50ccac', 180000000000, TIMESTAMP '2020-12-21 23:45:59.735282', X'461cb17965924d9881e3cfcb35994822', X'461cb17965924d9881e3cfcb35994822'),
(X'5c4b056f5b7a432593e9bfd832d79a74', 180000000000, TIMESTAMP '2020-12-20 23:45:59.735282', X'a27a7989753f4bf5bce8eda18fc0915c', X'925125b01c454886a162bab2dd730adc'),

(X'0b205d7931454a71be6ac11c32f27807', 180000000000, TIMESTAMP '2020-12-20 23:45:59.735282', X'0458c926ea9b4d64b7c1bb8d99e57199', X'720fb7f15b17486faada1cad2b8ab632'),
(X'bfa5323960214f8094bf8dce6ef6ec33', 180000000000, TIMESTAMP '2020-12-20 23:45:59.735282', X'73cdd3855a054cbdbf1cfc8273980323', X'b9e8191545604c5db6ac5f15c3e381cd'),
(X'473d28e8e9ca44808d500017fae7c771', 180000000000, TIMESTAMP '2020-12-20 23:45:59.735282', X'64fe37bddf564d059433346788485b05', X'65161300defc4b17be366fb7da702fd8');

INSERT INTO "PUBLIC"."CARD" VALUES
(X'45f5cba6fbb45dd4bc32478ccb2a48b1', 25, 1, X'6152fbe05c94429b8ac80e2a17676717', X'65161300defc4b17be366fb7da702fd8'),
(X'8f202e6609b94494943bc292458e5715', 27, 1, X'8b0df3bcd3624febaca560cda860a4c7', X'65161300defc4b17be366fb7da702fd8'),
(X'7e4fbf54d2e941adaa4828031257038a', 26, 1, X'0e54010cda8b4fd7b16fa9d7e1f1ca8e', X'65161300defc4b17be366fb7da702fd8'),

(X'03f2fdf5c9dd4ae587e86c6f599ff776', 27, 1, X'8b0df3bcd3624febaca560cda860a4c7', X'b9e8191545604c5db6ac5f15c3e381cd'),
(X'ad7cf58cf8194e98a02a44f0ccb81174', 29, 1, X'6fc2141f7e1c481ba1c865284f871174', X'b9e8191545604c5db6ac5f15c3e381cd'),
(X'49b291a748714927bbf9f6a464d12ece', 28, 1, X'661ca7a82dc8405c93d1dcfd7a0546ae', X'b9e8191545604c5db6ac5f15c3e381cd'),

(X'e6c8e0f396c14e4d949ddd038ce9796e', 29, 1, X'6fc2141f7e1c481ba1c865284f871174', X'720fb7f15b17486faada1cad2b8ab632'),
(X'70474377c79940c1a418216e377c34ae', 25, 1, X'6152fbe05c94429b8ac80e2a17676717', X'720fb7f15b17486faada1cad2b8ab632'),
(X'353ce1818f134c2d88605a2e23c76130', 27, 1, X'8b0df3bcd3624febaca560cda860a4c7', X'720fb7f15b17486faada1cad2b8ab632'),
(X'574a143969be4db1b01ce98f747b8e4a', 26, 1, X'0e54010cda8b4fd7b16fa9d7e1f1ca8e', X'720fb7f15b17486faada1cad2b8ab632'),


(X'59bfb86c3a5840cab1bc094f98fd00f5', 27, 1, X'8b0df3bcd3624febaca560cda860a4c7', X'925125b01c454886a162bab2dd730adc'),
(X'e907d2f4ccb34c6db9892a3cb4f799ac', 25, 1, X'6152fbe05c94429b8ac80e2a17676717', X'925125b01c454886a162bab2dd730adc'),
(X'91e5047f96de401db0bbb08531bf4344', 29, 1, X'6fc2141f7e1c481ba1c865284f871174', X'925125b01c454886a162bab2dd730adc'),
(X'7888da81a27f4ad38c31017ac33268d7', 28, 1, X'661ca7a82dc8405c93d1dcfd7a0546ae', X'925125b01c454886a162bab2dd730adc'),

(X'e9695fa9a2c24167ad3927aff19afb84', 28, 1, X'661ca7a82dc8405c93d1dcfd7a0546ae', X'461cb17965924d9881e3cfcb35994822'),
(X'cfcdd4b663494523b25ba002feb9eae2', 25, 1, X'6152fbe05c94429b8ac80e2a17676717', X'461cb17965924d9881e3cfcb35994822'),
(X'd13ee3173974408b98f63fc37150ce25', 29, 1, X'6fc2141f7e1c481ba1c865284f871174', X'461cb17965924d9881e3cfcb35994822'),

(X'53e2374047794efea0758b558ae0d6d8', 26, 1, X'0e54010cda8b4fd7b16fa9d7e1f1ca8e', X'a27a7989753f4bf5bce8eda18fc0915c'),
(X'84018ca1592c4a7d86e5f417092d2248', 28, 1, X'661ca7a82dc8405c93d1dcfd7a0546ae', X'a27a7989753f4bf5bce8eda18fc0915c'),
(X'700d80ea80e747c8bdf64c897e648ed6', 27, 1, X'8b0df3bcd3624febaca560cda860a4c7', X'a27a7989753f4bf5bce8eda18fc0915c'),


(X'cb107ad715c34f98b32fba755e8ec84e', 28, 1, X'661ca7a82dc8405c93d1dcfd7a0546ae', X'0458c926ea9b4d64b7c1bb8d99e57199'),
(X'd9f4a794939e41ec8927f7240570ffc4', 25, 1, X'6152fbe05c94429b8ac80e2a17676717', X'0458c926ea9b4d64b7c1bb8d99e57199'),
(X'2a392ad58f7b4933b071a79c68150f90', 27, 1, X'8b0df3bcd3624febaca560cda860a4c7', X'0458c926ea9b4d64b7c1bb8d99e57199'),

(X'a838ba1f14f44d38b10a7ad597a592dd', 27, 1, X'8b0df3bcd3624febaca560cda860a4c7', X'73cdd3855a054cbdbf1cfc8273980323'),
(X'06aa8068bc664df48114c1a4351caa1b', 28, 1, X'661ca7a82dc8405c93d1dcfd7a0546ae', X'73cdd3855a054cbdbf1cfc8273980323'),
(X'9f038dff9a2648fd990950d616371d05', 29, 1, X'6fc2141f7e1c481ba1c865284f871174', X'73cdd3855a054cbdbf1cfc8273980323'),
(X'7155f87a81de4408957986c5cf12ebf8', 26, 1, X'0e54010cda8b4fd7b16fa9d7e1f1ca8e', X'73cdd3855a054cbdbf1cfc8273980323'),

(X'c5aa05b4a9424a4ab45a199ae499f8fb', 28, 1, X'661ca7a82dc8405c93d1dcfd7a0546ae', X'64fe37bddf564d059433346788485b05'),
(X'8bc3366d25204c15aca0d175fbe5fd78', 25, 1, X'6152fbe05c94429b8ac80e2a17676717', X'64fe37bddf564d059433346788485b05'),
(X'2774e8ad180e42f3b67c582812fb35ca', 26, 1, X'0e54010cda8b4fd7b16fa9d7e1f1ca8e', X'64fe37bddf564d059433346788485b05'),
(X'b35172c00de041df9caa3751b7967b92', 29, 1, X'6fc2141f7e1c481ba1c865284f871174', X'64fe37bddf564d059433346788485b05');
