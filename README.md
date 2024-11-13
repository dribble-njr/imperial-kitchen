# Imperial Kitchen

A food ordering app for family kitchen.

## Features

- [ ] Browse menus：View all kinds of food and their details, including images, descriptions and prices.
- [ ] Order food：Choose food and add it to shopping cart.
- [ ] Profile: View personal information, order history, virtual coins.

## Usage

- fe: Use `Expo` and `React Native` develop mobile app.
- server: Use vanilla `Node.js` develop server interface.
- database: Use cloud database [`MySQL`](https://www.mysql.com/) and [`Prisma`](https://www.prisma.io/).
- others: Use `TypeScript` and `yarn` to manage monorepo.

## How to use

1. Install `yarn` and `node`

```sh
Node v20.10.0
yarn 1.22.22
```

2. Clone this repository

```sh
git clone https://github.com/dribble-njr/imperial-kitchen.git
cd imperial-kitchen
yarn install
```

3. Generate types.

```sh
yarn build:types
```

4. Run mobile.

```sh
yarn dev:mobile
```

5. Configure server env.

**server/.env**

```
PORT=8000
DB_URL="YOUR_DATABASE_URL"
```

6. Run server.

```sh
yarn dev:server
```
