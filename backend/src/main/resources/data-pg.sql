INSERT INTO player (player_id, activity, ban_status, email, enabled, experience, pass_hash, photo_link, points, username) VALUES
('65161300defc4b17be366fb7da702fd8', FALSE, 0, 'igrac1@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--qY8yqiLl--/v1607972386/pictures/eddavmzlm8fiucf3hkgo.png', 0, 'igrac1'),
('b9e8191545604c5db6ac5f15c3e381cd', FALSE, 0, 'igrac2@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--Uy_SSTvY--/v1607972386/pictures/gaucukq1ymcykdw84bnc.png', 0, 'igrac2'),
('720fb7f15b17486faada1cad2b8ab632', FALSE, 0, 'igrac3@fer.hr', TRUE, 0, '$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--HpD_sqSr--/v1607972386/pictures/xawnnowvszwjzqcrpjqx.png', 0, 'igrac3'),

('925125b01c454886a162bab2dd730adc', FALSE, 0, 'kartograf1@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--bfp67p1l--/v1607972385/pictures/lvmf96nbrzvnei5kymth.png', 0, 'kartograf1'),
('461cb17965924d9881e3cfcb35994822', FALSE, 0, 'kartograf2@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--fbJmFHsS--/v1607972385/pictures/hk4em7t5alcmewua4iqw.png', 0, 'kartograf2'),
('a27a7989753f4bf5bce8eda18fc0915c', FALSE, 0, 'kartograf3@fer.hr', TRUE, 0, '$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--H6nhzECW--/v1607972385/pictures/ijqnrbkaty1g1jufkly1.png', 0, 'kartograf3'),

('0458c926ea9b4d64b7c1bb8d99e57199', FALSE, 0, 'admin1@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--I8Xv5_mS--/v1607972385/pictures/stq7nhfrowlfuls90vy9.png', 0, 'admin1'),
('73cdd3855a054cbdbf1cfc8273980323', FALSE, 0, 'admin2@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--G0SbulEs--/v1607972385/pictures/g7ahymf2v0qromo15qx6.png', 0, 'admin2'),
('64fe37bddf564d059433346788485b05', FALSE, 0, 'admin3@fer.hr', TRUE, 0, '$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.', 'https://res.cloudinary.com/ferllowship/image/authenticated/s--OSINBx_o--/v1607972385/pictures/vruw9og43ymsemd2jvm6.png', 0, 'admin3');

INSERT INTO cartograph (confirmed, iban, id_photo_link, player_id) VALUES
(TRUE, 'HR1824020066639272277', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '925125b01c454886a162bab2dd730adc'),
(FALSE, 'HR5624020061815262937', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '461cb17965924d9881e3cfcb35994822'),
(FALSE, 'HR6723400097264842444', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', 'a27a7989753f4bf5bce8eda18fc0915c');

INSERT INTO admin (iban, id_photo_link, player_id) VALUES
('HR1925000092781141814', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '0458c926ea9b4d64b7c1bb8d99e57199'),
('HR5224020062577714825', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '73cdd3855a054cbdbf1cfc8273980323'),
('HR2324840081238429587', 'https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png', '64fe37bddf564d059433346788485b05');
