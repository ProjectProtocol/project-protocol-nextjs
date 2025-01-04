import { capitalize } from "lodash";
import Badge from "react-bootstrap/Badge";

// Show an environment indicator for non-prod environments
export default function EnvironmentBadge() {
  if (process.env.NEXT_PUBLIC_ROLLBAR_ENV === "production") {
    return null;
  }

  const environment = process.env.NEXT_PUBLIC_ROLLBAR_ENV ?? "development";

  const bgColor = {
    development: "cobalt",
    staging: "warning",
    preview: "info",
  }[environment];

  return (
    <Badge bg={bgColor}>
      {capitalize(process.env.NEXT_PUBLIC_ROLLBAR_ENV ?? "development")}
    </Badge>
  );
}
