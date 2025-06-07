--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.0

-- Started on 2025-06-07 01:21:36 CEST

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

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16385)
-- Name: Clienti; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."Clienti" (
    "Email" character varying NOT NULL,
    "Username" character varying NOT NULL,
    "Password" character varying NOT NULL
);


ALTER TABLE public."Clienti" OWNER TO jackchiara;

--
-- TOC entry 218 (class 1259 OID 16390)
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
-- TOC entry 219 (class 1259 OID 16395)
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
    "Prezzo" character varying NOT NULL
);


ALTER TABLE public."ElencoProdotti" OWNER TO jackchiara;

--
-- TOC entry 220 (class 1259 OID 16400)
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
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 220
-- Name: ElencoProdotti_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jackchiara
--

ALTER SEQUENCE public."ElencoProdotti_ID_seq" OWNED BY public."ElencoProdotti"."ID";


--
-- TOC entry 221 (class 1259 OID 16401)
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
-- TOC entry 223 (class 1259 OID 16420)
-- Name: Ordini; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."Ordini" (
    "ID" integer NOT NULL,
    "EmailCliente" character varying NOT NULL,
    "Data" timestamp without time zone NOT NULL
);


ALTER TABLE public."Ordini" OWNER TO jackchiara;

--
-- TOC entry 225 (class 1259 OID 16438)
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
-- TOC entry 224 (class 1259 OID 16437)
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
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 224
-- Name: OrdiniProdotti_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jackchiara
--

ALTER SEQUENCE public."OrdiniProdotti_ID_seq" OWNED BY public."OrdiniProdotti"."ID";


--
-- TOC entry 222 (class 1259 OID 16419)
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
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 222
-- Name: Ordini_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jackchiara
--

ALTER SEQUENCE public."Ordini_ID_seq" OWNED BY public."Ordini"."ID";


--
-- TOC entry 3232 (class 2604 OID 16406)
-- Name: ElencoProdotti ID; Type: DEFAULT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."ElencoProdotti" ALTER COLUMN "ID" SET DEFAULT nextval('public."ElencoProdotti_ID_seq"'::regclass);


--
-- TOC entry 3233 (class 2604 OID 16423)
-- Name: Ordini ID; Type: DEFAULT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."Ordini" ALTER COLUMN "ID" SET DEFAULT nextval('public."Ordini_ID_seq"'::regclass);


--
-- TOC entry 3234 (class 2604 OID 16441)
-- Name: OrdiniProdotti ID; Type: DEFAULT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."OrdiniProdotti" ALTER COLUMN "ID" SET DEFAULT nextval('public."OrdiniProdotti_ID_seq"'::regclass);


--
-- TOC entry 3392 (class 0 OID 16385)
-- Dependencies: 217
-- Data for Name: Clienti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."Clienti" ("Email", "Username", "Password") FROM stdin;
Pippo@gmail.com	Pippo	$2b$10$iWFrRG4Pxe/DYq4N7egVru68bf1gY7WpF3A9uLBy73EKFXuuwX4Jq
Paolo@gmail.com	Paolo	$2b$10$VdVIgLk1EO7yv3FILS/mcuW87l.tF9xfPwHYjQ/1aB.ODLyvG./8O
\.


--
-- TOC entry 3393 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: DatiCarte; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."DatiCarte" ("Email", "Nome", "Cognome", "Indirizzo", "NumeroCarta", "DataScadenza") FROM stdin;
Piero@gmail.com	Piero	Leclerc	Via Dal Sacco	$2b$10$HxA6AGvD./D/3vVoEI4w2.uIOphSOU/S7N1MsVFf6pkus/e3mj21i	2030-10-10
cristiano@gmail.com	Cristiano	Mirioni	Piazza Insubria 69	$2b$10$GQlz/k3DrOBih1MlYAaxr.ks/kmlw/dXKyZPgVmDYuTNKUavZZ1uy	2026-07-02
Giovanni@gmail.com	Giovanni	Baudo	Via piero	$2b$10$RwWFpVCsGpyCVRRJTqd/leROFwrgnD3gOlSvn90/7eR2oFqKDhd5W	2025-04-04
napoli@gmail.com	Giovanni	Di Lorenzo	Via Giambattista Marino	$2b$10$uPCelDdKuzFBTbB9qOiD3eaJZz3BvMvTcvCrsxcsZ/pv1980rM.ii	2025-06-06
Paolo@gmail.com	Paolo	Rosberg	Via dalle Balls	$2b$10$nPHXtAPJ1EevibCSbSB7PuVK9KgWlSyYA61E904Y21IFP8/9O4Smy	2025-06-19
\.


