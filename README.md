# 御膳房

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=white&logoColor=000)](https://expo.dev/client) [![NestJS](https://img.shields.io/badge/NestJS-E0234E.svg?style=flat-square&logo=NestJS&labelColor=white&logoColor=E0234E)](https://nestjs.com/) [![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?style=flat-square&logo=Prisma&labelColor=white&logoColor=2D3748)](https://www.prisma.io/) [![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?style=flat-square&logo=MySQL&labelColor=white&logoColor=4479A1)](https://www.mysql.com/) [![Redis](https://img.shields.io/badge/Redis-DC382D.svg?style=flat-square&logo=Redis&labelColor=white&logoColor=DC382D)](https://redis.io/)

[English Version](README_EN.md)

一个家庭厨房的点餐应用。

## 特性

- [x] 认证：JWT 登录、注册、登出。
- [x] 多语言支持、主题色、主题模式。
- [ ] 浏览菜单：查看所有食物及其详情，包括图片、描述和价格。
- [ ] 点餐：选择食物并添加到购物车。
- [ ] 菜谱：支持生成菜谱。
- [ ] 个人中心：查看个人信息、订单历史、虚拟货币。
- [ ] AI 助手：询问菜单相关问题。

## 开发

开发 Expo 应用前，请先阅读 [开发工具](https://docs.expo.dev/develop/tools/)。

1. Fork 本仓库；
2. 安装 `yarn@1.22.22` 和 `node@20.10.0`；
3. 下载仓库并安装依赖；
   ```sh
   git clone <your_clone_repo>
   cd imperial-kitchen
   yarn install
   ```
4. 安装并配置：[`mysql`](https://www.mysql.com/), [`nodemailer`](https://nodemailer.com/) and [`redis`](https://redis.io/try-free/)；
   > [!NOTE]
   > 若你使用 [`docker`](https://www.docker.com/) 启动服务端，可以跳过配置 `mysql` 和 `redis`。
5. 配置服务端环境变量：将 **server/.env.example** 改名为 **server/.env**；

   ```sh
   # PORT=8000
   # DB_URL="mysql://root:root@host.docker.internal:3307/imperial_kitchen"

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
   > 若使用 `docker` 启动服务端，出现 `Can't reach database server at host.docker.internal:3307` 报错，请检查 host 配置。
   > 在配置文件中增加 `127.0.0.1 host.docker.internal` 。

6. 启动服务端，并访问 [api-docs](http://localhost:8000/api-docs) 查看 API 文档。
   ```sh
   yarn dev:server
   ```
   或使用 docker 启动服务端：
   ```sh
   yarn docker:dev
   ```
   如果你是首次启动，请执行 `yarn seed` 创建初始化数据。你可以通过 `yarn studio` 启动 `prisma studio` 查看数据库。
7. 启动移动端
   修改 **apps/mobile/.env.example** 为 **apps/mobile/.env**，并修改 **EXPO_PUBLIC_BASE_URL** 为服务端地址，然后启动移动端：
   ```sh
   yarn dev:mobile
   ```
