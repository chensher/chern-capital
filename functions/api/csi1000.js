const CSI1000_SYMBOL = "sh000852";

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
  return new TextDecoder().decode(await response.arrayBuffer());
}

function numeric(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseQuote(text) {
  const match = text.match(/="([^"]*)"/);
  if (!match) throw new Error("Unable to parse Sina CSI 1000 quote");
  const fields = match[1].split(",");
  const price = numeric(fields[3]);
  if (price === null) throw new Error("Sina CSI 1000 quote has no current price");
  const previousClose = numeric(fields[2]);
  const change = previousClose === null ? null : price - previousClose;
  const percent = previousClose ? (change / previousClose) * 100 : null;
  return {
    name: "中证1000",
    code: "000852",
    price,
    open: numeric(fields[1]),
    previousClose,
    high: numeric(fields[4]),
    low: numeric(fields[5]),
    change,
    percent,
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
  const quoteUrl = `https://hq.sinajs.cn/list=${CSI1000_SYMBOL}`;
  const dailyUrl = `https://quotes.sina.cn/cn/api/json_v2.php/CN_MarketDataService.getKLineData?symbol=${CSI1000_SYMBOL}&scale=240&ma=no&datalen=90&_=${nonce}`;

  try {
    const [quoteText, dailyText] = await Promise.all([
      sinaText(quoteUrl),
      sinaText(dailyUrl),
    ]);
    return new Response(
      JSON.stringify({
        index: {
          name: "中证1000",
          code: "000852",
          symbol: CSI1000_SYMBOL,
        },
        quote: parseQuote(quoteText),
        daily: parseDaily(dailyText),
        provider: "新浪财经",
        refreshedAt: new Date().toISOString(),
      }),
      { headers: JSON_HEADERS },
    );
  } catch (error) {
    console.error("CSI 1000 data refresh failed", error);
    return new Response(
      JSON.stringify({ error: "中证1000行情暂不可用，请稍后重试。" }),
      { status: 502, headers: JSON_HEADERS },
    );
  }
}
