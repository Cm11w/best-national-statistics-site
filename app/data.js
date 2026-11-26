// HangukStat — South Korea in Numbers.
// All figures are real, from the sources listed on the Sources page
// (World Bank World Development Indicators, Statistics Korea / KOSTAT,
// OECD, Bank of Korea, Ministry of Trade, Industry and Energy).
// Every series below is the value for the year shown; "latest" is 2024
// unless a figure is marked otherwise. Values are rounded for display;
// the dossier page states the rounding.

export const META = {
  country: "South Korea",
  korean: "대한민국",
  updated: "26 November 2026",
  latestYear: 2024,
  sources: [
    { name: "World Bank, World Development Indicators", short: "World Bank WDI" },
    { name: "Statistics Korea (KOSTAT) — Vital Statistics, Population", short: "KOSTAT" },
    { name: "OECD Data", short: "OECD" },
    { name: "Bank of Korea", short: "Bank of Korea" },
    { name: "Ministry of Trade, Industry and Energy (MOTIE)", short: "MOTIE" },
  ],
};

export const KPI = [
  { id: "population", label: "Population", value: "51.75M", note: "2024 · peaked at 51.84M in 2020", unit: "people" },
  { id: "gdp", label: "GDP", value: "$1.88T", note: "2024 · 12th largest economy", unit: "current US$" },
  { id: "gdppc", label: "GDP per person", value: "$36,239", note: "2024 · $61,968 at PPP", unit: "current US$" },
  { id: "life", label: "Life expectancy", value: "83.6 yrs", note: "2024 · women 86.6, men 80.8", unit: "years" },
  { id: "fertility", label: "Fertility rate", value: "0.75", note: "2024 · world's lowest; 0.72 in 2023", unit: "births per woman" },
  { id: "unemployment", label: "Unemployment", value: "2.8%", note: "2024 · among the lowest in the OECD", unit: "of labour force" },
];

// GDP, current US$ billions (World Bank WDI, NY.GDP.MKTP.CD)
export const GDP = [
  { year: 2015, gdp: 1466, perCapita: 28732, growth: 2.8 },
  { year: 2016, gdp: 1500, perCapita: 29286, growth: 2.9 },
  { year: 2017, gdp: 1623, perCapita: 31628, growth: 3.2 },
  { year: 2018, gdp: 1725, perCapita: 33429, growth: 2.9 },
  { year: 2019, gdp: 1651, perCapita: 31937, growth: 2.3 },
  { year: 2020, gdp: 1644, perCapita: 31716, growth: -0.7 },
  { year: 2021, gdp: 1811, perCapita: 34982, growth: 4.6 },
  { year: 2022, gdp: 1674, perCapita: 32398, growth: 2.7 },
  { year: 2023, gdp: 1713, perCapita: 33121, growth: 1.6 },
  { year: 2024, gdp: 1875, perCapita: 36239, growth: 2.0 },
];

// Trade and prices (MOTIE for goods trade; Bank of Korea / WDI for the rest)
export const TRADE = {
  exportsGoods: 683.7, // $B, 2024 — a record year
  importsGoods: 632.0, // $B, 2024
  surplusGoods: 51.7, // $B, 2024
  exportsShareGDP: 44.4, // exports of goods and services, % of GDP, 2024
  semiconductors: 141.9, // $B of exports, 2024 — about 21% of goods exports
};

export const PRICES = [
  { year: 2015, inflation: 0.7, unemployment: 3.6 },
  { year: 2016, inflation: 1.0, unemployment: 3.7 },
  { year: 2017, inflation: 1.9, unemployment: 3.7 },
  { year: 2018, inflation: 1.5, unemployment: 3.8 },
  { year: 2019, inflation: 0.4, unemployment: 3.8 },
  { year: 2020, inflation: 0.5, unemployment: 3.9 },
  { year: 2021, inflation: 2.5, unemployment: 3.7 },
  { year: 2022, inflation: 5.1, unemployment: 2.9 },
  { year: 2023, inflation: 3.6, unemployment: 2.7 },
  { year: 2024, inflation: 2.3, unemployment: 2.8 },
];

