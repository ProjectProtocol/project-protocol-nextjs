const path = require("path");
const fs = require("fs");
const { set } = require("lodash");

const i18nPath = path.join("tmp");
const messagesPath = path.join("src/locales");

const folders = fs.readdirSync(i18nPath);

function flattenTranslations() {
  let en = {};
  let es = {};

  for (let dir of folders) {
    if (dir.endsWith(".json")) {
      continue;
    }
    console.log("FlattenLocalFiles: flattening", dir);
    const english = getTranslations(path.join(i18nPath, dir, "en-US.json"));
    const spanish = getTranslations(path.join(i18nPath, dir, "es-MX.json"));

    en = { ...en, [dir]: english };
    es = { ...es, [dir]: spanish };
  }

  return { en, es };
}

function getTranslations(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  let data = JSON.parse(raw);
  const output = unflattenKeys(data);
  return output;
}

function unflattenKeys(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newValue = value instanceof Object ? unflattenKeys(value) : value;
    return set(acc, key, newValue);
  }, {});
}

function flattenLocaleFiles() {
  const { en, es } = flattenTranslations();

  fs.writeFileSync(
    path.join(messagesPath, "es-MX.json"),
    JSON.stringify(es, null, 2)
  );
  fs.writeFileSync(
    path.join(messagesPath, "en-US.json"),
    JSON.stringify(en, null, 2)
  );
}

module.exports = flattenLocaleFiles;
