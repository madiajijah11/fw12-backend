--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

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
-- Name: casts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.casts (
    id integer NOT NULL,
    name character varying,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.casts OWNER TO postgres;

--
-- Name: casts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.casts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.casts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: cinemas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cinemas (
    id integer NOT NULL,
    picture character varying,
    name character varying,
    address character varying,
    city character varying,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.cinemas OWNER TO postgres;

--
-- Name: cinemas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.cinemas ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.cinemas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name character varying,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.genres ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.genres_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movieCast; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."movieCast" (
    id integer NOT NULL,
    "movieId" integer,
    "castId" integer,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."movieCast" OWNER TO postgres;

--
-- Name: movieCasts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."movieCast" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."movieCasts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movieGenre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."movieGenre" (
    id integer NOT NULL,
    "movieId" integer,
    "genreId" integer,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."movieGenre" OWNER TO postgres;

--
-- Name: movieGenre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."movieGenre" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."movieGenre_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movieScheduleTimes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."movieScheduleTimes" (
    id integer NOT NULL,
    "time" time without time zone,
    "movieScheduleId" integer,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."movieScheduleTimes" OWNER TO postgres;

--
-- Name: movieScheduleTimes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."movieScheduleTimes" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."movieScheduleTimes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movieSchedules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."movieSchedules" (
    id integer NOT NULL,
    "movieId" integer,
    "cinemaId" integer,
    price bigint,
    "startDate" date,
    "endDate" date,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."movieSchedules" OWNER TO postgres;

--
-- Name: movieSchedules_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."movieSchedules" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."movieSchedules_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying,
    picture character varying,
    "releaseDate" date,
    director character varying,
    duration time without time zone,
    synopsis text,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.movies ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.movies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: paymentMethods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."paymentMethods" (
    id integer NOT NULL,
    picture character varying,
    name character varying,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."paymentMethods" OWNER TO postgres;

--
-- Name: paymentMethods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."paymentMethods" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."paymentMethods_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: reserveSeats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."reserveSeats" (
    id integer NOT NULL,
    "seatNum" character varying,
    "transactionId" integer,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."reserveSeats" OWNER TO postgres;

--
-- Name: reserveSeats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."reserveSeats" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."reserveSeats_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: resetPassword; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."resetPassword" (
    id integer NOT NULL,
    email character varying,
    "userId" integer,
    code character varying,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public."resetPassword" OWNER TO postgres;

--
-- Name: resetPassword_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."resetPassword" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."resetPassword_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name character varying,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.status ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: subscribers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscribers (
    id integer NOT NULL,
    email character varying,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.subscribers OWNER TO postgres;

--
-- Name: subscribers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.subscribers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.subscribers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    "bookingDate" timestamp with time zone,
    "movieId" integer,
    "cinemaId" integer,
    "movieScheduleId" integer,
    "fullName" character varying,
    email character varying,
    "phoneNumber" character varying,
    "statusId" integer,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone,
    "paymentMethodId" integer,
    "userId" integer
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transactions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    picture character varying,
    "firstName" character varying,
    "lastName" character varying,
    "phoneNumber" character varying,
    email character varying,
    password character varying,
    "roleId" integer DEFAULT 2,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: casts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.casts (id, name, "createdAt", "updatedAt") FROM stdin;
1	Tom Holland	2022-11-21 18:58:18.744189+08	\N
2	Michael Keaton	2022-11-21 18:58:18.744189+08	\N
3	Robert Downey Jr.	2022-11-21 18:58:18.744189+08	\N
4	Marisa Tomei	2022-11-21 18:58:18.744189+08	\N
5	Jon Favreau	2022-11-21 18:58:18.744189+08	\N
6	Gwyneth Paltrow	2022-11-21 18:58:18.744189+08	\N
7	Zendaya	2022-11-21 18:58:18.744189+08	\N
8	Donald Glover	2022-11-21 18:58:18.744189+08	\N
9	Jacob Batalon	2022-11-21 18:58:18.744189+08	\N
11	Zoe Saldana	2022-11-25 11:08:22.846616+08	2022-11-25 11:09:16.056+08
\.


--
-- Data for Name: cinemas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cinemas (id, picture, name, address, city, "createdAt", "updatedAt") FROM stdin;
1	https://21cineplex.com//theme/v5/assets/img/logo.png	CINEMA 21	Karang Rejo, Tarakan Barat	Tarakan	2022-11-21 19:32:52.725811+08	\N
2	https://21cineplex.com//theme/v5/assets/img/logo.png	CINEMA 21	Jalan Ahmad Yani	Banjarmasin	2022-11-25 00:10:21.676377+08	\N
3	https://21cineplex.com//theme/v5/assets/img/logo.png	CINEMA 21	Jl. Akhmad Yani	Balikpapan	2022-11-25 00:10:23.661923+08	2022-11-25 00:12:26.163+08
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (id, name, "createdAt", "updatedAt") FROM stdin;
1	Action	2022-11-21 17:57:00.867325+08	\N
2	Adventure	2022-11-21 17:57:00.867325+08	\N
4	Comedy	2022-11-21 17:57:00.867325+08	\N
5	Crime	2022-11-21 17:57:00.867325+08	\N
6	Documentary	2022-11-21 17:57:00.867325+08	\N
7	Drama	2022-11-21 17:57:00.867325+08	\N
8	Family	2022-11-21 17:57:00.867325+08	\N
9	Fantasy	2022-11-21 17:57:00.867325+08	\N
10	History	2022-11-21 17:57:00.867325+08	\N
11	Horror	2022-11-21 17:57:00.867325+08	\N
12	Music	2022-11-21 17:57:00.867325+08	\N
13	Mystery	2022-11-21 17:57:00.867325+08	\N
14	Romance	2022-11-21 17:57:00.867325+08	\N
15	Science Fiction	2022-11-21 17:57:00.867325+08	\N
16	TV Movie	2022-11-21 17:57:00.867325+08	\N
17	Thriller	2022-11-21 17:57:00.867325+08	\N
18	War	2022-11-21 17:57:00.867325+08	\N
19	Western	2022-11-21 17:57:00.867325+08	\N
21	Sales	2022-11-24 20:46:38.213453+08	\N
3	Animation	2022-11-21 17:57:00.867325+08	2022-11-24 20:55:44.192+08
\.


--
-- Data for Name: movieCast; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."movieCast" (id, "movieId", "castId", "createdAt", "updatedAt") FROM stdin;
1	1	1	2022-11-21 19:34:32.144656+08	\N
2	1	2	2022-11-21 19:34:32.144656+08	\N
3	1	3	2022-11-21 19:34:32.144656+08	\N
4	1	4	2022-11-21 19:34:32.144656+08	\N
5	1	5	2022-11-21 19:34:32.144656+08	\N
6	1	6	2022-11-21 19:34:32.144656+08	\N
7	1	7	2022-11-21 19:34:32.144656+08	\N
8	1	8	2022-11-21 19:34:32.144656+08	\N
9	1	9	2022-11-21 19:34:32.144656+08	\N
\.


--
-- Data for Name: movieGenre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."movieGenre" (id, "movieId", "genreId", "createdAt", "updatedAt") FROM stdin;
1	1	1	2022-11-21 18:52:13.216666+08	\N
2	1	2	2022-11-21 18:52:13.216666+08	\N
3	1	7	2022-11-21 18:52:13.216666+08	\N
4	1	15	2022-11-21 18:52:13.216666+08	\N
6	4	1	2022-12-06 21:36:47.777632+08	\N
7	4	2	2022-12-06 21:36:47.777632+08	\N
8	4	7	2022-12-06 21:36:47.777632+08	\N
9	4	9	2022-12-06 21:36:47.777632+08	\N
10	4	15	2022-12-06 21:36:47.777632+08	\N
11	17	1	2022-12-06 21:38:53.76103+08	\N
12	17	5	2022-12-06 21:38:53.76103+08	\N
13	17	17	2022-12-06 21:38:53.76103+08	\N
14	7	2	2022-12-06 21:39:49.590811+08	\N
15	7	7	2022-12-06 21:39:49.590811+08	\N
16	7	8	2022-12-06 21:39:49.590811+08	\N
17	6	1	2022-12-06 21:40:35.37195+08	\N
18	6	9	2022-12-06 21:40:35.37195+08	\N
19	6	15	2022-12-06 21:40:35.37195+08	\N
20	3	11	2022-12-06 21:41:11.596435+08	\N
21	2	1	2022-12-06 21:42:08.168713+08	\N
22	2	2	2022-12-06 21:42:08.168713+08	\N
23	2	9	2022-12-06 21:42:08.168713+08	\N
24	2	15	2022-12-06 21:42:08.168713+08	\N
25	18	1	2022-12-07 11:47:18.547212+08	\N
26	18	2	2022-12-07 11:47:18.547212+08	\N
27	18	7	2022-12-07 11:47:18.547212+08	\N
28	18	9	2022-12-07 11:47:18.547212+08	\N
29	18	15	2022-12-07 11:47:18.547212+08	\N
\.


--
-- Data for Name: movieScheduleTimes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."movieScheduleTimes" (id, "time", "movieScheduleId", "createdAt", "updatedAt") FROM stdin;
1	10:30:00	1	2022-11-21 19:45:58.734767+08	\N
\.


--
-- Data for Name: movieSchedules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."movieSchedules" (id, "movieId", "cinemaId", price, "startDate", "endDate", "createdAt", "updatedAt") FROM stdin;
9	18	2	60000	2022-11-25	2022-12-30	2022-12-07 11:57:44.349565+08	\N
2	2	2	40000	2022-11-25	2022-12-11	2022-11-25 00:29:27.881818+08	\N
1	1	1	60000	2022-11-25	2022-12-10	2022-11-21 19:42:28.302853+08	\N
6	6	1	75000	2022-11-25	2022-12-14	2022-11-25 00:29:40.629947+08	2022-11-25 00:41:51.395+08
3	3	1	75000	2022-11-25	2022-12-30	2022-11-25 00:29:40.629947+08	2022-11-25 00:41:51.395+08
7	7	1	75000	2022-11-25	2022-12-12	2022-11-25 00:29:40.629947+08	2022-11-25 00:41:51.395+08
5	4	1	75000	2022-11-25	2022-12-30	2022-11-25 00:29:40.629947+08	2022-11-25 00:41:51.395+08
8	17	1	75000	2022-11-25	2022-12-13	2022-11-25 00:29:40.629947+08	2022-11-25 00:41:51.395+08
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, picture, "releaseDate", director, duration, synopsis, "createdAt", "updatedAt") FROM stdin;
6	Black Adam	6_1670332101828.jpg	2022-12-23	Jaume Collet-Serra	02:05:00	Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.	2022-11-29 22:35:19.581603+08	\N
3	The Jack in the Box: Awakening	6_1670332530961.jpg	2022-12-29	Lawrence Fowler	01:29:00	When a vintage Jack-in-the-box is opened by a dying woman, she enters into a deal with the demon within that would see her illness cured in return for helping it claim six innocent victims.	2022-11-24 19:23:36.224615+08	2022-11-24 19:24:11.171+08
4	Game of Thrones	6_1670337989130.jpg	2022-12-28	David Benioff	01:00:00	Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.	2022-11-24 19:25:36.894394+08	\N
18	The Lord of the Rings: The Rings of Power	7_1670384635488.jpg	2022-12-30	John D. Payne	01:00:00	Beginning in a time of relative peace, we follow an ensemble cast of characters as they confront the re-emergence of evil to Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of Lindon, to the breathtaking island kingdom of Númenor, to the furthest reaches of the map, these kingdoms and characters will carve out legacies that live on long after they are gone.	2022-12-07 11:43:55.824412+08	\N
17	John Wick: Chapter 3 - Parabellum	6_1670331340879.png	2022-12-05	Chad Stahelski	02:10:00	Super-assassin John Wick returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin’s guild, the High Table, John Wick is excommunicado, but the world’s most ruthless hit men and women await his every turn.	2022-12-06 20:55:41.202257+08	\N
2	Avatar	6_1670332380103.jpg	2022-12-02	James Cameron	02:42:00	In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.	2022-11-24 19:09:05.003603+08	\N
1	Spider-Man: Homecoming	6_1670329401845.png	2022-12-01	Jon Watss	02:13:00	Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.	2022-11-21 18:16:33.456827+08	\N
7	Lion King	6_1670329794177.png	2022-12-03	Jon Favreau	01:58:00	Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny. But not everyone in the kingdom celebrates the new cub's arrival. Scar, Mufasa's brother—and former heir to the throne—has plans of his own. The battle for Pride Rock is ravaged with betrayal, tragedy and drama, ultimately resulting in Simba's exile. With help from a curious pair of newfound friends, Simba will have to figure out how to grow up and take back what is rightfully his.	2022-12-06 20:29:54.546128+08	\N
\.


--
-- Data for Name: paymentMethods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."paymentMethods" (id, picture, name, "createdAt", "updatedAt") FROM stdin;
1	https://toppng.com/uploads/preview/visa-logo-11530966316amvzjrobsf.png	Visa	2022-11-21 23:08:30.036835+08	\N
\.


--
-- Data for Name: reserveSeats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."reserveSeats" (id, "seatNum", "transactionId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: resetPassword; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."resetPassword" (id, email, "userId", code, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, "createdAt", "updatedAt") FROM stdin;
1	Admin	2022-11-21 15:39:25.314318+08	\N
2	User	2022-11-21 15:39:25.314318+08	\N
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (id, name, "createdAt", "updatedAt") FROM stdin;
1	Active	2022-11-21 23:14:52.338427+08	\N
2	Used	2022-11-21 23:14:52.338427+08	\N
\.


--
-- Data for Name: subscribers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subscribers (id, email, "createdAt", "updatedAt") FROM stdin;
1	madiajijah7@gmail.com	2022-11-21 18:54:29.595128+08	\N
2	musmak@gmail.com	2022-11-21 18:54:29.595128+08	\N
3	nadianeyla@gmail.com	2022-11-24 21:50:07.786963+08	2022-11-24 21:50:32.047+08
4	anisa@gmail.com	2022-11-25 00:55:27.463159+08	\N
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, "bookingDate", "movieId", "cinemaId", "movieScheduleId", "fullName", email, "phoneNumber", "statusId", "createdAt", "updatedAt", "paymentMethodId", "userId") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, picture, "firstName", "lastName", "phoneNumber", email, password, "roleId", "createdAt", "updatedAt") FROM stdin;
24	\N	Dian	Rahmadani	082256964453	admin@gmail.com	$2b$10$BbUR8JJUAGx2QcUCCxi/MeXGSvrmudh4XW2w0SS7A6gEXMkyTB7Ky	1	2022-12-06 18:43:42.047579+08	\N
25	6_1670325437859.png	Victoria	Lo	082246587751	victoria@gmail.com	$2b$10$fEV4MVRbzXX8P7QlrVuB0uz8mr3vaoSpHbnK2QjxX6wB3RX3vtz2O	2	2022-12-06 18:44:30.755972+08	\N
\.


--
-- Name: casts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.casts_id_seq', 11, true);


--
-- Name: cinemas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cinemas_id_seq', 4, true);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_id_seq', 21, true);


--
-- Name: movieCasts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."movieCasts_id_seq"', 10, true);


--
-- Name: movieGenre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."movieGenre_id_seq"', 29, true);


--
-- Name: movieScheduleTimes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."movieScheduleTimes_id_seq"', 2, true);


--
-- Name: movieSchedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."movieSchedules_id_seq"', 9, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 18, true);


--
-- Name: paymentMethods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."paymentMethods_id_seq"', 2, true);


--
-- Name: reserveSeats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."reserveSeats_id_seq"', 2, true);


--
-- Name: resetPassword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."resetPassword_id_seq"', 3, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_id_seq', 5, true);


