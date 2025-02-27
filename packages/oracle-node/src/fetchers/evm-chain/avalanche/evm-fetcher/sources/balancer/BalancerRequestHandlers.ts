import { Decimal } from "decimal.js";
import { IEvmRequestHandlers } from "../../../../shared/IEvmRequestHandlers";
import { buildMulticallRequests } from "../../../../shared/utils/build-multicall-request";
import { extractValueFromMulticallResponse } from "../../../../shared/utils/extract-value-from-multicall-response";
import { balancerTokensContractDetails } from "./balancerTokensContractDetails";
import { MulticallParsedResponses } from "../../../../../../types";
import { getRawPriceOrFail } from "../../../../../../db/local-db";

const GET_RATE_FUNCTION_NAME = "getRate";

export type BalancerTokensDetailsKeys =
  keyof typeof balancerTokensContractDetails;

export class BalancerRequestHandlers implements IEvmRequestHandlers {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  prepareMulticallRequest(id: BalancerTokensDetailsKeys) {
    const { mainPoolAbi, mainPoolAddress, secondPoolAbi, secondPoolAddress } =
      balancerTokensContractDetails[id];
    const firstPoolFunctions = [
      {
        name: GET_RATE_FUNCTION_NAME,
      },
    ];
    const secondPoolFunctions = [
      {
        name: GET_RATE_FUNCTION_NAME,
      },
    ];

    const firstPoolMulticallRequests = buildMulticallRequests(
      mainPoolAbi,
      mainPoolAddress,
      firstPoolFunctions
    );
    const secondPoolMulticallRequests = buildMulticallRequests(
      secondPoolAbi,
      secondPoolAddress,
      secondPoolFunctions
    );
    return [...firstPoolMulticallRequests, ...secondPoolMulticallRequests];
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  extractPrice(
    response: MulticallParsedResponses,
    id: BalancerTokensDetailsKeys
  ): number | undefined {
    const { mainPoolAddress, secondPoolAddress, tokensToFetch, tokenDecimals } =
      balancerTokensContractDetails[id];

    const { mainPoolReserve, secondPoolReserve } =
      BalancerRequestHandlers.getReserves(
        response,
        mainPoolAddress,
        secondPoolAddress
      );

    const firstTokenPrice = getRawPriceOrFail(tokensToFetch[0]);
    const secondTokenPrice = getRawPriceOrFail(tokensToFetch[1]);

    const secondPoolPrice = secondPoolReserve
      .mul(secondTokenPrice.value)
      .div(10 ** tokenDecimals);

    const underlyingTokenPrice = Decimal.min(
      firstTokenPrice.value,
      secondPoolPrice
    );

    return mainPoolReserve
      .mul(underlyingTokenPrice)
      .div(10 ** tokenDecimals)
      .toNumber();
  }

  private static getReserves(
    response: MulticallParsedResponses,
    mainPoolAddress: string,
    secondPoolAddress: string
  ) {
    const mainPoolReserve = extractValueFromMulticallResponse(
      response,
      mainPoolAddress,
      GET_RATE_FUNCTION_NAME
    );
    const secondPoolReserve = extractValueFromMulticallResponse(
      response,
      secondPoolAddress,
      GET_RATE_FUNCTION_NAME
    );

    return {
      mainPoolReserve: new Decimal(mainPoolReserve),
      secondPoolReserve: new Decimal(secondPoolReserve),
    };
  }
}
