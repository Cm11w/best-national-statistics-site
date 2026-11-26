// HangukStat — South Korea in Numbers.
// A hash-routed single-page site. No network: all data lives in data.js,
// all charts are inline SVG drawn by the functions below.
import {
  META, KPI, GDP, TRADE, PRICES, SECTORS, FERTILITY, LIFE, AGE,
  PEOPLE_EXTRA, REGIONS, COMPARE, INDICATORS,
} from "./data.js";

const view = document.getElementById("view");
const nav = document.getElementById("nav");

// ---------------------------------------------------------------- charts ---
const NS = "http://www.w3.org/2000/svg";
function svgOpen(w, h) {
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="chart">`;
}
function niceTicks(min, max, n = 4) {
  const step = (max - min) / n;
  const out = [];
  for (let i = 0; i <= n; i++) out.push(min + step * i);
  return out;
}
function fmtNum(v) {
  return v >= 1000 ? v.toLocaleString("en-US") : String(Math.round(v * 100) / 100);
}

// Line chart: pts = [{x: "2015", y: 1466}], fmt formats y values.
function lineChart(pts, { color = "#c8102e", fmt = fmtNum, height = 340, ymin = null, ymax = null } = {}) {
  const W = 1000, H = height, PL = 64, PR = 16, PT = 18, PB = 34;
  const ys = pts.map((p) => p.y);
  let lo = ymin ?? Math.min(...ys);
  let hi = ymax ?? Math.max(...ys);
  if (hi === lo) { hi = lo + 1; }
  const pad = (hi - lo) * 0.12;
  lo -= pad; hi += pad;
  const X = (i) => PL + (i * (W - PL - PR)) / (pts.length - 1);
  const Y = (v) => PT + (1 - (v - lo) / (hi - lo)) * (H - PT - PB);
  let s = svgOpen(W, H);
  for (const t of niceTicks(lo, hi)) {
    const y = Y(t);
    s += `<line class="grid" x1="${PL}" y1="${y}" x2="${W - PR}" y2="${y}"/>`;
    s += `<text class="lbl" x="${PL - 8}" y="${y + 4}" text-anchor="end">${fmt(t)}</text>`;
  }
  s += `<line class="axis" x1="${PL}" y1="${H - PB}" x2="${W - PR}" y2="${H - PB}"/>`;
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${X(i).toFixed(1)},${Y(p.y).toFixed(1)}`).join(" ");
  s += `<path d="${d}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>`;
  pts.forEach((p, i) => {
    s += `<circle cx="${X(i)}" cy="${Y(p.y)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="1.5"/>`;
    if (i % 2 === 0 || i === pts.length - 1) {
      s += `<text class="val" x="${X(i)}" y="${Y(p.y) - 10}" text-anchor="middle">${fmt(p.y)}</text>`;
    }
    s += `<text class="lbl" x="${X(i)}" y="${H - 12}" text-anchor="middle">${p.x}</text>`;
  });
  return s + "</svg>";
}

// Grouped bar chart: groups = [{x, a, b}], labels for a and b.
function groupedBars(groups, { aLabel, bLabel, colorA = "#1e3a5f", colorB = "#c8102e", fmt = fmtNum } = {}) {
  const W = 1000, H = 340, PL = 64, PR = 16, PT = 18, PB = 34;
  const max = Math.max(...groups.flatMap((g) => [g.a, g.b])) * 1.1;
  const bw = (W - PL - PR) / groups.length;
  const Y = (v) => PT + (1 - v / max) * (H - PT - PB);
  let s = svgOpen(W, H);
  for (const t of niceTicks(0, max)) {
    const y = Y(t);
    s += `<line class="grid" x1="${PL}" y1="${y}" x2="${W - PR}" y2="${y}"/>`;
    s += `<text class="lbl" x="${PL - 8}" y="${y + 4}" text-anchor="end">${fmt(t)}</text>`;
  }
  s += `<line class="axis" x1="${PL}" y1="${H - PB}" x2="${W - PR}" y2="${H - PB}"/>`;
  groups.forEach((g, i) => {
    const x0 = PL + i * bw;
    const w = Math.min(30, bw * 0.32);
    s += `<rect x="${x0 + bw / 2 - w - 3}" y="${Y(g.a)}" width="${w}" height="${H - PB - Y(g.a)}" fill="${colorA}" rx="2"/>`;
    s += `<rect x="${x0 + bw / 2 + 3}" y="${Y(g.b)}" width="${w}" height="${H - PB - Y(g.b)}" fill="${colorB}" rx="2"/>`;
    s += `<text class="lbl" x="${x0 + bw / 2}" y="${H - 12}" text-anchor="middle">${g.x}</text>`;
  });
  s += "</svg>";
  s += `<div class="legend"><span><i style="background:${colorA}"></i>${aLabel}</span><span><i style="background:${colorB}"></i>${bLabel}</span></div>`;
  return s;
}

