import { numberFormat } from "@/lib/utils";
import { deleteRecordById } from "@/services/record.service";
import type { IMonthlyRecordListResponse } from "@/types/record.type";
import useEncryptedLocalStorage from "@/utilities/storage.util";
import { Trash2Icon } from "lucide-react";
import { type RefObject } from "react";
import { Badge } from "./ui/badge";

interface IRecordProps extends IMonthlyRecordListResponse {
  remove: number | null;
  setRemove: (id: number | null) => void;
  timerRef: RefObject<number | null>;
}

export default function Record(props: IRecordProps) {
  const [accessKey] = useEncryptedLocalStorage("access-key", "");
  const { remove, setRemove, id, date, type, description, amount, timerRef } =
    props;

  const mutateDelete = deleteRecordById(id);

  const handleBadgeClicked = () => {
    if (remove === id) {
      mutateDelete.mutate(
        { access_key: accessKey },
        {
          onSuccess: () => {
            setRemove(null);
          },
        }
      );
    } else if (id > 0) {
      setRemove(id);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setRemove(null);
      }, 1500);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_4fr_2fr] gap-1 items-center shadow-sm p-2 rounded-2xl border">
      <Badge
        onClick={() => handleBadgeClicked()}
        asChild
        className="rounded-full size-10"
        variant={type === "income" ? "default" : "destructive"}
      >
        <div>
          {remove === id ? (
            <div className="cursor-pointer size-5 flex items-center">
              <Trash2Icon />
            </div>
          ) : (
            <p>{date}</p>
          )}
        </div>
      </Badge>
      <p className="wrap-break-word text-sm">{description}</p>
      <p className="ms-auto text-sm">{numberFormat(amount)}</p>
    </div>
  );
}
