import type { IPagination } from "@/utilities/request.util";

import { safeNumber, safeRange } from "@/lib/utils";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: IPagination;
  page?: number;
  handlePage?: (v: number) => void;
  handlePageSize?: (v: number) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data = [],
  pagination,
  page,
  handlePage,
  handlePageSize,
}: IDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && page !== undefined && (
        <div className="flex items-center justify-end space-x-2 py-2">
          <p className="text-sm">Rows Page </p>
          <Select
            defaultValue={String(pagination?.page_size || 10)}
            onValueChange={(v) => handlePageSize?.(safeNumber(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="disabled:bg-gray-100"
            disabled={page <= 1}
            onClick={() => handlePage?.(page - 1)}
          >
            <ChevronLeft />
          </Button>
          <Input
            inputMode="numeric"
            className="w-[50px] text-center"
            value={page}
            onBlur={(e) => {
              const num = safeNumber(e.target.value);
              handlePage?.(safeRange(num, 1, pagination.last_page));
            }}
            onChange={(e) =>
              handlePage?.(
                safeRange(safeNumber(e.target.value), 0, pagination.last_page)
              )
            }
          />
          <p className="text-sm">of {pagination.last_page}</p>
          <Button
            variant="outline"
            className="disabled:bg-gray-100"
            disabled={page === pagination.last_page}
            onClick={() => handlePage?.(page + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
