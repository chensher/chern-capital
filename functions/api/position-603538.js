const POSITION = {
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

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate",
};

async function sinaText(url) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "*/*",
      Referer: "https://finance.sina.com.cn/",
    },
  });
  if (!response.ok) {
    throw new Error(`Sina request failed: ${response.status}`);
  }
  return new TextDecoder("gb18030").decode(await response.arrayBuffer());
}

function numeric(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseQuote(text) {
  const match = text.match(/="([^"]*)"/);
  if (!match) throw new Error("Unable to parse Sina quote");
  const fields = match[1].split(",");
  const price = numeric(fields[3]);
  if (price === null) throw new Error("Sina quote has no current price");
  return {
    name: POSITION.name,
    price,
    open: numeric(fields[1]),
    previousClose: numeric(fields[2]),
    high: numeric(fields[4]),
    low: numeric(fields[5]),
    volume: numeric(fields[8]),
    amount: numeric(fields[9]),
    date: fields[30],
    time: fields[31],
  };
}

function parseDaily(text) {
  const rows = JSON.parse(text);
  return rows
    .map((row) => ({
      day: row.day,
      open: numeric(row.open),
      high: numeric(row.high),
      low: numeric(row.low),
      close: numeric(row.close),
      volume: numeric(row.volume),
    }))
    .filter((row) => (
      row.day &&
      row.open !== null &&
      row.high !== null &&
      row.low !== null &&
      row.close !== null
    ));
}

export async function onRequestGet() {
  const nonce = Date.now();
  const quoteUrl = `https://hq.sinajs.cn/list=${POSITION.symbol}`;
  const dailyUrl = `https://quotes.sina.cn/cn/api/json_v2.php/CN_MarketDataService.getKLineData?symbol=${POSITION.symbol}&scale=240&ma=no&datalen=90&_=${nonce}`;

  try {
    const [quoteText, dailyText] = await Promise.all([
      sinaText(quoteUrl),
      sinaText(dailyUrl),
    ]);
    return new Response(
      JSON.stringify({
        position: POSITION,
        quote: parseQuote(quoteText),
        daily: parseDaily(dailyText),
        provider: "新浪财经",
        refreshedAt: new Date().toISOString(),
      }),
      { headers: JSON_HEADERS },
    );
  } catch (error) {
    console.error("Position quote refresh failed", error);
    return new Response(
      JSON.stringify({ error: "行情暂不可用，请稍后重试。" }),
      { status: 502, headers: JSON_HEADERS },
    );
  }
}
