const trade = {
  name: "美诺华",
  code: "603538",
  symbol: "sh603538",
  status: "open",
  buyDate: "2026-06-24",
  buyPrice: 38.73,
  buyFee: 5,
  shares: 200,
  invested: 7751,
};

const snapshotDaily = [
  { day: "2026-04-16", open: 55.5, high: 57.29, low: 54.21, close: 56, volume: 65720269 },
  { day: "2026-04-17", open: 56, high: 56.19, low: 52.3, close: 52.5, volume: 58975566 },
  { day: "2026-04-20", open: 53.34, high: 53.51, low: 50.75, close: 51.41, volume: 48819923 },
  { day: "2026-04-21", open: 51.28, high: 54.23, low: 50.5, close: 52.53, volume: 55356044 },
  { day: "2026-04-22", open: 51.5, high: 54, low: 48.69, close: 50.5, volume: 57305288 },
  { day: "2026-04-23", open: 50.91, high: 55.55, low: 49.88, close: 55.55, volume: 62454259 },
  { day: "2026-04-24", open: 55, high: 59.4, low: 54.1, close: 57.58, volume: 59375985 },
  { day: "2026-04-27", open: 56.5, high: 59.38, low: 54.8, close: 56.4, volume: 54128787 },
  { day: "2026-04-28", open: 56, high: 61.5, low: 55.41, close: 60.12, volume: 57229430 },
  { day: "2026-04-29", open: 61.26, high: 65.3, low: 59.85, close: 65.3, volume: 62109220 },
  { day: "2026-04-30", open: 62.99, high: 63.45, low: 59.14, close: 62.46, volume: 59409794 },
  { day: "2026-05-06", open: 64.65, high: 68.71, low: 62.66, close: 68.5, volume: 56179604 },
  { day: "2026-05-07", open: 69, high: 70.39, low: 61.65, close: 61.65, volume: 75596111 },
  { day: "2026-05-08", open: 61, high: 64.35, low: 57, close: 63.7, volume: 62924235 },
  { day: "2026-05-11", open: 62, high: 63.5, low: 57.33, close: 57.33, volume: 62301055 },
  { day: "2026-05-12", open: 56.02, high: 56.5, low: 52.11, close: 54.01, volume: 60576017 },
  { day: "2026-05-13", open: 54.15, high: 57.15, low: 53.57, close: 56, volume: 46801011 },
  { day: "2026-05-14", open: 55.03, high: 57, low: 52.63, close: 52.63, volume: 43760995 },
  { day: "2026-05-15", open: 51, high: 53.01, low: 49.52, close: 50.8, volume: 36628892 },
  { day: "2026-05-18", open: 51.01, high: 52.31, low: 49.8, close: 50.13, volume: 29439941 },
  { day: "2026-05-19", open: 50.19, high: 52.23, low: 49.31, close: 50.78, volume: 32730200 },
  { day: "2026-05-20", open: 50.53, high: 53.54, low: 50.03, close: 53.02, volume: 36863953 },
  { day: "2026-05-21", open: 52.29, high: 54.81, low: 52.2, close: 53.15, volume: 43632964 },
  { day: "2026-05-22", open: 52.44, high: 53.49, low: 49.5, close: 50.44, volume: 37420546 },
  { day: "2026-05-25", open: 49.18, high: 49.18, low: 45.4, close: 46, volume: 47197651 },
  { day: "2026-05-26", open: 45, high: 45.4, low: 42, close: 42.24, volume: 43672555 },
  { day: "2026-05-27", open: 43.43, high: 46.46, low: 43.43, close: 46.46, volume: 31692884 },
  { day: "2026-05-28", open: 47, high: 47.6, low: 44.71, close: 45.5, volume: 31923932 },
  { day: "2026-05-29", open: 45.93, high: 47.8, low: 44.5, close: 45.08, volume: 28553440 },
  { day: "2026-06-01", open: 43.52, high: 47.47, low: 43.52, close: 46.59, volume: 29437402 },
  { day: "2026-06-02", open: 46.42, high: 47.9, low: 44.03, close: 44.05, volume: 29250428 },
  { day: "2026-06-03", open: 42.68, high: 44.66, low: 41.95, close: 43.27, volume: 27636194 },
  { day: "2026-06-04", open: 43.01, high: 44.2, low: 41.97, close: 42.22, volume: 19748767 },
  { day: "2026-06-05", open: 44.02, high: 44.6, low: 39.44, close: 39.66, volume: 28200145 },
  { day: "2026-06-08", open: 39.01, high: 40.79, low: 37.85, close: 38.84, volume: 24316395 },
  { day: "2026-06-09", open: 39.07, high: 39.7, low: 38.02, close: 39.6, volume: 18909708 },
  { day: "2026-06-10", open: 38.71, high: 39.58, low: 38.19, close: 38.5, volume: 16349769 },
  { day: "2026-06-11", open: 38.5, high: 38.8, low: 36.87, close: 36.99, volume: 21510928 },
  { day: "2026-06-12", open: 37.73, high: 39.06, low: 37.04, close: 38.4, volume: 19433960 },
  { day: "2026-06-15", open: 38, high: 39.04, low: 37.66, close: 39.02, volume: 16302165 },
  { day: "2026-06-16", open: 39, high: 39.2, low: 37.39, close: 38.02, volume: 14903363 },
  { day: "2026-06-17", open: 37.79, high: 38.28, low: 37.43, close: 37.8, volume: 13305053 },
  { day: "2026-06-18", open: 37.56, high: 38.53, low: 37.01, close: 37.92, volume: 17259526 },
  { day: "2026-06-22", open: 37.03, high: 37.5, low: 35.92, close: 37.28, volume: 20077733 },
  { day: "2026-06-23", open: 37.28, high: 39.47, low: 37.28, close: 37.63, volume: 25881279 },
];

