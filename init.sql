--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.0

-- Started on 2025-06-08 19:16:42 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

-- CREATE SCHEMA public;


-- ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16390)
-- Name: DatiCarte; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."DatiCarte" (
    "Email" character varying NOT NULL,
    "Nome" character varying NOT NULL,
    "Cognome" character varying NOT NULL,
    "Indirizzo" character varying NOT NULL,
    "NumeroCarta" character varying NOT NULL,
    "DataScadenza" date NOT NULL
);


ALTER TABLE public."DatiCarte" OWNER TO jackchiara;

--
-- TOC entry 218 (class 1259 OID 16395)
-- Name: ElencoProdotti; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."ElencoProdotti" (
    "ID" integer NOT NULL,
    "Email" character varying NOT NULL,
    "NomeProdotto" character varying NOT NULL,
    "Immagine" character varying NOT NULL,
    "Descrizione" text NOT NULL,
    "Tipologia" character varying NOT NULL,
    "Quantità" integer NOT NULL,
    "Prezzo" character varying NOT NULL,
    "Username" character varying
);


ALTER TABLE public."ElencoProdotti" OWNER TO jackchiara;

--
-- TOC entry 219 (class 1259 OID 16400)
-- Name: ElencoProdotti_ID_seq; Type: SEQUENCE; Schema: public; Owner: jackchiara
--

CREATE SEQUENCE public."ElencoProdotti_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ElencoProdotti_ID_seq" OWNER TO jackchiara;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 219
-- Name: ElencoProdotti_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jackchiara
--

ALTER SEQUENCE public."ElencoProdotti_ID_seq" OWNED BY public."ElencoProdotti"."ID";


--
-- TOC entry 220 (class 1259 OID 16401)
-- Name: ElencoUtenti; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."ElencoUtenti" (
    "Email" character varying NOT NULL,
    "Username" character varying NOT NULL,
    "Password" character varying NOT NULL,
    "TipoUtente" character varying NOT NULL,
    "DomandaSicurezza" character varying(255),
    "RispostaSicurezza" character varying(255)
);


ALTER TABLE public."ElencoUtenti" OWNER TO jackchiara;

--
-- TOC entry 221 (class 1259 OID 16406)
-- Name: Ordini; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."Ordini" (
    "ID" integer NOT NULL,
    "EmailCliente" character varying NOT NULL,
    "Data" timestamp without time zone NOT NULL
);


ALTER TABLE public."Ordini" OWNER TO jackchiara;

--
-- TOC entry 222 (class 1259 OID 16411)
-- Name: OrdiniProdotti; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."OrdiniProdotti" (
    "ID" integer NOT NULL,
    "IDOrdine" integer NOT NULL,
    "IDProdotto" integer NOT NULL,
    "Quantità" integer NOT NULL,
    "PrezzoTotale" numeric NOT NULL,
    "EmailArtigiano" character varying NOT NULL,
    "NomeCliente" character varying,
    "CognomeCliente" character varying,
    "Indirizzo" character varying,
    "Provincia" character varying
);


ALTER TABLE public."OrdiniProdotti" OWNER TO jackchiara;

--
-- TOC entry 223 (class 1259 OID 16416)
-- Name: OrdiniProdotti_ID_seq; Type: SEQUENCE; Schema: public; Owner: jackchiara
--

CREATE SEQUENCE public."OrdiniProdotti_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrdiniProdotti_ID_seq" OWNER TO jackchiara;

--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 223
-- Name: OrdiniProdotti_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jackchiara
--

ALTER SEQUENCE public."OrdiniProdotti_ID_seq" OWNED BY public."OrdiniProdotti"."ID";


--
-- TOC entry 224 (class 1259 OID 16417)
-- Name: Ordini_ID_seq; Type: SEQUENCE; Schema: public; Owner: jackchiara
--

CREATE SEQUENCE public."Ordini_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ordini_ID_seq" OWNER TO jackchiara;

--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 224
-- Name: Ordini_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jackchiara
--

ALTER SEQUENCE public."Ordini_ID_seq" OWNED BY public."Ordini"."ID";


--
-- TOC entry 226 (class 1259 OID 16438)
-- Name: Segnalazioni; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."Segnalazioni" (
    "ID" integer NOT NULL,
    "EmailSegnalatore" character varying NOT NULL,
    "TestoSegnalazione" character varying NOT NULL,
    "DataSegnalazione" timestamp without time zone DEFAULT now() NOT NULL,
    "TipoUtente" character varying NOT NULL
);


