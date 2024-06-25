import { switchLanguage } from "@/i18n";
import classNames from "classnames";
import { cookies } from "next/headers";
import Button from "react-bootstrap/Button";

type LanguageProps = {
  nativeName: string;
};

type Lang = "en" | "es";

const languages = {
  en: { nativeName: "English", key: "en-US" },
  es: { nativeName: "Español", key: "es-MX" },
};

export default function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const cookieStore = cookies();
  const currentLanguage = cookieStore.get("NEXT_LOCALE")?.value || "en-US";

  const activeClass = `fw-semibold ${dark ? "text-white" : "text-body"}`;
  const inactiveClass = dark ? "link-white" : "link-dark";

  return (
    <div aria-label={"Select language"} className="flex flex-row">
      <form
        action={async () => {
          "use server";
          await switchLanguage();
        }}
      >
        {Object.keys(languages).map((lng) => {
          const lang = lng as Lang;
          const label = languages[lang].nativeName;
          const active = languages[lang].key === currentLanguage;

          return (
            <Button
              variant="link"
              key={`locale-switcher-${lang}`}
              className={classNames("text-decoration-none px-2 py-1", {
                [activeClass]: active,
                [inactiveClass]: !active,
              })}
              role="button"
              type="submit"
              lang={lng}
            >
              {label}
            </Button>
          );
        })}
      </form>
    </div>
  );
}
