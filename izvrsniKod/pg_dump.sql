--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Debian 12.4-1.pgdg100+1)
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    iban character varying(34),
    id_photo_link character varying(200),
    player_id uuid NOT NULL
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: ban; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ban (
    ban_id uuid NOT NULL,
    ban_end date,
    user_id uuid
);


ALTER TABLE public.ban OWNER TO postgres;

--
-- Name: card; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.card (
    card_id uuid NOT NULL,
    card_points integer,
    scale_factor integer,
    location_id uuid,
    player_id uuid
);


ALTER TABLE public.card OWNER TO postgres;

--
-- Name: cartograph; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cartograph (
    confirmed boolean,
    iban character varying(34) NOT NULL,
    id_photo_link character varying(200) NOT NULL,
    player_id uuid NOT NULL
);


ALTER TABLE public.cartograph OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id uuid NOT NULL,
    category_name character varying(32),
    category_points integer
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: confirmation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.confirmation (
    token_id uuid NOT NULL,
    token character varying(255),
    player_id uuid NOT NULL
);


ALTER TABLE public.confirmation OWNER TO postgres;

--
-- Name: fight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fight (
    fight_id uuid NOT NULL,
    duration bigint,
    start timestamp without time zone,
    loser_id uuid,
    winner_id uuid
);


ALTER TABLE public.fight OWNER TO postgres;

--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    location_id uuid NOT NULL,
    coordinates character varying(50),
    location_desc character varying(255),
    location_name character varying(32),
    location_photo_link character varying(200),
    location_status integer,
    category_id uuid
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: path; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.path (
    path_id uuid NOT NULL,
    distance integer,
    location_id uuid
);


ALTER TABLE public.path OWNER TO postgres;

--
-- Name: player; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.player (
    player_id uuid NOT NULL,
    activity boolean,
    ban_status integer,
    email character varying(128),
    enabled boolean,
    experience integer,
    pass_hash character varying(256) NOT NULL,
    photo_link character varying(200) NOT NULL,
    points integer,
    username character varying(32)
);


ALTER TABLE public.player OWNER TO postgres;

--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (iban, id_photo_link, player_id) FROM stdin;
HR1925000092781141814	https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png	0458c926-ea9b-4d64-b7c1-bb8d99e57199
HR5224020062577714825	https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png	73cdd385-5a05-4cbd-bf1c-fc8273980323
HR2324840081238429587	https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png	64fe37bd-df56-4d05-9433-346788485b05
\.


--
-- Data for Name: ban; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ban (ban_id, ban_end, user_id) FROM stdin;
\.