const snapshotQuote = {
  price: trade.buyPrice,
  open: trade.buyPrice,
  previousClose: 37.63,
  high: trade.buyPrice,
  low: trade.buyPrice,
  volume: 0,
  date: trade.buyDate,
  time: "成交价快照",
};

const money = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  minimumFractionDigits: 2,
});
const quantity = new Intl.NumberFormat("zh-CN");

const refreshButton = document.querySelector("#refresh-position");
const quoteStatus = document.querySelector("#quote-status");
const chartCanvas = document.querySelector("#position-chart");
const chartTooltip = document.querySelector("#chart-tooltip");
const chartCtx = chartCanvas?.getContext("2d");

let viewState = {
  daily: snapshotDaily,
  quote: snapshotQuote,
  source: "snapshot",
};
let chartHitAreas = [];

function shanghaiToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai" }).format(new Date());
}

function inclusiveDays(start, end) {
  const startMs = Date.parse(`${start}T00:00:00+08:00`);
  const endMs = Date.parse(`${end}T00:00:00+08:00`);
  return Math.max(1, Math.round((endMs - startMs) / 86400000) + 1);
}

function chartCandles(state) {
  const daily = state.daily.map((bar) => ({ ...bar }));
  const quote = state.quote;
  if (!quote || !quote.date || !quote.price) return daily.slice(-60);

  const liveBar = {
    day: quote.date,
    open: quote.open || quote.price,
    high: Math.max(quote.high || quote.price, quote.price),
    low: Math.min(quote.low || quote.price, quote.price),
    close: quote.price,
    volume: quote.volume || 0,
    live: true,
  };
  const existing = daily.find((bar) => bar.day === quote.date);
  if (existing) Object.assign(existing, liveBar);
  else daily.push(liveBar);
  return daily.slice(-60);
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function normalizedQuote(quote) {
  if (!quote || !quote.date || quote.date < trade.buyDate) {
    return snapshotQuote;
  }
  return quote;
}

function renderMetrics() {
  const quote = normalizedQuote(viewState.quote);
  const lastPrice = quote.price || trade.buyPrice;
  const marketValue = lastPrice * trade.shares;
  const pnl = marketValue - trade.invested;
  const pnlRate = pnl / trade.invested;
  const positive = pnl >= 0;
  const dateForDays = quote.date || shanghaiToday();
  const sessions = chartCandles(viewState).filter((bar) => bar.day >= trade.buyDate).length;

  setText("#last-price", money.format(lastPrice));
  setText("#price-time", `${quote.date || "静态快照"} ${quote.time || ""} / ${quote === snapshotQuote ? "成交快照" : "新浪行情"}`);
  setText("#market-value", money.format(marketValue));
  setText("#pnl-value", `${positive ? "+" : "-"}${money.format(Math.abs(pnl))}`);
  setText("#pnl-rate", `${positive ? "+" : ""}${(pnlRate * 100).toFixed(2)}%`);
  setText("#holding-days", `${inclusiveDays(trade.buyDate, dateForDays)} 天`);
  setText("#trading-days", `${sessions} 个已展示交易日 / 建仓至今`);

  const pnlCard = document.querySelector("#pnl-card");
  pnlCard?.classList.toggle("pnl-positive", positive);
  pnlCard?.classList.toggle("pnl-negative", !positive);
}

function drawLine(ctx, values, xFor, yFor, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  values.forEach((value, index) => {
    const x = xFor(index);
    const y = yFor(value);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function renderChart() {
  if (!chartCanvas || !chartCtx) return;
  const bars = chartCandles(viewState);
  const bounds = chartCanvas.parentElement.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cssWidth = Math.max(280, Math.floor(bounds.width));
  const cssHeight = cssWidth < 560 ? 370 : 490;
  chartCanvas.width = cssWidth * dpr;
  chartCanvas.height = cssHeight * dpr;
  chartCanvas.style.width = `${cssWidth}px`;
  chartCanvas.style.height = `${cssHeight}px`;
  chartCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const ctx = chartCtx;
  const left = cssWidth < 560 ? 42 : 56;
  const right = cssWidth < 560 ? 12 : 26;
  const top = 25;
  const bottom = 34;
  const volumeHeight = Math.round(cssHeight * 0.2);
  const gap = 30;
  const priceBottom = cssHeight - bottom - volumeHeight - gap;
  const volumeTop = priceBottom + gap;
  const plotWidth = cssWidth - left - right;
  const high = Math.max(...bars.map((bar) => bar.high), trade.buyPrice) * 1.035;
  const low = Math.min(...bars.map((bar) => bar.low), trade.buyPrice) * 0.98;
  const maxVolume = Math.max(...bars.map((bar) => bar.volume || 1));
  const step = plotWidth / bars.length;
  const bodyWidth = Math.max(3, Math.min(14, step * 0.56));
  const xFor = (index) => left + step * index + step / 2;
  const yFor = (price) => top + ((high - price) / (high - low)) * (priceBottom - top);
  chartHitAreas = [];

  ctx.clearRect(0, 0, cssWidth, cssHeight);
  ctx.font = "12px ui-monospace, Consolas, monospace";
  ctx.textBaseline = "middle";

  for (let line = 0; line <= 4; line += 1) {
    const ratio = line / 4;
    const y = top + (priceBottom - top) * ratio;
    const label = (high - (high - low) * ratio).toFixed(2);
    ctx.strokeStyle = "rgba(247,243,232,0.10)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(cssWidth - right, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(185,181,170,0.9)";
    ctx.fillText(label, 2, y);
  }

  const buyY = yFor(trade.buyPrice);
  ctx.save();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "#d9b65c";
  ctx.beginPath();
  ctx.moveTo(left, buyY);
  ctx.lineTo(cssWidth - right, buyY);
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = "#d9b65c";
  ctx.fillText(`建仓 ${trade.buyPrice.toFixed(2)}`, left + 4, buyY - 12);

  const ma5 = bars.map((_, index) => {
    const from = Math.max(0, index - 4);
    const range = bars.slice(from, index + 1);
    return range.reduce((sum, bar) => sum + bar.close, 0) / range.length;
  });
  drawLine(ctx, ma5, xFor, yFor, "#74a7e8");

  bars.forEach((bar, index) => {
    const x = xFor(index);
    const isRise = bar.close >= bar.open;
    const color = isRise ? "#df5b4f" : "#57bd89";
    const openY = yFor(bar.open);
    const closeY = yFor(bar.close);
    const highY = yFor(bar.high);
    const lowY = yFor(bar.low);
    const bodyTop = Math.min(openY, closeY);
    const bodyHeight = Math.max(2, Math.abs(openY - closeY));
    const volHeight = ((bar.volume || 0) / maxVolume) * volumeHeight;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, highY);
    ctx.lineTo(x, lowY);
    ctx.stroke();
    ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
    ctx.globalAlpha = 0.58;
    ctx.fillRect(x - bodyWidth / 2, volumeTop + volumeHeight - volHeight, bodyWidth, volHeight);
    ctx.globalAlpha = 1;

    if (bar.day === trade.buyDate) {
      drawBuyMarker(ctx, x, buyY);
    }

    if (bar.live) {
      ctx.strokeStyle = "#f7f3e8";
      ctx.strokeRect(x - bodyWidth / 2 - 2, bodyTop - 2, bodyWidth + 4, bodyHeight + 4);
    }

    chartHitAreas.push({ x, bar });
  });

  if (!bars.some((bar) => bar.day === trade.buyDate)) {
    const fallbackX = Math.min(cssWidth - right - step / 2, xFor(bars.length - 1) + step * 0.85);
    drawBuyMarker(ctx, fallbackX, buyY);
  }

  const labelEvery = Math.max(1, Math.ceil(bars.length / (cssWidth < 560 ? 3 : 7)));
  ctx.fillStyle = "rgba(185,181,170,0.9)";
  bars.forEach((bar, index) => {
    if (index % labelEvery !== 0 && index !== bars.length - 1) return;
    ctx.fillText(bar.day.slice(5), xFor(index) - 16, cssHeight - 14);
  });

  ctx.fillStyle = "#74a7e8";
  ctx.fillText("MA5", left + 4, top + 10);
  ctx.fillStyle = "rgba(185,181,170,0.9)";
  ctx.fillText("成交量", left + 4, volumeTop + 9);
}

function drawBuyMarker(ctx, x, y) {
  ctx.fillStyle = "#d9b65c";
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x, y - 7);
  ctx.lineTo(x - 5, y - 16);
  ctx.lineTo(x + 5, y - 16);
  ctx.closePath();
  ctx.fill();
}

function showTooltip(event) {
  if (!chartCanvas || !chartTooltip || !chartHitAreas.length) return;
  const rect = chartCanvas.getBoundingClientRect();
  const pointerX = event.clientX - rect.left;
  const nearest = chartHitAreas.reduce((choice, item) => (
    Math.abs(item.x - pointerX) < Math.abs(choice.x - pointerX) ? item : choice
  ));
  const bar = nearest.bar;
  chartTooltip.innerHTML = [
    `<strong>${bar.day}${bar.live ? " / 实时" : ""}</strong>`,
    `开 ${bar.open.toFixed(2)}　高 ${bar.high.toFixed(2)}`,
    `低 ${bar.low.toFixed(2)}　收 ${bar.close.toFixed(2)}`,
    `量 ${quantity.format(bar.volume || 0)}`,
  ].join("<br>");
  chartTooltip.hidden = false;
  const maxLeft = rect.width - chartTooltip.offsetWidth - 10;
  chartTooltip.style.left = `${Math.max(8, Math.min(maxLeft, nearest.x + 10))}px`;
  chartTooltip.style.top = "12px";
}

async function refreshPosition({ automatic = false } = {}) {
  if (!refreshButton || !quoteStatus) return;
  refreshButton.disabled = true;
  refreshButton.textContent = "更新中...";
  quoteStatus.textContent = "正在向新浪财经请求最新行情...";
  try {
    const response = await fetch("api/position-603538", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    const quote = normalizedQuote(result.quote);
    viewState = {
      daily: result.daily,
      quote,
      source: result.provider,
    };
    renderMetrics();
    renderChart();
    if (quote === snapshotQuote) {
      quoteStatus.textContent = "新浪最新行情日期早于买入日，暂按成交价快照展示；等 6 月 24 日线更新后会自动切换。";
    } else {
      quoteStatus.textContent = automatic
        ? `已自动刷新：新浪财经 ${quote.date} ${quote.time}，当前价 ${money.format(quote.price)}。`
        : `已手动刷新：新浪财经 ${quote.date} ${quote.time}，当前价 ${money.format(quote.price)}。`;
    }
  } catch (error) {
    const onGitHubPages = location.hostname.endsWith("github.io");
    quoteStatus.textContent = onGitHubPages
      ? "当前显示成交价快照；Cloudflare 站点可通过接口刷新新浪行情。"
      : "行情更新暂时失败，当前仍显示成交价快照，请稍后重试。";
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = "更新新浪行情";
  }
}

chartCanvas?.addEventListener("pointermove", showTooltip);
chartCanvas?.addEventListener("pointerleave", () => {
  if (chartTooltip) chartTooltip.hidden = true;
});
refreshButton?.addEventListener("click", () => refreshPosition());
window.addEventListener("resize", renderChart);

renderMetrics();
renderChart();

const staticOnlyHost = location.hostname.endsWith("github.io") || location.protocol === "file:";
if (staticOnlyHost) {
  quoteStatus.textContent = "当前显示成交价快照；Cloudflare 站点可自动刷新新浪行情。";
} else {
  refreshPosition({ automatic: true });
}
