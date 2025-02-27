import { Decimal } from "decimal.js";
import { IEvmRequestHandlers } from "../../../../shared/IEvmRequestHandlers";
import { buildMulticallRequests } from "../../../../shared/utils/build-multicall-request";
import { oracleAdapterContractsDetails } from "./oracleAdapterContractsDetails";
import { extractValueFromMulticallResponse } from "../../../../shared/utils/extract-value-from-multicall-response";
import { getContractDetailsFromConfig } from "../../../../shared/utils/get-contract-details-from-config";
import { MulticallParsedResponses } from "../../../../../../types";
import { TEN_AS_BASE_OF_POWER } from "../../../../shared/contants";

const LATEST_ANSWER_FUNCTION_NAME = "latestAnswer";

export type OracleAdapterDetailsKeys =
  keyof typeof oracleAdapterContractsDetails;
export type OracleAdapterDetailsValues =
  (typeof oracleAdapterContractsDetails)[OracleAdapterDetailsKeys];

const ORACLE_ADAPTER_PRICE_PRECISION = 8;

export class OracleAdapterRequestHandlers implements IEvmRequestHandlers {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  prepareMulticallRequest(id: OracleAdapterDetailsKeys) {
    const { abi, address } = getContractDetailsFromConfig<
      OracleAdapterDetailsKeys,
      OracleAdapterDetailsValues
    >(oracleAdapterContractsDetails, id);

    const functionsNamesWithValues = [{ name: LATEST_ANSWER_FUNCTION_NAME }];
    return buildMulticallRequests(abi, address, functionsNamesWithValues);
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  extractPrice(
    response: MulticallParsedResponses,
    id: OracleAdapterDetailsKeys
  ): number | undefined {
    const { address } = getContractDetailsFromConfig<
      OracleAdapterDetailsKeys,
      OracleAdapterDetailsValues
    >(oracleAdapterContractsDetails, id);

    const latestAnswer = new Decimal(
      extractValueFromMulticallResponse(
        response,
        address,
        LATEST_ANSWER_FUNCTION_NAME
      )
    );
    const decimalDivider = new Decimal(TEN_AS_BASE_OF_POWER).toPower(
      ORACLE_ADAPTER_PRICE_PRECISION
    );
    const latestAnswerSerialized = latestAnswer.div(decimalDivider);
    return latestAnswerSerialized.toNumber();
  }
}
