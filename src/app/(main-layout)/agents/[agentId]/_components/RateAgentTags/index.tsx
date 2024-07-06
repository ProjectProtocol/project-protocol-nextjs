import { TagKey, tagsTranslationMap } from "@/types/Tag";
import { useTranslations } from "next-intl";
import { useState } from "react";
import RateAgentTag from "./RateAgentTag";

export default function RateAgentTags() {
  const t = useTranslations();
  const [value, setValue] = useState<TagKey[]>([]);
  const tagValues = Object.keys(tagsTranslationMap) as TagKey[];

  function handleClick(tagName: TagKey) {
    value.includes(tagName)
      ? setValue(value.filter((t) => t !== tagName))
      : setValue([...value, tagName]);
  }

  return (
    <div className="mb-3 fs-4">
      <h4>
        {t("rate_agent.tags.title")} <small>{t("shared.optional")}</small>
      </h4>
      {value.map((v) => (
        <input
          key={`rating-tag-hidden-input-${v}`}
          type="hidden"
          name="tags[]"
          value={v}
        />
      ))}
      {tagValues.map((tagName: TagKey, i: number) => (
        <RateAgentTag
          key={`rating-tag-btn-${i}`}
          isActive={value.indexOf(tagName) > -1}
          tagName={t(tagsTranslationMap[tagName])}
          onClick={() => handleClick(tagName)}
        />
      ))}
    </div>
  );
}
