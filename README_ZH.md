# 御膳房

[English Version](README.md)

一个家庭厨房的点餐应用。

## 特性

- [x] 认证：JWT 登录、注册、登出。
- [ ] 浏览菜单：查看所有食物及其详情，包括图片、描述和价格。
- [ ] 点餐：选择食物并添加到购物车。
- [ ] 菜谱：支持生成菜谱。
- [ ] 个人中心：查看个人信息、订单历史、虚拟货币。
- [ ] AI 助手：询问菜单相关问题。

## 技术栈

- 前端：[`Expo`](https://expo.dev/) 跨端框架；
- 后端：[`Nest`](https://nestjs.com/)；
- 数据库：[`MySQL`](https://www.mysql.com/)；
- ORM：[`Prisma`](https://www.prisma.io/)；
- 其他：`TypeScript` 和 `yarn`。

## 如何贡献

1. Fork 本仓库；
2. 安装 `yarn@1.22.22` 和 `node@20.10.0`；
3. 下载仓库并安装依赖；
   ```sh
   git clone <your_clone_repo>
   cd imperial-kitchen
   yarn install
   ```
4. 生成类型；
   ```sh
   yarn build:types
   ```
5. 启动移动端
   ```sh
   yarn dev:mobile
   ```
6. 安装并配置：[`mysql`](https://www.mysql.com/), [`nodemailer`](https://nodemailer.com/) and [`redis`](https://redis.io/try-free/)；
7. 配置服务端环境变量：将 **server/.env.example** 改名为 **server/.env**；
   ```sh
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
8. 启动移动端
   ```sh
   yarn dev:server
   ```
