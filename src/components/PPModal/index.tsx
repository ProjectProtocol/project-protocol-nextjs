"use client";

import Card from "react-bootstrap/Card";
import styles from "./pp-modal.module.css";
import { Container } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface IPPModal {
  children: React.ReactNode;
}

export default function PPModal({ children }: IPPModal) {
  const router = useRouter();
  return (
    <div className={styles.backdrop}>
      <Container className={styles.container}>
        <Card className={styles.modal} body>
          <div className="d-flex flex-row justify-content-end">
            <button
              className="btn-close"
              aria-label="Close"
              onClick={router.back}
            />
          </div>
          {children}
        </Card>
      </Container>
    </div>
  );
}
