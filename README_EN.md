# Imperial Kitchen

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=white&logoColor=000)](https://expo.dev/client) [![NestJS](https://img.shields.io/badge/NestJS-E0234E.svg?style=flat-square&logo=NestJS&labelColor=white&logoColor=E0234E)](https://nestjs.com/) [![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?style=flat-square&logo=Prisma&labelColor=white&logoColor=2D3748)](https://www.prisma.io/) [![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=flat-square&logo=MySQL&labelColor=white&logoColor=4479A1)](https://www.mysql.com/) [![Redis](https://img.shields.io/badge/Redis-DC382D.svg?style=flat-square&logo=Redis&labelColor=white&logoColor=DC382D)](https://redis.io/)

[中文版](README.md)

A food ordering app for family kitchen.

## Features

- [x] Auth: JWT Login, register, logout.
- [x] Multi-language support, theme color, theme mode.
- [ ] Browse menus：View all kinds of food and their details, including images, descriptions and prices.
- [ ] Order food：Choose food and add it to shopping cart.
- [ ] Recipe: Generate recipes.
- [ ] Profile: View personal information, order history, virtual coins.
- [ ] AI assistant: Ask questions about the menu.

## Develop

To develop Expo, you should read [Tools for development](https://docs.expo.dev/develop/tools/) firstly.

1. Fork this repository to your GitHub account.
2. Install `yarn@1.22.22` and `node@20.10.0`.
3. Download repo and install deps.
   ```sh
   git clone <your_clone_repo>
   cd imperial-kitchen
   yarn install
   ```
4. Install and configure [`mysql`](https://www.mysql.com/), [`nodemailer`](https://nodemailer.com/) and [`redis`](https://redis.io/try-free/).
   > [!NOTE]
   > If you use [`docker`](https://www.docker.com/) to start the server, you can skip the configuration of `mysql` and `redis`.
5. Configure server env: rename **server/.env.example** to **server/.env**.

   ```shell
   # PORT=8000
   # DB_URL="mysql://root:root@host.docker.internal:3306/imperial_kitchen"

   # # nodemailer
   # nodemailer_host=
   # nodemailer_auth_user=
   # nodemailer_auth_pass=

   # # jwt
   # JWT_SECRET=agshddgfsd

   # # redis
   # REDIS_PASSWORD=redis_password
   # REDIS_URL=redis://default:redis_password@host.docker.internal:6380
   ```

   > [!NOTE]
   > If start server with `docker`, you get `Can't reach database server at host.docker.internal:3306` error, please check the host configuration.
   > Add `127.0.0.1 host.docker.internal` in host configuration.

6. Run server, and the api docs can be viewed at [api-docs](http://localhost:8000/api-docs).
   ```sh
   yarn dev:server
   ```
   or use docker to start the server:
   ```sh
   yarn docker:dev
   ```
   If you are first start, please run `yarn seed` generate initial data, and you can run `yarn studio` see the database.
7. Run mobile.
   Modify **apps/mobile/.env.example** to **apps/mobile/.env**, and modify **EXPO_PUBLIC_BASE_URL** to the server address, then run mobile:
   ```sh
   yarn dev:mobile
   ```
