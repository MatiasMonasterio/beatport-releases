import type { Config } from "jest";

import * as path from "path";
import { jestAlias } from "./scripts/alias";

const config: Config = {
  displayName: "client",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { configFile: path.join(__dirname, "./babel-jest.config.js") }],
  },
  moduleNameMapper: {
    ...jestAlias,
    "^@/(.*)$": `${path.join(__dirname, "src/modules")}/$1`,
  },
};

export default config;
