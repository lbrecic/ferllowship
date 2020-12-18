INSERT INTO "PUBLIC"."PLAYER" VALUES
(X'65161300defc4b17be366fb7da702fd8', FALSE, 0, 'igrac1@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--qY8yqiLl--/v1607972386/pictures/eddavmzlm8fiucf3hkgo.png', 0, 'igrac1'),
(X'b9e8191545604c5db6ac5f15c3e381cd', FALSE, 0, 'igrac2@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--Uy_SSTvY--/v1607972386/pictures/gaucukq1ymcykdw84bnc.png', 0, 'igrac2'),
(X'720fb7f15b17486faada1cad2b8ab632', FALSE, 0, 'igrac3@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--HpD_sqSr--/v1607972386/pictures/xawnnowvszwjzqcrpjqx.png', 0, 'igrac3'),

(X'925125b01c454886a162bab2dd730adc', FALSE, 0, 'kartograf1@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--bfp67p1l--/v1607972385/pictures/lvmf96nbrzvnei5kymth.png', 0, 'kartograf1'),
(X'461cb17965924d9881e3cfcb35994822', FALSE, 0, 'kartograf2@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--fbJmFHsS--/v1607972385/pictures/hk4em7t5alcmewua4iqw.png', 0, 'kartograf2'),
(X'a27a7989753f4bf5bce8eda18fc0915c', FALSE, 0, 'kartograf3@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--H6nhzECW--/v1607972385/pictures/ijqnrbkaty1g1jufkly1.png', 0, 'kartograf3'),

(X'0458c926ea9b4d64b7c1bb8d99e57199', FALSE, 0, 'admin1@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--I8Xv5_mS--/v1607972385/pictures/stq7nhfrowlfuls90vy9.png', 0, 'admin1'),
(X'73cdd3855a054cbdbf1cfc8273980323', FALSE, 0, 'admin2@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--G0SbulEs--/v1607972385/pictures/g7ahymf2v0qromo15qx6.png', 0, 'admin2'),
(X'64fe37bddf564d059433346788485b05', FALSE, 0, 'admin3@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--OSINBx_o--/v1607972385/pictures/vruw9og43ymsemd2jvm6.png', 0, 'admin3');

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
(X'0e54010cda8b4fd7b16fa9d7e1f1ca8e', '45.49311926297023;15.55569648742676', 'Opis Karlovca.', 'Karlovac', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--1vjleUWW--/v1608254551/pictures/sbsgni06rzofbv00g37x.jpg', 0, X'03417c375ef34b5280eea606839cf8a1'),
(X'8b0df3bcd3624febaca560cda860a4c7', '43.05814908754195;17.652282714843754', 'Opis Metkovića.', STRINGDECODE('Metkovi\u0107'), 'https://res.cloudinary.com/ferllowship/image/authenticated/s--doNLIehE--/v1608254552/pictures/d70rhsoxg7idnxhdqik9.jpg', 0, X'2a4c3fe11a184881a4430de517aa2db5'),
(X'661ca7a82dc8405c93d1dcfd7a0546ae', '45.81318363862028;15.977227091789247', 'Opis Zagreba.', 'Zagreb', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--CJrsBTAO--/v1608254551/pictures/ru1goa6btgyxqyfbpicx.jpg', 0, X'88a770c981e54b9695b2448618a5e13a'),
(X'6fc2141f7e1c481ba1c865284f871174', '45.683098068982;18.406262397766117', 'Opis Belišća.', STRINGDECODE('Beli\u0161\u0107e'), 'https://res.cloudinary.com/ferllowship/image/authenticated/s--Ma-1F4-L--/v1608254553/pictures/u6noxxm9mjnpsb9lmkki.jpg', 0, X'47f58b362fce479aa7099653a20f966a');
