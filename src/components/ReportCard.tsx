import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { MapPin, Calendar, Edit3, Trash2, AlertTriangle, Wrench } from "lucide-react";

type ReportType = "red-flag" | "intervention";
type Status = "pending" | "investigating" | "resolved" | "rejected";

interface ReportCardProps {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  status: Status;
  location: string;
  createdAt: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ReportCard = ({ 
  id, 
  title, 
  description, 
  type, 
  status, 
  location, 
  createdAt,
  onEdit,
  onDelete 
}: ReportCardProps) => {
  const canEdit = status === "pending";
  const typeIcon = type === "red-flag" ? AlertTriangle : Wrench;
  const TypeIcon = typeIcon;

  return (
    <Card className="shadow-card hover:shadow-elegant transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <TypeIcon className={`h-5 w-5 ${type === "red-flag" ? "text-destructive" : "text-info"}`} />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <p className="text-muted-foreground line-clamp-3">{description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{createdAt}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            disabled={!canEdit}
            className="flex-1"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            disabled={!canEdit}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;