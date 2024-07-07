"use client";

import { useTranslations } from "next-intl";
import RatingRadioButton from "./RatingRadioButton";
import { useEffect, useState } from "react";

interface IRatingRadio {
  name: "helpful" | "caring" | "availability" | "respectful";
  /** Optionally customize the container with css classes */
  containerClass?: string;
  errorMessage?: string[];
  clearErrors: () => void;
}

/**
 * Form element allowing user to provide a 1-to-5 rating.
 * Ratings are color coded.
 * */
export default function RatingRadio({
  name,
  containerClass,
  errorMessage,
  clearErrors,
}: IRatingRadio) {
  const t = useTranslations("rate_agent");
  const [value, setValue] = useState<number>(0);

  return (
    <div className={containerClass}>
      <h4 className={errorMessage ? "text-danger" : ""}>
        {t(`category.${name}.title`)}
      </h4>
      <p className="text-danger mb-2">{errorMessage?.join(" ")}</p>
      <p>{t(`category.${name}.titleHelper`)}</p>
      <input type="hidden" name={name} value={value} />
      <div className="d-flex flex-row justify-content-between mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <RatingRadioButton
            value={n}
            key={[name, "button", n].join("-")}
            onClick={(v) => {
              clearErrors();
              setValue(v);
            }}
            isActive={value === n}
          />
        ))}
      </div>
      <div className="d-flex flex-row justify-content-between small">
        <span>{t(`category.${name}.helperLeft`)}</span>
        <span>{t(`category.${name}.helperRight`)}</span>
      </div>
    </div>
  );
}
