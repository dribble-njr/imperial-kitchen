# Imperial Kitchen

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

[中文版](README_ZH.md)

A food ordering app for family kitchen.

## Features

- [x] Auth: JWT Login, register, logout.
- [ ] Browse menus：View all kinds of food and their details, including images, descriptions and prices.
- [ ] Order food：Choose food and add it to shopping cart.
- [ ] Recipe: Generate recipes.
- [ ] Profile: View personal information, order history, virtual coins.
- [ ] AI assistant: Ask questions about the menu.

## Usage

- fe: Use [`Expo`](https://expo.dev/) to develop cross platform app.
- server: Use [`Nest`](https://nestjs.com/) develop server interface.
- database: Use [`MySQL`](https://www.mysql.com/).
- ORM: [`Prisma`](https://www.prisma.io/).
- others: Use `TypeScript` and `yarn` to manage monorepo.

## Contributing

To develop Expo, you should read [Tools for development](https://docs.expo.dev/develop/tools/) firstly.

1. Fork this repository to your GitHub account.
2. Install `yarn@1.22.22` and `node@20.10.0`.
3. Download repo and install deps.
   ```sh
   git clone <your_clone_repo>
   cd imperial-kitchen
   yarn install
   ```
4. Run mobile.
   ```sh
   yarn dev:mobile
   ```
5. Install and configure [`mysql`](https://www.mysql.com/), [`nodemailer`](https://nodemailer.com/) and [`redis`](https://redis.io/try-free/).
   > [!NOTE]
   > Redis config has been provided, you can also configure it yourself.
   >
   > If you use [`docker`](https://www.docker.com/) to start the server, you can skip the configuration of `mysql`.
6. Configure server env: rename **server/.env.example** to **server/.env**.
   ```shell
   # PORT=8000
   # DB_URL="mysql://root:root@database:3306/imperial_kitchen"

   # # nodemailer
   # nodemailer_host=
   # nodemailer_auth_user=
   # nodemailer_auth_pass=

   # # jwt
   # JWT_SECRET=agshddgfsd

   # # redis
   # REDIS_PASSWORD=UEtCeE8u8XTkLghdaUj8ZHCwTrzi1K3K
   # REDIS_URL=redis-13502.c261.us-east-1-4.ec2.redns.redis-cloud.com
   ```
7. Run server, and the api docs can be viewed at [api-docs](http://localhost:8000/api-docs).
   ```sh
   yarn dev:server
   ```
   or use docker to start the server:
   ```sh
   yarn docker:dev
   ```
