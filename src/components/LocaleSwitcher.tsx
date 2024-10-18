"use client";

import { switchLanguage } from "@/lib/actions/locale";
import classNames from "classnames";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  const suffix = pathname.replace(/(\/en-US|\/es-MX)/, "");

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
            href={`/${key}${suffix}`}
          >
            {nativeName}
          </Link>
        );
      })}
    </div>
  );
}
