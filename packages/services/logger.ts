import * as log from "@std/log";

const level = process.env.LOG_LEVEL || "DEBUG";

log.setup({
  handlers: {
    default: new log.ConsoleHandler(level as log.LevelName, {
      useColors: false,
    }),
  },
});

export const logger = log.getLogger();
