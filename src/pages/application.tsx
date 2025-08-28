import DataTable from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { VacancyStatus } from "@/components/vacancy-status";
import { numberFormat } from "@/lib/utils";
import { getVacancyQuery } from "@/services/vacancy.service";
import type { IVacancyResponse, TVacancyStatus } from "@/types/vacancy.type";
import type { ColumnDef } from "@tanstack/react-table";
import debounce from "lodash.debounce";
import { List } from "lucide-react";
import { useMemo, useState } from "react";

export default function Application() {
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [debPage, setDebPage] = useState<number>(1);
  const { data: vacancyRes } = getVacancyQuery({
    keyword,
    page: debPage,
    page_size: pageSize,
  });

  const handleKeyword = debounce((v: string) => {
    setKeyword(v);
  }, 300);

  const debouncePage = useMemo(
    () =>
      debounce((v: number) => {
        if (v > 0) setDebPage(v);
      }, 300),
    []
  );

  const handlePage = (v: number) => {
    setPage(v);
    debouncePage(v);
  };

  const handlePageSize = (v: number) => {
    setPageSize(v);
    setPage(1);
    setDebPage(1);
  };

  const columns = useMemo<ColumnDef<IVacancyResponse>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Company",
        accessorKey: "company",
      },
      {
        header: "Location",
        accessorKey: "location",
      },
      {
        header: "Salary",
        accessorKey: "salary",
        accessorFn: (row) => (row.salary ? numberFormat(row.salary) : "-"),
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Arrangement",
        accessorKey: "arrangement",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (props) => (
          <VacancyStatus status={props.getValue<TVacancyStatus>()} />
        ),
      },
    ],
    []
  );

  const tableData = useMemo(() => vacancyRes?.data || [], [vacancyRes?.data]);

  return (
    <div className="p-2">
      <div className="w-full mb-4 flex flex-col gap-3">
        <p className="w-full items-center inline-flex gap-1 bg-gray-50 p-2 rounded-md font-medium">
          <List className="w-4" />
          Vacancy Application List
        </p>
        <Input
          placeholder="Keyword"
          onChange={(e) => handleKeyword(e.target.value)}
          className="w-2/5"
        />
      </div>

      <DataTable
        data={tableData}
        handlePage={handlePage}
        page={page}
        handlePageSize={handlePageSize}
        pagination={vacancyRes?.pagination}
        columns={columns}
      />
    </div>
  );
}