ALTER TABLE public."Segnalazioni" OWNER TO jackchiara;

--
-- TOC entry 225 (class 1259 OID 16437)
-- Name: Segnalazioni_ID_seq; Type: SEQUENCE; Schema: public; Owner: jackchiara
--

CREATE SEQUENCE public."Segnalazioni_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Segnalazioni_ID_seq" OWNER TO jackchiara;

--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 225
-- Name: Segnalazioni_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jackchiara
--

ALTER SEQUENCE public."Segnalazioni_ID_seq" OWNED BY public."Segnalazioni"."ID";


--
-- TOC entry 3233 (class 2604 OID 16418)
-- Name: ElencoProdotti ID; Type: DEFAULT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."ElencoProdotti" ALTER COLUMN "ID" SET DEFAULT nextval('public."ElencoProdotti_ID_seq"'::regclass);


--
-- TOC entry 3234 (class 2604 OID 16419)
-- Name: Ordini ID; Type: DEFAULT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."Ordini" ALTER COLUMN "ID" SET DEFAULT nextval('public."Ordini_ID_seq"'::regclass);


--
-- TOC entry 3235 (class 2604 OID 16420)
-- Name: OrdiniProdotti ID; Type: DEFAULT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."OrdiniProdotti" ALTER COLUMN "ID" SET DEFAULT nextval('public."OrdiniProdotti_ID_seq"'::regclass);


--
-- TOC entry 3236 (class 2604 OID 16441)
-- Name: Segnalazioni ID; Type: DEFAULT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."Segnalazioni" ALTER COLUMN "ID" SET DEFAULT nextval('public."Segnalazioni_ID_seq"'::regclass);


--
-- TOC entry 3395 (class 0 OID 16390)
-- Dependencies: 217
-- Data for Name: DatiCarte; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."DatiCarte" ("Email", "Nome", "Cognome", "Indirizzo", "NumeroCarta", "DataScadenza") FROM stdin;
artigiano@insubria.it	Domenico	Landolfo	Via Meda, 3	$2b$10$j7vTcDKkH90N4wyMnCwR1OKNyVVXHqzQCydOGxwFBcCU5PBn1g5ai	2025-06-13
dogodogo@gmail.com	Silvia	Grieco	Via Jackal, 32	$2b$10$6F8e2uo983hhDQI17/VBBeZhTeIBwdMn3Wqudj8LxTnPS0oVrjije	2026-12-31
paolo12@gmail.com	Paolo	Mirioni	Via Re Magi, 70	$2b$10$nV5YHQTmFZpcq/mfXRkb6esGXfu6zS/ShnGy0QhpNJ.lVJ/MfBAmS	2026-06-18
\.


--
-- TOC entry 3396 (class 0 OID 16395)
-- Dependencies: 218
-- Data for Name: ElencoProdotti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."ElencoProdotti" ("ID", "Email", "NomeProdotto", "Immagine", "Descrizione", "Tipologia", "Quantità", "Prezzo", "Username") FROM stdin;
26	artigiano@insubria.it	Porta gomitoli	1749401669882-prodotto2.jpeg	Porta gomitoli artigianale	Legno lavorato	2	35	\N
25	artigiano@insubria.it	Acquario	1749401611850-prodotto1.jpg	Acquario in vetro soffiato	Arte e decorazioni	3	65	\N
27	dogodogo@gmail.com	Porta gioie	1749401871959-prodotto3.jpg	Porta gioie in cartone rigido	Gioielli artigianali	10	14	\N
\.


