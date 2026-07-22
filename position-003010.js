const trade = {
  name: "若羽臣",
  code: "003010",
  symbol: "sz003010",
  status: "open",
  buyDate: "2026-07-22",
  buyPrice: 24.9,
  buyFee: 5,
  shares: 200,
  invested: 4985,
};

const snapshotDaily = [
  { day: "2026-06-16", open: 24.96, high: 25, low: 24.33, close: 24.38, volume: 6294530 },
  { day: "2026-06-17", open: 24.2, high: 24.36, low: 23.76, close: 23.86, volume: 4732136 },
  { day: "2026-06-18", open: 23.7, high: 24.19, low: 23.57, close: 23.68, volume: 3627817 },
  { day: "2026-06-22", open: 23.6, high: 23.68, low: 22.96, close: 23.6, volume: 7151960 },
  { day: "2026-06-23", open: 23.37, high: 24.1, low: 23.17, close: 23.3, volume: 4952862 },
  { day: "2026-06-24", open: 23.44, high: 23.45, low: 22.7, close: 22.8, volume: 4701389 },
  { day: "2026-06-25", open: 22.68, high: 22.78, low: 21.85, close: 22.5, volume: 6891186 },
  { day: "2026-06-26", open: 22.5, high: 22.5, low: 21.94, close: 21.94, volume: 4242708 },
  { day: "2026-06-29", open: 21.74, high: 23.66, low: 21.3, close: 23.56, volume: 10604084 },
  { day: "2026-06-30", open: 23.4, high: 24.51, low: 23.36, close: 24.3, volume: 9110138 },
  { day: "2026-07-01", open: 24.4, high: 25, low: 24.25, close: 24.63, volume: 6353288 },
  { day: "2026-07-02", open: 24.65, high: 25.5, low: 24.63, close: 25.1, volume: 7330709 },
  { day: "2026-07-03", open: 25.15, high: 25.77, low: 24.36, close: 24.72, volume: 8539567 },
  { day: "2026-07-06", open: 24.71, high: 24.95, low: 24.16, close: 24.63, volume: 5433652 },
  { day: "2026-07-07", open: 24.71, high: 24.71, low: 23.74, close: 23.92, volume: 4906008 },
  { day: "2026-07-08", open: 23.8, high: 24.37, low: 23.37, close: 23.48, volume: 5092100 },
  { day: "2026-07-09", open: 23.4, high: 23.4, low: 22.34, close: 22.44, volume: 5090950 },
  { day: "2026-07-10", open: 22.33, high: 23.39, low: 22.14, close: 22.69, volume: 6319856 },
  { day: "2026-07-13", open: 22.75, high: 22.88, low: 21.82, close: 21.85, volume: 5008920 },
  { day: "2026-07-14", open: 21.75, high: 22.54, low: 21.46, close: 22.33, volume: 5713681 },
  { day: "2026-07-15", open: 22, high: 24.56, low: 21.54, close: 24.56, volume: 9233396 },
  { day: "2026-07-16", open: 24.83, high: 26.4, low: 24.44, close: 26.23, volume: 23180534 },
  { day: "2026-07-17", open: 26.15, high: 26.98, low: 25.7, close: 26.4, volume: 20130655 },
  { day: "2026-07-20", open: 26.2, high: 27.3, low: 25.36, close: 27.27, volume: 20606823 },
  { day: "2026-07-21", open: 26.76, high: 27.02, low: 25, close: 25.36, volume: 23007322 },
  { day: "2026-07-22", open: 25.2, high: 25.45, low: 24.46, close: 24.94, volume: 15945095 },
];

const snapshotQuote = {
  price: 24.94,
  open: 25.2,
  previousClose: 25.36,
  high: 25.45,
  low: 24.46,
  volume: 15945095,
  date: "2026-07-22",
  time: "15:35:15",
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

  const existing = daily.find((bar) => bar.day === quote.date);
  const liveBar = {
    day: quote.date,
    open: quote.open || quote.price,
    high: quote.high || quote.price,
    low: quote.low || quote.price,
    close: quote.price,
    volume: quote.volume || 0,
    live: true,
  };
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
  const lastPrice = quote.price || snapshotQuote.price;
  const marketValue = lastPrice * trade.shares;
  const pnl = marketValue - trade.invested;
  const pnlRate = pnl / trade.invested;
  const positive = pnl >= 0;
  const dateForDays = quote.date || shanghaiToday();
  const sessions = chartCandles(viewState).filter((bar) => bar.day >= trade.buyDate).length;

  setText("#last-price", money.format(lastPrice));
  setText("#price-time", `${quote.date || "静态快照"} ${quote.time || ""} / 新浪行情`);
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
    const response = await fetch("api/position-003010", { cache: "no-store" });
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
    quoteStatus.textContent = automatic
      ? `已自动刷新：新浪财经 ${quote.date} ${quote.time}，当前价 ${money.format(quote.price)}。`
      : `已手动刷新：新浪财经 ${quote.date} ${quote.time}，当前价 ${money.format(quote.price)}。`;
  } catch (error) {
    const onGitHubPages = location.hostname.endsWith("github.io");
    quoteStatus.textContent = onGitHubPages
      ? "当前显示静态快照；Cloudflare 站点可通过接口刷新新浪行情。"
      : "行情更新暂时失败，当前仍显示静态快照，请稍后重试。";
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
  quoteStatus.textContent = "当前显示静态快照；Cloudflare 站点可自动刷新新浪行情。";
} else {
  refreshPosition({ automatic: true });
}
