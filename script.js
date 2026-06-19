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
        state.note = [manual ? "手动刷新" : "", payload.note || ""].filter(Boolean).join(" · ");
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

/* ================================================================
   CSI 1000 实盘买卖标记 — 日线蜡烛图 + 交易事件叠加
   ================================================================ */

const csi1000TradeEvents = [
  {
    stock: "安洁科技",
    code: "002635",
    type: "buy",
    date: "2026-05-12",
    price: 16.61,
  },
  {
    stock: "安洁科技",
    code: "002635",
    type: "sell",
    date: "2026-05-28",
    price: 17.57,
  },
  {
    stock: "长龄液压",
    code: "605389",
    type: "buy",
    date: "2026-06-01",
    price: 85.00,
  },
];

const csi1000SnapshotDaily = [
  { day: "2026-04-28", open: 8725, high: 8780, low: 8702, close: 8756, volume: 182340000 },
  { day: "2026-04-29", open: 8758, high: 8795, low: 8708, close: 8724, volume: 175600000 },
  { day: "2026-04-30", open: 8724, high: 8810, low: 8710, close: 8788, volume: 192100000 },
  { day: "2026-05-06", open: 8760, high: 8825, low: 8745, close: 8802, volume: 168900000 },
  { day: "2026-05-07", open: 8802, high: 8855, low: 8780, close: 8838, volume: 184300000 },
  { day: "2026-05-08", open: 8840, high: 8862, low: 8790, close: 8812, volume: 172500000 },
  { day: "2026-05-09", open: 8810, high: 8835, low: 8775, close: 8795, volume: 159800000 },
  { day: "2026-05-12", open: 8750, high: 8860, low: 8730, close: 8822, volume: 205600000 },
  { day: "2026-05-13", open: 8825, high: 8980, low: 8810, close: 8956, volume: 234100000 },
  { day: "2026-05-14", open: 8958, high: 8975, low: 8750, close: 8780, volume: 221800000 },
  { day: "2026-05-15", open: 8782, high: 8795, low: 8660, close: 8684, volume: 198700000 },
  { day: "2026-05-16", open: 8684, high: 8750, low: 8665, close: 8722, volume: 186500000 },
  { day: "2026-05-19", open: 8722, high: 8835, low: 8710, close: 8809, volume: 202300000 },
  { day: "2026-05-20", open: 8810, high: 8840, low: 8770, close: 8809, volume: 176400000 },
  { day: "2026-05-21", open: 8808, high: 8815, low: 8490, close: 8513, volume: 258900000 },
  { day: "2026-05-22", open: 8510, high: 8720, low: 8500, close: 8694, volume: 245100000 },
  { day: "2026-05-23", open: 8695, high: 8825, low: 8680, close: 8800, volume: 189200000 },
  { day: "2026-05-26", open: 8800, high: 8820, low: 8665, close: 8689, volume: 177800000 },
  { day: "2026-05-27", open: 8690, high: 8695, low: 8520, close: 8547, volume: 213400000 },
  { day: "2026-05-28", open: 8550, high: 8610, low: 8540, close: 8586, volume: 181200000 },
  { day: "2026-05-29", open: 8585, high: 8650, low: 8570, close: 8628, volume: 169500000 },
  { day: "2026-05-30", open: 8630, high: 8645, low: 8575, close: 8602, volume: 165800000 },
  { day: "2026-06-01", open: 8600, high: 8680, low: 8590, close: 8655, volume: 178900000 },
  { day: "2026-06-02", open: 8655, high: 8710, low: 8640, close: 8688, volume: 182300000 },
  { day: "2026-06-03", open: 8690, high: 8730, low: 8660, close: 8705, volume: 175100000 },
  { day: "2026-06-04", open: 8705, high: 8720, low: 8640, close: 8662, volume: 170400000 },
  { day: "2026-06-05", open: 8660, high: 8745, low: 8650, close: 8728, volume: 183600000 },
  { day: "2026-06-06", open: 8730, high: 8780, low: 8710, close: 8755, volume: 190200000 },
  { day: "2026-06-09", open: 8755, high: 8775, low: 8700, close: 8732, volume: 167400000 },
  { day: "2026-06-10", open: 8730, high: 8745, low: 8680, close: 8708, volume: 162800000 },
  { day: "2026-06-11", open: 8710, high: 8780, low: 8695, close: 8755, volume: 179500000 },
  { day: "2026-06-12", open: 8755, high: 8825, low: 8740, close: 8805, volume: 201300000 },
  { day: "2026-06-13", open: 8805, high: 8820, low: 8760, close: 8782, volume: 185600000 },
  { day: "2026-06-16", open: 8780, high: 8845, low: 8770, close: 8828, volume: 194500000 },
  { day: "2026-06-17", open: 8830, high: 8875, low: 8810, close: 8855, volume: 208100000 },
  { day: "2026-06-18", open: 8855, high: 8870, low: 8815, close: 8837, volume: 186700000 },
];

