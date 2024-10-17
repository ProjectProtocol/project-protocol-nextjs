import classNames from "classnames";
import { MouseEventHandler } from "react";
import { Badge } from "react-bootstrap";

interface IRateAgentTag {
  tagName: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLElement>;
}

export default function RateAgentTag({
  tagName,
  isActive,
  onClick,
}: IRateAgentTag) {
  return (
    <Badge
      role="button"
      pill
      bg={isActive ? "dark" : "white"}
      className={classNames(
        "text-decoration-none border border-dark p-2 me-1 my-1 text-wrap",
        {
          "bg-white text-black": !isActive,
          "bg-dark text-white": isActive,
        }
      )}
      onClick={onClick}
    >
      {tagName}
    </Badge>
  );
}
