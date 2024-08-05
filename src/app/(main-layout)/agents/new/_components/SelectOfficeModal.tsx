"use client";

import ListItem from "@/components/ListItem";
import Paginator from "@/components/Paginator";
import PopUp from "@/components/PopUp";
import SearchResultOffice from "@/components/search/SearchResultOffice";
import SearchResultsInfo from "@/components/search/SearchResultsInfo";
import SearchBar from "@/components/SearchBar";
import { listOffices } from "@/lib/actions/office";
import Office from "@/types/Office";
import { SearchData } from "@/types/Search";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

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
  const [initialData, setInitialData] = useState<SearchData<Office>>({
    data: [],
    meta: { page: 0, totalPages: 0, total: 0 },
  });

  useEffect(() => {
    if (!show) return;
    listOffices({ search: searchText, page: 0 }).then((data) => {
      setInitialData(data);
    });
  }, [searchText, show]);

  return (
    <PopUp
      title={t("selectOffice")}
      closeButton
      show={show}
      size="lg"
      scrollable
      centered={false}
      bodyClass="p-md-4 overflow-y-scroll"
      onHide={() => {
        setSearchText("");
        close();
      }}
    >
      <div className="pt-3 vertical-rhythm" style={{ minHeight: "40vh" }}>
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
          onClear={() => onChange("")}
          autoFocus
        />
        <SearchResultsInfo meta={initialData.meta} />
        <Paginator<Office>
          meta={initialData.meta}
          data={initialData.data}
          keyGenerator={(o) => `agent-office-select-${o.id}`}
          getData={async (page) =>
            await listOffices({ search: searchText, page })
          }
          ItemComponent={({ item, page, index }) => (
            <ListItem
              role="button"
              onClick={() => {
                selectOffice(item);
                close();
              }}
              body
            >
              <SearchResultOffice office={item} />
            </ListItem>
          )}
        />
      </div>
    </PopUp>
  );
}
