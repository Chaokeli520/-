# 微信小程序项目

这是一个完整的微信小程序项目模板，包含了小程序开发所需的所有基础文件和功能。

## 项目结构

```
.
├── app.js                 # 小程序主入口文件
├── app.json               # 小程序全局配置
├── app.wxss               # 小程序全局样式
├── sitemap.json           # 搜索优化配置
├── project.config.json    # 开发者工具项目配置
├── pages/                 # 页面目录
│   ├── index/             # 首页
│   │   ├── index.js       # 页面逻辑
│   │   ├── index.wxml     # 页面结构
│   │   ├── index.wxss     # 页面样式
│   │   └── index.json     # 页面配置
│   └── logs/              # 日志页
│       ├── logs.js        # 页面逻辑
│       ├── logs.wxml      # 页面结构
│       ├── logs.wxss      # 页面样式
│       └── logs.json      # 页面配置
├── utils/                 # 工具函数目录
│   └── util.js            # 通用工具函数
└── images/                # 图片资源目录
    └── README.md          # 图片资源说明
```

## 功能特性

### 已实现功能
- ✅ 用户信息获取和展示
- ✅ 页面导航和路由
- ✅ 本地存储（日志记录）
- ✅ 消息提示和模态框
- ✅ 底部导航栏（TabBar）
- ✅ 响应式布局设计
- ✅ 工具函数库

### 主要页面
1. **首页（index）**
   - 用户头像和昵称展示
   - 基础功能演示按钮
   - 现代化UI设计

2. **日志页（logs）**
   - 应用使用日志展示
   - 日志清空功能
   - 返回导航功能

## 开始使用

### 1. 导入项目
1. 打开微信开发者工具
2. 选择"导入项目"
3. 选择本项目目录
4. 填入您的AppID（或选择测试号）

### 2. 配置AppID
编辑 `project.config.json` 文件，将 `"your-app-id-here"` 替换为您的真实AppID：
```json
{
  "appid": "your-real-app-id",
  ...
}
```

### 3. 添加图标（可选）
如需使用TabBar功能，请在 `images/` 目录下添加以下图标文件：
- `icon_component.png` - 首页图标（未选中）
- `icon_component_HL.png` - 首页图标（选中）
- `icon_API.png` - 日志页图标（未选中）
- `icon_API_HL.png` - 日志页图标（选中）

### 4. 编译运行
点击微信开发者工具的"编译"按钮即可运行项目。

## 开发指南

### 添加新页面
1. 在 `pages/` 目录下创建新的页面文件夹
2. 创建对应的 `.js`、`.wxml`、`.wxss`、`.json` 文件
3. 在 `app.json` 的 `pages` 数组中添加页面路径

### 使用工具函数
```javascript
const util = require('../../utils/util.js')

// 格式化时间
const formattedTime = util.formatTime(new Date())

// 防抖函数
const debouncedFunc = util.debounce(myFunction, 300)
```

### 样式规范
- 使用 `rpx` 作为尺寸单位（响应式像素）
- 遵循微信小程序设计规范
- 使用提供的公共样式类

## 技术栈

- **框架**: 微信小程序原生框架
- **样式**: WXSS（类似CSS）
- **逻辑**: JavaScript ES6+
- **构建工具**: 微信开发者工具

## 注意事项

1. **网络请求**: 需要在微信公众平台配置服务器域名
2. **用户授权**: 获取用户信息需要用户主动授权
3. **版本兼容**: 建议使用基础库版本 2.10.0 以上
4. **真机测试**: 开发完成后务必在真机上测试

## 扩展建议

- 添加更多页面和功能模块
- 集成后端API服务
- 添加数据埋点和分析
- 实现用户登录和状态管理
- 添加支付功能（如需要）

## 问题反馈

如果在使用过程中遇到问题，可以：
1. 查看微信小程序官方文档
2. 检查开发者工具控制台错误信息
3. 确认网络和权限配置是否正确

## 许可证

本项目仅供学习和参考使用。
