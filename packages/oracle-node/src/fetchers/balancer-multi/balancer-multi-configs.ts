import { parseFixed } from "@balancer-labs/sdk";

const DEFAULT_DECIMALS = 15;
const BIGGER_DECIMALS = 21;
const DEFAULT_AMOUNT = parseFixed("1", DEFAULT_DECIMALS);
const BIGGER_AMOUNT = parseFixed("1", BIGGER_DECIMALS);

export const balancerMultiConfigs = {
  SWETH: {
    tokenIn: "0xf951e335afb289353dc249e82926178eac7ded78", // swETH
    tokenOut: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
    tokenToFetch: "ETH",
    swapAmount: DEFAULT_AMOUNT,
    swapAmountForSwaps: DEFAULT_AMOUNT,
    swaps: [
      {
        poolId:
          "0x02d928e68d8f10c0358566152677db51e1e2dc8c00000000000000000000051e",
        assetInIndex: 0,
        assetOutIndex: 1,
        amount: DEFAULT_AMOUNT.toString(),
        userData: "0x",
      },
      {
        poolId:
          "0x60d604890feaa0b5460b28a424407c24fe89374a0000000000000000000004fc",
        assetInIndex: 1,
        assetOutIndex: 2,
        amount: "0",
        userData: "0x",
      },
    ],
    tokenAddresses: [
      "0xf951e335afb289353dc249e82926178eac7ded78",
      "0x60d604890feaa0b5460b28a424407c24fe89374a",
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    ],

    tokenInForSwaps: "0xf951e335afb289353dc249e82926178eac7ded78",
    tokenOutFromSwaps: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  GHO: {
    tokenIn: "0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f", // GHO
    tokenOut: "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
    tokenToFetch: "DAI",
    swapAmount: BIGGER_AMOUNT,
    swapAmountForSwaps: BIGGER_AMOUNT,
    swaps: [
      {
        poolId:
          "0xc2b021133d1b0cf07dba696fd5dd89338428225b000000000000000000000598",
        assetInIndex: 0,
        assetOutIndex: 1,
        amount: BIGGER_AMOUNT.toString(),
        userData: "0x",
      },
      {
        poolId:
          "0xc443c15033fcb6cf72cc24f1bda0db070ddd9786000000000000000000000593",
        assetInIndex: 1,
        assetOutIndex: 2,
        amount: "0",
        userData: "0x",
      },
      {
        poolId:
          "0xfa24a90a3f2bbe5feea92b95cd0d14ce709649f900000000000000000000058f",
        assetInIndex: 2,
        assetOutIndex: 3,
        amount: "0",
        userData: "0x",
      },
    ],
    tokenAddresses: [
      "0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f",
      "0xc443c15033fcb6cf72cc24f1bda0db070ddd9786",
      "0xfa24a90a3f2bbe5feea92b95cd0d14ce709649f9",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
    ],
    marketSp: "1.019442252013350645857275711595224196226780743325017064",
    tokenInForSwaps: "0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f",
    tokenOutFromSwaps: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
};
