import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MonthPicker } from "@/components/ui/monthpicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { numberFormat, toMonthYear } from "@/lib/utils";
import type { IMonthlyRecordListResponse } from "@/types/record.type";
import { PopoverClose } from "@radix-ui/react-popover";

interface IExpenseIncomeProps {
  monthDate: Date;
  recordData?: Array<IMonthlyRecordListResponse>;
  setMonthDate: (date: Date) => void;
}

type RecordType = "income" | "expense";

export default function ExpenseIncome({
  monthDate,
  setMonthDate,
  recordData,
}: IExpenseIncomeProps) {
  const result = recordData?.reduce(
    (acc, item) => {
      acc[item?.type as RecordType] += item.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  return (
    <div className="grid grid-cols-[2fr_1fr_2fr] shadow-sm bg-primary text-white p-2 tracking-tight font-semibold">
      <div className="flex flex-col items-start">
        <p>Expense</p>
        <p>{numberFormat(result?.expense || 0)}</p>
      </div>
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger>
            <Badge variant={"secondary"}>
              <p className="text-sm">{toMonthYear(monthDate)}</p>
            </Badge>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex">
              <MonthPicker
                onMonthSelect={setMonthDate}
                selectedMonth={monthDate}
              />
            </div>
            <PopoverClose asChild>
              <Button className="w-full">Close</Button>
            </PopoverClose>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col items-end">
        <p>Income</p>
        <p>{numberFormat(result?.income || 0)}</p>
      </div>
    </div>
  );
}
