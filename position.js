const trade = {
  name: "安洁科技",
  code: "002635",
  symbol: "sz002635",
  buyDate: "2026-05-12",
  buyPrice: 16.61,
  shares: 500,
  invested: 8310,
};

const snapshotDaily = [
  { day: "2026-04-20", open: 16.63, high: 17.2, low: 16.43, close: 16.8, volume: 29797981 },
  { day: "2026-04-21", open: 16.67, high: 16.87, low: 16.55, close: 16.64, volume: 17915001 },
  { day: "2026-04-22", open: 16.57, high: 17.63, low: 16.55, close: 17.41, volume: 30317785 },
  { day: "2026-04-23", open: 17.25, high: 17.39, low: 16.52, close: 16.6, volume: 26801193 },
  { day: "2026-04-24", open: 16.64, high: 16.9, low: 16.19, close: 16.31, volume: 21297825 },
  { day: "2026-04-27", open: 16.34, high: 17.0, low: 16.26, close: 16.7, volume: 19547432 },
  { day: "2026-04-28", open: 16.63, high: 16.75, low: 16.17, close: 16.24, volume: 18616465 },
  { day: "2026-04-29", open: 16.23, high: 16.9, low: 16.15, close: 16.57, volume: 17945837 },
  { day: "2026-04-30", open: 16.57, high: 16.74, low: 16.16, close: 16.5, volume: 14176523 },
  { day: "2026-05-06", open: 16.64, high: 16.82, low: 16.43, close: 16.55, volume: 17830259 },
  { day: "2026-05-07", open: 16.58, high: 17.04, low: 16.5, close: 16.86, volume: 19079488 },
  { day: "2026-05-08", open: 16.72, high: 17.05, low: 16.61, close: 16.86, volume: 15439115 },
  { day: "2026-05-11", open: 16.94, high: 16.94, low: 16.46, close: 16.58, volume: 18286700 },
  { day: "2026-05-12", open: 16.5, high: 17.08, low: 16.41, close: 16.76, volume: 23223793 },
  { day: "2026-05-13", open: 16.64, high: 17.19, low: 16.5, close: 16.98, volume: 23386361 },
  { day: "2026-05-14", open: 17.31, high: 18.15, low: 16.83, close: 16.89, volume: 32260112 },
  { day: "2026-05-15", open: 16.93, high: 17.17, low: 16.53, close: 16.76, volume: 25251893 },
  { day: "2026-05-18", open: 16.46, high: 18.44, low: 16.4, close: 18.44, volume: 45970564 },
  { day: "2026-05-19", open: 18.08, high: 18.27, low: 17.29, close: 17.66, volume: 59590956 },
  { day: "2026-05-20", open: 17.66, high: 18.16, low: 17.4, close: 17.87, volume: 51598979 },
  { day: "2026-05-21", open: 17.87, high: 18.32, low: 17.37, close: 17.42, volume: 50185430 },
  { day: "2026-05-22", open: 17.45, high: 19.16, low: 17.27, close: 18.9, volume: 80123025 },
];

const snapshotQuote = {
  price: 18.9,
  date: "2026-05-22",
  time: "收盘",
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

function quoteCandles(state) {
  const daily = state.daily.map((bar) => ({ ...bar }));
  const quote = state.quote;
  if (!quote || !quote.date || !quote.price) return daily;

  const existing = daily.find((bar) => bar.day === quote.date);
  if (existing && quote.open) {
    Object.assign(existing, {
      open: quote.open,
      high: quote.high,
      low: quote.low,
      close: quote.price,
      volume: quote.volume,
      live: true,
    });
  } else if (!existing && quote.open) {
    daily.push({
      day: quote.date,
      open: quote.open,
      high: quote.high,
      low: quote.low,
      close: quote.price,
      volume: quote.volume,
      live: true,
    });
  }
  return daily.slice(-60);
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function renderMetrics() {
  const quote = viewState.quote;
  const marketValue = quote.price * trade.shares;
  const pnl = marketValue - trade.invested;
  const pnlRate = pnl / trade.invested;
  const positive = pnl >= 0;
  const asOfDate = quote.date || shanghaiToday();
  const sessions = quoteCandles(viewState).filter((bar) => bar.day >= trade.buyDate).length;

  setText("#last-price", money.format(quote.price));
  setText("#price-time", `${quote.time || "收盘"} / ${asOfDate}`);
  setText("#market-value", money.format(marketValue));
  setText("#pnl-value", `${positive ? "+" : "-"}${money.format(Math.abs(pnl))}`);
  setText("#pnl-rate", `${positive ? "+" : ""}${(pnlRate * 100).toFixed(2)}%`);
  setText("#holding-days", `${inclusiveDays(trade.buyDate, shanghaiToday())} 天`);
  setText("#trading-days", `${sessions} 个已展示交易日 / 含建仓日`);

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
  const bars = quoteCandles(viewState);
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
  const maxVolume = Math.max(...bars.map((bar) => bar.volume));
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
    const volHeight = (bar.volume / maxVolume) * volumeHeight;

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
      ctx.fillStyle = "#d9b65c";
      ctx.beginPath();
      ctx.arc(x, buyY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x, buyY - 7);
      ctx.lineTo(x - 5, buyY - 16);
      ctx.lineTo(x + 5, buyY - 16);
      ctx.closePath();
      ctx.fill();
    }

    if (bar.live) {
      ctx.strokeStyle = "#f7f3e8";
      ctx.strokeRect(x - bodyWidth / 2 - 2, bodyTop - 2, bodyWidth + 4, bodyHeight + 4);
    }

    chartHitAreas.push({ x, bar });
  });

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
    `量 ${quantity.format(bar.volume)}`,
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
    const response = await fetch("api/position", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    viewState = {
      daily: result.daily,
      quote: result.quote,
      source: result.provider,
    };
    renderMetrics();
    renderChart();
    quoteStatus.textContent = automatic
      ? `已自动更新：新浪财经 ${result.quote.date} ${result.quote.time}`
      : `已更新：新浪财经 ${result.quote.date} ${result.quote.time}（手动刷新）`;
  } catch (error) {
    const onGitHubPages = location.hostname.endsWith("github.io");
    quoteStatus.textContent = onGitHubPages
      ? "GitHub Pages 不支持实时接口，请在 Cloudflare 站点刷新；当前仍显示静态快照。"
      : "行情更新暂时失败，当前仍显示静态快照，请稍后重试。";
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = "刷新新浪行情";
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
  quoteStatus.textContent = "当前显示静态快照；实时行情请访问 Cloudflare 站点。";
} else {
  refreshPosition({ automatic: true });
}
