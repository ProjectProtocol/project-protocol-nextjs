"use client";

import { useTranslations } from "next-intl";
import { debounce } from "lodash-es";
import useSetSearchParams from "@/lib/useSetSearchParams";
import { FormControl, InputGroup } from "react-bootstrap";

export default function OfficeAgentsSearchBar() {
  const t = useTranslations();
  const [searchParams, setSearchParams] = useSetSearchParams();

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
    <InputGroup className="my-3">
      <InputGroup.Text id="searchicon">🔎</InputGroup.Text>{" "}
      <FormControl
        autoComplete="false"
        autoFocus={false}
        type="text"
        role="searchbox"
        onChange={(e) => handleInput(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        placeholder={t("agent.searchByOffice")}
      />
    </InputGroup>
  );
}