// Horizontal bars: rows = [{label, value, color}]
function hbars(rows, { fmt = (v) => v + "%", max = null } = {}) {
  const m = max ?? Math.max(...rows.map((r) => r.value)) * 1.08;
  return rows.map((r) => {
    const pct = Math.max(2, (r.value / m) * 100);
    return `<div style="display:grid;grid-template-columns:180px 1fr 64px;gap:10px;align-items:center;margin:7px 0;">
      <div>${r.label}</div>
      <div style="background:#ece7db;border-radius:4px;height:18px;"><div style="width:${pct.toFixed(1)}%;height:18px;border-radius:4px;background:${r.color || "#1e3a5f"}"></div></div>
      <div style="text-align:right;font-variant-numeric:tabular-nums;"><strong>${fmt(r.value)}</strong></div>
    </div>`;
  }).join("");
}

// --------------------------------------------------------------- helpers ---
function kpiGrid() {
  return `<div class="kpis">` + KPI.map((k) => `
    <div class="kpi"><div class="v">${k.value}</div><div class="l">${k.label}</div><div class="n">${k.note}</div></div>`).join("") + `</div>`;
}
function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

// ----------------------------------------------------------------- views ---
const state = { econMetric: "gdp", econRange: "all", peopleChart: "fertility", regionSort: "pop", regionDir: -1, regionQ: "" };

function overview() {
  return `
  <section class="hero" style="margin:0 -18px;padding-left:18px;padding-right:18px;">
    <h1>South Korea in Numbers</h1>
    <p class="korean">대한민국 · Republic of Korea</p>
    <p class="lede">One country, two extremes: the world's lowest birth rate and one of the longest
    lives on Earth, a $1.9 trillion economy built in a single lifetime, and a capital region
    holding half the nation. Every figure below is real — from the World Bank, Statistics Korea
    and the OECD — and every chart is drawn from the data on this site.</p>
  </section>
  ${kpiGrid()}
  <div class="card">
    <h2>GDP, 2015–2024</h2>
    <p>Nominal GDP in billions of US dollars. The economy passed $1.8 trillion in 2024 — its
    second-highest level ever — after the pandemic dip and the won's slide in 2022.</p>
    ${lineChart(GDP.map((g) => ({ x: String(g.year), y: g.gdp })), { fmt: (v) => "$" + Math.round(v) + "B" })}
    <p class="small">Source: World Bank, World Development Indicators (NY.GDP.MKTP.CD).</p>
  </div>
  <div class="grid2">
    <div class="card">
      <h2>The fertility cliff</h2>
      <p>Births per woman, 2015–2024. The rate fell every year from 2015 to 2023 — to 0.72, the
      lowest anywhere — then rose for the first time in nine years, to 0.75.</p>
      ${lineChart(FERTILITY.map((f) => ({ x: String(f.year), y: f.tfr })), { color: "#0e7c7b", fmt: (v) => v.toFixed(2) })}
      <p class="small">Source: Statistics Korea, Vital Statistics.</p>
    </div>
    <div class="card">
      <h2>Three numbers that tell the story</h2>
      <div class="insight"><b>51.75 million people</b> — and falling. The population peaked at 51.84M in 2020;
      deaths (358,400) have outnumbered births (238,300) every year since.</div>
      <div class="insight"><b>83.6 years</b> — life expectancy in 2024, up from 63.2 in 1970. Koreans live
      longer than almost anyone, while having fewer children than anyone.</div>
      <div class="insight"><b>19.3% are 65 or older</b> — up from 15.8% in 2020. By 2025 the share passed
      20%, making South Korea a "super-aged" society.</div>
      <p><a href="#/people">Read the full people section →</a></p>
    </div>
  </div>
  <div class="card">
    <h2>At a glance — 2024</h2>
    <table><tr><th>Indicator</th><th class="num">Value</th><th>Source</th></tr>
    ${INDICATORS.slice(0, 10).map((i) => `<tr><td>${i.name}</td><td class="num">${i.value}</td><td>${i.source}</td></tr>`).join("")}
    </table>
    <p><a href="#/indicators">See all ${INDICATORS.length} indicators →</a></p>
  </div>`;
}

