import AddRecord from "@/components/add-record";
import ExpenseIncome from "@/components/expense-income";
import Record from "@/components/record";

import { Skeleton } from "@/components/ui/skeleton";
import { getMonthlyRecordList, storeRecord } from "@/services/record.service";
import type { IRecordStoreRequest } from "@/types/record.type";
import useEncryptedLocalStorage from "@/utilities/storage.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Dashboard() {
  const [accessKey] = useEncryptedLocalStorage("access-key", "");
  const [monthDate, setMonthDate] = useState<Date>(new Date());
  const { data: recordRes, refetch: referchRecord } = getMonthlyRecordList({
    date: monthDate.toLocaleDateString("en-CA"),
    access_key: accessKey,
  });
  const store = storeRecord();

  const [remove, setRemove] = useState<number | null>(null);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  const formSchema = z.object({
    description: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    date: z.date(),
    type: z.string(),
    amount: z.number(),
  });

  const form = useForm<IRecordStoreRequest>({
    defaultValues: {
      type: "expense",
      description: "",
      amount: 0,
      date: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    store.mutate(
      { ...values, access_key: accessKey },
      {
        onSuccess: () => {
          referchRecord();
          form.reset();
          setAddOpen(false);
        },
      }
    );
  }

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex-1 overflow-y-scroll flex flex-col gap-2 p-2">
        {recordRes?.data ? (
          recordRes.data.length > 0 ? (
            recordRes?.data?.map((item, idx) => (
              <Record
                timerRef={timerRef}
                setRemove={setRemove}
                remove={remove}
                key={idx}
                {...item}
              />
            ))
          ) : (
            <Record
              timerRef={timerRef}
              setRemove={setRemove}
              remove={remove}
              key={"empty-id"}
              amount={0}
              date="0/0"
              description="No data"
              id={0}
              type="expense"
            />
          )
        ) : (
          <div className="grid grid-cols-[1fr_4fr_2fr] gap-1 items-center shadow-sm p-2 rounded-2xl border">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        )}
      </div>

      <ExpenseIncome
        recordData={recordRes?.data}
        monthDate={monthDate}
        setMonthDate={setMonthDate}
      />
      <AddRecord
        form={form}
        onSubmit={onSubmit}
        addOpen={addOpen}
        setAddOpen={setAddOpen}
      />
    </div>
  );
}