--
-- TOC entry 3394 (class 0 OID 16395)
-- Dependencies: 219
-- Data for Name: ElencoProdotti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."ElencoProdotti" ("ID", "Email", "NomeProdotto", "Immagine", "Descrizione", "Tipologia", "Quantità", "Prezzo") FROM stdin;
2	napoli@gmail.com	Prodotto Prova	1749051921025-X.png	questo è il primo prodotto	Arte e decorazioni	1	43
7	napoli@gmail.com	Prodotto 5	1749119855026-utente.png	Utente	Oggetti in metallo	4	76
8	napoli@gmail.com	Prodotto 6	1749119958052-carrello1.png	altro carrello	Tessili	6	34
9	napoli@gmail.com	Prodotto 7	1749120057754-aggiungiP.png	Bo	Arte e decorazioni	4	43
10	napoli@gmail.com	Prodotto 8	1749120199784-utente.png	krewfn 	Prodotti naturali	4	342
11	napoli@gmail.com	Mo funziona sto prodotto	1749120265012-ordini.png	fidate	Oggetti in metallo	3	43
12	napoli@gmail.com	Basta	1749120295075-ordini.png	23d2d	Gioielli artigianali	4	32
13	napoli@gmail.com	Prodotto nero	1749162208457-schermonero.png	schermo nero	Altro	4	69
15	napoli@gmail.com	Porro	1749196521303-pack.png	un bel porro	Legno lavorato	3	65
3	napoli@gmail.com	Prodotto 2	1749118933175-O.png	cewcde	Altro	3	32
4	napoli@gmail.com	Prodotto 3	1749119453324-icon.png	pippo	Carta e cartoleria	2	67
5	napoli@gmail.com	Prodotto 4	1749119619126-pack.png	Er Pack	Legno lavorato	22	24
6	napoli@gmail.com	Prodotto bo	1749119813573-carrello.png	Carrello	Tessili	2	100
\.


--
-- TOC entry 3396 (class 0 OID 16401)
-- Dependencies: 221
-- Data for Name: ElencoUtenti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."ElencoUtenti" ("Email", "Username", "Password", "TipoUtente", "DomandaSicurezza", "RispostaSicurezza") FROM stdin;
Pippo@gmail.com	Pippo	$2b$10$45PU57MVM.A/LEjvxhr8B.O/FuDydbOkNVBEN5nDxNqMf.bq9wxLW	cliente	\N	\N
Piero@gmail.com	Piero	$2b$10$eUNSWEJHR66WjzHjaOguq.edjOp3FKCvz9KbY3mcejnNPwOxEnU.i	cliente	\N	\N
cristiano@gmail.com	Cristiano	$2b$10$6UlmqxKkKxYyzcpFy3meluTm9v.382yatC/QVpCxxS4pA9ypyraBi	cliente	Qual è il nome di tua madre?	$2b$10$dqRWwAv4BZ/7dq0x5Y/m.etH0M9PwPTwOWHhJMytqc8h.uxUHah5m
Giovanni@gmail.com	Giovanni	$2b$10$vXkr7FozZmU3MM7kpcNCuuFs27HJtKnpvPnlSbn6/3oV3oacQI5/2	cliente	ah si?	$2b$10$o4B8X6JZGnGZ2CdrtEtG0OwcDaooZt99yzv8Y8MB64vtWEU1dNI5u
		$2b$10$s4mjwZqiUv0wuOCFTJqSYem7TROMGXmWPnK2TvFGlDvfwxJEMs15O	cliente	Qual è il nome di tua madre?	$2b$10$tYyk3qMcKpyizT.Fta3shuJz2b0zyuw8OUBcTG3fLHaUgr2PVukrK