function economy() {
  const range = state.econRange === "5y" ? GDP.slice(-5) : GDP;
  let chart, note;
  if (state.econMetric === "gdp") {
    chart = lineChart(range.map((g) => ({ x: String(g.year), y: g.gdp })), { fmt: (v) => "$" + Math.round(v) + "B" });
    note = "Nominal GDP, billions of current US dollars (World Bank WDI).";
  } else if (state.econMetric === "gdppc") {
    chart = lineChart(range.map((g) => ({ x: String(g.year), y: g.perCapita })), { color: "#0e7c7b", fmt: (v) => "$" + Math.round(v).toLocaleString() });
    note = "GDP per person, current US dollars (World Bank WDI).";
  } else {
    chart = lineChart(range.map((g) => ({ x: String(g.year), y: g.growth })), { color: "#b98a1d", fmt: (v) => v.toFixed(1) + "%", ymin: -1.5, ymax: 5 });
    note = "Real GDP growth, percent per year (World Bank WDI). The 2020 dip is the pandemic year.";
  }
  const btn = (key, label, cur) => `<button class="${cur === key ? "on" : ""}" data-act="${key}">${label}</button>`;
  return `
  <h2>Economy</h2>
  <p>Asia's fourth-largest economy, built on exports, semiconductors and shipbuilding — and now
  growing slowly as its population ages. Use the buttons: every one of them works.</p>
  <div class="card">
    <h3>Output and growth</h3>
    <div class="controls">
      ${btn("gdp", "GDP ($B)", state.econMetric)}${btn("gdppc", "GDP per person", state.econMetric)}${btn("growth", "Growth %", state.econMetric)}
      <span style="margin-left:12px"></span>
      ${btn("all", "2015–2024", state.econRange)}${btn("5y", "Last 5 years", state.econRange)}
    </div>
    ${chart}
    <p class="small">${note}</p>
  </div>
  <div class="grid2">
    <div class="card">
      <h3>Prices and jobs</h3>
      <p>Inflation spiked to 5.1% in 2022, then fell back to 2.3% in 2024 — while unemployment
      stayed between 2.7% and 3.9% for the whole decade.</p>
      ${lineChart(PRICES.map((p) => ({ x: String(p.year), y: p.inflation })), { color: "#c8102e", fmt: (v) => v.toFixed(1) + "%", ymin: 0, ymax: 5.5 })}
      <p class="small">Consumer price inflation, % per year (Bank of Korea).</p>
      ${lineChart(PRICES.map((p) => ({ x: String(p.year), y: p.unemployment })), { color: "#1e3a5f", fmt: (v) => v.toFixed(1) + "%", ymin: 2, ymax: 4.2 })}
      <p class="small">Unemployment, % of the labour force (World Bank WDI).</p>
    </div>
    <div class="card">
      <h3>Trade — a record year</h3>
      <p>In 2024 South Korea exported <strong>$${TRADE.exportsGoods} billion</strong> of goods — the most
      ever — and imported <strong>$${TRADE.importsGoods} billion</strong>, for a surplus of
      <strong>$${TRADE.surplusGoods} billion</strong>.</p>
      <p>Goods and services together are <strong>${TRADE.exportsShareGDP}% of GDP</strong>. Semiconductors
      alone brought in <strong>$${TRADE.semiconductors} billion</strong>, about a fifth of all goods exports.</p>
      <h3>What the economy is made of</h3>
      ${hbars(SECTORS.map((s, i) => ({ label: s.name, value: s.share, color: ["#1e3a5f", "#0e7c7b", "#b98a1d", "#c8102e"][i] })))}
      <p class="small">Value added by sector, % of GDP, 2024 (World Bank WDI).</p>
    </div>
  </div>`;
}

