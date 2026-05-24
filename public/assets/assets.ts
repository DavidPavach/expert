export type Asset = {
  symbol: string;
  name: string;
  logo?: string;
  category: string;
};

export const assets: Asset[] = [
  // Bonds
  {
    symbol: "DE10Y",
    name: "DE10Y",
    category: "Bond",
  },
  {
    symbol: "FR10Y",
    name: "FR10Y",
    category: "Bond",
  },
  {
    symbol: "JP10Y",
    name: "JP10Y",
    category: "Bond",
  },
  {
    symbol: "UK10Y",
    name: "UK10Y",
    category: "Bond",
  },
  {
    symbol: "US10Y",
    name: "US10Y",
    category: "Bond",
  },
  {
    symbol: "US2Y",
    name: "US2Y",
    category: "Bond",
  },
  {
    symbol: "US30Y",
    name: "US30Y",
    category: "Bond",
  },

  // Commodities
  {
    symbol: "BRENT",
    name: "BRENT",
    category: "Commodities",
  },
  {
    symbol: "COCOA",
    name: "COCOA",
    category: "Commodities",
  },
  {
    symbol: "COFFEE",
    name: "COFFEE",
    category: "Commodities",
  },
  {
    symbol: "COPPER",
    name: "COPPER",
    category: "Commodities",
  },
  {
    symbol: "CORN",
    name: "CORN",
    category: "Commodities",
  },
  {
    symbol: "COTTON",
    name: "COTTON",
    category: "Commodities",
  },
  {
    symbol: "NGAS",
    name: "NGAS",
    category: "Commodities",
  },
  {
    symbol: "PALLADIUM",
    name: "PALLADIUM",
    category: "Commodities",
  },
  {
    symbol: "PLATINUM",
    name: "PLATINUM",
    category: "Commodities",
  },
  {
    symbol: "SOYBEAN",
    name: "SOYBEAN",
    category: "Commodities",
  },
  {
    symbol: "SUGAR",
    name: "SUGAR",
    category: "Commodities",
  },
  {
    symbol: "WHEAT",
    name: "WHEAT",
    category: "Commodities",
  },
  {
    symbol: "WTI",
    name: "WTI",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/WTI.png",
    category: "Commodities",
  },
  {
    symbol: "XAGUSD",
    name: "Silver",
    category: "Commodities",
  },
  {
    symbol: "XAUUSD",
    name: "Gold",
    category: "Commodities",
  },

  // Crypto
  {
    symbol: "AAVE",
    name: "AAVE",
    category: "Crypto",
  },
  {
    symbol: "AAVE/USD",
    name: "Aave",
    logo: "https://coin-images.coingecko.com/coins/images/12645/large/aave-token-round.png",
    category: "Crypto",
  },
  {
    symbol: "ADA",
    name: "ADA",
    category: "Crypto",
  },
  {
    symbol: "ADA/USD",
    name: "Cardano",
    logo: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png",
    category: "Crypto",
  },
  {
    symbol: "APT/USD",
    name: "Aptos",
    logo: "https://coin-images.coingecko.com/coins/images/26455/large/aptos_round.png",
    category: "Crypto",
  },
  {
    symbol: "AVAX/USD",
    name: "Avalanche",
    logo: "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    category: "Crypto",
  },
  {
    symbol: "BCH",
    name: "Bitcoin Cash",
    category: "Crypto",
  },
  {
    symbol: "BCH/USD",
    name: "Bitcoin Cash",
    logo: "https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png",
    category: "Crypto",
  },
  {
    symbol: "BGB/USD",
    name: "Bitget Token",
    logo: "https://coin-images.coingecko.com/coins/images/11610/large/Bitget_logo.png",
    category: "Crypto",
  },
  {
    symbol: "BNB",
    name: "BNB",
    category: "Crypto",
  },
  {
    symbol: "BNB/USD",
    name: "BNB",
    logo: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    category: "Crypto",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    category: "Crypto",
  },
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    logo: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    category: "Crypto",
  },
  {
    symbol: "DOGE/USD",
    name: "Dogecoin",
    logo: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png",
    category: "Crypto",
  },
  {
    symbol: "DOT/USD",
    name: "Polkadot",
    logo: "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png",
    category: "Crypto",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    category: "Crypto",
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    category: "Crypto",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    category: "Crypto",
  },
  {
    symbol: "LINK/USD",
    name: "Chainlink",
    logo: "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    category: "Crypto",
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    category: "Crypto",
  },
  {
    symbol: "LTC/USD",
    name: "Litecoin",
    logo: "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png",
    category: "Crypto",
  },
  {
    symbol: "PEPE/USD",
    name: "Pepe",
    logo: "https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg",
    category: "Crypto",
  },
  {
    symbol: "SHIB/USD",
    name: "Shiba Inu",
    logo: "https://coin-images.coingecko.com/coins/images/11939/large/shiba.png",
    category: "Crypto",
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    logo: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png",
    category: "Crypto",
  },
  {
    symbol: "TON/USD",
    name: "Toncoin",
    logo: "https://coin-images.coingecko.com/coins/images/17980/large/photo_2024-09-10_17.09.00.jpeg",
    category: "Crypto",
  },
  {
    symbol: "TRX/USD",
    name: "TRON",
    logo: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png",
    category: "Crypto",
  },
  {
    symbol: "UNI/USD",
    name: "Uniswap",
    logo: "https://coin-images.coingecko.com/coins/images/12504/large/uniswap-logo.png",
    category: "Crypto",
  },
  {
    symbol: "USDT",
    name: "Tether",
    category: "Crypto",
  },
  {
    symbol: "USDT/USD",
    name: "Tether",
    logo: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
    category: "Crypto",
  },
  {
    symbol: "XLM",
    name: "Stellar",
    category: "Crypto",
  },
  {
    symbol: "XLM/USD",
    name: "Stellar",
    logo: "https://coin-images.coingecko.com/coins/images/100/large/fmpFRHHQ_400x400.jpg",
    category: "Crypto",
  },
  {
    symbol: "XRP",
    name: "XRP",
    category: "Crypto",
  },
  {
    symbol: "XRP/USD",
    name: "XRP",
    logo: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    category: "Crypto",
  },

  // Forex
  {
    symbol: "AUDCAD",
    name: "AUD/CAD",
    category: "Forex",
  },
  {
    symbol: "AUDJPY",
    name: "AUD/JPY",
    category: "Forex",
  },
  {
    symbol: "AUDNZD",
    name: "AUD/NZD",
    category: "Forex",
  },
  {
    symbol: "AUDUSD",
    name: "AUD/USD",
    category: "Forex",
  },
  {
    symbol: "CADJPY",
    name: "CAD/JPY",
    category: "Forex",
  },
  {
    symbol: "EURUSD",
    name: "EUR/USD",
    category: "Forex",
  },
  {
    symbol: "GBPUSD",
    name: "GBP/USD",
    category: "Forex",
  },
  {
    symbol: "USDJPY",
    name: "USD/JPY",
    category: "Forex",
  },
  {
    symbol: "USDCHF",
    name: "USD/CHF",
    category: "Forex",
  },
  {
    symbol: "USDCAD",
    name: "USD/CAD",
    category: "Forex",
  },

  // Stocks
  {
    symbol: "AAPL",
    name: "Apple Inc",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png",
    category: "Stocks",
  },
  {
    symbol: "ADBE",
    name: "Adobe Inc",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/ADBE.png",
    category: "Stocks",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AMZN.png",
    category: "Stocks",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/GOOG.png",
    category: "Stocks",
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/FB.png",
    category: "Stocks",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MSFT.png",
    category: "Stocks",
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/NFLX.png",
    category: "Stocks",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/NVDA.png",
    category: "Stocks",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.png",
    category: "Stocks",
  },
  {
    symbol: "WMT",
    name: "Walmart Inc",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/WMT.png",
    category: "Stocks",
  },
];