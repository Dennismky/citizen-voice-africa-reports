import { Badge } from "@/components/ui/badge";
import { Clock, Search, CheckCircle, XCircle } from "lucide-react";

type Status = "pending" | "investigating" | "resolved" | "rejected";

interface StatusBadgeProps {
  status: Status;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    variant: "pending" as const,
  },
  investigating: {
    icon: Search,
    label: "Under Investigation",
    variant: "investigating" as const,
  },
  resolved: {
    icon: CheckCircle,
    label: "Resolved",
    variant: "resolved" as const,
  },
  rejected: {
    icon: XCircle,
    label: "Rejected",
    variant: "rejected" as const,
  },
};

const StatusBadge = ({ status, size = "md" }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  const iconSize = size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs";

  return (
    <Badge variant={config.variant} className={`${textSize} gap-1`}>
      <Icon className={iconSize} />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;