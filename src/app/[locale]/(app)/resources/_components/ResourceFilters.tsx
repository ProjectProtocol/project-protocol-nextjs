"use client";

import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import ResourceTagFilter from "./ResourceTagFilter";
import ResourceLocationFilter from "./ResourceLocationFilter";
import { ResourceSearchParams } from "@/types/Resource";

interface ResourceFiltersProps {
  searchParams: ResourceSearchParams;
}

export default function ResourceFilters({
  searchParams,
}: ResourceFiltersProps) {
  const t = useTranslations("resources");

  /* Reveal filters if a filter has been set via resource card tag */
  const [filtersOpen, setFiltersOpen] = useState(
    !!searchParams.tags || !!searchParams.location
  );

  return (
    <div
      className={classNames("mb-4 text-cobalt", {})}
      style={{ transition: "all 0.3s" }}
    >
      <div className="d-flex flex-row align-items-center gap-2 justify-content-between">
        <div
          className="d-flex flex-row align-items-center gap-2 link link-cobalt"
          onClick={() => setFiltersOpen(!filtersOpen)}
          role="button"
        >
          <a
            className="link-cobalt"
            aria-controls="resource-filters-container"
            aria-expanded={filtersOpen}
          >
            {t("filters.show")}
          </a>
          <div
            style={{
              fontSize: "1rem",
              transform: filtersOpen ? "rotate(-180deg)" : "rotate(0)",
              transition: "transform 0.3s",
            }}
          >
            <i className="bi bi-chevron-down align-middle" />
          </div>
        </div>
      </div>
      <Collapse in={filtersOpen}>
        <div id="resource-filters-container">
          <div className="vertical-rhythm mt-3 p-3 rounded bg-white">
            <ResourceLocationFilter />
            <ResourceTagFilter />
          </div>
        </div>
      </Collapse>
    </div>
  );
}
