import chalk from "chalk";
import { stdout } from "process";
import { Events } from "./EventManager";

interface ILogger {
  warn: (message: string) => void;
  info: (message: string | string[], init?: boolean) => void;
  error: (message: any, stopOnError: boolean) => void;
  fatal: (message: any, stopOnFatal: boolean) => void;
  debug: (message: any, origin: string) => void;
  discord: (message: string, source: string) => void;
}

export const logger: ILogger = {
  warn: (message: string) => {
    const Time = getTime();
    Events.emit("console_message", getFormattedTime(), "[WARN]:", message);
    stdout.write(`${Time} ${chalk.yellow(`[WARN]:`)} ${message}\n`);
  },
  info: (message: string | string[], init?: boolean) => {
    const Time = getTime();
    Events.emit("console_message", getFormattedTime(), "[INFO]:", message);
    stdout.write(`${Time} ${chalk.cyan(`[INFO]:`)} ${message}\n`);
  },
  error: (message: any, stopOnError: boolean) => {
    const Time = getTime();
    Events.emit("console_message", getFormattedTime(), "[ERROR]:", message);
    stdout.write(`${Time} ${chalk.red(`[ERROR]:`)} ${message}\n`);
    stopOnError ? process.exit(400) : null;
  },
  fatal: (message: any, stopOnFatal: boolean) => {
    const Time = getTime();
    stdout.write(`${Time} ${chalk.magenta(`[FATAL]:`)} ${message}\n`);
    Events.emit("console_message", getFormattedTime(), "[FATAL]:", message);
    stopOnFatal ? process.exit(400) : null;
  },
  debug: (message: any, origin: string) => {
    const Time = getTime();
    Events.emit("console_message", getFormattedTime(), "[DEBUG]:", message);
    stdout.write(`${Time} ${chalk.bgMagentaBright(`[DEBUG]:`)} ${chalk.cyan(`[${origin}]:`)} ${message}\n`);
  },
  discord: (message: string, source: string) => {
    const Time = getTime();
    Events.emit("console_message", getFormattedTime(), "[DISCORD]:", message);
    stdout.write(`${Time} ${chalk.blueBright(`[DISCORD]:`)} ${chalk.cyan(`[${source}]:`)} ${message}\n`);
  },
};

function getTime() {
  const time = new Date();
  const _Time = `${time.getHours()}:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}`;

  return `${chalk.white("[")}${chalk.gray(_Time)}${chalk.white("]")}`;
}

function getFormattedTime() {
  const time = new Date();
  const _Time = `${time.getHours()}:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}:${time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()}`;

  return `[${_Time}]`;
}
