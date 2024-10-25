"use client";

import { Link, usePathname } from "@/i18n/routing";
import classNames from "classnames";

type LanguageProps = {
  nativeName: string;
  key: "en-US" | "es-MX";
};

const languages: LanguageProps[] = [
  { nativeName: "English", key: "en-US" },
  { nativeName: "Español", key: "es-MX" },
];

export default function LocaleSwitcher({
  dark = false,
  locale,
}: {
  dark?: boolean;
  locale: string;
}) {
  const activeClass = `fw-semibold ${dark ? "text-white" : "text-body"}`;
  const inactiveClass = dark ? "link-white" : "link-dark";
  const pathname = usePathname();

  return (
    <div aria-label={"Select language"} className="flex flex-row">
      {languages.map(({ nativeName, key }) => {
        const active = key === locale;

        return (
          <Link
            key={`locale-switcher-${key}`}
            className={classNames("text-decoration-none px-2 py-1", {
              [activeClass]: active,
              [inactiveClass]: !active,
            })}
            locale={key}
            href={pathname}
          >
            {nativeName}
          </Link>
        );
      })}
    </div>
  );
}
