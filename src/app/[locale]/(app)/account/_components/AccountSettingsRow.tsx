import { Col } from "react-bootstrap";
import type { JSX } from "react";

interface IAccountSettingsRow {
  title: string;
  detail: string;
  action?: JSX.Element;
}

export default function AccountSettingsRow({
  title,
  detail,
  action,
}: IAccountSettingsRow) {
  return (
    <>
      <Col xs={8}>
        <h4>{title}</h4>
        <p>{detail}</p>
      </Col>
      <Col xs={4}>
        <div className="text-end">{action}</div>
      </Col>
    </>
  );
}