--
-- Name: subscribers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subscribers_id_seq', 11, true);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 32, true);


--
-- Name: casts casts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.casts
    ADD CONSTRAINT casts_pkey PRIMARY KEY (id);


--
-- Name: cinemas cinemas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cinemas
    ADD CONSTRAINT cinemas_pkey PRIMARY KEY (id);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: movieCast movieCasts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieCast"
    ADD CONSTRAINT "movieCasts_pkey" PRIMARY KEY (id);


--
-- Name: movieGenre movieGenre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieGenre"
    ADD CONSTRAINT "movieGenre_pkey" PRIMARY KEY (id);


--
-- Name: movieScheduleTimes movieScheduleTimes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieScheduleTimes"
    ADD CONSTRAINT "movieScheduleTimes_pkey" PRIMARY KEY (id);


--
-- Name: movieSchedules movieSchedules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieSchedules"
    ADD CONSTRAINT "movieSchedules_pkey" PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: paymentMethods paymentMethods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."paymentMethods"
    ADD CONSTRAINT "paymentMethods_pkey" PRIMARY KEY (id);


--
-- Name: reserveSeats reserveSeats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reserveSeats"
    ADD CONSTRAINT "reserveSeats_pkey" PRIMARY KEY (id);


--
-- Name: resetPassword resetPassword_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resetPassword"
    ADD CONSTRAINT "resetPassword_pkey" PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- Name: subscribers subscribers_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_pk UNIQUE (email);


