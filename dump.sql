--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: jackchiara
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO jackchiara;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: jackchiara
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Clienti; Type: TABLE; Schema: public; Owner: jackchiara
--

CREATE TABLE public."Clienti" (
    "Email" character varying NOT NULL,
    "Username" character varying NOT NULL,
    "Password" character varying NOT NULL
);


ALTER TABLE public."Clienti" OWNER TO jackchiara;

--
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
-- Data for Name: Clienti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."Clienti" ("Email", "Username", "Password") FROM stdin;
Pippo@gmail.com	Pippo	$2b$10$iWFrRG4Pxe/DYq4N7egVru68bf1gY7WpF3A9uLBy73EKFXuuwX4Jq
Paolo@gmail.com	Paolo	$2b$10$VdVIgLk1EO7yv3FILS/mcuW87l.tF9xfPwHYjQ/1aB.ODLyvG./8O
\.


--
-- Data for Name: DatiCarte; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."DatiCarte" ("Email", "Nome", "Cognome", "Indirizzo", "NumeroCarta", "DataScadenza") FROM stdin;
Piero@gmail.com	Piero	Leclerc	Via Dal Sacco	$2b$10$HxA6AGvD./D/3vVoEI4w2.uIOphSOU/S7N1MsVFf6pkus/e3mj21i	2030-10-10
Paolo@gmail.com	Paolo	Hamilton	Piazza Insubria 69	$2b$10$.CEyWSsUOLh/iNgQBNGy5un.pnGEK4XLYRleClCKwnPGT3bU/Okpu	2026-01-01
cristiano@gmail.com	Cristiano	Mirioni	Piazza Insubria 69	$2b$10$GQlz/k3DrOBih1MlYAaxr.ks/kmlw/dXKyZPgVmDYuTNKUavZZ1uy	2026-07-02
Giovanni@gmail.com	Giovanni	Baudo	Via piero	$2b$10$RwWFpVCsGpyCVRRJTqd/leROFwrgnD3gOlSvn90/7eR2oFqKDhd5W	2025-04-04
\.


--
-- Data for Name: ElencoUtenti; Type: TABLE DATA; Schema: public; Owner: jackchiara
--

COPY public."ElencoUtenti" ("Email", "Username", "Password", "TipoUtente", "DomandaSicurezza", "RispostaSicurezza") FROM stdin;
Pippo@gmail.com	Pippo	$2b$10$45PU57MVM.A/LEjvxhr8B.O/FuDydbOkNVBEN5nDxNqMf.bq9wxLW	cliente	\N	\N
Piero@gmail.com	Piero	$2b$10$eUNSWEJHR66WjzHjaOguq.edjOp3FKCvz9KbY3mcejnNPwOxEnU.i	cliente	\N	\N
Paolo@gmail.com	Paolo	$2b$10$xRGJB67IITyXX1TgEQVJyOU6.m0oYds.t23/LEiccs9qtDd7RINrq	cliente	Qual è il tuo colore preferito?	$2b$10$kyyrv4UGtfw9H1XN9/59Q.0L546m4HfbbAY0NL8khgnCvnkOooEam
cristiano@gmail.com	Cristiano	$2b$10$6UlmqxKkKxYyzcpFy3meluTm9v.382yatC/QVpCxxS4pA9ypyraBi	cliente	Qual è il nome di tua madre?	$2b$10$dqRWwAv4BZ/7dq0x5Y/m.etH0M9PwPTwOWHhJMytqc8h.uxUHah5m
Giovanni@gmail.com	Giovanni	$2b$10$vXkr7FozZmU3MM7kpcNCuuFs27HJtKnpvPnlSbn6/3oV3oacQI5/2	cliente	ah si?	$2b$10$o4B8X6JZGnGZ2CdrtEtG0OwcDaooZt99yzv8Y8MB64vtWEU1dNI5u
\.


--
-- Name: Clienti Clienti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."Clienti"
    ADD CONSTRAINT "Clienti_pkey" PRIMARY KEY ("Email");


--
-- Name: DatiCarte DatiCarte_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."DatiCarte"
    ADD CONSTRAINT "DatiCarte_pkey" PRIMARY KEY ("Email");


--
-- Name: ElencoUtenti ElencoUtenti_pkey; Type: CONSTRAINT; Schema: public; Owner: jackchiara
--

ALTER TABLE ONLY public."ElencoUtenti"
    ADD CONSTRAINT "ElencoUtenti_pkey" PRIMARY KEY ("Email");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: jackchiara
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

