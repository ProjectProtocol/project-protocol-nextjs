import Agent from "@/types/Agent";
import Office from "@/types/Office";
import SearchResultAgent from "./SearchResultAgent";
import SearchResultOffice from "./SearchResultOffice";
import ListItem from "../ListItem";
import { CardProps } from "react-bootstrap";

interface ISearchResult extends CardProps {
  result: Agent | Office;
  onClick?: () => void;
}

export default function SearchResult({
  result,
  onClick,
  ...cardProps
}: ISearchResult) {
  const href =
    result.type === "Agent"
      ? `/rate-my-po/agents/${result.id}`
      : `/rate-my-po/offices/${result.id}/agents`;

  return (
    <ListItem onClick={onClick} body {...cardProps} href={href}>
      {result.type === "Agent" ? (
        <SearchResultAgent agent={result as Agent} />
      ) : (
        <SearchResultOffice office={result as Office} />
      )}
    </ListItem>
  );
}
