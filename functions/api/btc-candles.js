const START_MS = Date.parse("2020-05-02T00:00:00Z");
const DAY_MS = 24 * 60 * 60 * 1000;
const BINANCE_LIMIT = 1000;
const OKX_LIMIT = 300;

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=120",
};

function numeric(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function day(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

function sanitizeProvider(value) {
  if (value === "okx" || value === "binance") return value;
  return "auto";
}

async function requestJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "chern-capital/1.0",
    },
    cf: { cacheTtl: 60, cacheEverything: true },
  });
  if (!response.ok) throw new Error(`${url.hostname} returned ${response.status}`);
  return response.json();
}

function parseBinanceRow(row) {
  return {
    date: day(row[0]),
    ms: row[0],
    open: numeric(row[1]),
    high: numeric(row[2]),
    low: numeric(row[3]),
    close: numeric(row[4]),
    volume: numeric(row[5]),
    quoteVolume: numeric(row[7]),
    trades: Number(row[8]) || 0,
  };
}

async function fetchBinanceCandles() {
  const candles = [];
  const now = Date.now();
  let start = START_MS;

  for (let guard = 0; guard < 10 && start <= now; guard += 1) {
    const url = new URL("https://api.binance.com/api/v3/klines");
    url.searchParams.set("symbol", "BTCUSDT");
    url.searchParams.set("interval", "1d");
    url.searchParams.set("limit", String(BINANCE_LIMIT));
    url.searchParams.set("startTime", String(start));

    const rows = await requestJson(url);
    if (!Array.isArray(rows) || rows.length === 0) break;

    candles.push(...rows.map(parseBinanceRow));

    const next = rows[rows.length - 1][0] + DAY_MS;
    if (next <= start || rows.length < BINANCE_LIMIT) break;
    start = next;
  }

  return {
    provider: "binance",
    providerName: "Binance Spot",
    symbol: "BTCUSDT",
    interval: "1d",
    candles,
  };
}

function parseOkxRow(row) {
  const ms = Number(row[0]);
  return {
    date: day(ms),
    ms,
    open: numeric(row[1]),
    high: numeric(row[2]),
    low: numeric(row[3]),
    close: numeric(row[4]),
    volume: numeric(row[5]),
    quoteVolume: numeric(row[7]),
    confirmed: row[8] === "1",
  };
}

async function fetchOkxCandles() {
  const rows = [];
  let cursor = null;

  for (let guard = 0; guard < 12; guard += 1) {
    const url = new URL("https://www.okx.com/api/v5/market/history-candles");
    url.searchParams.set("instId", "BTC-USDT");
    url.searchParams.set("bar", "1Dutc");
    url.searchParams.set("limit", String(OKX_LIMIT));
    if (cursor) url.searchParams.set("after", cursor);

    const payload = await requestJson(url);
    if (payload.code !== "0" || !Array.isArray(payload.data)) {
      throw new Error(`OKX returned code ${payload.code || "unknown"}`);
    }
    if (payload.data.length === 0) break;

    rows.push(...payload.data);
    const oldest = payload.data[payload.data.length - 1][0];
    if (Number(oldest) <= START_MS || oldest === cursor) break;
    cursor = oldest;
  }

  const candles = rows
    .map(parseOkxRow)
    .filter((row) => row.ms >= START_MS)
    .sort((a, b) => a.ms - b.ms);

  return {
    provider: "okx",
    providerName: "OKX",
    symbol: "BTC-USDT",
    interval: "1Dutc",
    candles,
  };
}

async function loadCandles(provider) {
  if (provider === "binance") return fetchBinanceCandles();
  if (provider === "okx") return fetchOkxCandles();

  try {
    return await fetchBinanceCandles();
  } catch (binanceError) {
    console.warn("Binance BTC candles failed, trying OKX", binanceError);
    return fetchOkxCandles();
  }
}

export async function onRequestGet({ request }) {
  const provider = sanitizeProvider(new URL(request.url).searchParams.get("provider"));

  try {
    const result = await loadCandles(provider);
    return new Response(
      JSON.stringify({
        ...result,
        source: "exchange-api",
        rangeStart: result.candles[0]?.date,
        rangeEnd: result.candles[result.candles.length - 1]?.date,
        count: result.candles.length,
        refreshedAt: new Date().toISOString(),
      }),
      { headers: JSON_HEADERS },
    );
  } catch (error) {
    console.error("BTC candles refresh failed", error);
    return new Response(
      JSON.stringify({ error: "BTC 行情暂不可用，请稍后重试。" }),
      { status: 502, headers: { ...JSON_HEADERS, "Cache-Control": "no-store" } },
    );
  }
}
