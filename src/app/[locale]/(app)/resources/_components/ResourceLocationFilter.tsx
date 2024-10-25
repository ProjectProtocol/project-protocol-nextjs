"use client";

import { debounce } from "lodash-es";
import { ChangeEvent } from "react";
import { FormControl, FormSelect } from "react-bootstrap";
import { useTranslations } from "next-intl";
import useSetSearchParams from "@/lib/useSetSearchParams";

export default function ResourceLocationFilter() {
  const t = useTranslations("resources");
  const [searchParams, setSearchParams] = useSetSearchParams();
  const location = searchParams.get("location") || "";
  const distanceParam = searchParams.get("distance") || "25";
  const distanceOptions = [5, 10, 15, 25, 50, 100].map((miles) => ({
    value: miles,
    label: t("locationFilter.miles", { count: miles }),
  }));

  const handleDistanceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((nextParams) => {
      if (!location) {
        nextParams.delete("distance");
      } else {
        nextParams.set("distance", event.target.value);
      }

      return nextParams;
    });
  };

  const handleLocationChange = debounce((event) => {
    setSearchParams((nextParams) => {
      if (!event.target.value) {
        nextParams.delete("location");
        nextParams.delete("distance");
      } else {
        nextParams.set("location", event.target.value);
        nextParams.set("distance", distanceParam);
      }
      return nextParams;
    });
  }, 500);

  return (
    <div>
      <h4>{t("locationFilter.title")}</h4>
      <div className="d-flex flex-row flex-wrap flex-md-nowrap align-items-center gap-2 mb-2">
        <span className="text-dark me-2 text-nowrap">
          {t("locationFilter.within")}
        </span>
        <FormSelect
          aria-label={t("locationFilter.distanceAccessibilityLabel")}
          size="lg"
          name="distance"
          className="w-auto"
          defaultValue={distanceParam}
          onChange={handleDistanceChange}
        >
          {distanceOptions.map(
            (option: { value: number; label: string }, i: number) => (
              <option key={`distance-option-${i}`} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </FormSelect>
        <span className="text-dark mx-2">{t("locationFilter.of")}</span>
        <FormControl
          name="location"
          aria-label={t("locationFilter.locationAccessibilityLabel")}
          defaultValue={location}
          onChange={handleLocationChange}
          placeholder={t("locationFilter.placeholder")}
          size="lg"
        />
      </div>
    </div>
  );
}