let csi1000LiveDaily = null;
let csi1000ChartMode = "journal";

const csi1000ChartSvgNs = "http://www.w3.org/2000/svg";

function csi1000GetCandles() {
  if (csi1000LiveDaily && csi1000LiveDaily.length) {
    return csi1000LiveDaily;
  }
  return csi1000SnapshotDaily;
}

function csi1000FormatDateLabel(day) {
  if (!day) return "";
  const parts = day.split("-");
  return `${parts[1]}.${parts[2]}`;
}

function csi1000FormatPrice(value) {
  return Math.round(value).toLocaleString("en-US");
}

function csi1000NearestIndex(candles, date) {
  const targetMs = parseUtcDate(date);
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < candles.length; i += 1) {
    const dist = Math.abs(parseUtcDate(candles[i].day) - targetMs);
    if (dist < bestDist) { bestDist = dist; best = i; }
  }
  return best;
}

function csi1000BuildSvg(candles, box) {
  const plotWidth = box.width - box.left - box.right;
  const plotHeight = box.height - box.top - box.bottom;

  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  const minPrice = Math.min(...lows) * 0.992;
  const maxPrice = Math.max(...highs) * 1.008;
  const priceRange = maxPrice - minPrice;

  const spacing = plotWidth / Math.max(1, candles.length - 1);
  const bodyWidth = Math.max(1.6, Math.min(7, spacing * 0.7));

  const xForIndex = (i) => box.left + i * spacing;
  const yForPrice = (p) => box.top + ((maxPrice - p) / priceRange) * plotHeight;

  const yTicks = [];
  const tickStep = Math.ceil(priceRange / 5 / 50) * 50;
  const tickMin = Math.ceil(minPrice / tickStep) * tickStep;
  for (let p = tickMin; p <= maxPrice; p += tickStep) {
    yTicks.push(p);
  }

  const yTickLines = yTicks
    .map((p) => {
      const y = yForPrice(p).toFixed(1);
      return `<line x1="${box.left}" y1="${y}" x2="${box.width - box.right}" y2="${y}"></line><text class="index-grid-label" x="${box.width - 28}" y="${Number(y) + 4}">${csi1000FormatPrice(p)}</text>`;
    })
    .join("");

  const xTickIndices = [0, Math.floor(candles.length / 3), Math.floor((candles.length * 2) / 3), candles.length - 1];
  const xTickLines = xTickIndices
    .map((i) => {
      const x = xForIndex(i).toFixed(1);
      const label = csi1000FormatDateLabel(candles[i].day);
      const anchor = i === candles.length - 1 ? "end" : i === 0 ? "start" : "middle";
      return `<line x1="${x}" y1="${box.top}" x2="${x}" y2="${box.height - box.bottom}"></line><text class="index-grid-label" x="${x}" y="${box.height - 16}" text-anchor="${anchor}">${label}</text>`;
    })
    .join("");

  const candleNodes = candles
    .map((candle, i) => {
      const x = xForIndex(i);
      const yOpen = yForPrice(candle.open);
      const yClose = yForPrice(candle.close);
      const yHigh = yForPrice(candle.high);
      const yLow = yForPrice(candle.low);
      const bodyTop = Math.min(yOpen, yClose);
      const bodyH = Math.max(1.4, Math.abs(yClose - yOpen));
      const direction = candle.close >= candle.open ? "is-up" : "is-down";
      return `<g class="csi1000-candle ${direction}"><line class="csi1000-candle-wick" x1="${x.toFixed(2)}" y1="${yHigh.toFixed(1)}" x2="${x.toFixed(2)}" y2="${yLow.toFixed(1)}"></line><rect class="csi1000-candle-body" x="${(x - bodyWidth / 2).toFixed(2)}" y="${bodyTop.toFixed(1)}" width="${bodyWidth.toFixed(2)}" height="${bodyH.toFixed(1)}"></rect></g>`;
    })
    .join("");

  const tradeMarkers = csi1000TradeEvents
    .map((evt) => {
      const idx = csi1000NearestIndex(candles, evt.date);
      const candle = candles[idx];
      const x = xForIndex(idx);
      const y = yForPrice(candle.close);
      const isBuy = evt.type === "buy";
      const offsetY = isBuy ? -18 : 22;
      const markerId = `csi1000-marker-${evt.code}-${evt.type}`;
      const label = `${isBuy ? "B" : "S"} ${evt.stock}`;
      return `<g class="csi1000-trade-marker is-${evt.type}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" id="${markerId}"><line x1="0" y1="${isBuy ? -14 : 6}" x2="0" y2="${isBuy ? -4 : 16}" class="csi1000-marker-stem"></line><circle r="5" class="csi1000-marker-dot"></circle><text x="0" y="${offsetY}" text-anchor="middle" class="csi1000-marker-label">${label}</text><title>${evt.stock}(${evt.code}) ${isBuy ? "买入" : "卖出"} ${evt.date} ¥${evt.price}</title></g>`;
    })
    .join("");

  const lastCandle = candles[candles.length - 1];
  const lastY = yForPrice(lastCandle.close).toFixed(1);
  const lastPriceLine = `<g class="csi1000-last-price"><line x1="${box.left}" y1="${lastY}" x2="${box.width - box.right}" y2="${lastY}"></line><text x="${box.width - 28}" y="${Number(lastY) - 6}">${csi1000FormatPrice(lastCandle.close)}</text></g>`;

  return `<svg xmlns="${csi1000ChartSvgNs}" id="journal-index-chart" class="index-chart csi1000-candle-chart" viewBox="0 0 ${box.width} ${box.height}" role="img" aria-labelledby="csi1000-chart-title csi1000-chart-desc"><title id="csi1000-chart-title">中证 1000 日线蜡烛图与实盘买卖标记</title><desc id="csi1000-chart-desc">中证 1000 日线 K 线图，标记实盘中各股票的买入和卖出时间点。</desc><rect class="csi1000-chart-bg" x="${box.left}" y="${box.top}" width="${plotWidth}" height="${plotHeight}" rx="4"></rect><g class="csi1000-grid" aria-hidden="true">${yTickLines}${xTickLines}</g><g class="csi1000-candles" aria-hidden="true">${candleNodes}</g>${lastPriceLine}<g class="csi1000-trade-markers">${tradeMarkers}</g></svg>`;
}