--
-- Data for Name: card; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.card (card_id, card_points, scale_factor, location_id, player_id) FROM stdin;
45f5cba6-fbb4-5dd4-bc32-478ccb2a48b1	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	65161300-defc-4b17-be36-6fb7da702fd8
7e4fbf54-d2e9-41ad-aa48-28031257038a	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	65161300-defc-4b17-be36-6fb7da702fd8
8f202e66-09b9-4494-943b-c292458e5715	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	65161300-defc-4b17-be36-6fb7da702fd8
d79d00ea-2f1f-4fd0-9f04-40836f024a1a	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	65161300-defc-4b17-be36-6fb7da702fd8
ac1d5555-286f-45c6-8f48-acc5d6389c90	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	65161300-defc-4b17-be36-6fb7da702fd8
c2d5d2d6-1cd1-4578-8d88-8a7c3f0d2d3d	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	b9e81915-4560-4c5d-b6ac-5f15c3e381cd
1f77ecb2-f08a-470a-b5e7-7847fb2d53e8	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	b9e81915-4560-4c5d-b6ac-5f15c3e381cd
03f2fdf5-c9dd-4ae5-87e8-6c6f599ff776	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	b9e81915-4560-4c5d-b6ac-5f15c3e381cd
49b291a7-4871-4927-bbf9-f6a464d12ece	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	b9e81915-4560-4c5d-b6ac-5f15c3e381cd
ad7cf58c-f819-4e98-a02a-44f0ccb81174	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	b9e81915-4560-4c5d-b6ac-5f15c3e381cd
70474377-c799-40c1-a418-216e377c34ae	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	720fb7f1-5b17-486f-aada-1cad2b8ab632
574a1439-69be-4db1-b01c-e98f747b8e4a	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	720fb7f1-5b17-486f-aada-1cad2b8ab632
353ce181-8f13-4c2d-8860-5a2e23c76130	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	720fb7f1-5b17-486f-aada-1cad2b8ab632
fd7ede6c-4a1a-4e14-af8f-68c844a68fe2	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	720fb7f1-5b17-486f-aada-1cad2b8ab632
e6c8e0f3-96c1-4e4d-949d-dd038ce9796e	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	720fb7f1-5b17-486f-aada-1cad2b8ab632
e907d2f4-ccb3-4c6d-b989-2a3cb4f799ac	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	925125b0-1c45-4886-a162-bab2dd730adc
79453020-aeb2-45bf-8947-7fa87aa76ed5	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	925125b0-1c45-4886-a162-bab2dd730adc
59bfb86c-3a58-40ca-b1bc-094f98fd00f5	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	925125b0-1c45-4886-a162-bab2dd730adc
7888da81-a27f-4ad3-8c31-017ac33268d7	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	925125b0-1c45-4886-a162-bab2dd730adc
91e5047f-96de-401d-b0bb-b08531bf4344	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	925125b0-1c45-4886-a162-bab2dd730adc
cfcdd4b6-6349-4523-b25b-a002feb9eae2	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	461cb179-6592-4d98-81e3-cfcb35994822
a31f25a1-e286-4b61-b822-e54d723d88bc	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	461cb179-6592-4d98-81e3-cfcb35994822
d17a6ef4-e44b-48b3-8a48-e2cd02984045	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	461cb179-6592-4d98-81e3-cfcb35994822
e9695fa9-a2c2-4167-ad39-27aff19afb84	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	461cb179-6592-4d98-81e3-cfcb35994822
d13ee317-3974-408b-98f6-3fc37150ce25	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	461cb179-6592-4d98-81e3-cfcb35994822
652323b4-9357-40f9-ab93-de83a06834bf	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	a27a7989-753f-4bf5-bce8-eda18fc0915c
53e23740-4779-4efe-a075-8b558ae0d6d8	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	a27a7989-753f-4bf5-bce8-eda18fc0915c
700d80ea-80e7-47c8-bdf6-4c897e648ed6	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	a27a7989-753f-4bf5-bce8-eda18fc0915c
84018ca1-592c-4a7d-86e5-f417092d2248	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	a27a7989-753f-4bf5-bce8-eda18fc0915c
19fda4dd-8d6d-46f3-abb3-923d8e710ed1	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	a27a7989-753f-4bf5-bce8-eda18fc0915c
d9f4a794-939e-41ec-8927-f7240570ffc4	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	0458c926-ea9b-4d64-b7c1-bb8d99e57199
e056f061-6c79-49ed-b98e-09a25e768698	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	0458c926-ea9b-4d64-b7c1-bb8d99e57199
2a392ad5-8f7b-4933-b071-a79c68150f90	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	0458c926-ea9b-4d64-b7c1-bb8d99e57199
cb107ad7-15c3-4f98-b32f-ba755e8ec84e	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	0458c926-ea9b-4d64-b7c1-bb8d99e57199
f0effccb-0612-4375-90e3-5a323993ac44	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	0458c926-ea9b-4d64-b7c1-bb8d99e57199
07d9991e-6099-4ee7-a348-1e8fdbe4d31e	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	73cdd385-5a05-4cbd-bf1c-fc8273980323
7155f87a-81de-4408-9579-86c5cf12ebf8	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	73cdd385-5a05-4cbd-bf1c-fc8273980323
a838ba1f-14f4-4d38-b10a-7ad597a592dd	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	73cdd385-5a05-4cbd-bf1c-fc8273980323
06aa8068-bc66-4df4-8114-c1a4351caa1b	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	73cdd385-5a05-4cbd-bf1c-fc8273980323
9f038dff-9a26-48fd-9909-50d616371d05	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	73cdd385-5a05-4cbd-bf1c-fc8273980323
8bc3366d-2520-4c15-aca0-d175fbe5fd78	25	1	6152fbe0-5c94-429b-8ac8-0e2a17676717	64fe37bd-df56-4d05-9433-346788485b05
2774e8ad-180e-42f3-b67c-582812fb35ca	26	1	0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	64fe37bd-df56-4d05-9433-346788485b05
0c95d557-0309-452e-92c5-2f530660f2e0	27	1	8b0df3bc-d362-4feb-aca5-60cda860a4c7	64fe37bd-df56-4d05-9433-346788485b05
c5aa05b4-a942-4a4a-b45a-199ae499f8fb	28	1	661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	64fe37bd-df56-4d05-9433-346788485b05
b35172c0-0de0-41df-9caa-3751b7967b92	29	1	6fc2141f-7e1c-481b-a1c8-65284f871174	64fe37bd-df56-4d05-9433-346788485b05
\.


