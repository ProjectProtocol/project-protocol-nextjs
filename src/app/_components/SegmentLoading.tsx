import { Spinner } from "react-bootstrap";

export default function SegmentLoading() {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ minHeight: 313 }}
    >
      <Spinner animation="border" variant="dark" />
    </div>
  );
}
