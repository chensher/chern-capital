const trade = {
  name: "长龄液压",
  code: "605389",
  symbol: "sh605389",
  status: "closed",
  buyDate: "2026-06-01",
  buyPrice: 85,
  buyFee: 5,
  sellDate: "2026-06-24",
  sellPrice: 92.34,
  sellFee: 5,
  shares: 100,
  invested: 8505,
};

const snapshotDaily = [
  { day: "2026-03-02", open: 74, high: 75.39, low: 72.8, close: 75.11, volume: 1320580 },
  { day: "2026-03-03", open: 75.11, high: 75.83, low: 69.81, close: 69.95, volume: 1654965 },
  { day: "2026-03-04", open: 69.8, high: 70.8, low: 68, close: 70.43, volume: 881930 },
  { day: "2026-03-05", open: 70.66, high: 73, low: 70.66, close: 71.5, volume: 818758 },
  { day: "2026-03-06", open: 71.52, high: 73.16, low: 71.1, close: 72.72, volume: 907360 },
  { day: "2026-03-09", open: 72.25, high: 72.5, low: 69.69, close: 71.05, volume: 778120 },
  { day: "2026-03-11", open: 75, high: 75, low: 70.27, close: 71.15, volume: 1496200 },
  { day: "2026-03-12", open: 71.4, high: 71.4, low: 66.66, close: 66.89, volume: 1549380 },
  { day: "2026-03-13", open: 67.85, high: 70.49, low: 66.16, close: 69.82, volume: 1523474 },
  { day: "2026-03-16", open: 71.24, high: 71.24, low: 68, close: 68.15, volume: 872820 },
  { day: "2026-03-17", open: 68.18, high: 69.13, low: 66.2, close: 66.28, volume: 762100 },
  { day: "2026-03-18", open: 66.61, high: 70.09, low: 66.1, close: 70.03, volume: 1514830 },
  { day: "2026-03-19", open: 69.93, high: 77.03, low: 69.11, close: 77.03, volume: 3067473 },
  { day: "2026-03-20", open: 77, high: 78.58, low: 74.02, close: 77.81, volume: 3912524 },
  { day: "2026-03-23", open: 77.48, high: 78.43, low: 72.05, close: 73.56, volume: 2508925 },
  { day: "2026-03-24", open: 75.84, high: 75.84, low: 70.88, close: 72.96, volume: 1822064 },
  { day: "2026-03-25", open: 72.24, high: 74.65, low: 71.21, close: 74.3, volume: 1680495 },
  { day: "2026-03-26", open: 74.17, high: 74.88, low: 72.73, close: 73.98, volume: 1201140 },
  { day: "2026-03-27", open: 73.12, high: 75.7, low: 72.68, close: 73.35, volume: 1123400 },
  { day: "2026-03-30", open: 73.85, high: 73.99, low: 70.22, close: 70.93, volume: 1475508 },
  { day: "2026-03-31", open: 70.86, high: 72.18, low: 70.84, close: 71.71, volume: 978550 },
  { day: "2026-04-01", open: 72.22, high: 72.75, low: 70.68, close: 71.38, volume: 748700 },
  { day: "2026-04-02", open: 71, high: 72, low: 70.08, close: 71.46, volume: 687960 },
  { day: "2026-04-03", open: 71.36, high: 72.49, low: 68.88, close: 69.59, volume: 668340 },
  { day: "2026-04-07", open: 70, high: 71.2, low: 69.41, close: 70.47, volume: 981240 },
  { day: "2026-04-08", open: 71.23, high: 72.98, low: 70.8, close: 72.8, volume: 871300 },
  { day: "2026-04-09", open: 72.02, high: 72.77, low: 71.42, close: 72.35, volume: 450320 },
  { day: "2026-04-10", open: 72.67, high: 73.62, low: 72.17, close: 72.4, volume: 515400 },
  { day: "2026-04-13", open: 72.28, high: 72.59, low: 69.9, close: 71.95, volume: 876780 },
  { day: "2026-04-14", open: 72.33, high: 73.73, low: 71.23, close: 71.51, volume: 878900 },
  { day: "2026-04-15", open: 71.42, high: 72.48, low: 70.95, close: 71.01, volume: 586000 },
  { day: "2026-04-16", open: 71.19, high: 72.79, low: 70.85, close: 72.33, volume: 988848 },
  { day: "2026-04-17", open: 71.9, high: 74, low: 71.88, close: 73.48, volume: 823624 },
  { day: "2026-04-20", open: 73.4, high: 77.14, low: 72.5, close: 76.58, volume: 1311840 },
  { day: "2026-04-21", open: 77.51, high: 80.88, low: 75.7, close: 80.61, volume: 2051880 },
  { day: "2026-04-22", open: 80.61, high: 85.55, low: 79.5, close: 84.79, volume: 2691000 },
  { day: "2026-04-23", open: 84.8, high: 86.95, low: 82.82, close: 85.84, volume: 1880630 },
  { day: "2026-04-24", open: 87.56, high: 90.99, low: 86.2, close: 90.65, volume: 2763864 },
  { day: "2026-04-27", open: 90.5, high: 95.44, low: 89.13, close: 95.34, volume: 2789495 },
  { day: "2026-04-28", open: 93.59, high: 100.88, low: 93.59, close: 99.25, volume: 3526346 },
  { day: "2026-04-29", open: 98.98, high: 107, low: 98.98, close: 106.5, volume: 3926965 },
  { day: "2026-04-30", open: 106.2, high: 117.15, low: 104.07, close: 116.98, volume: 4420785 },
  { day: "2026-05-06", open: 119.95, high: 125, low: 105.32, close: 122.34, volume: 5558633 },
  { day: "2026-05-07", open: 119.48, high: 129, low: 118.1, close: 126.78, volume: 3462913 },
  { day: "2026-05-08", open: 126.75, high: 132.58, low: 124, close: 126.51, volume: 3615232 },
  { day: "2026-05-11", open: 128.56, high: 129.9, low: 114.78, close: 115.4, volume: 6035748 },
  { day: "2026-05-12", open: 116, high: 117, low: 105.99, close: 108.7, volume: 5971053 },
  { day: "2026-05-13", open: 107.2, high: 117.89, low: 107.19, close: 115.67, volume: 3871526 },
  { day: "2026-05-14", open: 117.79, high: 124.82, low: 116.29, close: 121.2, volume: 4640691 },
  { day: "2026-05-15", open: 120.07, high: 126.82, low: 117.89, close: 123, volume: 3902880 },
  { day: "2026-05-18", open: 120, high: 124.56, low: 117.71, close: 118.47, volume: 2726582 },
  { day: "2026-05-19", open: 117.1, high: 119.33, low: 114.68, close: 116.94, volume: 2241080 },
  { day: "2026-05-20", open: 114.7, high: 120.3, low: 114.5, close: 119.47, volume: 1556140 },
  { day: "2026-05-21", open: 120.91, high: 122.18, low: 113.14, close: 114, volume: 1947840 },
  { day: "2026-05-22", open: 115, high: 117.9, low: 113.58, close: 117.88, volume: 1518800 },
  { day: "2026-05-25", open: 120.58, high: 122.17, low: 115.57, close: 115.66, volume: 1803200 },
  { day: "2026-05-26", open: 115.68, high: 120.55, low: 113, close: 117.17, volume: 2220470 },
  { day: "2026-05-27", open: 90, high: 91, low: 86.28, close: 86.68, volume: 2252358 },
  { day: "2026-05-28", open: 86, high: 87, low: 84.2, close: 85.87, volume: 1856714 },
  { day: "2026-05-29", open: 86.13, high: 88.8, low: 83.33, close: 85.14, volume: 2503012 },
  { day: "2026-06-01", open: 86.34, high: 87.08, low: 82.28, close: 82.92, volume: 2503990 },
  { day: "2026-06-02", open: 82.18, high: 85, low: 80, close: 81.62, volume: 1910424 },
  { day: "2026-06-03", open: 81.62, high: 86.98, low: 80, close: 83.51, volume: 2216737 },
  { day: "2026-06-04", open: 82.7, high: 84, low: 82.05, close: 82.9, volume: 1290976 },
  { day: "2026-06-05", open: 82.75, high: 85.3, low: 81.2, close: 84.96, volume: 1657637 },
  { day: "2026-06-08", open: 82.19, high: 85.68, low: 82.19, close: 83.3, volume: 2493332 },
  { day: "2026-06-09", open: 84.53, high: 84.63, low: 81.51, close: 83.58, volume: 1402764 },
  { day: "2026-06-10", open: 83.05, high: 85.19, low: 81.2, close: 84.4, volume: 1570630 },
  { day: "2026-06-11", open: 84.38, high: 84.84, low: 81.6, close: 82.25, volume: 1260170 },
  { day: "2026-06-12", open: 83.73, high: 85.99, low: 81.8, close: 82.08, volume: 1709500 },
  { day: "2026-06-15", open: 82.19, high: 88.8, low: 81.97, close: 87.04, volume: 2319430 },
  { day: "2026-06-16", open: 87.33, high: 89.7, low: 85.66, close: 88.6, volume: 2470753 },
  { day: "2026-06-17", open: 87.47, high: 89.9, low: 86.2, close: 87.99, volume: 1990836 },
  { day: "2026-06-18", open: 88.19, high: 91.5, low: 87.01, close: 91.42, volume: 2605883 },
  { day: "2026-06-22", open: 92.04, high: 95, low: 88.89, close: 93.61, volume: 4169104 },
  { day: "2026-06-23", open: 92.68, high: 96.16, low: 89.6, close: 94.52, volume: 2555948 },
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
    ctx.fillStyle = "#d9b65c";
    ctx.beginPath();
    ctx.arc(fallbackX, buyY, 5, 0, Math.PI * 2);
    ctx.fill();
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
    const response = await fetch("api/position-605389", { cache: "no-store" });
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
