import { svgProps } from "./svgProps";

interface IRatingsBadge {
  /** Integer or decimal rating. Can be between 0 and 5. */
  rating: number;
}

/** Dynamic SVG component to display a rating or average rating score. */
export default function RatingsBadge({ rating }: IRatingsBadge) {
  const decimal = rating % 1 > 0 ? (rating % 1).toPrecision(1).slice(1) : null;
  const integer = Math.floor(rating);
  const properties = svgProps;
  const textFill = integer < 4 ? "white" : "black";

  return (
    <div className={`text-rating-${integer}`}>
      <svg {...properties.svg}>
        <path {...properties.path} fill="currentColor" />
        <text {...properties.text} fontWeight={700}>
          <tspan {...properties.integer} fill={textFill}>
            {integer || "0"}
          </tspan>
          {decimal && (
            <tspan {...properties.decimal} fill={textFill}>
              {decimal}
            </tspan>
          )}
        </text>
      </svg>
    </div>
  );
}
