export const baseUrl = "https://dicode.my.id/itsnoted/backend/api";

export const rest = {
  v1: {
    record: {
      list: "v1/records",
      store: "v1/records",
      delete: "v1/records/:recordID",
      sum: "v1/records/summary",
    },
  },
} as const;

export type TRest = typeof rest;
