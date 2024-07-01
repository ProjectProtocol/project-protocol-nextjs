import { Col, Row } from "react-bootstrap";
import Office from "@/types/Office";
import officeIcon from "../../../public/images/office-icon.svg";
import OfficeInfo from "../OfficeInfo";
import Image from "next/image";

interface ISearchResultOffice {
  office: Office;
}

export default function SearchResultOffice({ office }: ISearchResultOffice) {
  return (
    <Row>
      <Col>
        <OfficeInfo office={office} />
      </Col>
      <Col xs="auto">
        <Image
          src={officeIcon.src}
          width="0"
          height="0"
          style={{ height: "auto", width: 45 }}
          alt="Office icon"
        />
      </Col>
    </Row>
  );
}
