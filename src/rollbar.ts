import Rollbar from "rollbar";

const baseConfig: Rollbar.Configuration = {
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NEXT_PUBLIC_ROLLBAR_ENV ?? "testenv",
  verbose: true,
};

export const clientConfig = {
  ...baseConfig,
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
  client: {
    javascript: {
      source_map_enabled: true,
      code_version: process.env.SOURCE_COMMIT,
      guess_uncaught_frames: true,
    },
  },
};

export const serverInstance = new Rollbar({
  accessToken: process.env.ROLLBAR_SERVER_TOKEN,
  ...baseConfig,
});
