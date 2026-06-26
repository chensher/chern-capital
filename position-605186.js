const trade = {
  name: "健麾信息",
  code: "605186",
  symbol: "sh605186",
  status: "closed",
  buyDate: "2026-06-25",
  buyPrice: 36.14,
  buyFee: 5,
  sellDate: "2026-06-26",
  sellPrice: 33.01,
  sellFee: 5,
  shares: 200,
  invested: 7233,
};

const snapshotDaily = [
  { day: "2026-05-11", open: 20.5, high: 22.39, low: 20.35, close: 22.39, volume: 5825444 },
  { day: "2026-05-12", open: 22.72, high: 24.63, low: 22.72, close: 23.21, volume: 21490550 },
  { day: "2026-05-13", open: 23.07, high: 25.39, low: 23, close: 24.57, volume: 19380214 },
  { day: "2026-05-14", open: 24.46, high: 25.75, low: 24.33, close: 25.25, volume: 13090492 },
  { day: "2026-05-15", open: 25.3, high: 26.37, low: 25.11, close: 25.63, volume: 11181200 },
  { day: "2026-05-18", open: 25.8, high: 26.87, low: 25.7, close: 26.48, volume: 10729106 },
  { day: "2026-05-19", open: 26.26, high: 27.51, low: 25.46, close: 25.88, volume: 14469010 },
  { day: "2026-05-20", open: 25.59, high: 25.99, low: 24.73, close: 25.3, volume: 10124500 },
  { day: "2026-05-21", open: 25.3, high: 25.8, low: 24.53, close: 24.79, volume: 7723418 },
  { day: "2026-05-22", open: 24.79, high: 25.02, low: 24.14, close: 24.63, volume: 5431700 },
  { day: "2026-05-25", open: 24.78, high: 24.93, low: 24.19, close: 24.62, volume: 4093100 },
  { day: "2026-05-26", open: 24.62, high: 26.07, low: 23.37, close: 25.15, volume: 9660999 },
  { day: "2026-05-27", open: 25.15, high: 27.67, low: 24.44, close: 27.23, volume: 19568699 },
  { day: "2026-05-28", open: 27.3, high: 27.99, low: 26.12, close: 26.69, volume: 13501500 },
  { day: "2026-05-29", open: 26.83, high: 26.95, low: 26.14, close: 26.6, volume: 8723500 },
  { day: "2026-06-01", open: 26.6, high: 27.93, low: 26.51, close: 27.26, volume: 9659200 },
  { day: "2026-06-02", open: 26.88, high: 27.68, low: 25.9, close: 27.23, volume: 7115600 },
  { day: "2026-06-03", open: 27.07, high: 28.8, low: 26.8, close: 27.89, volume: 8070100 },
  { day: "2026-06-04", open: 27.54, high: 28.66, low: 27.28, close: 28.28, volume: 6511800 },
  { day: "2026-06-05", open: 28.27, high: 28.89, low: 27.45, close: 28.89, volume: 7163583 },
  { day: "2026-06-08", open: 28.05, high: 29.43, low: 27.71, close: 28.84, volume: 6972000 },
  { day: "2026-06-09", open: 28.88, high: 31.11, low: 28.28, close: 30.66, volume: 11134048 },
  { day: "2026-06-10", open: 30, high: 32.7, low: 29.63, close: 31.99, volume: 12751900 },
  { day: "2026-06-11", open: 31.68, high: 34.41, low: 31.5, close: 34.33, volume: 14556097 },
  { day: "2026-06-12", open: 33.8, high: 36.5, low: 32.6, close: 34.27, volume: 18675700 },
  { day: "2026-06-15", open: 33.51, high: 36.2, low: 30.84, close: 31.8, volume: 20073800 },
  { day: "2026-06-16", open: 32.3, high: 33.99, low: 31, close: 33.22, volume: 14217200 },
  { day: "2026-06-17", open: 32.51, high: 33.97, low: 32.5, close: 32.85, volume: 7793400 },
  { day: "2026-06-18", open: 32.85, high: 34.67, low: 32.85, close: 33.87, volume: 10053800 },
  { day: "2026-06-22", open: 34.21, high: 34.21, low: 32.63, close: 34.08, volume: 7079638 },
  { day: "2026-06-23", open: 33.71, high: 35.3, low: 33.71, close: 34.45, volume: 7643300 },
  { day: "2026-06-24", open: 34.45, high: 35.43, low: 33.6, close: 35.07, volume: 10295000 },
  { day: "2026-06-25", open: 34.8, high: 36.58, low: 33.8, close: 33.91, volume: 10835200 },
  { day: "2026-06-26", open: 34, high: 34.11, low: 31.82, close: 32.2, volume: 9285700 },
];

