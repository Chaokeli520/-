# 京西智谷茶语堂小程序 - 云开发部署指南

## 🚀 部署前准备

### 1. 环境要求

- **微信开发者工具** 1.05.2103200 或更高版本
- **基础库版本** 2.19.4 或更高版本
- **Node.js** 14.0.0 或更高版本
- **微信小程序账号** 并获取 AppID
- **云开发权限** 已开通云开发服务

### 2. 项目结构确认

```
chayutang-miniprogram/
├── app.js                    # 小程序入口文件
├── app.json                  # 小程序配置文件
├── app.wxss                  # 全局样式文件
├── project.config.json       # 项目配置文件
├── cloudfunctions/           # 云函数目录
│   ├── submitOrder/          # 订单提交云函数
│   ├── getUserInfo/          # 用户信息云函数
│   ├── getLotteryChance/     # 抽奖机会云函数
│   ├── saveLotteryRecord/    # 抽奖记录云函数
│   └── getOrderList/         # 订单列表云函数
├── database/                 # 数据库配置
│   ├── collections.json      # 集合权限配置
│   └── README.md            # 数据库设计说明
└── pages/                   # 页面目录
    ├── home/                # 首页
    ├── order/               # 点单页
    └── lottery/             # 抽奖页
```

## 🔧 步骤一：基础配置

### 1.1 修改项目配置

编辑 `project.config.json`：

```json
{
  "appid": "your-real-appid-here",
  "projectname": "chayutang-miniprogram",
  "cloudfunctionRoot": "cloudfunctions/"
}
```

### 1.2 配置云开发环境

编辑 `app.js`：

```javascript
wx.cloud.init({
  env: 'your-cloud-env-id', // 替换为你的云环境ID
  traceUser: true
})
```

## ☁️ 步骤二：云开发环境设置

### 2.1 创建云开发环境

1. 打开微信开发者工具
2. 点击工具栏的"云开发"按钮
3. 首次使用需要开通云开发服务
4. 创建新的云开发环境
5. 记录环境ID（格式如：`chayutang-xxx`）

### 2.2 配置环境变量

在云开发控制台中设置环境变量：

```
LOTTERY_DAILY_LIMIT=10        # 每日抽奖次数限制
PRIZE_EXPIRE_DAYS=30          # 奖品过期天数
ORDER_TIMEOUT_MINUTES=30      # 订单超时时间（分钟）
```

## 🗄️ 步骤三：数据库设置

### 3.1 创建数据库集合

在云开发控制台的"数据库"中创建以下集合：

1. **users** - 用户信息表
2. **orders** - 订单信息表
3. **lottery_chances** - 抽奖机会表
4. **lottery_records** - 抽奖记录表
5. **products** - 商品信息表
6. **categories** - 商品分类表

### 3.2 设置数据库权限

为每个集合设置权限（参考 `database/collections.json`）：

#### 用户相关表权限：
```javascript
{
  "read": "doc.openid == auth.openid",
  "write": "doc.openid == auth.openid"
}
```

#### 商品相关表权限：
```javascript
{
  "read": "true",
  "write": "false"
}
```

### 3.3 创建数据库索引

为提高查询性能，创建以下索引：

**users 集合：**
- `openid` (唯一索引)
- `level` (普通索引)

**orders 集合：**
- `openid` (普通索引)
- `status` (普通索引)
- `createTime` (降序索引)

**lottery_records 集合：**
- `openid` (普通索引)
- `createTime` (降序索引)
- `used` (普通索引)

### 3.4 初始化基础数据

#### 商品分类数据：
```javascript
// 在 categories 集合中添加
[
  {id: 1, name: '经典奶茶', sort: 1, status: 'active', createTime: new Date()},
  {id: 2, name: '水果茶', sort: 2, status: 'active', createTime: new Date()},
  {id: 3, name: '咖啡系列', sort: 3, status: 'active', createTime: new Date()},
  {id: 4, name: '特调饮品', sort: 4, status: 'active', createTime: new Date()}
]
```

#### 商品数据：
```javascript
// 在 products 集合中添加商品数据
// 可以通过管理端或直接在数据库中添加
```

## 🔧 步骤四：云函数部署

### 4.1 安装云函数依赖

为每个云函数安装依赖：

