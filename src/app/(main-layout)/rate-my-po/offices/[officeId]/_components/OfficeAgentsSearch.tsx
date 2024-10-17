"use client";

import { Suspense, useEffect, useState } from "react";
import Agent from "@/types/Agent";
import { SearchData } from "@/types/Search";
import { FormControl, InputGroup } from "react-bootstrap";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import Paginator from "@/components/Paginator";
import SearchResultAgentSimple from "./SearchResultAgentSimple";

type OfficeAgentsSearchProps = {
  initialData: SearchData<Agent>;
  getMore: (page: number) => Promise<SearchData<Agent>>;
};

export default function OfficeAgentsSearch({
  initialData,
  getMore,
}: OfficeAgentsSearchProps) {
  const t = useTranslations();
  const [searchText, setSearchText] = useState("");
  const [filteredAgentsList, setFilteredAgentsList] = useState<Agent[]>(
    initialData.data
  );

  const handleInput = debounce((e) => {
    setSearchText(e.target.value);
  }, 500);

  useEffect(() => {
    const filtered = initialData.data.filter((agent) =>
      agent.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredAgentsList(filtered);
  }, [searchText, initialData.data]);

  return (
    <>
      <InputGroup className="my-3">
        <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>{" "}
        <FormControl
          type="text"
          aria-describedby="basic-addon1"
          onChange={handleInput}
          placeholder={t("agent.searchByOffice")}
        />
      </InputGroup>
      <Suspense>
        <Paginator<Agent>
          animated
          data={filteredAgentsList}
          meta={{ ...initialData.meta, total: filteredAgentsList.length }}
          getData={getMore}
          keyGenerator={(item) =>
            `office-agents-search-result-${String(searchText)}-${item.type}-${
              item.id
            }`
          }
          ItemComponent={({ item }) => <SearchResultAgentSimple agent={item} />}
        />
        {filteredAgentsList.length === 0 && "No matching agents"}
      </Suspense>
    </>
  );
}
