mock-server/
├── server.js # 主服务入口
├── api/
│ ├── accounts/ # 账户模块
│ │ ├── mock-data.js # 账户相关接口的模拟数据
│ │ ├── swagger.yaml # OpenAPI 规范文件
│ │ └── index.js # 账户模块路由
│ ├── users/ # 用户模块
│ │ ├── mock-data.js # 用户相关接口的模拟数据
│ │ ├── swagger.yaml # OpenAPI 规范文件
│ │ └── index.js # 用户模块路由
│ └── index.js # 聚合所有模块路由
├── package.json # 依赖配置
└── README.md # 使用说明