--
-- Data for Name: cartograph; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cartograph (confirmed, iban, id_photo_link, player_id) FROM stdin;
t	HR1824020066639272277	https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png	925125b0-1c45-4886-a162-bab2dd730adc
f	HR5624020061815262937	https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png	461cb179-6592-4d98-81e3-cfcb35994822
f	HR6723400097264842444	https://res.cloudinary.com/ferllowship/image/authenticated/s---6AmsTGn--/v1607972421/pictures/qu0szw4e1j9pfdonjoat.png	a27a7989-753f-4bf5-bce8-eda18fc0915c
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (category_id, category_name, category_points) FROM stdin;
47f58b36-2fce-479a-a709-9653a20f966a	City	25
2a4c3fe1-1a18-4881-a443-0de517aa2db5	Small town	30
03417c37-5ef3-4b52-80ee-a606839cf8a1	Art installation	35
88a770c9-81e5-4b96-95b2-448618a5e13a	Mountain top	40
\.


--
-- Data for Name: confirmation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.confirmation (token_id, token, player_id) FROM stdin;
\.


--
-- Data for Name: fight; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fight (fight_id, duration, start, loser_id, winner_id) FROM stdin;
08f5cba6-2bb4-4dd4-bcb7-8ccb62968bb1	180000000000	2020-12-21 23:45:59.735282	65161300-defc-4b17-be36-6fb7da702fd8	64fe37bd-df56-4d05-9433-346788485b05
18167130-d70b-4e4e-8e33-63cd9f06deb7	180000000000	2020-12-21 23:45:59.735282	b9e81915-4560-4c5d-b6ac-5f15c3e381cd	73cdd385-5a05-4cbd-bf1c-fc8273980323
fe7fbccf-9fb1-4700-8dc8-37001c947169	180000000000	2020-12-21 23:45:59.735282	720fb7f1-5b17-486f-aada-1cad2b8ab632	0458c926-ea9b-4d64-b7c1-bb8d99e57199
41c167a4-1889-4a2a-8337-38082063390b	180000000000	2020-12-21 23:45:59.735282	925125b0-1c45-4886-a162-bab2dd730adc	a27a7989-753f-4bf5-bce8-eda18fc0915c
8cf8194a-fc11-4db0-893d-8a63eb50ccac	180000000000	2020-12-21 23:45:59.735282	461cb179-6592-4d98-81e3-cfcb35994822	461cb179-6592-4d98-81e3-cfcb35994822
5c4b056f-5b7a-4325-93e9-bfd832d79a74	180000000000	2020-12-20 23:45:59.735282	a27a7989-753f-4bf5-bce8-eda18fc0915c	925125b0-1c45-4886-a162-bab2dd730adc
0b205d79-3145-4a71-be6a-c11c32f27807	180000000000	2020-12-20 23:45:59.735282	0458c926-ea9b-4d64-b7c1-bb8d99e57199	720fb7f1-5b17-486f-aada-1cad2b8ab632
bfa53239-6021-4f80-94bf-8dce6ef6ec33	180000000000	2020-12-20 23:45:59.735282	73cdd385-5a05-4cbd-bf1c-fc8273980323	b9e81915-4560-4c5d-b6ac-5f15c3e381cd
473d28e8-e9ca-4480-8d50-0017fae7c771	180000000000	2020-12-20 23:45:59.735282	64fe37bd-df56-4d05-9433-346788485b05	65161300-defc-4b17-be36-6fb7da702fd8
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location (location_id, coordinates, location_desc, location_name, location_photo_link, location_status, category_id) FROM stdin;
6152fbe0-5c94-429b-8ac8-0e2a17676717	45.09512524633465;14.121508598327637	Opis Labina.	Labin	https://res.cloudinary.com/ferllowship/image/authenticated/s--jFm3YYnt--/v1608254551/pictures/leoitge70k5s9eeyfyjm.jpg	0	47f58b36-2fce-479a-a709-9653a20f966a
0e54010c-da8b-4fd7-b16f-a9d7e1f1ca8e	45.49311926297023;15.55569648742676	Opis Karlovca.	Karlovac	https://res.cloudinary.com/ferllowship/image/authenticated/s--1vjleUWW--/v1608254551/pictures/sbsgni06rzofbv00g37x.jpg	0	47f58b36-2fce-479a-a709-9653a20f966a
8b0df3bc-d362-4feb-aca5-60cda860a4c7	43.05814908754195;17.652282714843754	Opis Metkovića.	Metković	https://res.cloudinary.com/ferllowship/image/authenticated/s--doNLIehE--/v1608254552/pictures/d70rhsoxg7idnxhdqik9.jpg	0	47f58b36-2fce-479a-a709-9653a20f966a
661ca7a8-2dc8-405c-93d1-dcfd7a0546ae	45.81318363862028;15.977227091789247	Opis Zagreba.	Zagreb	https://res.cloudinary.com/ferllowship/image/authenticated/s--CJrsBTAO--/v1608254551/pictures/ru1goa6btgyxqyfbpicx.jpg	0	47f58b36-2fce-479a-a709-9653a20f966a
6fc2141f-7e1c-481b-a1c8-65284f871174	45.683098068982;18.406262397766117	Opis Belišća.	Belišće	https://res.cloudinary.com/ferllowship/image/authenticated/s--Ma-1F4-L--/v1608254553/pictures/u6noxxm9mjnpsb9lmkki.jpg	0	47f58b36-2fce-479a-a709-9653a20f966a
\.


