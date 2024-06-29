const { spawn } = require("child_process");
const flattenLocaleFiles = require("./flatten-locale-files");

async function downloadTolgee() {
  return new Promise((resolve, reject) => {
    const ls = spawn("bash", ["./bin/tolgee-pull.sh", "./tmp"]);

    ls.stdout.on("data", (data) => {
      console.log(`UpdateLocales: ${data}`);
    });

    ls.stderr.on("data", (data) => {
      console.error(`UpdateLocales: ${data}`);
      reject(data);
    });

    ls.on("close", (code) => {
      resolve(code);
    });
  });
}

async function updateLocales() {
  const code = await downloadTolgee();
  if (code !== 0) {
    console.error("UpdateLocales: Failed to update locales");
    process.exit(1);
  }

  flattenLocaleFiles();
}

updateLocales();