// Value added by sector, % of GDP, 2024 (World Bank WDI)
export const SECTORS = [
  { name: "Services", share: 57.5 },
  { name: "Industry", share: 33.9 },
  { name: "Agriculture, forestry & fishing", share: 1.5 },
  { name: "Taxes less subsidies on products", share: 7.1 },
];

// Demography (KOSTAT vital statistics; World Bank WDI)
export const FERTILITY = [
  { year: 2015, tfr: 1.24, births: 438.4, deaths: 275.9 },
  { year: 2016, tfr: 1.17, births: 406.2, deaths: 280.8 },
  { year: 2017, tfr: 1.05, births: 357.8, deaths: 285.5 },
  { year: 2018, tfr: 0.98, births: 326.8, deaths: 298.8 },
  { year: 2019, tfr: 0.92, births: 302.7, deaths: 295.1 },
  { year: 2020, tfr: 0.84, births: 272.3, deaths: 304.9 },
  { year: 2021, tfr: 0.81, births: 260.6, deaths: 317.7 },
  { year: 2022, tfr: 0.78, births: 249.2, deaths: 372.9 },
  { year: 2023, tfr: 0.72, births: 230.0, deaths: 352.5 },
  { year: 2024, tfr: 0.75, births: 238.3, deaths: 358.4 },
];

export const LIFE = [
  { year: 2015, all: 82.1 }, { year: 2016, all: 82.4 }, { year: 2017, all: 82.7 },
  { year: 2018, all: 82.7 }, { year: 2019, all: 83.3 }, { year: 2020, all: 83.5 },
  { year: 2021, all: 83.6 }, { year: 2022, all: 83.5 }, { year: 2023, all: 83.5 },
  { year: 2024, all: 83.6 },
];

// Age structure, 2024 (World Bank WDI / KOSTAT)
export const AGE = [
  { group: "0–14", share: 11.0 },
  { group: "15–64", share: 69.7 },
  { group: "65+", share: 19.3 },
];

export const PEOPLE_EXTRA = {
  urban: 81.2, // % of population in urban areas, 2024
  medianAge: 45.5, // years, 2024 (UN estimate)
  population2020: 51.84, // million — the peak year
  population1960: 25.0, // million — for the long view
  internet: 97, // % of people using the internet, 2023
  tertiary: 69, // % of 25–34 year-olds with a tertiary degree, OECD 2023
  rd: 5.2, // R&D spending, % of GDP, 2022 (OECD)
  health: 9.7, // health spending, % of GDP, 2023 (OECD)
};

// Largest cities and provinces, resident population, millions, 2024 (KOSTAT)
export const REGIONS = [
  { name: "Gyeonggi-do", type: "Province", pop: 13.71, note: "Encircles Seoul; the largest province" },
  { name: "Seoul", type: "Special city", pop: 9.38, note: "Capital; about 1 in 5 Koreans" },
  { name: "Busan", type: "Metropolitan city", pop: 3.29, note: "Largest port; second city" },
  { name: "Incheon", type: "Metropolitan city", pop: 3.01, note: "Airport gateway, west of Seoul" },
  { name: "South Gyeongsang", type: "Province", pop: 3.23, note: "Manufacturing belt around Changwon" },
  { name: "North Gyeongsang", type: "Province", pop: 2.54, note: "Largest province by area" },
  { name: "Daegu", type: "Metropolitan city", pop: 2.36, note: "Textiles and electronics hub" },
  { name: "South Chungcheong", type: "Province", pop: 2.14, note: "Home of the Sejong admin city" },
  { name: "South Jeolla", type: "Province", pop: 1.78, note: "Farming and food heartland" },
  { name: "North Chungcheong", type: "Province", pop: 1.59, note: "Semiconductors in Cheongju" },
  { name: "North Jeolla", type: "Province", pop: 1.75, note: "Saemangeum reclamation zone" },
  { name: "Daejeon", type: "Metropolitan city", pop: 1.44, note: "Science town: Daedeok Innopolis" },
  { name: "Gangwon-do", type: "Special self-governing province", pop: 1.52, note: "Mountains; 2018 Winter Olympics" },
  { name: "Gwangju", type: "Metropolitan city", pop: 1.41, note: "Democracy movement city" },
  { name: "Ulsan", type: "Metropolitan city", pop: 1.10, note: "Shipbuilding and cars" },
  { name: "Jeju-do", type: "Special self-governing province", pop: 0.68, note: "Island resort province" },
  { name: "Sejong", type: "Special self-governing city", pop: 0.39, note: "New administrative capital" },
];

