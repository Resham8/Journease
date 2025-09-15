import { Terminal, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface AlertsProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export default function Alerts({ title, description, variant = "default" }: AlertsProps) {
  // Choose icon based on title or variant
  const getIcon = () => {
    if (title.toLowerCase().includes("success")) {
      return <CheckCircle className="h-4 w-4" />;
    }
    if (title.toLowerCase().includes("failed") || title.toLowerCase().includes("error") || variant === "destructive") {
      return <XCircle className="h-4 w-4" />;
    }
    if (title.toLowerCase().includes("warning")) {
      return <AlertTriangle className="h-4 w-4" />;
    }
    return <Terminal className="h-4 w-4" />;
  };

  // Determine variant based on title if not explicitly set
  const alertVariant = variant === "default" && title.toLowerCase().includes("failed") 
    ? "destructive" 
    : variant;

  return (
    <Alert variant={alertVariant} className="shadow-lg">
      {getIcon()}
      <AlertTitle>{title}</AlertTitle>
      {description && (
        <AlertDescription>
          {description}
        </AlertDescription>
      )}
    </Alert>
  );
}