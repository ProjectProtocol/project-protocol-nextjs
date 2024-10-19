import RatingRadioButton from "./RatingRadioButton";

interface IRatingRadio {
  title: string;
  /** Brief description of this rating category. */
  titleHelper: string;
  /** Description for lowest rating */
  helperLeft: string;
  /** Description for highest rating */
  helperRight: string;
  currentValue?: number | string | string[];
  onChange: (v: number) => void;
  /** Optionally customize the container with css classes */
  containerClass?: string;
  errorMessage?: string;
}

/**
 * Form element allowing user to provide a 1-to-5 rating.
 * Ratings are color coded.
 * */
export default function RatingRadio({
  title,
  helperLeft,
  helperRight,
  titleHelper,
  currentValue,
  onChange,
  containerClass,
  errorMessage,
}: IRatingRadio) {
  return (
    <div className={containerClass}>
      <h4 className={errorMessage ? "text-danger" : ""}>{title}</h4>
      <p className="text-danger mb-2">{errorMessage}</p>
      <p>{titleHelper}</p>
      <div className="d-flex flex-row justify-content-between mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <RatingRadioButton
            value={n}
            key={[title, "button", n].join("-")}
            onClick={onChange}
            isActive={currentValue === n}
          />
        ))}
      </div>
      <div className="d-flex flex-row justify-content-between small">
        <span>{helperLeft}</span>
        <span>{helperRight}</span>
      </div>
    </div>
  );
}
