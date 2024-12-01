FROM node:20.10.0-alpine

# ARG NODE_ENV=production

# ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

COPY apps/server/ ./apps/server/
COPY packages/ ./packages/

RUN yarn install --frozen-lockfile

RUN yarn build:server

EXPOSE 8000

CMD ["yarn", "prod:server"]
