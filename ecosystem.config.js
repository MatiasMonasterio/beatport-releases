// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: "br-server",
      script: "./workspaces/server/dist/index.js",
      instances: "max",
      exec_mode: "cluster",
      port: 3001,
    },
    {
      name: "br-client",
      script: "npm run start:client",
    },
  ],
};
