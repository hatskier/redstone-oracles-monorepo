import { ethers } from "ethers";
import { TestSafeSignerFromPrivateKey } from "../src/signers/SafeSigner";
import { NodeConfig } from "../src/types";

const baseManifest = {
  interval: 2000,
  priceAggregator: "median",
  sourceTimeout: 3000,
  deviationCheck: {
    deviationWithRecentValues: {
      maxPercent: 25,
      maxDelayMilliseconds: 300000,
    },
  },
};

export const MOCK_MANIFEST = {
  ...baseManifest,
  tokens: {
    BTC: {
      source: ["bitfinex", "ftx"],
    },
    ETH: {
      source: ["binance", "bitfinex"],
    },
    USDT: {
      source: ["ftx", "binance"],
    },
  },
};

const MOCK_ETH_PRIV_KEY =
  "0x1111111111111111111111111111111111111111111111111111111111111111";

export const MOCK_NODE_CONFIG: NodeConfig = {
  enableJsonLogs: false,
  enablePerformanceTracking: false,
  printDiagnosticInfo: false,
  manifestRefreshInterval: 120000,
  overrideManifestUsingFile: MOCK_MANIFEST,
  ethereumAddress: new ethers.Wallet(MOCK_ETH_PRIV_KEY).address,
  levelDbLocation: "oracle-node-level-db-tests",
  ttlForPricesInLocalDBInMilliseconds: 900000,
  enableStreamrBroadcasting: false,
  mockPricesUrlOrPath: "",
  minDataFeedsPercentageForBigPackage: 50,
  coinmarketcapApiUrl: "https://coinmarketcap-mock.url",
  coingeckoApiUrl: "",
  enableHttpServer: false,
  hardLimitsUrls: ["mock-hard-limits-url"],
  avalancheRpcUrls: ["https://mock-rpc.url"],
  ethMainRpcUrls: ["https://mock-rpc.url"],
  arbitrumRpcUrls: ["https://mock-rpc.url"],
  optimismRpcUrls: ["https://mock-rpc.url"],
  newyorkfedRatesUrl: "",
  simulationValueInUsdForSlippageCheck: "10000",
  maxAllowedSlippagePercent: 5,
  historicalDataPackagesUrl: "",
  telemetryUrl: "",
  telemetryAuthorizationToken: "",
  dockerImageTag: "",
  safeSigner: TestSafeSignerFromPrivateKey(MOCK_ETH_PRIV_KEY),
};

export const mockHardLimits = {
  BTC: {
    lower: 440,
    upper: 450,
  },
  ETH: {
    lower: 40,
    upper: 45,
  },
};
