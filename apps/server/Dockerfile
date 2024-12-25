# syntax=docker/dockerfile:1.4

FROM node:20.10.0-alpine

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN echo "Building with NODE_ENV=$NODE_ENV"

WORKDIR /usr/src/app

COPY apps/server/ ./apps/server/
COPY packages/ ./packages/

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile

WORKDIR /usr/src/app/apps/server
RUN npx prisma generate

EXPOSE 8000

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"dev\" ]; then yarn dev; else npx prisma migrate deploy && yarn build && yarn prod; fi"]
