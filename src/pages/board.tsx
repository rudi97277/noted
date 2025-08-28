import { Column } from "@/components/dnd/column";
import "@/components/dnd/dnd.css";
import { Item } from "@/components/dnd/item";
import { Skeleton } from "@/components/ui/skeleton";
import { getVacancyBoardQuery } from "@/services/vacancy.service";
import type { TJob, TVacancyStatus } from "@/types/vacancy.type";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useEffect, useState } from "react";

export default function App() {
  const { data: boardRes } = getVacancyBoardQuery();
  const [items, setItems] = useState<Record<TVacancyStatus, TJob[]>>();

  useEffect(() => {
    setItems(boardRes?.data);
  }, [boardRes]);

  return (
    <div className="w-full">
      {items !== undefined ? (
        <DragDropProvider
          onDragOver={(event) => {
            const { source } = event.operation;
            if (source!.type === "column") return;
            setItems((items) => move(items!, event));
          }}
          onDragEnd={(event) => {
            const { target, source } = event.operation;
            console.log({ target: target?.id, id: source?.id });
          }}
        >
          <div className="Root">
            {Object.entries(items).map(([column, items]) => (
              <Column key={column} id={column as TVacancyStatus} title={column}>
                {items.map((item, index) => (
                  <Item
                    key={item.id}
                    index={index}
                    column={column}
                    item={item}
                  />
                ))}
              </Column>
            ))}
          </div>
        </DragDropProvider>
      ) : (
        <Skeleton className="h-[250px] w-[200px] rounded-xl" />
      )}
    </div>
  );
}
