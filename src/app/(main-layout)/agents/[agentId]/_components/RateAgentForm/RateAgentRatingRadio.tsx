import { Control, Controller } from "react-hook-form";
import RatingRadio from "./RatingRadio";
import { IRateAgentFormState } from "./types";
import { useTranslations } from "next-intl";

interface IRateAgentRatingRadio {
  control: Control<IRateAgentFormState>;
  name: "helpful" | "caring" | "availability" | "respectful";
}
export default function RateAgentRatingRadio({
  control,
  name,
}: IRateAgentRatingRadio) {
  const t = useTranslations("rate_agent");
  const i18nKey = `category.${name}`;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: t("required", { name }) }}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <RatingRadio
            currentValue={field.value}
            onChange={field.onChange}
            title={t(`category.${name}.title`)}
            titleHelper={t(`category.${name}.titleHelper`)}
            helperLeft={t(`category.${name}.helperLeft`)}
            helperRight={t(`category.${name}.helperRight`)}
            errorMessage={error?.message}
          />
        </div>
      )}
    />
  );
}