```bash
# 进入云函数目录
cd cloudfunctions/submitOrder
npm install

cd ../getUserInfo
npm install

cd ../getLotteryChance
npm install

cd ../saveLotteryRecord
npm install

cd ../getOrderList
npm install
```

### 4.2 部署云函数

在微信开发者工具中：

1. 右键点击 `cloudfunctions/submitOrder` 目录
2. 选择"上传并部署：云端安装依赖"
3. 等待部署完成

重复以上步骤部署所有云函数：
- submitOrder
- getUserInfo
- getLotteryChance
- saveLotteryRecord
- getOrderList

### 4.3 验证云函数

在云开发控制台的"云函数"中可以看到所有已部署的函数，状态为"正常"。

## 🔐 步骤五：权限配置

### 5.1 小程序权限设置

在微信公众平台的小程序管理后台：

1. 进入"设置" → "基本设置"
2. 设置服务器域名（如果使用外部API）
3. 配置业务域名（如果需要）

### 5.2 云开发权限设置

在云开发控制台中：

1. 确认环境访问权限
2. 设置资源配额
3. 配置告警规则

## 📱 步骤六：小程序端配置

### 6.1 更新小程序代码

确保小程序代码中正确调用云函数：

```javascript
// 示例：调用云函数
wx.cloud.callFunction({
  name: 'submitOrder',
  data: {
    cart: cartData,
    totalAmount: totalAmount
  },
  success: res => {
    console.log('订单提交成功', res)
  },
  fail: err => {
    console.error('订单提交失败', err)
  }
})
```

### 6.2 配置云开发SDK

在 `app.js` 中确保正确初始化：

```javascript
App({
  onLaunch: function () {
    // 初始化云开发
    wx.cloud.init({
      env: 'your-cloud-env-id',
      traceUser: true
    })
  }
})
```

## 🧪 步骤七：测试验证

### 7.1 功能测试

1. **用户注册登录**
   - 测试用户信息获取
   - 验证用户数据保存

2. **商品浏览**
   - 测试商品列表加载
   - 验证分类筛选

3. **订单功能**
   - 测试下单流程
   - 验证订单保存
   - 检查抽奖次数增加

4. **抽奖功能**
   - 测试抽奖转盘
   - 验证中奖记录
   - 检查奖品使用

### 7.2 性能测试

1. **并发测试**
   - 模拟多用户同时操作
   - 测试云函数性能

2. **数据库性能**
   - 检查查询响应时间
   - 验证索引效果

## 🚀 步骤八：上线发布

### 8.1 代码审核

1. 完成功能测试
2. 检查代码质量
3. 确认无安全漏洞

### 8.2 提交审核

1. 在微信开发者工具中点击"上传"
2. 填写版本号和项目备注
3. 在微信公众平台提交审核

### 8.3 发布版本

1. 审核通过后点击"发布"
2. 设置发布时间（可选）
3. 确认发布

## 📊 步骤九：监控与维护

### 9.1 监控配置

1. **云函数监控**
   - 设置调用量告警
   - 监控错误率
   - 查看性能指标

2. **数据库监控**
   - 监控存储容量
   - 查看读写次数
   - 设置容量告警

### 9.2 日志管理

1. 查看云函数日志
2. 分析错误日志
3. 设置日志保留时间

## 🔧 常见问题解决

### Q1: 云函数调用失败

**解决方案：**
1. 检查云函数是否正确部署
2. 确认环境ID是否正确
3. 查看云函数日志

### Q2: 数据库权限错误

**解决方案：**
1. 检查集合权限设置
2. 确认用户openid获取正确
3. 验证权限规则语法

### Q3: 小程序无法连接云开发

**解决方案：**
1. 检查AppID是否正确
2. 确认云开发环境是否开通
3. 验证基础库版本

## 📞 技术支持

如遇到问题，可以：

1. 查看微信云开发官方文档
2. 参考本项目的技术文档
3. 联系技术支持团队

---

## 🎯 部署检查清单

- [ ] 修改项目配置中的AppID
- [ ] 配置云开发环境ID
- [ ] 创建所有数据库集合
- [ ] 设置数据库权限
- [ ] 创建数据库索引
- [ ] 初始化基础数据
- [ ] 部署所有云函数
- [ ] 测试所有功能
- [ ] 性能测试通过
- [ ] 提交审核
- [ ] 发布上线
- [ ] 配置监控

**🎉 部署完成！您的茶语堂小程序已成功接入微信云开发！**