// Comparison table, 2024 (World Bank WDI; OECD for the OECD row)
export const COMPARE = [
  { place: "South Korea", pop: "51.75M", gdpPc: "$36,239", life: "83.6", fertility: "0.75", urban: "81.2%" },
  { place: "Japan", pop: "124.0M", gdpPc: "$32,465", life: "84.0", fertility: "1.15", urban: "91.8%" },
  { place: "OECD average", pop: "—", gdpPc: "—", life: "81.0", fertility: "1.43", urban: "—" },
  { place: "World", pop: "8.20B", gdpPc: "$13,300*", life: "73.5", fertility: "2.19", urban: "58.0%" },
];

// Every indicator on one searchable table (indicator, value, year, source)
export const INDICATORS = [
  { name: "Population", value: "51.75 million", year: 2024, source: "World Bank WDI" },
  { name: "GDP, nominal", value: "$1,875 billion", year: 2024, source: "World Bank WDI" },
  { name: "GDP per capita", value: "$36,239", year: 2024, source: "World Bank WDI" },
  { name: "GDP, PPP", value: "$3.21 trillion", year: 2024, source: "World Bank WDI" },
  { name: "GDP per capita, PPP", value: "$61,968", year: 2024, source: "World Bank WDI" },
  { name: "Real GDP growth", value: "2.0%", year: 2024, source: "World Bank WDI" },
  { name: "Life expectancy at birth", value: "83.6 years", year: 2024, source: "World Bank WDI" },
  { name: "Life expectancy, women", value: "86.6 years", year: 2024, source: "World Bank WDI" },
  { name: "Life expectancy, men", value: "80.8 years", year: 2024, source: "World Bank WDI" },
  { name: "Total fertility rate", value: "0.75 births per woman", year: 2024, source: "KOSTAT" },
  { name: "Live births", value: "238,300", year: 2024, source: "KOSTAT" },
  { name: "Deaths", value: "358,400", year: 2024, source: "KOSTAT" },
  { name: "Crude birth rate", value: "4.7 per 1,000", year: 2024, source: "KOSTAT" },
  { name: "Crude death rate", value: "7.0 per 1,000", year: 2024, source: "KOSTAT" },
  { name: "Population aged 65+", value: "19.3%", year: 2024, source: "World Bank WDI" },
  { name: "Population aged 0–14", value: "11.0%", year: 2024, source: "World Bank WDI" },
  { name: "Median age", value: "45.5 years", year: 2024, source: "UN World Population Prospects" },
  { name: "Urban population", value: "81.2%", year: 2024, source: "World Bank WDI" },
  { name: "Unemployment rate", value: "2.8%", year: 2024, source: "World Bank WDI" },
  { name: "Consumer price inflation", value: "2.3%", year: 2024, source: "Bank of Korea" },
  { name: "Exports of goods", value: "$683.7 billion", year: 2024, source: "MOTIE" },
  { name: "Imports of goods", value: "$632.0 billion", year: 2024, source: "MOTIE" },
  { name: "Exports of goods and services", value: "44.4% of GDP", year: 2024, source: "World Bank WDI" },
  { name: "Semiconductor exports", value: "$141.9 billion", year: 2024, source: "MOTIE" },
  { name: "Services, value added", value: "57.5% of GDP", year: 2024, source: "World Bank WDI" },
  { name: "Industry, value added", value: "33.9% of GDP", year: 2024, source: "World Bank WDI" },
  { name: "R&D spending", value: "5.2% of GDP", year: 2022, source: "OECD" },
  { name: "Health spending", value: "9.7% of GDP", year: 2023, source: "OECD" },
  { name: "Tertiary education, age 25–34", value: "69%", year: 2023, source: "OECD" },
  { name: "Internet users", value: "97% of people", year: 2023, source: "World Bank WDI" },
];
