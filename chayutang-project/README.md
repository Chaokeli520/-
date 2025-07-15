# 京西智谷茶语堂微信小程序

一个基于微信云开发的奶茶点单小程序，专为京西智谷园区内的茶语堂茶饮店开发。集成了企业宣传、在线点单和抽奖活动三大核心功能。

![小程序截图](https://via.placeholder.com/800x400/8B4513/FFFFFF?text=京西智谷茶语堂小程序)

## ✨ 功能特色

### 🏢 企业宣传展示
- **公司介绍**：展示北京昇腾科技有限公司的企业信息
- **园区展示**：京西智谷科技园区环境宣传
- **企业特色**：核心优势和发展理念展示
- **联系方式**：一键拨打电话、复制邮箱地址等

### 🍵 在线点单系统
- **商品分类**：经典奶茶、水果茶、咖啡系列、特调饮品
- **商品展示**：精美的商品图片和详细描述
- **购物车功能**：添加、修改、删除商品
- **订单提交**：完整的下单流程

### 🎰 抽奖活动
- **转盘抽奖**：炫酷的转盘动画效果
- **多种奖品**：免费奶茶、优惠券、精美茶具等
- **抽奖记录**：完整的中奖历史记录
- **奖品管理**：奖品使用状态跟踪

## 📱 技术架构

- **前端框架**：微信小程序原生开发
- **后端服务**：微信云开发
- **数据存储**：云数据库
- **文件存储**：云存储
- **服务端逻辑**：云函数

## 🚀 快速开始

### 环境准备

1. **微信开发者工具**
   - 下载并安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
   - 版本要求：1.05.2102040 或更高

2. **小程序账号**
   - 注册微信小程序账号
   - 获取 AppID

3. **云开发环境**
   - 开通微信云开发服务
   - 创建云开发环境

### 部署步骤

1. **克隆项目**
   ```bash
   git clone [项目地址]
   cd chayutang-miniprogram
   ```

2. **配置项目**
   - 修改 `project.config.json` 中的 `appid` 为你的小程序 AppID
   - 修改 `app.js` 中的云开发环境 ID

3. **上传云函数**
   - 在微信开发者工具中右键 `cloudfunctions/submitOrder` 目录
   - 选择"上传并部署：云端安装依赖"

4. **初始化数据库**
   - 在云开发控制台创建以下集合：
     - `orders`：订单数据
     - `lottery_chances`：抽奖机会记录

5. **添加图片资源**
   - 将所需的图标文件放入 `images/` 目录
   - 参考 `images/README.md` 中的说明

6. **预览和发布**
   - 在微信开发者工具中点击"预览"
   - 测试各项功能正常后提交审核

## 📂 项目结构

```
chayutang-miniprogram/
├── app.js                 # 小程序入口文件
├── app.json              # 小程序配置文件
├── app.wxss              # 全局样式文件
├── project.config.json   # 项目配置文件
├── sitemap.json          # 站点地图配置
├── cloudfunctions/       # 云函数目录
│   └── submitOrder/      # 订单提交云函数
├── images/               # 图片资源目录
├── pages/                # 页面目录
│   ├── home/            # 首页（企业宣传）
│   │   ├── home.js
│   │   ├── home.json
│   │   ├── home.wxml
│   │   └── home.wxss
│   ├── order/           # 点单页面
│   │   ├── order.js
│   │   ├── order.json
│   │   ├── order.wxml
│   │   └── order.wxss
│   └── lottery/         # 抽奖页面
│       ├── lottery.js
│       ├── lottery.json
│       ├── lottery.wxml
│       └── lottery.wxss
└── utils/               # 工具函数目录
```

## 🎨 UI设计

### 设计风格
- **主色调**：深棕色 (#8B4513) 和橙棕色 (#D2691E)
- **背景色**：米色渐变 (#FFF8DC 到 #F5DEB3)
- **设计理念**：温馨、典雅的茶文化主题

### 交互特效
- 轮播图自动切换
- 转盘旋转动画
- 模态框弹出动画
- 按钮点击反馈效果

## 🔧 配置说明

### 关键配置项

1. **app.js 配置**
   ```javascript
   wx.cloud.init({
     env: 'your-env-id', // 替换为你的云环境ID
     traceUser: true
   })
   ```

2. **分类管理**
   - 在 `pages/order/order.js` 中修改 `categories` 数组
   - 在 `products` 数组中添加或修改商品信息

3. **奖品配置**
   - 在 `pages/lottery/lottery.js` 中修改 `prizes` 数组
   - 调整各奖品的中奖概率

## 📊 数据库设计

### orders 集合
```javascript
{
  _id: String,           // 订单ID
  orderNo: String,       // 订单号
  openid: String,        // 用户openid
  cart: Array,           // 购物车商品
  totalAmount: Number,   // 订单总金额
  status: String,        // 订单状态
  createTime: Date,      // 创建时间
  updateTime: Date       // 更新时间
}
```

### lottery_chances 集合
```javascript
{
  _id: String,           // 记录ID
  openid: String,        // 用户openid
  orderNo: String,       // 关联订单号
  lotteryCount: Number,  // 获得抽奖次数
  createTime: Date       // 创建时间
}
```

## 🎯 使用流程

1. **企业了解**：用户打开小程序，浏览企业介绍和园区信息
2. **选择商品**：切换到点单页面，浏览并选择心仪的茶饮
3. **加入购物车**：点击加号按钮将商品添加到购物车
4. **提交订单**：确认订单信息并提交，获得抽奖机会
5. **参与抽奖**：前往抽奖页面，消耗抽奖次数参与转盘抽奖
6. **奖品使用**：查看中奖记录，到店出示使用奖品

## 🛠️ 开发指南

### 新增商品
1. 在 `pages/order/order.js` 的 `products` 数组中添加商品对象
2. 设置正确的 `categoryId` 以匹配分类
3. 准备对应的商品图片

### 新增奖品
1. 在 `pages/lottery/lottery.js` 的 `prizes` 数组中添加奖品对象
2. 设置合适的中奖概率（所有概率之和应为1）
3. 调整转盘扇形的颜色搭配

### 样式定制
- 修改 `app.wxss` 中的全局样式变量
- 在各页面的 `.wxss` 文件中调整具体样式
- 保持统一的设计风格和色彩搭配

## 📱 兼容性

- **微信版本**：6.6.3 或以上
- **基础库版本**：2.2.3 或以上
- **系统支持**：iOS 9.0+, Android 4.4+

## 🚨 注意事项

1. **图片资源**：确保所有引用的图片都已上传到对应目录
2. **云函数**：首次部署时需要上传并安装云函数依赖
3. **权限配置**：确保云数据库权限设置正确
4. **测试账号**：发布前请使用多个测试账号验证功能

## 📞 技术支持

如有技术问题或功能需求，请联系：
- **开发团队**：[开发者邮箱]
- **技术文档**：[文档链接]
- **问题反馈**：[Issue链接]

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

---

**京西智谷茶语堂** - 科技与茶香的完美融合 ☕️
