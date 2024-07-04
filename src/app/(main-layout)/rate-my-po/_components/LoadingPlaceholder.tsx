"use client";
import { Card, Placeholder } from "react-bootstrap";

function LoadingPlaceholderCard() {
  return (
    <Card>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={3} /> <Placeholder x={8} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={5} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export default function LoadingPlaceholder() {
  return (
    <>
      <div className="d-flex flex-column gap-3">
        {Array(15)
          .fill(0)
          .map((_, i) => (
            <LoadingPlaceholderCard key={`loading-placeholder-card-${i}`} />
          ))}
      </div>
    </>
  );
}