--
-- Name: subscribers subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscribers
    ADD CONSTRAINT subscribers_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: movieCast movieCast_casts_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieCast"
    ADD CONSTRAINT "movieCast_casts_id_fk" FOREIGN KEY ("castId") REFERENCES public.casts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movieCast movieCast_movies_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieCast"
    ADD CONSTRAINT "movieCast_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movieGenre movieGenre_genres_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieGenre"
    ADD CONSTRAINT "movieGenre_genres_id_fk" FOREIGN KEY ("genreId") REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movieGenre movieGenre_movies_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieGenre"
    ADD CONSTRAINT "movieGenre_movies_id_fk" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movieScheduleTimes movieScheduleTimes_movieSchedules_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieScheduleTimes"
    ADD CONSTRAINT "movieScheduleTimes_movieSchedules_null_fk" FOREIGN KEY ("movieScheduleId") REFERENCES public."movieSchedules"(id);


--
-- Name: movieSchedules movieSchedules_cinemas_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieSchedules"
    ADD CONSTRAINT "movieSchedules_cinemas_null_fk" FOREIGN KEY ("cinemaId") REFERENCES public.cinemas(id);


--
-- Name: movieSchedules movieSchedules_movies_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."movieSchedules"
    ADD CONSTRAINT "movieSchedules_movies_null_fk" FOREIGN KEY ("movieId") REFERENCES public.movies(id);


