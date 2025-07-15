// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 使用当前云环境
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  
  try {
    const { cart, totalAmount, userInfo } = event
    
    // 生成订单号
    const orderNo = `CYT${Date.now()}${Math.floor(Math.random() * 1000)}`
    
    // 订单数据
    const orderData = {
      orderNo,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      cart,
      totalAmount,
      userInfo,
      status: 'pending', // pending, confirmed, completed, cancelled
      createTime: new Date(),
      updateTime: new Date()
    }
    
    // 保存订单到数据库
    const result = await db.collection('orders').add({
      data: orderData
    })
    
    // 增加用户抽奖次数
    const lotteryData = {
      openid: wxContext.OPENID,
      orderNo,
      lotteryCount: 1,
      createTime: new Date()
    }
    
    await db.collection('lottery_chances').add({
      data: lotteryData
    })
    
    return {
      success: true,
      data: {
        orderId: result._id,
        orderNo,
        message: '订单提交成功'
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