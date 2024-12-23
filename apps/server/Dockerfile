FROM node:20.10.0-alpine

ARG NODE_ENV

ENV NODE_ENV=$NODE_ENV

RUN echo "Building with NODE_ENV=$NODE_ENV"

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

COPY apps/server/ ./apps/server/
COPY packages/ ./packages/

RUN yarn install --frozen-lockfile

EXPOSE 8000

CMD ["sh", "-c", "cd apps/server && \
  if [ \"$NODE_ENV\" = \"dev\" ]; then yarn dev; else yarn build && yarn prod; fi"]