function renderCsi1000TradeChart() {
  const chartWrap = document.getElementById("journal-chart-wrap");
  const figcaption = document.getElementById("journal-chart-caption");
  const rangeText = document.getElementById("journal-range-text");
  const labelEl = document.getElementById("journal-chart-label");
  const resetBtn = document.getElementById("journal-chart-reset");

  if (!chartWrap) return;

  const candles = csi1000GetCandles();

  const box = { width: 840, height: 380, left: 64, right: 52, top: 28, bottom: 54 };

  const svgString = csi1000BuildSvg(candles, box);
  chartWrap.innerHTML = svgString;

  if (figcaption) {
    const firstDate = csi1000FormatDateLabel(candles[0].day);
    const lastDate = csi1000FormatDateLabel(candles[candles.length - 1].day);
    const lastClose = csi1000FormatPrice(candles[candles.length - 1].close);
    figcaption.innerHTML = `日线 K 线：<strong>${firstDate} — ${lastDate}</strong>，最新收盘 <strong>${lastClose}</strong>。<em>◆ 买入</em>  <em>◇ 卖出</em> 标记按实盘交易日期落在对应 K 线上。`;
  }

  if (rangeText) {
    rangeText.textContent = `${csi1000FormatDateLabel(candles[0].day)} - ${csi1000FormatDateLabel(candles[candles.length - 1].day)}`;
  }

  if (labelEl) {
    labelEl.textContent = "Market Context / Trade Marks";
  }

  if (resetBtn) {
    resetBtn.style.display = "";
  }

  csi1000ChartMode = "trade";
}

