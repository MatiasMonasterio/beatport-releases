import type { Config } from "jest";

import path from "path";
import { jestAlias } from "./scripts/alias";

const config: Config = {
  displayName: "client",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { configFile: path.join(__dirname, "./babel-jest.config.js") }],
  },
  moduleNameMapper: { ...jestAlias },
};

export default config;
