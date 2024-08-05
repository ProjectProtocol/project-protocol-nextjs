"use client";

import PopUp from "@/components/PopUp";
import SearchBar from "@/components/SearchBar";
import Office from "@/types/Office";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ISelectOfficeModal {
  show: boolean;
  close: () => void;
  selectOffice: (o: Office) => void;
}

export default function SelectOfficeModal({
  close,
  show,
  selectOffice,
}: ISelectOfficeModal) {
  const [searchText, setSearchText] = useState("");
  const t = useTranslations("agent");
  const onChange = debounce(setSearchText, 500);

  return (
    <PopUp
      title={t("selectOffice")}
      closeButton
      show={show}
      size={undefined}
      scrollable
      centered={false}
      bodyClass="p-3"
      onHide={() => {
        setSearchText("");
        close();
      }}
    >
      <div className="pt-3" style={{ minHeight: "40vh" }}>
        <SearchBar
          id="search"
          name="search"
          aria-label={t("searchOffices")}
          size="lg"
          placeholder={t("searchOffices")}
          type="text"
          defaultValue={searchText}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          autoFocus
        />
      </div>
    </PopUp>
  );
}