function resetCsi1000JournalChart() {
  const chartWrap = document.getElementById("journal-chart-wrap");
  const figcaption = document.getElementById("journal-chart-caption");
  const rangeText = document.getElementById("journal-range-text");
  const labelEl = document.getElementById("journal-chart-label");
  const resetBtn = document.getElementById("journal-chart-reset");

  if (!chartWrap) return;

  chartWrap.innerHTML = `<svg id="journal-index-chart" class="index-chart" viewBox="0 0 724 286" role="img" aria-labelledby="index-chart-title index-chart-desc"><title id="index-chart-title">中证 1000 近期收盘日线与 2026 年 5 月 27 日交易日志点位</title><desc id="index-chart-desc">2026 年 5 月 12 日至 27 日的中证 1000 收盘路径，5 月 27 日收于 8546.51 点并标有一条交易日志。</desc><g class="index-grid" aria-hidden="true"><line x1="44" y1="32" x2="684" y2="32"></line><line x1="44" y1="128.4" x2="684" y2="128.4"></line><line x1="44" y1="224.7" x2="684" y2="224.7"></line><text x="0" y="36">9,000</text><text x="0" y="132.4">8,750</text><text x="0" y="228.7">8,500</text></g><polyline class="index-path" points="44,100.7 102.2,49.2 160.4,117.3 218.5,154.3 276.7,139.8 334.9,105.8 393.1,105.7 451.3,220.7 509.5,150.5 567.6,109.4 625.8,152.5 684,206.8"></polyline><g class="index-points" aria-hidden="true"><circle cx="44" cy="100.7" r="3"></circle><circle cx="102.2" cy="49.2" r="3"></circle><circle cx="160.4" cy="117.3" r="3"></circle><circle cx="218.5" cy="154.3" r="3"></circle><circle cx="276.7" cy="139.8" r="3"></circle><circle cx="334.9" cy="105.8" r="3"></circle><circle cx="393.1" cy="105.7" r="3"></circle><circle cx="451.3" cy="220.7" r="3"></circle><circle cx="509.5" cy="150.5" r="3"></circle><circle cx="567.6" cy="109.4" r="3"></circle><circle cx="625.8" cy="152.5" r="3"></circle></g><g class="entry-marker" aria-hidden="true"><line x1="684" y1="38" x2="684" y2="244"></line><circle cx="684" cy="206.8" r="13"></circle><circle class="entry-dot" cx="684" cy="206.8" r="5"></circle><text x="670" y="194" text-anchor="end">日志 05.27</text></g><g class="index-dates" aria-hidden="true"><text x="44" y="268">05.12</text><text x="334.9" y="268" text-anchor="middle">05.19</text><text x="684" y="268" text-anchor="end">05.27</text></g></svg>`;

  if (figcaption) {
    figcaption.innerHTML = `日线收盘点位：2026.05.27 为 <strong>8,546.51</strong>。日志标记固定在对应交易日上。`;
  }

  if (rangeText) {
    rangeText.textContent = "05.12 - 05.27";
  }

  if (labelEl) {
    labelEl.textContent = "Market Context";
  }

  if (resetBtn) {
    resetBtn.style.display = "none";
  }

  csi1000ChartMode = "journal";
}

async function refreshCsi1000Data() {
  if (typeof window === "undefined") return;
  const { protocol, hostname } = window.location;
  if (protocol === "file:" || hostname === "chensher.github.io") {
    console.log("CSI 1000: using snapshot data (static host)");
    return;
  }

  try {
    const url = "/api/csi1000";
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    if (data.daily && data.daily.length) {
      csi1000LiveDaily = data.daily;
      console.log(`CSI 1000: loaded ${data.daily.length} daily bars from ${data.provider}`);
    }
  } catch (err) {
    console.warn("CSI 1000 live data unavailable, using snapshot", err.message || err);
  }
}

function setupCsi1000TradeOverlay() {
  const button = document.getElementById("csi1000-trade-button");
  const resetBtn = document.getElementById("journal-chart-reset");
  const journalSection = document.getElementById("journal");

  if (!button) return;

  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = "正在加载中证 1000 日线...";

    try {
      await refreshCsi1000Data();
    } catch (_) {
      /* fallback to snapshot */
    }

    renderCsi1000TradeChart();

    button.textContent = "";
    button.innerHTML = '<span class="csi1000-trade-button-icon" aria-hidden="true">◆</span> 在中证 1000 日线上标记买卖点';
    button.disabled = false;

    if (journalSection) {
      journalSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetCsi1000JournalChart();
    });
  }
}

setupCsi1000TradeOverlay();

resize();
draw();
