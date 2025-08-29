import type {
  IMonthlyRecordListResponse,
  IMonthlyRecordSummaryResponse,
} from "@/types/record.type";
import type { IResponsePayloads } from "@/utilities/request.util";

export const recordList: IResponsePayloads<Array<IMonthlyRecordListResponse>> =
  {
    message: "Request ok",
    status: 200,
    data: [
      {
        id: 1,
        description: "DP kos tanggal 25 agustus untuk kos joyfull",
        date: "8/8",
        amount: 40000000,
        type: "expense",
      },
      {
        id: 2,
        description: "Gaji",
        date: "27/12",
        amount: 40000000,
        type: "income",
      },
    ],
  };

export const recordSum: IResponsePayloads<IMonthlyRecordSummaryResponse> = {
  message: "Request ok",
  status: 200,
  data: {
    expense: 500000,
    income: 20000,
  },
};
