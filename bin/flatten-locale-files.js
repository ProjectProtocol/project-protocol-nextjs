const path = require("path");
const fs = require("fs");
const os = require("os");
const { set } = require("lodash");
const { ostring } = require("zod");

function flattenTranslations(sourceDir) {
  const folders = fs.readdirSync(sourceDir);
  let en = {};
  let es = {};

  for (let dir of folders) {
    if (dir.endsWith(".json")) {
      continue;
    }
    console.log("FlattenLocalFiles: flattening", dir);
    const english = getTranslations(path.join(sourceDir, dir, "en-US.json"));
    const spanish = getTranslations(path.join(sourceDir, dir, "es-MX.json"));

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

function flattenLocaleFiles(sourceDir, targetDir) {
  const { en, es } = flattenTranslations(sourceDir);

  [
    { data: en, lang: "en-US" },
    { data: es, lang: "es-MX" },
  ].forEach(({ data, lang }) => {
    const destFile = path.join(targetDir, `${lang}.json`);
    fs.writeFileSync(destFile, JSON.stringify(data, null, 2));
    fs.appendFileSync(destFile, os.EOL, "utf8");
  });
}

module.exports = flattenLocaleFiles;