napoli@gmail.com	Insubria&Co.	$2b$10$IvQyP47hrljEhazNB8q1seVFkG5AuBmj9amfEGNdKl0i647nc.f4m	artigiano	In che città sei nato?	$2b$10$xK6eeqZ.KHj1R2Hf7RJ4u.nFWUJQTWl2ox.MWlcyuepOJVjldzzG6
Paolo@gmail.com	Paolo	$2b$10$nB/tUAJR5/ET.0KEwjSFj.OT2q7YWLV9rvTU2UxgDp9JNuy14mwoK	cliente	Qual è il tuo colore preferito?	$2b$10$kyyrv4UGtfw9H1XN9/59Q.0L546m4HfbbAY0NL8khgnCvnkOooEam
\.


--
-- TOC entry 3398 (class 0 OID 16420)
-- Dependencies: 223
-- Data for Name: Ordini; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."Ordini" ("ID", "EmailCliente", "Data") FROM stdin;
7	Paolo@gmail.com	2025-06-06 23:14:44.685648
\.


--
-- TOC entry 3400 (class 0 OID 16438)
-- Dependencies: 225
-- Data for Name: OrdiniProdotti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."OrdiniProdotti" ("ID", "IDOrdine", "IDProdotto", "Quantità", "PrezzoTotale", "EmailArtigiano", "NomeCliente", "CognomeCliente", "Indirizzo", "Provincia") FROM stdin;
7	7	5	3	242424	napoli@gmail.com	Giacomo	Grieco	Via Bolle, 53	Termini
8	7	6	2	100100	napoli@gmail.com	Giacomo	Grieco	Via Bolle, 53	Termini
\.


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 220
-- Name: ElencoProdotti_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: jackchiara
--

SELECT pg_catalog.setval('public."ElencoProdotti_ID_seq"', 15, true);


--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 224
-- Name: OrdiniProdotti_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: jackchiara
--

SELECT pg_catalog.setval('public."OrdiniProdotti_ID_seq"', 8, true);


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 222
-- Name: Ordini_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: jackchiara
--

SELECT pg_catalog.setval('public."Ordini_ID_seq"', 7, true);


--
-- TOC entry 3236 (class 2606 OID 16408)
-- Name: Clienti Clienti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."Clienti"
    ADD CONSTRAINT "Clienti_pkey" PRIMARY KEY ("Email");


--
-- TOC entry 3238 (class 2606 OID 16410)
-- Name: DatiCarte DatiCarte_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."DatiCarte"
    ADD CONSTRAINT "DatiCarte_pkey" PRIMARY KEY ("Email");


--
-- TOC entry 3240 (class 2606 OID 16412)
-- Name: ElencoProdotti ElencoProdotti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."ElencoProdotti"
    ADD CONSTRAINT "ElencoProdotti_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3242 (class 2606 OID 16414)
-- Name: ElencoUtenti ElencoUtenti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."ElencoUtenti"
    ADD CONSTRAINT "ElencoUtenti_pkey" PRIMARY KEY ("Email");


--
-- TOC entry 3246 (class 2606 OID 16445)
-- Name: OrdiniProdotti OrdiniProdotti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."OrdiniProdotti"
    ADD CONSTRAINT "OrdiniProdotti_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3244 (class 2606 OID 16427)
-- Name: Ordini Ordini_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."Ordini"
    ADD CONSTRAINT "Ordini_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-06-07 01:21:36 CEST

--
-- PostgreSQL database dump complete
--

