"use client";

import classNames from "classnames";
import { useState } from "react";

type LanguageProps = {
  nativeName: string;
};

type Lang = "en" | "es";

const languages = {
  en: { nativeName: "English" },
  es: { nativeName: "Español" },
};

export default function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const [currentLanguage, setCurrentLanguage] = useState<Lang>("en");
  const activeClass = `fw-semibold ${dark ? "text-white" : "text-body"}`;
  const inactiveClass = dark ? "link-white" : "link-dark";
  return (
    <div aria-label={"Select language"} className="flex flex-row">
      {Object.keys(languages).map((lng) => {
        const lang = lng as Lang;
        const label = languages[lang].nativeName;
        const active = lang === currentLanguage;

        return (
          <a
            key={`locale-switcher-${lang}`}
            className={classNames("text-decoration-none px-2 py-1", {
              [activeClass]: active,
              [inactiveClass]: !active,
            })}
            role="button"
            onClick={() => setCurrentLanguage(lang)}
            lang={lng}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}