function people() {
  const chart = state.peopleChart === "fertility"
    ? lineChart(FERTILITY.map((f) => ({ x: String(f.year), y: f.tfr })), { color: "#0e7c7b", fmt: (v) => v.toFixed(2), ymin: 0.6, ymax: 1.35 })
    : groupedBars(FERTILITY.map((f) => ({ x: String(f.year), a: f.births, b: f.deaths })), { aLabel: "Births (thousands)", bLabel: "Deaths (thousands)", fmt: (v) => Math.round(v) });
  const btn = (key, label) => `<button class="${state.peopleChart === key ? "on" : ""}" data-act="${key}">${label}</button>`;
  return `
  <h2>People</h2>
  <p>South Korea's demography is the most extreme in the rich world: births have fallen by almost
  half in a decade while deaths keep rising — yet life expectancy keeps climbing.</p>
  <div class="card">
    <h3>Births, deaths and the fertility rate</h3>
    <div class="controls">${btn("fertility", "Fertility rate")}${btn("births", "Births vs deaths")}</div>
    ${chart}
    <p class="small">Total fertility rate (births per woman) and live births / deaths, thousands, 2015–2024.
    Source: Statistics Korea, Vital Statistics (preliminary for 2024). The preliminary 2025 rate
    was 0.80 — the second yearly rise in a row, and the highest since 2021.</p>
  </div>
  <div class="grid2">
    <div class="card">
      <h3>How long Koreans live</h3>
      ${lineChart(LIFE.map((l) => ({ x: String(l.year), y: l.all })), { color: "#c8102e", fmt: (v) => v.toFixed(1), ymin: 81.5, ymax: 84.2 })}
      <p class="small">Life expectancy at birth, years (World Bank WDI). Women: 86.6 years; men: 80.8 years (2024).</p>
    </div>
    <div class="card">
      <h3>Who lives here now</h3>
      ${hbars(AGE.map((a, i) => ({ label: "Age " + a.group, value: a.share, color: ["#0e7c7b", "#1e3a5f", "#c8102e"][i] })))}
      <p class="small">Age structure, % of population, 2024 (World Bank WDI).</p>
      <p><strong>${PEOPLE_EXTRA.urban}%</strong> of Koreans live in cities. Median age is
      <strong>${PEOPLE_EXTRA.medianAge} years</strong>. <strong>${PEOPLE_EXTRA.internet}%</strong> of people
      use the internet, and <strong>${PEOPLE_EXTRA.tertiary}%</strong> of 25–34 year-olds hold a tertiary
      degree — the highest share in the OECD.</p>
    </div>
  </div>`;
}

function regions() {
  const q = state.regionQ.toLowerCase();
  let rows = REGIONS.filter((r) => !q || r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q));
  rows = [...rows].sort((a, b) => {
    const k = state.regionSort === "name" ? a.name.localeCompare(b.name) : a.pop - b.pop;
    return state.regionDir * k;
  });
  const top8 = [...REGIONS].sort((a, b) => b.pop - a.pop).slice(0, 8);
  const th = (key, label) => `<th class="sortable" data-sort="${key}">${label} ${state.regionSort === key ? (state.regionDir === 1 ? "▲" : "▼") : ""}</th>`;
  return `
  <h2>Regions</h2>
  <p>Half the country lives in the Seoul capital area. Gyeonggi-do alone — the province around the
  capital — holds 13.7 million people, more than Seoul itself.</p>
  <div class="card">
    <h3>Largest places by population</h3>
    ${hbars(top8.map((r, i) => ({ label: r.name, value: r.pop, color: i === 0 ? "#c8102e" : "#1e3a5f" })), { fmt: (v) => v.toFixed(2) + "M" })}
    <p class="small">Resident population, millions, 2024 (Statistics Korea).</p>
  </div>
  <div class="card">
    <h3>All 17 provinces and metropolitan cities</h3>
    <div class="controls"><input type="search" id="regionQ" placeholder="Filter by name or type…" value="${esc(state.regionQ)}"></div>
    <table><tr>${th("name", "Place")}<th>Type</th>${th("pop", "Population (M)")}<th>Note</th></tr>
    ${rows.map((r) => `<tr><td><strong>${r.name}</strong></td><td>${r.type}</td><td class="num">${r.pop.toFixed(2)}</td><td>${r.note}</td></tr>`).join("") || `<tr><td colspan="4">No place matches “${esc(state.regionQ)}”.</td></tr>`}
    </table>
    <p class="small">Resident population, millions, 2024 (Statistics Korea). Figures are rounded; provincial
    counts may not sum exactly to the national total of 51.75 million.</p>
  </div>`;
}

function compare() {
  return `
  <h2>Compare</h2>
  <p>South Korea next to its closest peer, the OECD average and the world — all for 2024 unless noted.</p>
  <div class="card">
    <table><tr><th>Place</th><th class="num">Population</th><th class="num">GDP per person</th><th class="num">Life expectancy</th><th class="num">Fertility</th><th class="num">Urban</th></tr>
    ${COMPARE.map((c, i) => `<tr class="${i === 0 ? "hl" : ""}"><td>${c.place}</td><td class="num">${c.pop}</td><td class="num">${c.gdpPc}</td><td class="num">${c.life} yrs</td><td class="num">${c.fertility}</td><td class="num">${c.urban}</td></tr>`).join("")}
    </table>
    <p class="small">Sources: World Bank WDI (Korea, Japan, World); OECD Data (OECD average, 2023).
    *World GDP per person is approximate. Korea's GDP per person passed Japan's in 2024 — $36,239
    against $32,465 — while Japan still lives slightly longer (84.0 vs 83.6 years).</p>
  </div>
  <div class="card">
    <h3>What the comparison shows</h3>
    <div class="insight"><b>Richer than Japan, per person.</b> Korea's GDP per person overtook Japan's in
    2024, the first time in the modern era — driven by semiconductors and a weaker yen.</div>
    <div class="insight"><b>Older, faster.</b> Korea's fertility (0.75) is far below Japan's (1.15) and the
    OECD average (1.43) — its age wave is arriving a generation sooner.</div>
    <div class="insight"><b>Longer lives than the world.</b> At 83.6 years, Koreans outlive the world
    average (73.5) by a full decade.</div>
  </div>`;
}

