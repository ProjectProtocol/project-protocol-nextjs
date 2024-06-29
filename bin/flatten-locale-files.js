const path = require("path");
const fs = require("fs");
const { set } = require("lodash");

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

  fs.writeFileSync(
    path.join(targetDir, "es-MX.json"),
    JSON.stringify(es, null, 2)
  );
  fs.writeFileSync(
    path.join(targetDir, "en-US.json"),
    JSON.stringify(en, null, 2)
  );
}

module.exports = flattenLocaleFiles;