--
-- Data for Name: path; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.path (path_id, distance, location_id) FROM stdin;
\.


--
-- Data for Name: player; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.player (player_id, activity, ban_status, email, enabled, experience, pass_hash, photo_link, points, username) FROM stdin;
65161300-defc-4b17-be36-6fb7da702fd8	f	0	igrac1@fer.hr	t	0	$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS	https://res.cloudinary.com/ferllowship/image/authenticated/s--qY8yqiLl--/v1607972386/pictures/eddavmzlm8fiucf3hkgo.png	431	igrac1
b9e81915-4560-4c5d-b6ac-5f15c3e381cd	f	0	igrac2@fer.hr	t	0	$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS	https://res.cloudinary.com/ferllowship/image/authenticated/s--Uy_SSTvY--/v1607972386/pictures/gaucukq1ymcykdw84bnc.png	187	igrac2
720fb7f1-5b17-486f-aada-1cad2b8ab632	f	0	igrac3@fer.hr	t	0	$2y$12$SwGYog04NdEgZiPZa8vlieuqc2ZAobULiq615xDSds.sK/uSs3ynS	https://res.cloudinary.com/ferllowship/image/authenticated/s--HpD_sqSr--/v1607972386/pictures/xawnnowvszwjzqcrpjqx.png	298	igrac3
925125b0-1c45-4886-a162-bab2dd730adc	f	0	kartograf1@fer.hr	t	0	$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6	https://res.cloudinary.com/ferllowship/image/authenticated/s--bfp67p1l--/v1607972385/pictures/lvmf96nbrzvnei5kymth.png	176	kartograf1
461cb179-6592-4d98-81e3-cfcb35994822	f	0	kartograf2@fer.hr	t	0	$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6	https://res.cloudinary.com/ferllowship/image/authenticated/s--fbJmFHsS--/v1607972385/pictures/hk4em7t5alcmewua4iqw.png	305	kartograf2
a27a7989-753f-4bf5-bce8-eda18fc0915c	f	0	kartograf3@fer.hr	t	0	$2y$12$dCMkyaRd0glFAXPula15quKv75v3LWnadIbazoc5YYqSE66p.uhF6	https://res.cloudinary.com/ferllowship/image/authenticated/s--H6nhzECW--/v1607972385/pictures/ijqnrbkaty1g1jufkly1.png	211	kartograf3
0458c926-ea9b-4d64-b7c1-bb8d99e57199	f	0	admin1@fer.hr	t	0	$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.	https://res.cloudinary.com/ferllowship/image/authenticated/s--I8Xv5_mS--/v1607972385/pictures/stq7nhfrowlfuls90vy9.png	1021	admin1
73cdd385-5a05-4cbd-bf1c-fc8273980323	f	0	admin2@fer.hr	t	0	$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.	https://res.cloudinary.com/ferllowship/image/authenticated/s--G0SbulEs--/v1607972385/pictures/g7ahymf2v0qromo15qx6.png	932	admin2
64fe37bd-df56-4d05-9433-346788485b05	f	0	admin3@fer.hr	t	0	$2y$12$5xalJP5aJ4ddui7I4/hoSOK5CKUPAkSSpovNiru3Fqgzn3.rn2bt.	https://res.cloudinary.com/ferllowship/image/authenticated/s--OSINBx_o--/v1607972385/pictures/vruw9og43ymsemd2jvm6.png	765	admin3
\.


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (player_id);


