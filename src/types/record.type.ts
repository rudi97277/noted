export interface IMonthlyRecordListResponse {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: string;
}

export interface IMonthlyRecordSummaryResponse {
  expense: number;
  income: number;
}

export interface IMonthlyRecordRequest {
  date: string;
  access_key: string;
}

export interface IRecordStoreRequest {
  description: string;
  amount: number;
  date: Date;
  type: string;
}
