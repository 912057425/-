# -
一些个人的项目（前台+后台）

## 配置环境变量

将`.env.example`文件拷贝为`.env`文件，并修改配置。

\```txt
NODE_ENV=development
PORT=3000
SECRET=你的秘钥
\```

- `NODE_ENV`配置为开发环境，如部署在生产环境可改为`production`。
- `PORT`配置为服务端口
- `SECRET`配置为秘钥。
