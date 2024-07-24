"use client";

import Resource from "@/types/Resource";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card } from "react-bootstrap";

export default function ResourceCardSimple({
  resource,
}: {
  resource: Resource;
}) {
  const { url, city, state, name, id, isOnline } = resource;
  const [error, setError] = useState<boolean>();

  const locationLabel = isOnline
    ? "Online"
    : city && state
    ? `${city}, ${state}`
    : null;

  return (
    <Card body className="shadow-none" as={Link} href={"/resources/" + id}>
      <div className="vertical-rhythm-sm">
        <div className="d-flex flex-row align-items-top">
          <div
            className="bg-white d-flex justify-content-center align-items-center rounded rounded-circle border me-2 position-relative"
            style={{ width: "30px", height: "30px", padding: "6px" }}
          >
            <Image
              src={
                error
                  ? "/images/icon.svg"
                  : `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`
              }
              width={18}
              height={18}
              alt={`Favicon for ${name}`}
              onError={() => setError(true)}
            />
          </div>
          <div className="flex flex-column">
            <span className="fs-3 fw-semibold d-block">{name}</span>
            {locationLabel && (
              <div className="d-flex flex-row text-dark">
                <i className="bi bi-geo-alt-fill me-1 small" />
                <span className="small">{locationLabel}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
