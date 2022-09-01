import type { Config } from "jest";

const config: Config = {
  displayName: "server",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["./dist"],
};

export default config;
