# GymTracker – pregled prevzetega projekta

Prevzeti projekt: GymTracker (avtor Gal Petelin), spletna aplikacija za načrtovanje treningov, beleženje serij in spremljanje napredka. Trener lahko po soglasju člana dodeljuje programe in pregleduje njegove rezultate.

Tehnologije: React + TypeScript + Vite (frontend), Node.js + Express + TypeScript (backend), PostgreSQL s Prisma ORM, avtentikacija z JWT in Argon2id, testi z Vitest in Supertest.

## Implementirane funkcionalnosti MVP

| ID | Funkcionalnost | Stanje |
|---|---|---|
| F01 | Registracija, prijava, odjava, vloge | Implementirano |
| F02 | Povabilo trenerja, sprejem/zavrnitev, prekinitev povezave | Implementirano |
| F04 | Programi z dnevi in vajami | Implementirano |
| F05 | Dodelitev programa povezanemu članu | Implementirano |
| F06 | Zagon treninga in beleženje serij | Implementirano |
| F07 | Zaključek treninga, opomba, zgodovina | Implementirano |
| F08 | Graf napredka po vaji, trenerjev vpogled | Implementirano |

Vse funkcionalnosti, ki so v dokumentu `02-funkcionalnosti-in-obseg.md` označene kot MVP, so implementirane. Funkcionalnosti F03 in F09–F14 so bile označene kot »predvideno« in niso del MVP. Projekt ima 235 testov na frontendu ter 4 enotske in 272 integracijskih testov na backendu.

## Ujemanje z uporabniškimi zgodbami

Pregledanih je 5 uporabniških zgodb iz `05-uporabniske-zgodbe.md`.

**US-01 – Registracija novega člana:** delno ustreza. Obrazec zahteva ime, e-pošto in geslo, podvojen e-naslov vrne napako 409, geslo se shrani kot zgoščena vrednost Argon2id. Odstopanje: pri registraciji je mogoče izbrati možnost »Register as a trainer«, zato račun ne dobi vedno vloge `MEMBER` (kriterij 2).

**US-04 – Dostop glede na vlogo:** delno ustreza. Pravice preverja backend in nedovoljen dostop zavrne s statusom 403. Kriterij 5 (uporabnik si vloge ne more določiti v registracijskem zahtevku) ni izpolnjen, ker zahtevek vsebuje polje `registerAsTrainer`. To je v nasprotju tudi z »Mejami prve različice« v dokumentu 02.

**US-06 – Sprejem ali zavrnitev povabila:** ustreza. Član vidi prejeta povabila, lahko jih sprejme ali zavrne, status odgovora lahko spremeni samo povabljeni član (sicer 403), odgovoriti je mogoče samo na povabilo s statusom `PENDING`.

**US-12 – Beleženje izvedenih serij:** ustreza. Ponovitve morajo biti celo število večje od 0, teža nenegativna in neobvezna. Podvojena številka serije vrne 409, serije lahko dodaja le lastnik treninga in samo pri statusu `IN_PROGRESS`.

**US-15 – Lastni napredek po vaji:** ustreza. Največja teža se izračuna v bazi samo iz zaključenih treningov in serij s težo, točke so razvrščene kronološko, graf je narejen z Recharts.

## Opažanja

Aplikacijo sem zagnal na svojem računalniku po navodilih iz README in preizkusil glavne funkcije. Vse je delovalo, kot je opisano. Opazil sem, da dokumentacija ponekod ni usklajena s kodo. V dokumentu o arhitekturi je en razdelek ostal prazen, nekatere poti in opis prijave pa so zapisani drugače, kot so na koncu narejeni. Projekt še nima orodja za preverjanje sloga kode (linterja) in ne samodejnega preverjanja in nameščanja (CI/CD). To bom dodal v drugem delu naloge.
