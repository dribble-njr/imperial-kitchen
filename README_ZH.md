# 御膳房

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

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

## 贡献

开发 Expo 应用前，请先阅读 [开发工具](https://docs.expo.dev/develop/tools/)。

1. Fork 本仓库；
2. 安装 `yarn@1.22.22` 和 `node@20.10.0`；
3. 下载仓库并安装依赖；
   ```sh
   git clone <your_clone_repo>
   cd imperial-kitchen
   yarn install
   ```
4. 启动移动端
   ```sh
   yarn dev:mobile
   ```
5. 安装并配置：[`mysql`](https://www.mysql.com/), [`nodemailer`](https://nodemailer.com/) and [`redis`](https://redis.io/try-free/)；
   > [!NOTE]
   > 已提供 redis 配置，你也可以自行配置。
   > 
   > 若你使用 [`docker`](https://www.docker.com/) 启动服务端，可以跳过配置 `mysql`。
6. 配置服务端环境变量：将 **server/.env.example** 改名为 **server/.env**；
   ```sh
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
7. 启动服务端，并访问 [api-docs](http://localhost:8000/api-docs) 查看 API 文档。
   ```sh
   yarn dev:server
   ```
   或使用 docker 启动服务端：
   ```sh
   yarn docker:dev
   ```
