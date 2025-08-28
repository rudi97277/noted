import { useDraggable } from "@dnd-kit/react";

interface IItemProps {
  index: number;
  column: string;
  item: {
    id: number;
    name: string;
    company: string;
  };
}

export function Item({ item }: IItemProps) {
  const { ref, isDragging } = useDraggable({
    id: item.id,
    type: "item",
  });

  return (
    <button className="Item" ref={ref} data-dragging={isDragging}>
      <span className="font-semibold">{item?.name}</span>
      <span className="text-sm!">{item?.company}</span>
    </button>
  );
}
