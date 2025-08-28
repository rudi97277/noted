import { Badge } from "@/components/ui/badge";
import type { TVacancyStatus } from "@/types/vacancy.type";

interface IVacancyStatusProps {
  status: TVacancyStatus;
}

export function VacancyStatus(props: IVacancyStatusProps) {
  const colors: Record<TVacancyStatus, string> = {
    Applied: "text-blue-600 bg-blue-100",
    Test: "text-purple-600 bg-purple-100",
    Interview: "text-yellow-700 bg-yellow-100",
    Accepted: "text-green-600 bg-green-100",
    Rejected: "text-red-600 bg-red-100",
  };

  return (
    <Badge variant="secondary" className={colors[props.status]}>
      {props.status}
    </Badge>
  );
}
