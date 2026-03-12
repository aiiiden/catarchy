const R = "\x1b[0m";
const B = "\x1b[1m";

const bg = {
  blue: "\x1b[48;5;99m",
  green: "\x1b[48;5;64m",
  yellow: "\x1b[48;5;136m",
  red: "\x1b[48;5;160m",
  gray: "\x1b[48;5;240m",
};
const fg = {
  white: "\x1b[97m",
  black: "\x1b[30m",
};

const badge = (color: string, label: string) =>
  `${B}${color}${fg.white} ${label} ${R}`;

const statusBadge = (status: number) => {
  const color =
    status >= 500
      ? bg.red
      : status >= 400
        ? bg.yellow
        : status >= 300
          ? bg.gray
          : bg.green;
  return badge(color, String(status));
};

export const logger = {
  request(requestId: string, method: string, path: string) {
    console.log(
      `${badge(bg.blue, "REQ")} ${badge(bg.gray, requestId)} ${method} ${path}`,
    );
  },
  response(requestId: string, status: number, method: string, path: string) {
    console.log(
      `${badge(bg.blue, "RES")} ${badge(bg.gray, requestId)} ${statusBadge(status)} ${method} ${path}`,
    );
  },
  error(requestId: string, error: unknown) {
    if (error instanceof Error) {
      console.error(
        `${badge(bg.red, "ERR")} ${badge(bg.gray, requestId)} ${error.name}: ${error.message}`,
      );
      if (error.stack) console.error(error.stack);
    } else {
      console.error(
        `${badge(bg.red, "ERR")} ${badge(bg.gray, requestId)}`,
        error,
      );
    }
  },
  info(message: string, ...args: unknown[]) {
    console.log(`${badge(bg.gray, "INF")} ${message}`, ...args);
  },
};
