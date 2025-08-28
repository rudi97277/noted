import type { TVacancyStatus } from "@/types/vacancy.type";
import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";

interface IColumnProps {
  children: any;
  id: TVacancyStatus;
  title: string;
}

export function Column({ children, id }: IColumnProps) {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Highest,
  });
  const style = isDropTarget ? { background: "#00000030" } : undefined;

  const colors: Record<TVacancyStatus, string> = {
    Applied: "bg-blue-100 text-blue-800",
    Test: "bg-yellow-100 text-yellow-800",
    Interview: "bg-purple-100 text-purple-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className={`Column ${colors?.[id]}`} ref={ref} style={style}>
      <p>{id}</p>
      {children}
    </div>
  );
}
