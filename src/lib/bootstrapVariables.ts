// Dasherized theme color names as they appear in the sass stylesheets
export const themeColors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "light-cobalt",
  "dark",
  "white",
  "cobalt",
  "loquat",
  "meyerLemon",
  "mediumGray",
  "rating1",
  "rating2",
  "rating3",
  "rating4",
  "rating5",
] as const;

export type ThemeColor = (typeof themeColors)[number];
