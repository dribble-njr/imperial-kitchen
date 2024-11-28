# Imperial Kitchen

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
6. Configure server env: rename **server/.env.example** to **server/.env**.
   ```shell
   # PORT=8000
   # DB_URL=""
   # # nodemailer
   # nodemailer_host=
   # nodemailer_auth_user=
   # nodemailer_auth_pass=
   # # jwt
   # JWT_SECRET=
   # # redis
   # REDIS_PASSWORD=
   # REDIS_URL=
   ```
7. Run server, and the api docs can be viewed at [api-docs](http://localhost:8000/api-docs).
   ```sh
   yarn dev:server
   ```
