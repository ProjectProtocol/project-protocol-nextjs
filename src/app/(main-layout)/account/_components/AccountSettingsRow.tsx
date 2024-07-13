import { Col } from "react-bootstrap";

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
      <Col xs={7}>
        <h4>{title}</h4>
        <p>{detail}</p>
      </Col>
      <Col xs={5}>
        <div className="text-end">{action}</div>
      </Col>
    </>
  );
}
