FROM node:16-alpine
WORKDIR /app

RUN mkdir -p workspaces/core \
    && mkdir -p workspaces/client \
    && mkdir -p workspaces/server

COPY package.json package-lock.json ./
COPY workspaces/core/* ./workspaces/core/
COPY workspaces/client/package.json ./workspaces/client/
COPY workspaces/server/package.json ./workspaces/server/
RUN npm install -ci

COPY . .
RUN npm run prisma:generate \
    && npm run build:server \
    && npm run build:client

RUN npm install pm2@latest -g

CMD ["pm2-runtime", "ecosystem.config.js"]