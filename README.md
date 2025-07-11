# 微信小程序项目

这是一个完整的微信小程序项目模板，包含了基本的项目结构和功能。

## 项目结构

```
├── app.js                 # 小程序主逻辑
├── app.json              # 小程序全局配置
├── app.wxss              # 小程序全局样式
├── project.config.json   # 项目配置文件
├── sitemap.json          # 站点地图配置
├── pages/                # 页面目录
│   ├── index/            # 首页
│   │   ├── index.js      # 页面逻辑
│   │   ├── index.json    # 页面配置
│   │   ├── index.wxml    # 页面结构
│   │   └── index.wxss    # 页面样式
│   └── logs/             # 日志页
│       ├── logs.js
│       ├── logs.json
│       ├── logs.wxml
│       └── logs.wxss
├── utils/                # 工具函数目录
│   └── util.js           # 工具函数
└── images/               # 图片资源目录
    └── README.md         # 图片资源说明
```

## 功能特性

- ✅ 用户信息获取和展示
- ✅ 页面跳转和导航
- ✅ 本地存储和日志记录
- ✅ 下拉刷新功能
- ✅ 分享功能
- ✅ Toast 提示
- ✅ Modal 弹窗
- ✅ 底部导航栏

## 开始使用

1. **获取小程序 AppID**
   - 在微信公众平台注册小程序账号
   - 获取 AppID 并替换 `project.config.json` 中的 `"your-appid-here"`

2. **添加图标资源**
   - 在 `images/` 目录下添加所需的图标文件
   - 具体要求请查看 `images/README.md`

3. **导入项目**
   - 打开微信开发者工具
   - 选择"导入项目"
   - 选择当前项目目录
   - 填入 AppID

4. **预览和调试**
   - 在微信开发者工具中预览效果
   - 使用真机调试功能测试

## 主要文件说明

### app.js
小程序的入口文件，包含：
- 应用生命周期函数
- 全局数据管理
- 用户登录逻辑

### app.json
小程序的全局配置，包含：
- 页面路径配置
- 窗口表现配置
- 底部导航栏配置

### pages/index/
首页相关文件，功能包括：
- 用户信息展示
- 基本功能演示
- 页面导航

### pages/logs/
日志页相关文件，功能包括：
- 启动日志展示
- 日志清空功能
- 下拉刷新

### utils/util.js
工具函数库，包含：
- 时间格式化
- 防抖节流函数
- 深拷贝函数

## 开发注意事项

1. **AppID 配置**：使用前必须配置正确的 AppID
2. **图标资源**：需要添加底部导航栏所需的图标文件
3. **域名配置**：如有网络请求，需在后台配置合法域名
4. **版本兼容**：当前基础库版本要求 2.19.4 以上

## 扩展功能

您可以基于此模板继续添加：
- 更多页面和功能
- 网络请求和数据交互
- 自定义组件
- 第三方库集成
- 云开发功能

## 相关文档

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [小程序设计指南](https://developers.weixin.qq.com/miniprogram/design/)