--
-- Name: ban ban_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ban
    ADD CONSTRAINT ban_pkey PRIMARY KEY (ban_id);


--
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (card_id);


--
-- Name: cartograph cartograph_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartograph
    ADD CONSTRAINT cartograph_pkey PRIMARY KEY (player_id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: confirmation confirmation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.confirmation
    ADD CONSTRAINT confirmation_pkey PRIMARY KEY (token_id);


--
-- Name: fight fight_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight
    ADD CONSTRAINT fight_pkey PRIMARY KEY (fight_id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_id);


--
-- Name: path path_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.path
    ADD CONSTRAINT path_pkey PRIMARY KEY (path_id);


--
-- Name: player player_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT player_pkey PRIMARY KEY (player_id);


--
-- Name: player uk_o39xn8lmj05iew7d2tgw836jy; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT uk_o39xn8lmj05iew7d2tgw836jy UNIQUE (username);


--
-- Name: player uk_oivbimcon0iqmb8efpv723h08; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.player
    ADD CONSTRAINT uk_oivbimcon0iqmb8efpv723h08 UNIQUE (email);


--
-- Name: location uk_pfamglnq4wwr7p5snoifen1gs; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT uk_pfamglnq4wwr7p5snoifen1gs UNIQUE (location_name);


--
-- Name: ban fk42qqpshkmh09uu3fuwm7rcghw; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ban
    ADD CONSTRAINT fk42qqpshkmh09uu3fuwm7rcghw FOREIGN KEY (user_id) REFERENCES public.player(player_id);


--
-- Name: path fk5gfu4xx257vyb5j3aw4s6c1p9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.path
    ADD CONSTRAINT fk5gfu4xx257vyb5j3aw4s6c1p9 FOREIGN KEY (location_id) REFERENCES public.location(location_id);


--
-- Name: cartograph fkb89m49vokploi39mbsjut289y; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartograph
    ADD CONSTRAINT fkb89m49vokploi39mbsjut289y FOREIGN KEY (player_id) REFERENCES public.player(player_id);


--
-- Name: card fkbyb0u8pl0bms3a11dql17ut0b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT fkbyb0u8pl0bms3a11dql17ut0b FOREIGN KEY (player_id) REFERENCES public.player(player_id);


--
-- Name: admin fkf8ra86ik6mw5kx879oi6nb8ow; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT fkf8ra86ik6mw5kx879oi6nb8ow FOREIGN KEY (player_id) REFERENCES public.player(player_id);


--
-- Name: location fkjjaw7rfp3x8vxdv1qpo4mmc6k; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT fkjjaw7rfp3x8vxdv1qpo4mmc6k FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- Name: card fklr7aeeck4nhoeple2gl1xtbe5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT fklr7aeeck4nhoeple2gl1xtbe5 FOREIGN KEY (location_id) REFERENCES public.location(location_id);


--
-- Name: fight fkmx77x8qfkd0cox2b2ffcn6ef4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight
    ADD CONSTRAINT fkmx77x8qfkd0cox2b2ffcn6ef4 FOREIGN KEY (loser_id) REFERENCES public.player(player_id);


--
-- Name: fight fko7bo6t676w1re50uri1u5maba; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fight
    ADD CONSTRAINT fko7bo6t676w1re50uri1u5maba FOREIGN KEY (winner_id) REFERENCES public.player(player_id);


--
-- Name: confirmation fks99jlbqcqrcvhwmrqjxijtt8e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.confirmation
    ADD CONSTRAINT fks99jlbqcqrcvhwmrqjxijtt8e FOREIGN KEY (player_id) REFERENCES public.player(player_id);


--
-- PostgreSQL database dump complete
--