function indicators(q = "") {
  const query = q.toLowerCase();
  const rows = INDICATORS.filter((i) => !query || i.name.toLowerCase().includes(query) || i.source.toLowerCase().includes(query) || i.value.toLowerCase().includes(query));
  return `
  <h2>All indicators</h2>
  <p>Every headline figure on this site, in one searchable table. Type to filter — the table updates
  as you type.</p>
  <div class="card">
    <div class="controls"><input type="search" id="indQ" placeholder="Search indicators…" value="${esc(q)}"></div>
    <table><tr><th>Indicator</th><th class="num">Value</th><th class="num">Year</th><th>Source</th></tr>
    ${rows.map((i) => `<tr><td>${i.name}</td><td class="num">${i.value}</td><td class="num">${i.year}</td><td>${i.source}</td></tr>`).join("") || `<tr><td colspan="4">No indicator matches “${esc(q)}”.</td></tr>`}
    </table>
    <p class="small">Showing ${rows.length} of ${INDICATORS.length} indicators.</p>
  </div>`;
}

function sources() {
  return `
  <h2>Sources &amp; method</h2>
  <div class="card">
    <h3>Where the numbers come from</h3>
    <ul>
      ${META.sources.map((s) => `<li><strong>${s.name}</strong></li>`).join("")}
      <li><strong>United Nations, World Population Prospects</strong> — median age.</li>
    </ul>
    <h3>How to read them</h3>
    <p>Figures are for the year stated next to them; the latest year is ${META.latestYear} unless
    marked otherwise. Money is in current US dollars unless marked PPP. Percentages are shares of
    the stated total. Values are rounded to the precision shown — a rounded figure can differ by a
    small amount from the same figure rounded differently elsewhere.</p>
    <p>Births and deaths for 2024 are Statistics Korea's preliminary release (February 2025); the
    fertility rate for 2025 (0.80, preliminary) is noted on the People page but not charted, because
    the final 2025 vital statistics were not yet published when this site was built.</p>
    <h3>What this site is</h3>
    <p>HangukStat is an independent project built for the make.fun "best national statistics site"
    competition. It is not affiliated with Statistics Korea, the World Bank, the OECD or any
    government body, and it copies no other site's brand, text or images. All charts are drawn by
    this site's own code from the data in its own files; the site makes no network requests.</p>
    <p class="small">Data last updated ${META.updated}.</p>
  </div>`;
}

// ------------------------------------------------------------------ router ---
const routes = { "": overview, economy, people, regions, compare, indicators, sources };

function render() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [route, ...rest] = hash.split("/");
  const fn = routes[route] ?? overview;
  const key = routes[route] ? route : "";
  view.innerHTML = route === "indicators" ? fn(state.indQ || "") : fn();
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.route === key));
  window.scrollTo(0, 0);
}

view.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-act]");
  if (b) {
    const act = b.dataset.act;
    if (["gdp", "gdppc", "growth"].includes(act)) state.econMetric = act;
    else if (["all", "5y"].includes(act)) state.econRange = act;
    else if (["fertility", "births"].includes(act)) state.peopleChart = act;
    render();
    return;
  }
  const th = e.target.closest("th[data-sort]");
  if (th) {
    const key = th.dataset.sort;
    if (state.regionSort === key) state.regionDir *= -1;
    else { state.regionSort = key; state.regionDir = key === "name" ? 1 : -1; }
    render();
  }
});

view.addEventListener("input", (e) => {
  if (e.target.id === "regionQ") {
    state.regionQ = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const el = document.getElementById("regionQ");
    if (el) { el.focus(); el.setSelectionRange(pos, pos); }
  }
  if (e.target.id === "indQ") {
    state.indQ = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const el = document.getElementById("indQ");
    if (el) { el.focus(); el.setSelectionRange(pos, pos); }
  }
});

addEventListener("hashchange", render);
render();
