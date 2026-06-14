const canvas = document.querySelector("#signal-canvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let dpr = 1;
let points = [];
let animationFrame = 0;

const palette = ["#df5b4f", "#57bd89", "#d9b65c", "#74a7e8", "#f7f3e8"];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const count = Math.max(28, Math.min(68, Math.floor((width * height) / 21000)));
  points = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    radius: 1.2 + Math.random() * 2.1,
    color: palette[index % palette.length],
  }));
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(11, 13, 16, 0.28)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    a.x += a.vx;
    a.y += a.vy;

    if (a.x < -20) a.x = width + 20;
    if (a.x > width + 20) a.x = -20;
    if (a.y < -20) a.y = height + 20;
    if (a.y > height + 20) a.y = -20;

    for (let j = i + 1; j < points.length; j += 1) {
      const b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);
      const maxDistance = Math.min(150, Math.max(92, width * 0.12));

      if (distance < maxDistance) {
        const alpha = (1 - distance / maxDistance) * 0.18;
        ctx.strokeStyle = `rgba(247, 243, 232, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = a.color;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  animationFrame = requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationFrame);
  resize();
  draw();
});

const palaceTargets = [...document.querySelectorAll("[data-room]")];
const palaceRooms = [...document.querySelectorAll(".palace-room[id]")];
const roomBySection = {
  "palace-foyer": "foyer",
  "palace-humanity": "humanity",
  "palace-market": "market",
  "palace-systems": "systems",
  "palace-short": "short",
  "palace-raw": "raw",
};

function setActiveRoom(room) {
  palaceTargets.forEach((target) => {
    target.classList.toggle("is-active", target.dataset.room === room);
  });
}

palaceTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => setActiveRoom(target.dataset.room));
  target.addEventListener("focus", () => setActiveRoom(target.dataset.room));
});

if ("IntersectionObserver" in window && palaceRooms.length) {
  const roomObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveRoom(roomBySection[visible.target.id]);
    },
    { rootMargin: "-25% 0px -45% 0px", threshold: [0.18, 0.32, 0.48] },
  );

  palaceRooms.forEach((room) => roomObserver.observe(room));
}

const btcPriceAnchors = [
  ["2020-05-02", 8975.18],
  ["2020-12-31", 28949],
  ["2021-04-14", 63500],
  ["2021-11-10", 69000],
  ["2022-06-18", 18900],
  ["2022-08-13", 24400],
  ["2022-08-29", 20250],
  ["2022-11-21", 15700],
  ["2023-06-30", 30400],
  ["2023-12-31", 42200],
  ["2024-03-14", 73000],
  ["2024-08-05", 54000],
  ["2024-11-06", 75700],
  ["2024-11-22", 99100],
  ["2024-12-08", 101400],
  ["2024-12-24", 98800],
  ["2025-05-17", 103000],
  ["2025-06-02", 105800],
  ["2025-07-04", 110000],
  ["2025-07-20", 119500],
  ["2025-08-05", 116300],
  ["2025-12-27", 61500],
  ["2026-01-12", 63900],
  ["2026-01-28", 62500],
  ["2026-02-05", 53300],
  ["2026-03-17", 70000],
  ["2026-04-02", 63350],
  ["2026-05-04", 65800],
  ["2026-05-20", 63900],
  ["2026-06-14", 63888],
];

const btcProfitEvents = [
  {
    id: "btc-memory-2022-short",
    label: "S1",
    type: "short",
    start: "2022-08-13",
    end: "2022-08-29",
    title: "2022.08 下跌中的收益",
  },
  {
    id: "btc-memory-2024-breakout",
    label: "L1",
    type: "long",
    start: "2024-11-06",
    end: "2024-11-22",
    title: "2024.11 突破段",
  },
  {
    id: "btc-memory-2024-boost",
    label: "L2",
    type: "long",
    start: "2024-11-22",
    end: "2024-12-08",
    title: "2024.11-12 高弹性延续",
  },
  {
    id: "btc-memory-2025-may",
    label: "L3",
    type: "long",
    start: "2025-05-17",
    end: "2025-06-02",
    title: "2025.05 小涨大赚",
  },
  {
    id: "btc-memory-2025-run",
    label: "L4",
    type: "long",
    start: "2025-07-04",
    end: "2025-07-20",
    title: "2025.07 最大盈利跳升",
  },
  {
    id: "btc-memory-2026-jan",
    label: "L5",
    type: "long",
    start: "2025-12-27",
    end: "2026-01-12",
    title: "2026.01 再次快速增长",
  },
  {
    id: "btc-memory-2026-mar-short",
    label: "S2",
    type: "short",
    start: "2026-03-17",
    end: "2026-04-02",
    title: "2026.03 下跌区间获利",
  },
  {
    id: "btc-memory-2026-may-short",
    label: "S3",
    type: "short",
    start: "2026-05-04",
    end: "2026-05-20",
    title: "2026.05 下跌区间获利",
  },
];

const dayMs = 24 * 60 * 60 * 1000;

function parseUtcDate(date) {
  return new Date(`${date}T00:00:00Z`).getTime();
}

function formatDate(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

function formatPrice(value) {
  if (value >= 100000) return `${Math.round(value / 1000)}k`;
  if (value >= 10000) return `${Math.round(value / 100) / 10}k`;
  return Math.round(value).toLocaleString("en-US");
}

function generateDailyBtcCandles() {
  const anchors = btcPriceAnchors.map(([date, close]) => ({ ms: parseUtcDate(date), close }));
  const candles = [];
  let previousClose = anchors[0].close;

  for (let index = 0; index < anchors.length - 1; index += 1) {
    const current = anchors[index];
    const next = anchors[index + 1];
    const total = Math.max(1, next.ms - current.ms);

    for (let ms = current.ms; ms < next.ms; ms += dayMs) {
      const progress = (ms - current.ms) / total;
      const trend = Math.exp(
        Math.log(current.close) + (Math.log(next.close) - Math.log(current.close)) * progress,
      );
      const wave =
        Math.sin(progress * Math.PI * 4 + index * 0.71) * 0.018 +
        Math.sin(progress * Math.PI * 13 + index * 1.13) * 0.007;
      const close = ms === current.ms ? current.close : trend * (1 + wave);
      const gap = Math.sin((ms / dayMs) * 0.43) * 0.003;
      const open = candles.length ? previousClose * (1 + gap) : close * 0.994;
      const spread = Math.abs(close - open) / Math.max(open, close);
      const range = Math.min(0.085, 0.011 + spread * 0.58 + Math.abs(Math.sin((ms / dayMs) * 1.37)) * 0.012);
      const high = Math.max(open, close) * (1 + range);
      const low = Math.min(open, close) * (1 - range * 0.86);

      candles.push({ date: formatDate(ms), ms, open, high, low, close });
      previousClose = close;
    }
  }

  const last = anchors[anchors.length - 1];
  const lastOpen = previousClose * 0.997;
  candles.push({
    date: formatDate(last.ms),
    ms: last.ms,
    open: lastOpen,
    high: Math.max(lastOpen, last.close) * 1.012,
    low: Math.min(lastOpen, last.close) * 0.99,
    close: last.close,
  });

  return candles;
}

function aggregateWeeklyCandles(candles) {
  const weekly = [];

  for (let index = 0; index < candles.length; index += 7) {
    const group = candles.slice(index, index + 7);
    if (!group.length) continue;

    weekly.push({
      date: group[group.length - 1].date,
      ms: group[group.length - 1].ms,
      startMs: group[0].ms,
      open: group[0].open,
      high: Math.max(...group.map((item) => item.high)),
      low: Math.min(...group.map((item) => item.low)),
      close: group[group.length - 1].close,
    });
  }

  return weekly;
}

function nearestCandleIndex(candles, ms) {
  let low = 0;
  let high = candles.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (candles[mid].ms < ms) low = mid + 1;
    else high = mid;
  }

  if (low > 0 && Math.abs(candles[low - 1].ms - ms) < Math.abs(candles[low].ms - ms)) {
    return low - 1;
  }

  return low;
}

function setupBtcMemoryChart() {
  const chart = document.querySelector("#btc-candle-chart");
  const status = document.querySelector("#btc-candle-status");
  const modeLabel = document.querySelector("#btc-chart-mode-label");
  const buttons = [...document.querySelectorAll("[data-btc-timeframe]")];

  if (!chart) return;

  const daily = generateDailyBtcCandles();
  const weekly = aggregateWeeklyCandles(daily);
  const frames = {
    day: { label: "1D", candles: daily },
    week: { label: "1W", candles: weekly },
  };
  const box = {
    width: 980,
    height: 430,
    left: 70,
    right: 50,
    top: 34,
    bottom: 62,
  };
  const plotWidth = box.width - box.left - box.right;
  const plotHeight = box.height - box.top - box.bottom;

  function render(frameKey) {
    const frame = frames[frameKey] || frames.day;
    const candles = frame.candles;
    const highs = candles.map((item) => item.high);
    const lows = candles.map((item) => item.low);
    const minPrice = Math.min(8000, Math.min(...lows) * 0.95);
    const maxPrice = Math.max(125000, Math.max(...highs) * 1.04);
    const minLog = Math.log(minPrice);
    const maxLog = Math.log(maxPrice);
    const spacing = plotWidth / Math.max(1, candles.length - 1);
    const bodyWidth = Math.max(frameKey === "day" ? 1.05 : 1.8, Math.min(8, spacing * 0.72));

    const xForIndex = (index) => box.left + index * spacing;
    const yForPrice = (price) => box.top + (maxLog - Math.log(price)) / (maxLog - minLog) * plotHeight;

    const yTicks = [15000, 30000, 60000, 120000]
      .filter((price) => price >= minPrice && price <= maxPrice)
      .map((price) => {
        const y = yForPrice(price).toFixed(1);
        return `<line x1="${box.left}" y1="${y}" x2="${box.width - box.right}" y2="${y}"></line><text class="btc-axis-label" x="${box.width - 36}" y="${Number(y) + 4}">${formatPrice(price)}</text>`;
      })
      .join("");

    const xTicks = ["2020-05-02", "2021-01-01", "2022-01-01", "2023-01-01", "2024-01-01", "2025-01-01", "2026-01-01", "2026-06-14"]
      .map((date) => {
        const index = nearestCandleIndex(candles, parseUtcDate(date));
        const x = xForIndex(index).toFixed(1);
        const label = date === "2026-06-14" ? "06.14" : date.slice(0, 4);
        const anchor = date === "2026-06-14" ? "end" : "middle";
        return `<line x1="${x}" y1="${box.top}" x2="${x}" y2="${box.height - box.bottom}"></line><text class="btc-axis-label" x="${x}" y="${box.height - 18}" text-anchor="${anchor}">${label}</text>`;
      })
      .join("");

    const eventBands = btcProfitEvents
      .map((event) => {
        const startIndex = nearestCandleIndex(candles, parseUtcDate(event.start));
        const endIndex = nearestCandleIndex(candles, parseUtcDate(event.end));
        const x1 = Math.min(xForIndex(startIndex), xForIndex(endIndex));
        const width = Math.max(2, Math.abs(xForIndex(endIndex) - xForIndex(startIndex)));
        return `<rect class="btc-event-band is-${event.type}" x="${x1.toFixed(1)}" y="${box.top}" width="${width.toFixed(1)}" height="${plotHeight}"></rect>`;
      })
      .join("");

    const candleNodes = candles
      .map((candle, index) => {
        const x = xForIndex(index);
        const yOpen = yForPrice(candle.open);
        const yClose = yForPrice(candle.close);
        const yHigh = yForPrice(candle.high);
        const yLow = yForPrice(candle.low);
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(1.4, Math.abs(yClose - yOpen));
        const direction = candle.close >= candle.open ? "is-up" : "is-down";

        return `<g class="btc-candle ${direction}"><line class="btc-candle-wick" x1="${x.toFixed(2)}" y1="${yHigh.toFixed(1)}" x2="${x.toFixed(2)}" y2="${yLow.toFixed(1)}"></line><rect class="btc-candle-body" x="${(x - bodyWidth / 2).toFixed(2)}" y="${bodyTop.toFixed(1)}" width="${bodyWidth.toFixed(2)}" height="${bodyHeight.toFixed(1)}"></rect></g>`;
      })
      .join("");

    const eventMarkers = btcProfitEvents
      .map((event, eventIndex) => {
        const index = nearestCandleIndex(candles, parseUtcDate(event.end));
        const candle = candles[index];
        const x = xForIndex(index);
        const y = yForPrice(candle.close);
        const textY = eventIndex % 2 === 0 ? -16 : 23;
        const title = `${event.label} ${event.title}`;

        return `<a href="#${event.id}" data-memory-marker="${event.id}" aria-label="${title}"><g class="btc-profit-marker is-${event.type}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="9"></circle><text x="0" y="${textY}" text-anchor="middle">${event.label}</text></g></a>`;
      })
      .join("");

    const last = candles[candles.length - 1];
    const lastY = yForPrice(last.close).toFixed(1);

    chart.innerHTML = `
      <title id="btc-chart-title">BTCUSDT ${frame.label} 蜡烛图与交易员盈利记忆点</title>
      <desc id="btc-chart-desc">BTCUSDT 从 2020 年 5 月到 2026 年 6 月的 ${frame.label} 蜡烛图，标出交易员资产曲线中的盈利节点。</desc>
      <rect class="btc-chart-bg" x="0" y="0" width="${box.width}" height="${box.height}" rx="8"></rect>
      <g class="btc-grid" aria-hidden="true">${yTicks}${xTicks}</g>
      <g class="btc-profit-bands" aria-hidden="true">${eventBands}</g>
      <g class="btc-candles" aria-hidden="true">${candleNodes}</g>
      <g class="btc-last-price" aria-hidden="true">
        <line x1="${box.left}" y1="${lastY}" x2="${box.width - box.right}" y2="${lastY}"></line>
        <text x="${box.width - 36}" y="${Number(lastY) - 7}">${formatPrice(last.close)}</text>
      </g>
      <g class="btc-profit-events">${eventMarkers}</g>
    `;

    if (modeLabel) modeLabel.textContent = `BTCUSDT / ${frame.label}`;
    if (status) {
      status.textContent = `${frame.label} · ${candles.length.toLocaleString("en-US")} 根蜡烛 · ${btcProfitEvents.length} 个盈利记忆点`;
    }

    buttons.forEach((button) => {
      const isActive = button.dataset.btcTimeframe === frameKey;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.btcTimeframe));
  });

  render("day");
}

setupBtcMemoryChart();

document.addEventListener("click", (event) => {
  const marker = event.target.closest("[data-memory-marker]");

  if (!marker) return;

  const target = document.getElementById(marker.dataset.memoryMarker);

  if (!target) return;

  event.preventDefault();
  target.open = true;
  target.scrollIntoView({ behavior: "smooth", block: "center" });
});

resize();
draw();
