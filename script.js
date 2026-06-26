
(function () {
  "use strict";

  const state = {
    signId: "aries",
    timeframe: "today",
    readings: null
  };

  const els = {
    signGrid: document.getElementById("sign-grid"),
    readingSymbol: document.getElementById("reading-symbol"),
    readingSignName: document.getElementById("reading-sign-name"),
    readingSignMeta: document.getElementById("reading-sign-meta"),
    readingSummary: document.getElementById("reading-summary"),
    insightGrid: document.getElementById("insight-grid"),
    luckyNumber: document.getElementById("lucky-number"),
    luckyColor: document.getElementById("lucky-color"),
    compatibleSign: document.getElementById("compatible-sign"),
    timelineBtns: document.querySelectorAll(".timeline-btn"),
    headerDate: document.getElementById("header-date"),
    chartSpokes: document.querySelector(".chart-spokes"),
    chartTicks: document.querySelector(".chart-degree-ticks"),
    rasiRing: document.getElementById("rasi-ring")
  };

  const CATEGORY_LABELS = { career: "Career", health: "Health", love: "Love", finance: "Finance" };

  function renderHeaderDate() {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    els.headerDate.textContent = formatted;
  }

  function renderSignGrid() {
    els.signGrid.innerHTML = "";
    ZODIAC_SIGNS.forEach((sign) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "sign-tile";
      tile.setAttribute("role", "radio");
      tile.setAttribute("aria-checked", sign.id === state.signId ? "true" : "false");
      tile.dataset.signId = sign.id;
      if (sign.id === state.signId) tile.classList.add("is-selected");

      tile.innerHTML = `
        <span class="sign-tile-symbol" aria-hidden="true">${sign.symbol}</span>
        <span class="sign-tile-name">${sign.name}</span>
        <span class="sign-tile-dates">${sign.dateRange}</span>
      `;

      tile.addEventListener("click", () => selectSign(sign.id));
      els.signGrid.appendChild(tile);
    });
  }

  function selectSign(signId) {
    state.signId = signId;
    document.querySelectorAll(".sign-tile").forEach((t) => {
      const isSelected = t.dataset.signId === signId;
      t.classList.toggle("is-selected", isSelected);
      t.setAttribute("aria-checked", isSelected ? "true" : "false");
    });
    loadReadings();
    document.getElementById("reading").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function bindTimelineNav() {
    els.timelineBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.timeframe = btn.dataset.timeframe;
        els.timelineBtns.forEach((b) => {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        renderReading();
      });
    });
  }

  function loadReadings() {
    const sign = ZODIAC_SIGNS.find((s) => s.id === state.signId);
    state.readings = getAllReadings(sign, new Date());
    renderReading();
  }

  function renderReading() {
    const sign = ZODIAC_SIGNS.find((s) => s.id === state.signId);
    const reading = state.readings[state.timeframe];

    els.readingSymbol.textContent = sign.symbol;
    // els.readingSignName.textContent = sign.name;
    els.readingSignName.textContent = `${sign.name} Horoscope ${reading.timeframeLabel}`;
    els.readingSignMeta.textContent = `${sign.dateRange} · ${sign.element} · ${sign.modality} · Ruled by ${sign.ruler}`;
    els.readingSummary.textContent = reading.summary;

    els.insightGrid.innerHTML = "";
    Object.keys(CATEGORY_LABELS).forEach((cat) => {
      const score = reading.scores[cat];
      const band = scoreLabel(score).toLowerCase();
      const card = document.createElement("article");
      card.className = "insight-card";
      card.dataset.band = band;
      card.innerHTML = `
        <div class="insight-card-head">
          <span class="insight-card-label">${CATEGORY_LABELS[cat]}</span>
          <span class="insight-card-score">${score}<span style="font-size:1.3rem;color:var(--parchment-dim)">/100</span></span>
        </div>
        <div class="insight-bar-track">
          <div class="insight-bar-fill" style="width:${score}%"></div>
        </div>
        <span class="insight-card-rating">${scoreLabel(score)}</span>
        <p class="insight-card-text">${reading.lines[cat]}</p>
      `;
      els.insightGrid.appendChild(card);
    });

    els.luckyNumber.textContent = reading.luckyNumber;
    els.luckyColor.textContent = reading.luckyColor;
    els.compatibleSign.textContent = reading.compatibleSign;
  }

  function renderChartDecor() {
    if (!els.chartSpokes || !els.chartTicks) return;
    const cx = 200, cy = 200;
    let spokes = "";
    let ticks = "";
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x2 = cx + Math.cos(angle) * 188;
      const y2 = cy + Math.sin(angle) * 188;
      const x1 = cx + Math.cos(angle) * 64;
      const y1 = cy + Math.sin(angle) * 64;
      spokes += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="var(--ink-700)" stroke-width="1"/>`;
    }
    for (let d = 0; d < 360; d += 15) {
      const rad = (d * Math.PI) / 180;
      const r1 = 188, r2 = d % 90 === 0 ? 176 : 182;
      const x1 = cx + Math.cos(rad) * r1, y1 = cy + Math.sin(rad) * r1;
      const x2 = cx + Math.cos(rad) * r2, y2 = cy + Math.sin(rad) * r2;
      ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="var(--bronze-dim)" stroke-width="1"/>`;
    }
    els.chartSpokes.innerHTML = spokes;
    els.chartTicks.innerHTML = ticks;
  }


  function renderRasiRing() {
    if (!els.rasiRing) return;
    const cx = 200, cy = 200, radius = 168;
    let symbols = "";
    ZODIAC_SIGNS.forEach((sign, i) => {
      const angle = (i / ZODIAC_SIGNS.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      symbols += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" class="rasi-symbol">${sign.symbol}</text>`;
    });
    els.rasiRing.innerHTML = symbols;
  }

  function init() {
    renderHeaderDate();
    renderSignGrid();
    bindTimelineNav();
    renderChartDecor();
    renderRasiRing();
    loadReadings();
  }

  document.addEventListener("DOMContentLoaded", init);
  
function hashString(str) {
  let h = 2166136261; 
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededValue(seedStr, salt) {
  const h = hashString(seedStr + "::" + salt);
  return h % 100;
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function isoWeek(date) {

  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(((d - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return `${d.getUTCFullYear()}-W${week}`;
}
function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

const RULER_VOLATILITY = {
  Mars: 30, Uranus: 32, Pluto: 28,      
  Mercury: 24, Neptune: 24,
  Venus: 18, Jupiter: 20,
  Moon: 22, Sun: 18,
  Saturn: 14                             
};

function deriveScore(sign, timeframeSeed, category) {
  const base = seededValue(sign.id + timeframeSeed, category); 
  const volatility = RULER_VOLATILITY[sign.ruler] || 20;
  const center = 62; 
  const span = volatility;
  let score = Math.round(center - span / 2 + (base / 99) * span);

  if (category === "love" && (sign.ruler === "Venus" || sign.ruler === "Moon")) score += 6;
  if (category === "career" && (sign.ruler === "Saturn" || sign.ruler === "Sun")) score += 6;
  if (category === "finance" && (sign.ruler === "Jupiter" || sign.element === "Earth")) score += 5;
  if (category === "health" && sign.element === "Earth") score += 4;
  if (category === "health" && sign.element === "Fire") score -= 3; 

  return Math.max(38, Math.min(96, score));
}

function scoreLabel(score) {
  if (score >= 85) return "Exceptional";
  if (score >= 70) return "Favorable";
  if (score >= 55) return "Steady";
  if (score >= 45) return "Mixed";
  return "Demanding";
}

const TIMEFRAME_PHRASE = {
  yesterday: "yesterday",
  today: "today",
  tomorrow: "tomorrow",
  weekly: "this week",
  monthly: "this month"
};

function buildCategoryLine(sign, category, timeframeKey) {
  const tf = TIMEFRAME_PHRASE[timeframeKey] || "today";
  const elementLine = ELEMENT_PROFILE[sign.element][category].replace(/\{tf\}/g, tf);
  const modalityLine = MODALITY_PROFILE[sign.modality][category].replace(/\{tf\}/g, tf);
  return `${elementLine} ${modalityLine}`;
}

function buildSummary(sign, timeframeLabel, scores) {
  const focus = RULER_FOCUS[sign.ruler];
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const topLabelMap = { career: "career", health: "health and energy", love: "relationships", finance: "money matters" };
  return `As a ${sign.modality.toLowerCase()} ${sign.element.toLowerCase()} sign ruled by ${sign.ruler}, your attention naturally gravitates toward ${focus}. For ${timeframeLabel.toLowerCase()}, the clearest opening shows up in ${topLabelMap[top]}.`;
}

const CATEGORIES = ["career", "health", "love", "finance"];

function generateReading(sign, dateSeed, timeframeLabel, timeframeId) {
  const scores = {};
  CATEGORIES.forEach(cat => {
    scores[cat] = deriveScore(sign, dateSeed, cat);
  });

  const lines = {};
  CATEGORIES.forEach(cat => {
    lines[cat] = buildCategoryLine(sign, cat, timeframeId);
  });

  const luckyNumberIndex = hashString(sign.id + dateSeed) % sign.luckyNumbers.length;
  const luckyNumber = sign.luckyNumbers[luckyNumberIndex];

  return {
    sign: sign.id,
    timeframe: dateSeed,
    timeframeLabel,
    summary: buildSummary(sign, timeframeLabel, scores),
    scores,
    lines,
    luckyNumber,
    luckyColor: sign.luckyColor,
    compatibleSign: sign.compatibleSigns[hashString(sign.id + dateSeed) % sign.compatibleSigns.length]
  };
}

function getAllReadings(sign, today = new Date()) {
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);

  return {
    yesterday: generateReading(sign, isoDate(yesterday), "Yesterday", "yesterday"),
    today: generateReading(sign, isoDate(today), "Today", "today"),
    tomorrow: generateReading(sign, isoDate(tomorrow), "Tomorrow", "tomorrow"),
    weekly: generateReading(sign, isoWeek(today), "This Week", "weekly"),
    monthly: generateReading(sign, monthKey(today), "This Month", "monthly")
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { getAllReadings, generateReading, scoreLabel, isoDate, isoWeek, monthKey };
}

})();
