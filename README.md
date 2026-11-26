[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Cm11w/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Cm11w/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# HangukStat — South Korea in Numbers

Entry for [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539) ($50, top 10 share).

A national statistics site about **South Korea**, built as plain static files — no build step,
no network request, no libraries. Open `app/index.html` in a browser and it works, on desktop
and on a phone.

## Why South Korea?

Of the 3,219 submissions, 1,126 were about Indonesia and 1,123 about the USA — and none about
South Korea. Korea is also the most distinctive story in the data: the world's lowest fertility
rate (0.75 in 2024) next to one of the longest life expectancies on Earth (83.6 years), a
$1.9 trillion economy, and a capital region holding half the nation.

## What is inside

- **Overview** — hero KPIs (population 51.75M, GDP $1.88T, GDP per person $36,239, life
  expectancy 83.6 yrs, fertility 0.75, unemployment 2.8%), GDP 2015–2024 line chart, the
  fertility cliff, and an at-a-glance table.
- **Economy** — working chart controls: switch between GDP, GDP per person and growth %, and
  between the full decade and the last 5 years. Prices and jobs (inflation vs unemployment
  charts), a record trade year ($683.7B exports, $51.7B surplus), and sector shares.
- **People** — toggle between the fertility-rate line and a births-vs-deaths grouped bar chart;
  life-expectancy trend; age structure; urbanisation, median age, internet use, tertiary
  attainment.
- **Regions** — bar chart of the 8 largest places plus a sortable, filterable table of all 17
  provinces and metropolitan cities (click a column header to sort, type to filter).
- **Compare** — Korea vs Japan vs OECD average vs World on population, GDP per person, life
  expectancy, fertility and urban share, with a short reading of what the comparison shows.
- **All indicators** — all 30 headline figures in one searchable table.
- **Sources** — every source named, plus method and rounding notes.

Every chart is hand-drawn SVG from this site's own data file (`app/data.js`); every control
does what it says; nothing is a placeholder.

## Data sources

World Bank, World Development Indicators (population, GDP, GDP per capita, growth, life
expectancy, age structure, urbanisation, unemployment, trade share, sector shares);
Statistics Korea, Vital Statistics (fertility, births, deaths, regional populations);
OECD Data (tertiary attainment, health spending, R&D, OECD averages);
Bank of Korea (inflation); MOTIE (exports/imports); United Nations World Population
Prospects (median age). Latest year is 2024 unless stated. Full notes in `app/index.html` →
Sources.

## How to run

```sh
# open the site directly
open app/index.html
# or serve it
python3 -m http.server -d app 8080
```

## Hand-in program

`main.ts` (Node 22) copies `app/` and `screenshots/` to `/output` and writes
`dossier.json` via the kit's vendored `vendor/makefun-frontend.ts` (copied unchanged).

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## QA

- Screenshots are real renders of this site's own code (headless Chrome), 4 shots:
  `1-overview.png` (1280×800), `2-economy.png` (1280×800), `3-people.png` (1280×800),
  `4-overview-phone.png` (390×844) — each under 256 KiB.
- `main.ts` run twice: outputs byte-identical.
- SHA-256 of `dossier.json`: `fac01985b3c2777bf30882e7d2a7b8b908d537f4eb5074ecf0696fad3ad18e6e`
- `app/` is 4 files, 37,592 bytes (cap: 993 files / 16 MiB).
- No network requests: the site loads only `index.html`, `style.css`, `main.js`, `data.js`.
- Kit check: see parent's report (run fresh with the kit).
