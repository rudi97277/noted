import type {
  IMonthlyRecordListResponse,
  IMonthlyRecordRequest,
  IRecordStoreRequest,
} from "@/types/record.type";
import { useRequestMutate, useRequestQuery } from "@/utilities/query.util";
import { rest } from "@/utilities/rest.util";

export const getMonthlyRecordList = (data: IMonthlyRecordRequest) =>
  useRequestQuery<Array<IMonthlyRecordListResponse>>({
    url: rest.v1.record.list,
    method: "GET",
    // mock: recordList,
    data,
  });

export const storeRecord = () =>
  useRequestMutate<{}, IRecordStoreRequest & { access_key: string }>({
    url: rest.v1.record.store,
    method: "POST",
  });

export const deleteRecordById = (id: number) =>
  useRequestMutate<{}, { access_key: string }>(
    {
      url: rest.v1.record.delete.replace(":recordID", String(id)),
      method: "DELETE",
    },
    "v1/records"
  );
