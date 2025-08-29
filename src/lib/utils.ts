import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function numberFormat(val: number) {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(val);
}

export function safeNumber(value: number | string) {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

export function safeRange(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function toMonthYear(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    year: "numeric",
  }).format(d);
}
