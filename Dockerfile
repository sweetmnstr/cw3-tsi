FROM        node:20-slim as development
WORKDIR     /usr/src/app
COPY        package.json ./
RUN         npm ci
COPY        . .
EXPOSE      3000 9229
CMD        ["npm", "run", "dev"]

FROM        node:20-slim as builder
WORKDIR     /usr/src/app
COPY       --from=development /usr/src/app ./
RUN         npm ci && npm run build
CMD        ["npm", "run", "biuld"]

FROM        node:20-slim as production
WORKDIR     /usr/src/app
COPY       --from=builder /usr/src/app/dist ./dist
COPY       --from=builder /usr/src/app/package.json ./package.json
RUN         npm ci
EXPOSE      41222
CMD        ["npm", "run", "start"]