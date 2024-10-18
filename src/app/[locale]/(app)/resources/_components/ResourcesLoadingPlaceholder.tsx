"use client";

import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

function LoadingPlaceholderCard() {
  return (
    <Card body>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={3} /> <Placeholder x={8} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
        <Placeholder xs={5} />
      </Placeholder>
    </Card>
  );
}

export default function ResourcesLoadingPlaceholder() {
  return (
    <div className="vertical-rhythm">
      <div>
        <Placeholder animation="glow">
          <Placeholder xs={3} />
        </Placeholder>
      </div>
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
      <LoadingPlaceholderCard />
    </div>
  );
}
