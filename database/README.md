# 微信云开发数据库设计

## 📊 数据库概览

京西智谷茶语堂小程序使用微信云开发的云数据库，采用 NoSQL 文档数据库。

## 🗂️ 数据表结构

### 1. users（用户信息表）

用户的基本信息和统计数据。

```javascript
{
  _id: String,              // 系统自动生成的文档ID
  openid: String,           // 微信用户唯一标识
  appid: String,            // 小程序AppID
  unionid: String,          // 微信开放平台唯一标识
  userInfo: Object,         // 用户基本信息
  lotteryCount: Number,     // 剩余抽奖次数
  totalOrderCount: Number,  // 总订单数量
  totalSpent: Number,       // 总消费金额
  totalLotteryCount: Number, // 总抽奖次数
  level: String,            // 用户等级：bronze, silver, gold, platinum
  createTime: Date,         // 创建时间
  updateTime: Date,         // 更新时间
  lastLoginTime: Date       // 最后登录时间
}
```

### 2. orders（订单信息表）

用户的订单记录。

```javascript
{
  _id: String,              // 系统自动生成的文档ID
  orderNo: String,          // 订单号
  openid: String,           // 下单用户的openid
  appid: String,            // 小程序AppID
  unionid: String,          // 微信开放平台唯一标识
  cart: Array,              // 购物车商品列表
  totalAmount: Number,      // 订单总金额
  userInfo: Object,         // 下单时的用户信息
  status: String,           // 订单状态：pending, confirmed, preparing, ready, completed, cancelled
  createTime: Date,         // 创建时间
  updateTime: Date,         // 更新时间
  remark: String            // 订单备注
}
```

### 3. lottery_chances（抽奖机会表）

用户获得抽奖机会的记录。

```javascript
{
  _id: String,              // 系统自动生成的文档ID
  openid: String,           // 用户openid
  orderNo: String,          // 关联的订单号
  lotteryCount: Number,     // 获得的抽奖次数
  createTime: Date,         // 创建时间
  source: String            // 来源：order（订单），share（分享），event（活动）
}
```

### 4. lottery_records（抽奖记录表）

用户的抽奖历史记录。

```javascript
{
  _id: String,              // 系统自动生成的文档ID
  openid: String,           // 用户openid
  prizeId: Number,          // 奖品ID
  prizeName: String,        // 奖品名称
  prizeIcon: String,        // 奖品图标
  prizeType: String,        // 奖品类型：reward（有奖品），none（谢谢参与）
  wheelAngle: Number,       // 转盘角度
  used: Boolean,            // 是否已使用
  createTime: Date,         // 创建时间
  expireTime: Date,         // 过期时间
  useTime: Date             // 使用时间
}
```

### 5. products（商品信息表）

茶饮商品的基本信息。

```javascript
{
  _id: String,              // 系统自动生成的文档ID
  id: Number,               // 商品ID
  categoryId: Number,       // 分类ID
  name: String,             // 商品名称
  description: String,      // 商品描述
  price: Number,            // 商品价格
  image: String,            // 商品图片URL
  hot: Boolean,             // 是否热销
  status: String,           // 商品状态：active（上架），inactive（下架）
  sort: Number,             // 排序权重
  createTime: Date,         // 创建时间
  updateTime: Date          // 更新时间
}
```

### 6. categories（商品分类表）

茶饮商品的分类信息。

```javascript
{
  _id: String,              // 系统自动生成的文档ID
  id: Number,               // 分类ID
  name: String,             // 分类名称
  icon: String,             // 分类图标
  sort: Number,             // 排序权重
  status: String,           // 分类状态：active（启用），inactive（禁用）
  createTime: Date,         // 创建时间
  updateTime: Date          // 更新时间
}
```

## 🔒 数据库权限设置

### 权限规则

1. **用户数据**：只能读写自己的数据（openid 匹配）
2. **商品数据**：所有用户只读
3. **订单数据**：只能读写自己的订单
4. **抽奖数据**：只能读写自己的抽奖记录

### 安全规则示例

```javascript
// 用户表权限
{
  "read": "doc.openid == auth.openid",
  "write": "doc.openid == auth.openid"
}

// 商品表权限
{
  "read": "true",
  "write": "false"
}
```

## 📈 索引设计

### 主要索引

1. **用户表**
   - `openid` (唯一索引)
   - `level` (普通索引)

2. **订单表**
   - `openid` (普通索引)
   - `status` (普通索引)
   - `createTime` (降序索引)

3. **抽奖记录表**
   - `openid` (普通索引)
   - `createTime` (降序索引)
   - `used` (普通索引)

4. **商品表**
   - `categoryId` (普通索引)
   - `hot` (普通索引)

## 🚀 数据初始化

### 1. 商品分类数据

```javascript
// 需要在云数据库中手动添加
[
  {id: 1, name: '经典奶茶', sort: 1, status: 'active'},
  {id: 2, name: '水果茶', sort: 2, status: 'active'},
  {id: 3, name: '咖啡系列', sort: 3, status: 'active'},
  {id: 4, name: '特调饮品', sort: 4, status: 'active'}
]
```

### 2. 商品数据

```javascript
// 需要在云数据库中手动添加商品数据
// 或者通过管理端小程序进行添加
```

## 🛠️ 部署步骤

### 1. 创建云数据库

1. 在微信开发者工具中打开云开发控制台
2. 点击"数据库" → "新建集合"
3. 按照上述结构创建各个集合

### 2. 设置权限

1. 在云开发控制台中，为每个集合设置权限
2. 复制 `collections.json` 中的权限规则
3. 应用到对应的集合

### 3. 创建索引

1. 在集合管理页面点击"索引"
2. 根据 `collections.json` 中的索引配置创建索引
3. 提升查询性能

### 4. 初始化数据

1. 手动添加商品分类数据
2. 添加商品基础数据
3. 测试数据库连接和权限

## 💡 使用建议

1. **定期备份**：建议定期备份重要数据
2. **监控容量**：关注数据库容量和并发限制
3. **优化查询**：合理使用索引，避免全表扫描
4. **数据清理**：定期清理过期的抽奖记录和临时数据

---

📞 **如有问题，请参考微信云开发官方文档或联系技术支持**