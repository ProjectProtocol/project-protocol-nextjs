"use client";

import { ResourceTag, resourceTags } from "@/types/Resource";
import { useTranslations } from "next-intl";
import CategoryPill from "./CategoryPill";
import useSetSearchParams from "@/lib/useSetSearchParams";
import { useState } from "react";

const tagList = Object.values(resourceTags);

export default function ResourceTagFilter() {
  const t = useTranslations("resources");
  const [searchParams, setSearchParams] = useSetSearchParams();
  const [currentTags, setCurrentTags] = useState(searchParams.getAll("tags"));

  function updateTags(tags: string[]) {
    setCurrentTags(tags);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.delete("tags");
      tags.forEach((tag) => newParams.append("tags", tag));
      return newParams;
    });
  }

  return (
    <div>
      <h4>{t("tags.title")}</h4>
      <div className="d-flex flex-row flex-wrap gap-2">
        {tagList.map((key: ResourceTag, i: number) => {
          const active = currentTags.includes(key);
          return (
            <div className="" key={`rfcp-${i}`}>
              <CategoryPill
                active={active}
                label={`${active ? "-" : "+"} ${t(`tags.${key}`)}`}
                onClick={() => {
                  if (active) {
                    const newFilters = currentTags.filter((f) => f !== key);
                    updateTags(newFilters);
                  } else {
                    updateTags([...currentTags, key]);
                  }
                }}
              />
            </div>
          );
        })}
        {currentTags.length > 0 && (
          <a className="link-dark" role="button" onClick={() => updateTags([])}>
            {t("filters.clear", { count: currentTags.length })}
          </a>
        )}
      </div>
    </div>
  );
}
