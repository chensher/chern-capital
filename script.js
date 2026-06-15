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
const btcSnapshotUrl = "assets/data/btc-candles-binance-1d.json";
const btcProviderLabels = {
  binance: "Binance Spot",
  okx: "OKX",
};
const btcRangeDays = {
  "3m": 92,
  "6m": 183,
  "1y": 366,
  "2y": 732,
  all: null,
};

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

function formatFullPrice(value) {
  return Number(value).toLocaleString("en-US", {
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  });
}

function formatVolume(value) {
  if (!Number.isFinite(value)) return "-";
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return Math.round(value).toLocaleString("en-US");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeBtcCandles(payload) {
  const candles = (payload.candles || [])
    .map((row) => ({
      date: row.date || formatDate(Number(row.ms)),
      ms: Number(row.ms || parseUtcDate(row.date)),
      open: Number(row.open),
      high: Number(row.high),
      low: Number(row.low),
      close: Number(row.close),
      volume: Number(row.volume || 0),
      quoteVolume: Number(row.quoteVolume || 0),
      trades: Number(row.trades || 0),
    }))
    .filter((row) => (
      row.date &&
      Number.isFinite(row.ms) &&
      Number.isFinite(row.open) &&
      Number.isFinite(row.high) &&
      Number.isFinite(row.low) &&
      Number.isFinite(row.close)
    ))
    .sort((a, b) => a.ms - b.ms);

  return { ...payload, candles };
}

function aggregateWeeklyCandles(candles) {
  const groups = new Map();

  candles.forEach((candle) => {
    const date = new Date(`${candle.date}T00:00:00Z`);
    const day = date.getUTCDay();
    const mondayOffset = (day + 6) % 7;
    const weekStart = new Date(date.getTime() - mondayOffset * dayMs).toISOString().slice(0, 10);
    const existing = groups.get(weekStart);

    if (!existing) {
      groups.set(weekStart, {
        date: candle.date,
        ms: candle.ms,
        startMs: parseUtcDate(weekStart),
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume,
        quoteVolume: candle.quoteVolume,
        trades: candle.trades,
      });
      return;
    }

    existing.date = candle.date;
    existing.ms = candle.ms;
    existing.high = Math.max(existing.high, candle.high);
    existing.low = Math.min(existing.low, candle.low);
    existing.close = candle.close;
    existing.volume += candle.volume || 0;
    existing.quoteVolume += candle.quoteVolume || 0;
    existing.trades += candle.trades || 0;
  });

  return [...groups.values()].sort((a, b) => a.ms - b.ms);
}

function nearestCandleIndex(candles, ms) {
  if (!candles.length) return 0;
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
  const modalChart = document.querySelector("#btc-candle-chart-modal");
  const status = document.querySelector("#btc-candle-status");
  const modalStatus = document.querySelector("#btc-candle-status-modal");
  const modeLabel = document.querySelector("#btc-chart-mode-label");
  const dialogMeta = document.querySelector("#btc-dialog-meta");
  const timeframeButtons = [...document.querySelectorAll("[data-btc-timeframe]")];
  const providerButtons = [...document.querySelectorAll("[data-btc-provider]")];
  const rangeButtons = [...document.querySelectorAll("[data-btc-range]")];
  const refreshButtons = [...document.querySelectorAll("[data-btc-refresh]")];
  const openLargeButton = document.querySelector("#btc-open-large");
  const closeLargeButton = document.querySelector("#btc-close-large");
  const dialog = document.querySelector("#btc-chart-dialog");

  if (!chart) return;

  const state = {
    provider: "binance",
    timeframe: "day",
    range: "1y",
    customCount: null,
    viewEndIndex: null,
    daily: [],
    weekly: [],
    payload: null,
    loading: false,
    note: "",
  };
  const chartMeta = new WeakMap();
  let dragState = null;

  const isStaticOnlyHost = (
    location.hostname.endsWith("github.io") ||
    location.protocol === "file:"
  );

  const chartConfigs = [
    {
      svg: chart,
      status,
      box: { width: 980, height: 430, left: 70, right: 54, top: 34, bottom: 58, volumeHeight: 62 },
      large: false,
    },
    {
      svg: modalChart,
      status: modalStatus,
      box: { width: 1180, height: 620, left: 82, right: 66, top: 42, bottom: 72, volumeHeight: 94 },
      large: true,
    },
  ].filter((item) => item.svg);

  function frames() {
    return {
      day: { label: "1D", candles: state.daily },
      week: { label: "1W", candles: state.weekly },
    };
  }

  function activeFrame() {
    return frames()[state.timeframe] || frames().day;
  }

  function rangeCount(frame) {
    if (state.customCount) {
      return clamp(Math.round(state.customCount), state.timeframe === "day" ? 35 : 14, frame.candles.length);
    }

    const days = btcRangeDays[state.range];
    if (days === null) return frame.candles.length;

    const count = state.timeframe === "week" ? Math.ceil(days / 7) : days;
    return clamp(count, state.timeframe === "day" ? 35 : 14, frame.candles.length);
  }

  function visibleWindow(frame) {
    const candles = frame.candles;
    if (!candles.length) return { candles: [], startIndex: 0, endIndex: 0, count: 0 };

    const count = rangeCount(frame);
    const lastIndex = candles.length - 1;
    const minEnd = Math.max(0, count - 1);
    const endIndex = clamp(state.viewEndIndex ?? lastIndex, minEnd, lastIndex);
    const startIndex = Math.max(0, endIndex - count + 1);

    return {
      candles: candles.slice(startIndex, endIndex + 1),
      startIndex,
      endIndex,
      count,
    };
  }

  function setStatus(text) {
    [status, modalStatus].forEach((element) => {
      if (element) element.textContent = text;
    });
  }

  function updateControls() {
    const frame = activeFrame();
    const providerLabel = btcProviderLabels[state.provider] || state.payload?.providerName || "BTCUSDT";
    const sourceTag = state.payload?.source === "snapshot" ? "快照" : "实时";
    const metaText = `BTCUSDT / ${frame.label} / ${providerLabel} ${sourceTag}`;

    if (modeLabel) modeLabel.textContent = metaText;
    if (dialogMeta) dialogMeta.textContent = metaText;

    timeframeButtons.forEach((button) => {
      const isActive = button.dataset.btcTimeframe === state.timeframe;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    providerButtons.forEach((button) => {
      const isActive = button.dataset.btcProvider === state.provider;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    rangeButtons.forEach((button) => {
      const isActive = !state.customCount && button.dataset.btcRange === state.range;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function renderEmpty(svg, box, text) {
    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    svg.innerHTML = `
      <rect class="btc-chart-bg" x="0" y="0" width="${box.width}" height="${box.height}" rx="8"></rect>
      <text class="btc-axis-label" x="${box.width / 2}" y="${box.height / 2}" text-anchor="middle">${text}</text>
    `;
  }

  function renderChart(config) {
    const { svg, box } = config;
    const frame = activeFrame();
    const window = visibleWindow(frame);
    const visible = window.candles;

    if (!visible.length) {
      renderEmpty(svg, box, state.loading ? "正在获取真实日线..." : "BTC 日线暂不可用");
      return;
    }

    const priceBottom = box.height - box.bottom - box.volumeHeight - 22;
    const volumeTop = priceBottom + 24;
    const plotWidth = box.width - box.left - box.right;
    const plotHeight = priceBottom - box.top;
    const highs = visible.map((item) => item.high);
    const lows = visible.map((item) => item.low);
    const minPrice = Math.max(1, Math.min(...lows) * 0.965);
    const maxPrice = Math.max(...highs) * 1.035;
    const minLog = Math.log(minPrice);
    const maxLog = Math.log(maxPrice);
    const spacing = plotWidth / Math.max(1, visible.length - 1);
    const bodyWidth = Math.max(config.large ? 1.2 : 0.8, Math.min(state.timeframe === "week" ? 10 : 7, spacing * 0.68));
    const maxVolume = Math.max(1, ...visible.map((item) => item.volume || 0));

    const xForLocal = (index) => box.left + index * spacing;
    const yForPrice = (price) => box.top + ((maxLog - Math.log(Math.max(1, price))) / (maxLog - minLog)) * plotHeight;

    const priceTicks = [10000, 15000, 20000, 30000, 40000, 60000, 80000, 100000, 120000, 160000]
      .filter((price) => price >= minPrice && price <= maxPrice)
      .map((price) => {
        const y = yForPrice(price).toFixed(1);
        return `<line x1="${box.left}" y1="${y}" x2="${box.width - box.right}" y2="${y}"></line><text class="btc-axis-label" x="${box.width - 40}" y="${Number(y) + 4}">${formatPrice(price)}</text>`;
      })
      .join("");

    const tickIndexes = [0, 0.25, 0.5, 0.75, 1]
      .map((ratio) => Math.round((visible.length - 1) * ratio))
      .filter((index, position, list) => list.indexOf(index) === position);
    const xTicks = tickIndexes
      .map((index) => {
        const candle = visible[index];
        const x = xForLocal(index).toFixed(1);
        const label = state.range === "all" || state.customCount
          ? candle.date.slice(0, 7)
          : candle.date.slice(5);
        return `<line x1="${x}" y1="${box.top}" x2="${x}" y2="${volumeTop + box.volumeHeight}"></line><text class="btc-axis-label" x="${x}" y="${box.height - 22}" text-anchor="middle">${label}</text>`;
      })
      .join("");

    const eventBands = btcProfitEvents
      .map((event) => {
        const startIndex = nearestCandleIndex(frame.candles, parseUtcDate(event.start));
        const endIndex = nearestCandleIndex(frame.candles, parseUtcDate(event.end));
        if (endIndex < window.startIndex || startIndex > window.endIndex) return "";

        const localStart = clamp(startIndex - window.startIndex, 0, visible.length - 1);
        const localEnd = clamp(endIndex - window.startIndex, 0, visible.length - 1);
        const x1 = Math.min(xForLocal(localStart), xForLocal(localEnd));
        const width = Math.max(2, Math.abs(xForLocal(localEnd) - xForLocal(localStart)));
        return `<rect class="btc-event-band is-${event.type}" x="${x1.toFixed(1)}" y="${box.top}" width="${width.toFixed(1)}" height="${plotHeight}"></rect>`;
      })
      .join("");

    const volumeBars = visible
      .map((candle, index) => {
        const x = xForLocal(index);
        const direction = candle.close >= candle.open ? "is-up" : "is-down";
        const height = Math.max(1, ((candle.volume || 0) / maxVolume) * box.volumeHeight);
        return `<rect class="btc-volume-bar ${direction}" x="${(x - bodyWidth / 2).toFixed(2)}" y="${(volumeTop + box.volumeHeight - height).toFixed(1)}" width="${bodyWidth.toFixed(2)}" height="${height.toFixed(1)}"></rect>`;
      })
      .join("");

    const candleNodes = visible
      .map((candle, index) => {
        const x = xForLocal(index);
        const yOpen = yForPrice(candle.open);
        const yClose = yForPrice(candle.close);
        const yHigh = yForPrice(candle.high);
        const yLow = yForPrice(candle.low);
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(1.2, Math.abs(yClose - yOpen));
        const direction = candle.close >= candle.open ? "is-up" : "is-down";

        return `<g class="btc-candle ${direction}"><line class="btc-candle-wick" x1="${x.toFixed(2)}" y1="${yHigh.toFixed(1)}" x2="${x.toFixed(2)}" y2="${yLow.toFixed(1)}"></line><rect class="btc-candle-body" x="${(x - bodyWidth / 2).toFixed(2)}" y="${bodyTop.toFixed(1)}" width="${bodyWidth.toFixed(2)}" height="${bodyHeight.toFixed(1)}"></rect></g>`;
      })
      .join("");

    const eventMarkers = btcProfitEvents
      .map((event, eventIndex) => {
        const index = nearestCandleIndex(frame.candles, parseUtcDate(event.end));
        if (index < window.startIndex || index > window.endIndex) return "";
        const candle = frame.candles[index];
        const localIndex = index - window.startIndex;
        const x = xForLocal(localIndex);
        const y = yForPrice(candle.close);
        const textY = eventIndex % 2 === 0 ? -16 : 23;
        const title = `${event.label} ${event.title}`;

        return `<a href="#${event.id}" data-memory-marker="${event.id}" aria-label="${title}"><g class="btc-profit-marker is-${event.type}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="9"></circle><text x="0" y="${textY}" text-anchor="middle">${event.label}</text></g></a>`;
      })
      .join("");

    const last = visible[visible.length - 1];
    const lastY = yForPrice(last.close).toFixed(1);

    svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    svg.innerHTML = `
      <title id="btc-chart-title">BTCUSDT ${frame.label} 真实交易所蜡烛图与交易员盈利记忆点</title>
      <desc id="btc-chart-desc">BTCUSDT 从交易所公开接口获取的 ${frame.label} OHLCV 蜡烛图，标出交易员资产曲线中的盈利节点。</desc>
      <rect class="btc-chart-bg" x="0" y="0" width="${box.width}" height="${box.height}" rx="8"></rect>
      <g class="btc-grid" aria-hidden="true">${priceTicks}${xTicks}</g>
      <g class="btc-profit-bands" aria-hidden="true">${eventBands}</g>
      <g class="btc-volume" aria-hidden="true">${volumeBars}</g>
      <g class="btc-candles" aria-hidden="true">${candleNodes}</g>
      <g class="btc-last-price" aria-hidden="true">
        <line x1="${box.left}" y1="${lastY}" x2="${box.width - box.right}" y2="${lastY}"></line>
        <text x="${box.width - 42}" y="${Number(lastY) - 7}">${formatPrice(last.close)}</text>
      </g>
      <g class="btc-profit-events">${eventMarkers}</g>
    `;

    const shell = svg.closest(".btc-tradingview-shell");
    if (shell) {
      chartMeta.set(shell, {
        svg,
        box,
        visible,
        frameCandles: frame.candles,
        startIndex: window.startIndex,
        endIndex: window.endIndex,
        spacing,
        xForLocal,
        yForPrice,
        priceBottom,
        volumeTop,
      });
    }
  }

  function renderAll() {
    updateControls();
    chartConfigs.forEach(renderChart);

    const frame = activeFrame();
    const window = visibleWindow(frame);
    const first = window.candles[0];
    const last = window.candles[window.candles.length - 1];
    const providerLabel = btcProviderLabels[state.provider] || state.payload?.providerName || "BTC";
    const sourceLabel = state.payload?.source === "snapshot" ? "Binance 静态快照" : "交易所接口";
    const rangeLabel = state.customCount ? "自定义缩放" : (state.range === "all" ? "全部" : state.range.toUpperCase());

    if (first && last) {
      const text = `${providerLabel} · ${frame.label} · ${rangeLabel} · ${first.date} → ${last.date} · ${window.candles.length}/${frame.candles.length} 根 · ${sourceLabel}${state.note ? ` · ${state.note}` : ""}`;
      setStatus(text);
    }
  }

  function updateHover(shell, event) {
    const meta = chartMeta.get(shell);
    if (!meta || !meta.visible.length) return;

    const rect = meta.svg.getBoundingClientRect();
    const shellRect = shell.getBoundingClientRect();
    const xSvg = ((event.clientX - rect.left) / rect.width) * meta.box.width;
    const ySvg = ((event.clientY - rect.top) / rect.height) * meta.box.height;

    if (xSvg < meta.box.left || xSvg > meta.box.width - meta.box.right || ySvg < meta.box.top || ySvg > meta.volumeTop + meta.box.volumeHeight) {
      shell.classList.remove("is-hovering");
      return;
    }

    const localIndex = clamp(Math.round((xSvg - meta.box.left) / meta.spacing), 0, meta.visible.length - 1);
    const candle = meta.visible[localIndex];
    const x = rect.left + (meta.xForLocal(localIndex) / meta.box.width) * rect.width - shellRect.left;
    const y = event.clientY - shellRect.top;
    const tooltip = shell.querySelector(".btc-chart-tooltip");
    const crosshairX = shell.querySelector(".btc-chart-crosshair-x");
    const crosshairY = shell.querySelector(".btc-chart-crosshair-y");
    const change = candle.close - candle.open;
    const changePct = (change / candle.open) * 100;

    if (crosshairX) crosshairX.style.left = `${x}px`;
    if (crosshairY) crosshairY.style.top = `${y}px`;
    if (tooltip) {
      tooltip.innerHTML = [
        `<strong>${candle.date}</strong>`,
        `O ${formatFullPrice(candle.open)}　H ${formatFullPrice(candle.high)}`,
        `L ${formatFullPrice(candle.low)}　C ${formatFullPrice(candle.close)}`,
        `${change >= 0 ? "+" : ""}${formatFullPrice(change)} / ${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}%`,
        `Vol ${formatVolume(candle.volume)} BTC`,
      ].join("<br>");
      const maxLeft = shellRect.width - tooltip.offsetWidth - 12;
      tooltip.style.left = `${clamp(x + 12, 8, Math.max(8, maxLeft))}px`;
      tooltip.style.top = `${clamp(y + 12, 8, Math.max(8, shellRect.height - tooltip.offsetHeight - 12))}px`;
    }
    shell.classList.add("is-hovering");
  }

  function attachShell(shell) {
    shell.addEventListener("pointermove", (event) => {
      if (dragState?.shell === shell) {
        const meta = chartMeta.get(shell);
        if (!meta) return;
        const rect = meta.svg.getBoundingClientRect();
        const spacingPx = Math.max(1, (meta.spacing / meta.box.width) * rect.width);
        const deltaIndex = Math.round((event.clientX - dragState.x) / spacingPx);
        const frame = activeFrame();
        const count = rangeCount(frame);
        const nextEnd = clamp(dragState.endIndex - deltaIndex, count - 1, frame.candles.length - 1);
        if (nextEnd !== state.viewEndIndex) {
          state.viewEndIndex = nextEnd;
          renderAll();
        }
        updateHover(shell, event);
        return;
      }

      updateHover(shell, event);
    });

    shell.addEventListener("pointerleave", () => {
      shell.classList.remove("is-hovering");
    });

    shell.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || event.target.closest("[data-memory-marker]")) return;
      const frame = activeFrame();
      const window = visibleWindow(frame);
      dragState = { shell, x: event.clientX, endIndex: window.endIndex };
      shell.classList.add("is-dragging");
      shell.setPointerCapture?.(event.pointerId);
    });

    shell.addEventListener("pointerup", (event) => {
      if (dragState?.shell !== shell) return;
      dragState = null;
      shell.classList.remove("is-dragging");
      shell.releasePointerCapture?.(event.pointerId);
    });

    shell.addEventListener("wheel", (event) => {
      const meta = chartMeta.get(shell);
      if (!meta) return;
      event.preventDefault();

      const frame = activeFrame();
      const current = visibleWindow(frame);
      const rect = meta.svg.getBoundingClientRect();
      const xSvg = ((event.clientX - rect.left) / rect.width) * meta.box.width;
      const ratio = clamp((xSvg - meta.box.left) / Math.max(1, meta.box.width - meta.box.left - meta.box.right), 0, 1);
      const focusedIndex = current.startIndex + Math.round((current.candles.length - 1) * ratio);
      const factor = event.deltaY > 0 ? 1.18 : 0.84;
      const minCount = state.timeframe === "day" ? 35 : 14;
      const nextCount = clamp(Math.round(current.candles.length * factor), minCount, frame.candles.length);
      const nextEnd = clamp(
        Math.round(focusedIndex + (nextCount - 1) * (1 - ratio)),
        nextCount - 1,
        frame.candles.length - 1,
      );

      state.customCount = nextCount;
      state.range = "custom";
      state.viewEndIndex = nextEnd;
      renderAll();
      updateHover(shell, event);
    }, { passive: false });
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async function loadSnapshot(note = "") {
    const payload = normalizeBtcCandles(await fetchJson(btcSnapshotUrl));
    state.provider = "binance";
    state.payload = payload;
    state.daily = payload.candles;
    state.weekly = aggregateWeeklyCandles(state.daily);
    state.viewEndIndex = null;
    state.note = note || "静态兜底";
  }

  async function loadBtcData(provider = state.provider, { manual = false } = {}) {
    state.loading = true;
    state.note = "";
    setStatus(`${btcProviderLabels[provider] || "交易所"}：正在获取真实日线...`);

    try {
      if (isStaticOnlyHost) {
        await loadSnapshot(provider === "okx" ? "OKX 需 Cloudflare 接口，当前显示 Binance 快照" : "GitHub 静态快照");
      } else {
        const payload = normalizeBtcCandles(await fetchJson(`api/btc-candles?provider=${provider}`));
        state.provider = payload.provider || provider;
        state.payload = payload;
        state.daily = payload.candles;
        state.weekly = aggregateWeeklyCandles(state.daily);
        state.viewEndIndex = null;
        state.note = manual ? "手动刷新" : "";
      }
    } catch (error) {
      console.warn("BTC exchange data failed", error);
      await loadSnapshot(`${btcProviderLabels[provider] || "交易所"} 暂不可用，显示 Binance 快照`);
    } finally {
      state.loading = false;
      renderAll();
    }
  }

  timeframeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.timeframe = button.dataset.btcTimeframe;
      state.viewEndIndex = null;
      renderAll();
    });
  });

  providerButtons.forEach((button) => {
    button.addEventListener("click", () => loadBtcData(button.dataset.btcProvider, { manual: true }));
  });

  rangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.range = button.dataset.btcRange;
      state.customCount = null;
      state.viewEndIndex = null;
      renderAll();
    });
  });

  refreshButtons.forEach((button) => {
    button.addEventListener("click", () => loadBtcData(state.provider, { manual: true }));
  });

  openLargeButton?.addEventListener("click", () => {
    if (!dialog) return;
    dialog.showModal();
    renderAll();
  });

  closeLargeButton?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  chartConfigs
    .map((config) => config.svg.closest(".btc-tradingview-shell"))
    .filter(Boolean)
    .forEach(attachShell);

  renderAll();
  loadBtcData("binance");
}

setupBtcMemoryChart();

document.addEventListener("click", (event) => {
  const marker = event.target.closest("[data-memory-marker]");

  if (!marker) return;

  const target = document.getElementById(marker.dataset.memoryMarker);

  if (!target) return;

  event.preventDefault();
  const dialog = document.querySelector("#btc-chart-dialog");
  if (dialog?.open) dialog.close();
  target.open = true;
  target.scrollIntoView({ behavior: "smooth", block: "center" });
});

resize();
draw();
