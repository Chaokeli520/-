# 京西智谷茶语堂小程序 - 贡献指南

## 🌟 欢迎贡献

感谢您对京西智谷茶语堂小程序项目的关注！本文档将指导您如何参与项目开发。

## 📋 开发流程

### 1. 分支策略

我们采用 Git Flow 分支管理策略：

- **master** - 主分支，存放稳定的生产版本
- **develop** - 开发分支，用于集成新功能
- **feature/** - 功能分支，开发新功能时使用
- **hotfix/** - 热修复分支，紧急修复生产问题
- **release/** - 发布分支，准备发布版本

### 2. 工作流程

```bash
# 1. 从 develop 分支创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. 开发完成后提交代码
git add .
git commit -m "feat: 新增功能描述"

# 3. 推送到远程分支
git push origin feature/your-feature-name

# 4. 创建 Pull Request 到 develop 分支
```

## 📝 提交规范

### 提交信息格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型（type）

- **feat**: 新功能
- **fix**: 修复bug
- **docs**: 文档更新
- **style**: 代码格式化（不影响代码运行的变动）
- **refactor**: 重构（既不是新增功能，也不是修改bug的代码变动）
- **test**: 增加测试
- **chore**: 构建过程或辅助工具的变动
- **perf**: 性能优化
- **ui**: 界面相关更新

### 范围（scope）

- **home**: 首页相关
- **order**: 点单功能
- **lottery**: 抽奖功能
- **cloud**: 云开发相关
- **config**: 配置文件
- **utils**: 工具函数
- **ui**: 界面组件

### 提交示例

```bash
# 新增功能
git commit -m "feat(order): 新增购物车数量显示功能"

# 修复问题
git commit -m "fix(lottery): 修复转盘动画卡顿问题"

# 界面优化
git commit -m "ui(home): 优化企业介绍页面布局"

# 文档更新
git commit -m "docs: 更新部署说明文档"
```

## 🚀 开发环境设置

### 1. 克隆项目

```bash
git clone [项目地址]
cd chayutang-miniprogram
```

### 2. 安装依赖

```bash
# 如果有 package.json
npm install

# 云函数依赖
cd cloudfunctions/submitOrder
npm install
```

### 3. 环境配置

1. 修改 `project.config.json` 中的 `appid`
2. 配置云开发环境ID
3. 上传云函数到云端

## 🧪 代码质量

### 1. 代码风格

- 使用 2 个空格缩进
- 使用单引号
- 文件末尾保留空行
- 删除尾随空格

### 2. 命名规范

- **文件名**: 使用小写字母，单词间用连字符分隔
- **变量名**: 使用驼峰命名法
- **常量名**: 使用大写字母，单词间用下划线分隔
- **函数名**: 使用驼峰命名法，动词开头

### 3. 代码审查

所有代码提交前必须：
- 自测功能正常
- 代码格式规范
- 添加必要注释
- 更新相关文档

## 🐛 问题报告

### 提交 Issue 时请包含：

1. **问题描述**: 清晰描述遇到的问题
2. **重现步骤**: 详细的操作步骤
3. **预期行为**: 期望的正确行为
4. **实际行为**: 实际发生的情况
5. **环境信息**: 操作系统、微信版本、开发工具版本
6. **截图**: 如果有界面问题，请提供截图

### Issue 模板

```markdown
## 问题描述
[简要描述问题]

## 重现步骤
1. 打开...
2. 点击...
3. 滚动到...
4. 看到错误...

## 预期行为
[描述期望的行为]

## 实际行为
[描述实际发生的情况]

## 环境信息
- 操作系统: [例如 iOS 14.5]
- 微信版本: [例如 8.0.7]
- 开发工具版本: [例如 1.05.2103200]

## 截图
[如果适用，请添加截图]
```

## 📚 开发规范

### 1. 文件结构

```
页面目录结构：
pages/
├── home/
│   ├── home.js      # 页面逻辑
│   ├── home.json    # 页面配置
│   ├── home.wxml    # 页面结构
│   └── home.wxss    # 页面样式
```

### 2. 函数规范

```javascript
/**
 * 函数描述
 * @param {Type} param1 - 参数1描述
 * @param {Type} param2 - 参数2描述
 * @returns {Type} 返回值描述
 */
function functionName(param1, param2) {
  // 函数实现
}
```

### 3. 样式规范

```css
/* 使用 BEM 命名规范 */
.block {}
.block__element {}
.block--modifier {}

/* 示例 */
.product-card {}
.product-card__image {}
.product-card--featured {}
```

## 🎯 功能开发指南

### 1. 新增页面

1. 在 `pages/` 目录创建页面文件夹
2. 创建必要的四个文件（.js, .json, .wxml, .wxss）
3. 在 `app.json` 中注册页面路径
4. 编写页面逻辑和样式

### 2. 新增组件

1. 在 `components/` 目录创建组件文件夹
2. 创建组件文件并编写逻辑
3. 在使用页面的 .json 中引入组件
4. 在 .wxml 中使用组件

### 3. 云函数开发

1. 在 `cloudfunctions/` 目录创建函数文件夹
2. 编写 `index.js` 和 `package.json`
3. 在开发工具中上传并部署
4. 在小程序中调用测试

## 📖 文档更新

当您的更改影响以下内容时，请更新相应文档：

- **README.md**: 项目概述、快速开始
- **API文档**: 新增或修改的接口
- **用户手册**: 功能使用说明
- **开发文档**: 技术实现细节

## 🤝 联系我们

如有任何问题或建议，请通过以下方式联系：

- 📧 邮箱: developer@chayutang.com
- 💬 微信群: [群二维码]
- 🐛 问题反馈: [Issue页面]

---

**感谢您的贡献！** 🍵✨