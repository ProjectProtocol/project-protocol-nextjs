import Rollbar from "rollbar";

const {
  NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
  NEXT_PUBLIC_ROLLBAR_ENV,
  ROLLBAR_SERVER_TOKEN,
} = process.env;

const rollbarEnabled =
  NEXT_PUBLIC_ROLLBAR_ENV == "production" ||
  NEXT_PUBLIC_ROLLBAR_ENV == "staging" ||
  NEXT_PUBLIC_ROLLBAR_ENV == "preview";

const baseConfig: Rollbar.Configuration = {
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: NEXT_PUBLIC_ROLLBAR_ENV,
  verbose: true,
  enabled: rollbarEnabled,
};

export const clientConfig = {
  ...baseConfig,
  accessToken: NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
  client: {
    javascript: {
      source_map_enabled: true,
      code_version: process.env.SOURCE_COMMIT,
      guess_uncaught_frames: true,
    },
  },
};

export const serverInstance = new Rollbar({
  accessToken: ROLLBAR_SERVER_TOKEN,
  ...baseConfig,
});
