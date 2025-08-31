import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function Alerts({title,description}:{title:string, description:string}) {
  return (
    <Alert variant="default">
      <Terminal />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  );
}