--
-- TOC entry 3398 (class 0 OID 16401)
-- Dependencies: 220
-- Data for Name: ElencoUtenti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."ElencoUtenti" ("Email", "Username", "Password", "TipoUtente", "DomandaSicurezza", "RispostaSicurezza") FROM stdin;
admin123$$		$2a$10$LS1.Sb.20LhQ8vJ/CIwkUeL9Z2Qk6FciI9iPTbf4hUBzEsd1v940u	admin		
artigiano@insubria.it	ArtigianoInsubria	$2b$10$7RQUuQKCpjZ3y.9AmWUOo.kKDObC/DJ9gOMTHBw3BEpNB7phRWC3O	artigiano	Come si chiamava il tuo primo animale domestico?	$2b$10$PwmZFKA14WFRrIGUBj4ia.b6HREG1lWEd.ylpRqDo9nK93fPYcw3C
dogodogo@gmail.com	Dogo&Co.	$2b$10$nK3TH.GTMZI5q93hpFy2v.f1TXIPOT/Ld/VTEbu8qtk9eGNXlfGmi	artigiano	In che città sei nato?	$2b$10$jJQW92/JnCc7ddOKubr7yOXSUUiwS2TsUJ8G6khDO9e83x5ZQbuj.
paolo12@gmail.com	gigi12	$2b$10$g8I7IwSev2skWY4Wxw8TvuHf5MivK.m52c64g6COfMyy6VNxf8V.6	cliente	Qual è il nome di tua madre?	$2b$10$hWDC7.LyfY01f7Tti6Doi.isBd3s92gmNGh3g91vjGP7OPOAJrivO
\.


--
-- TOC entry 3399 (class 0 OID 16406)
-- Dependencies: 221
-- Data for Name: Ordini; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."Ordini" ("ID", "EmailCliente", "Data") FROM stdin;
16	paolo12@gmail.com	2025-06-08 17:00:43.012581
\.


--
-- TOC entry 3400 (class 0 OID 16411)
-- Dependencies: 222
-- Data for Name: OrdiniProdotti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."OrdiniProdotti" ("ID", "IDOrdine", "IDProdotto", "Quantità", "PrezzoTotale", "EmailArtigiano", "NomeCliente", "CognomeCliente", "Indirizzo", "Provincia") FROM stdin;
24	16	25	1	65	artigiano@insubria.it	Paolo	Mirioni	Via Re Magi, 5	Varese
25	16	26	1	35	artigiano@insubria.it	Paolo	Mirioni	Via Re Magi, 5	Varese
26	16	27	3	42	dogodogo@gmail.com	Paolo	Mirioni	Via Re Magi, 5	Varese
\.


--
-- TOC entry 3404 (class 0 OID 16438)
-- Dependencies: 226
-- Data for Name: Segnalazioni; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."Segnalazioni" ("ID", "EmailSegnalatore", "TestoSegnalazione", "DataSegnalazione", "TipoUtente") FROM stdin;
2	dogodogo@gmail.com	Questa è una segnalazione	2025-06-08 17:12:18.197304	artigiano
\.


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 219
-- Name: ElencoProdotti_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: jackchiara
--

SELECT pg_catalog.setval('public."ElencoProdotti_ID_seq"', 27, true);


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 223
-- Name: OrdiniProdotti_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: jackchiara
--

SELECT pg_catalog.setval('public."OrdiniProdotti_ID_seq"', 29, true);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 224
-- Name: Ordini_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: jackchiara
--

SELECT pg_catalog.setval('public."Ordini_ID_seq"', 18, true);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 225
-- Name: Segnalazioni_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: jackchiara
--

SELECT pg_catalog.setval('public."Segnalazioni_ID_seq"', 2, true);


--
-- TOC entry 3239 (class 2606 OID 16424)
-- Name: DatiCarte DatiCarte_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."DatiCarte"
    ADD CONSTRAINT "DatiCarte_pkey" PRIMARY KEY ("Email");


--
-- TOC entry 3241 (class 2606 OID 16426)
-- Name: ElencoProdotti ElencoProdotti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."ElencoProdotti"
    ADD CONSTRAINT "ElencoProdotti_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3243 (class 2606 OID 16428)
-- Name: ElencoUtenti ElencoUtenti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."ElencoUtenti"
    ADD CONSTRAINT "ElencoUtenti_pkey" PRIMARY KEY ("Email");


--
-- TOC entry 3247 (class 2606 OID 16430)
-- Name: OrdiniProdotti OrdiniProdotti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."OrdiniProdotti"
    ADD CONSTRAINT "OrdiniProdotti_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3245 (class 2606 OID 16432)
-- Name: Ordini Ordini_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."Ordini"
    ADD CONSTRAINT "Ordini_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3249 (class 2606 OID 16446)
-- Name: Segnalazioni Segnalazioni_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."Segnalazioni"
    ADD CONSTRAINT "Segnalazioni_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-06-08 19:16:42 CEST

--
-- PostgreSQL database dump complete
--

