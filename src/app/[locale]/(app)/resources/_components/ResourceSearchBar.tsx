"use client";

import SearchBar from "@/components/SearchBar";
import useSetSearchParams from "@/lib/useSetSearchParams";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import { Col, Row } from "react-bootstrap";

export default function ResourceSearchBar() {
  const [searchParams, setSearchParams] = useSetSearchParams();
  const t = useTranslations();

  const handleInput = debounce((term?: string) => {
    setSearchParams((nextParams) => {
      if (term) {
        nextParams.set("search", term);
      } else {
        nextParams.delete("search");
      }
      return nextParams;
    });
  }, 500);

  return (
    <Row className="g-3">
      <Col xs="12" md="auto" className="flex-grow-1">
        <SearchBar
          name="search"
          placeholder={t("resources.searchPlaceholder")}
          size="lg"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleInput(e.target.value)}
          onClear={() => handleInput()}
          activeColor="cobalt"
          inactiveColor="light-cobalt"
        />
      </Col>
      <Col xs={12} md="auto">
        <div className="h-100 d-flex flex-row justify-content-md-end align-items-center">
          <a
            className="btn btn-cobalt"
            href="https://airtable.com/shrPJ7SKahULdzcMj"
            target="_blank"
          >
            {t("resources.suggestResource")}
          </a>
        </div>
      </Col>
    </Row>
  );
}
