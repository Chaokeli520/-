// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  try {
    const { page = 1, pageSize = 10, status = 'all' } = event
    
    // 构建查询条件
    let whereCondition = {
      openid: wxContext.OPENID
    }
    
    if (status !== 'all') {
      whereCondition.status = status
    }
    
    // 获取总数
    const countResult = await db.collection('orders').where(whereCondition).count()
    const total = countResult.total
    
    // 获取订单列表
    const ordersResult = await db.collection('orders')
      .where(whereCondition)
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    // 处理订单数据
    const orders = ordersResult.data.map(order => ({
      ...order,
      createTime: order.createTime,
      updateTime: order.updateTime,
      statusText: getStatusText(order.status)
    }))
    
    // 获取用户统计信息
    const userResult = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()
    
    let userStats = {}
    if (userResult.data.length > 0) {
      const user = userResult.data[0]
      userStats = {
        totalOrderCount: user.totalOrderCount || 0,
        totalSpent: user.totalSpent || 0,
        level: user.level || 'bronze',
        lotteryCount: user.lotteryCount || 0
      }
    }
    
    return {
      success: true,
      data: {
        orders,
        pagination: {
          page,
          pageSize,
          total,
          pages: Math.ceil(total / pageSize)
        },
        userStats
      }
    }
    
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err.message
    }
  }
}

// 获取订单状态文本
function getStatusText(status) {
  const statusMap = {
    'pending': '待确认',
    'confirmed': '已确认',
    'preparing': '制作中',
    'ready': '待取餐',
    'completed': '已完成',
    'cancelled': '已取消'
  }
  return statusMap[status] || '未知状态'
}