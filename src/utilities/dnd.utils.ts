export function move(
  items: Record<string, any[]>,
  event: {
    operation: {
      source: { droppableId: string; index: number };
      target: { droppableId: string; index: number };
    };
  }
): Record<string, any[]> {
  const { source, target } = event.operation;

  if (!source || !target) return items;

  const sourceItems = items[source.droppableId];
  const targetItems = items[target.droppableId];

  if (!sourceItems || !targetItems) return items;

  if (source.droppableId === target.droppableId) {
    const updated = [...sourceItems];
    const [moved] = updated.splice(source.index, 1);
    updated.splice(target.index, 0, moved);
    return {
      ...items,
      [source.droppableId]: updated,
    };
  }

  const from = [...sourceItems];
  const to = [...targetItems];
  const [moved] = from.splice(source.index, 1);
  to.splice(target.index, 0, moved);

  return {
    ...items,
    [source.droppableId]: from,
    [target.droppableId]: to,
  };
}