--
-- Name: reserveSeats reserveSeats_transactions_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."reserveSeats"
    ADD CONSTRAINT "reserveSeats_transactions_null_fk" FOREIGN KEY ("transactionId") REFERENCES public.transactions(id);


--
-- Name: resetPassword resetPassword_users_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."resetPassword"
    ADD CONSTRAINT "resetPassword_users_null_fk" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: transactions transactions_cinemas_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_cinemas_null_fk FOREIGN KEY ("cinemaId") REFERENCES public.cinemas(id);


--
-- Name: transactions transactions_movieSchedules_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_movieSchedules_null_fk" FOREIGN KEY ("movieScheduleId") REFERENCES public."movieSchedules"(id);


--
-- Name: transactions transactions_movies_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_movies_null_fk FOREIGN KEY ("movieId") REFERENCES public.movies(id);


--
-- Name: transactions transactions_paymentMethods_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_paymentMethods_null_fk" FOREIGN KEY ("paymentMethodId") REFERENCES public."paymentMethods"(id);


--
-- Name: transactions transactions_status_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_status_null_fk FOREIGN KEY ("statusId") REFERENCES public.status(id);


--
-- Name: transactions transactions_users_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_users_null_fk FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: users users_roles_null_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roles_null_fk FOREIGN KEY ("roleId") REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

