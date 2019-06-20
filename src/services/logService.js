import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://7a98e293c39f442391274b049b20814a@sentry.io/1483293",
    release: "dev",
    version: "0.0.1"
  });
}

function log(error) {
  console.log(error);
  Sentry.captureException(error);
}

export default {
  init,
  log
};
