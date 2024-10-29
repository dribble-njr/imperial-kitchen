# Imperial Kitchen

A food ordering platform. It's just for a family, so it does't have `SHOP` model.

## Features

- [ ] Browse menus：View all kinds of food and their details, including images, descriptions and prices.
- [ ] Order food：Choose food and add it to shopping cart.
- [ ] Profile: View personal information, order history, virtual coins.

## Usage

- fe: Use `Expo` and `React Native` develop mobile app.
- server: Use vanilla `Node.js` develop server interface.
- database: Use cloud database [`turso`](https://github.com/tursodatabase/libsql).
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

4.1. Run mobile (macOS).

```sh
yarn dev:mobile
```

4.2. Run mobile (Windows).

```sh
yarn start
```

5. Configure database env.

**server/.env.local**

```
PORT=8000
TURSO_URL="YOUR_TURSO_URL"
TURSO_AUTH_TOKEN="YOUR_TURSO_AUTH_TOKEN"
```

6. Run server.

```sh
yarn dev:server
```
