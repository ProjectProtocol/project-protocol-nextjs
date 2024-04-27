import en from "../locales/en/translation.json";

type TranslactionDict = { [key: string]: string | TranslactionDict };

function traverseKeys(keyChain: string, dict: TranslactionDict): string {
  let keys = keyChain.split(".");

  for (let k of keys) {
    if (k in dict) {
      if (typeof dict[k] === "string") {
        return dict[k] as string;
      } else {
        return traverseKeys(
          keys.slice(1).join("."),
          dict[k] as TranslactionDict
        );
      }
    }
  }

  return keyChain;
}

export default function useTranslation() {
  function t(key: string): string {
    return traverseKeys(key, en);
  }

  return {
    t,
  };
}