const snapshotQuote = {
  price: trade.sellPrice,
  date: trade.sellDate,
  time: "已卖出",
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

const tradeResult = {
  buyGross: trade.buyPrice * trade.shares,
  sellGross: trade.sellPrice * trade.shares,
  sellNet: trade.sellPrice * trade.shares - trade.sellFee,
};
tradeResult.realizedPnl = tradeResult.sellNet - trade.invested;
tradeResult.realizedRate = tradeResult.realizedPnl / trade.invested;

function inclusiveDays(start, end) {
  const startMs = Date.parse(`${start}T00:00:00+08:00`);
  const endMs = Date.parse(`${end}T00:00:00+08:00`);
  return Math.max(1, Math.round((endMs - startMs) / 86400000) + 1);
}

function chartCandles(state) {
  const daily = state.daily.map((bar) => ({ ...bar }));
  if (trade.status === "closed") {
    return daily.filter((bar) => bar.day <= trade.sellDate).slice(-60);
  }

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

function renderMetrics() {
  const pnl = tradeResult.realizedPnl;
  const pnlRate = tradeResult.realizedRate;
  const positive = pnl >= 0;
  const sessions = chartCandles(viewState).filter((bar) => (
    bar.day >= trade.buyDate && bar.day <= trade.sellDate
  )).length;

  setText("#last-price", money.format(trade.sellPrice));
  setText("#price-time", `${trade.sellDate} / ${trade.shares} 股`);
  setText("#market-value", money.format(tradeResult.sellNet));
  setText("#pnl-value", `${positive ? "+" : "-"}${money.format(Math.abs(pnl))}`);
  setText("#pnl-rate", `${positive ? "+" : ""}${(pnlRate * 100).toFixed(2)}%`);
  setText("#holding-days", `${inclusiveDays(trade.buyDate, trade.sellDate)} 天`);
  setText("#trading-days", `${sessions} 个已展示交易日 / 买入至卖出`);

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
  const high = Math.max(...bars.map((bar) => bar.high), trade.buyPrice, trade.sellPrice) * 1.035;
  const low = Math.min(...bars.map((bar) => bar.low), trade.buyPrice, trade.sellPrice) * 0.98;
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

  const sellY = yFor(trade.sellPrice);
  ctx.save();
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = "#74a7e8";
  ctx.beginPath();
  ctx.moveTo(left, sellY);
  ctx.lineTo(cssWidth - right, sellY);
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = "#74a7e8";
  ctx.fillText(`卖出 ${trade.sellPrice.toFixed(2)}`, left + 4, sellY + 14);

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

    if (bar.day === trade.sellDate) {
      drawSellMarker(ctx, x, sellY);
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

  if (!bars.some((bar) => bar.day === trade.sellDate)) {
    const fallbackX = Math.min(cssWidth - right - step / 2, xFor(bars.length - 1) + step * 0.85);
    drawSellMarker(ctx, fallbackX, sellY);
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

function drawSellMarker(ctx, x, y) {
  ctx.save();
  ctx.fillStyle = "#74a7e8";
  ctx.strokeStyle = "#0b0d10";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x, y - 8);
  ctx.lineTo(x + 8, y);
  ctx.lineTo(x, y + 8);
  ctx.lineTo(x - 8, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
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
  quoteStatus.textContent = "正在向新浪财经请求日线数据...";
  try {
    const response = await fetch("api/position-605186", { cache: "no-store" });
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
      ? `已自动更新日线：新浪财经 ${result.quote.date} ${result.quote.time}；交易结果按卖出记录固定。`
      : `已更新日线：新浪财经 ${result.quote.date} ${result.quote.time}（手动刷新）；交易结果按卖出记录固定。`;
  } catch (error) {
    const onGitHubPages = location.hostname.endsWith("github.io");
    quoteStatus.textContent = onGitHubPages
      ? "交易已结束，当前显示静态复盘；Cloudflare 站点可更新日线数据。"
      : "日线更新暂时失败，当前仍显示静态复盘，请稍后重试。";
  } finally {
    refreshButton.disabled = false;
    refreshButton.textContent = "更新新浪日线";
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
  quoteStatus.textContent = "交易已结束，当前显示静态复盘；Cloudflare 站点可更新日线数据。";
} else {
  refreshPosition({ automatic: true });
}
