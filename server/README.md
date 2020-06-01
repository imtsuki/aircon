# aircon backend

## Running the app

先安装 Node.js 长期支持版: [https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)

然后安装 Yarn 包管理器：[https://classic.yarnpkg.com/zh-Hans/docs/install#windows-stable](https://classic.yarnpkg.com/zh-Hans/docs/install#windows-stable)

然后在该目录运行：

```bash
yarn install
```

最后启动后端服务器：

```bash
# watch mode
$ yarn start:dev
```

然后可在 [http://127.0.0.1:3000/api/](http://127.0.0.1:3000/api/) 查看所有 API 接口。

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
