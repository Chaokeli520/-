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
    const { cart, totalAmount, userInfo, remark = '' } = event
    
    // 验证参数
    if (!cart || cart.length === 0) {
      return {
        success: false,
        error: '购物车为空'
      }
    }
    
    if (!totalAmount || totalAmount <= 0) {
      return {
        success: false,
        error: '订单金额无效'
      }
    }
    
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
      remark,
      status: 'pending', // pending, confirmed, preparing, ready, completed, cancelled
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
      lotteryCount: 1, // 每个订单给1次抽奖机会
      source: 'order', // 来源：订单
      createTime: new Date()
    }
    
    await db.collection('lottery_chances').add({
      data: lotteryData
    })
    
    // 更新用户统计信息
    try {
      const userResult = await db.collection('users').where({
        openid: wxContext.OPENID
      }).get()
      
      if (userResult.data.length > 0) {
        const user = userResult.data[0]
        await db.collection('users').doc(user._id).update({
          data: {
            totalOrderCount: (user.totalOrderCount || 0) + 1,
            totalSpent: (user.totalSpent || 0) + totalAmount,
            lotteryCount: (user.lotteryCount || 0) + 1,
            updateTime: new Date()
          }
        })
      } else {
        // 如果用户不存在，先创建用户记录
        await cloud.callFunction({
          name: 'getUserInfo',
          data: { userInfo }
        })
        
        // 然后更新统计信息
        const newUserResult = await db.collection('users').where({
          openid: wxContext.OPENID
        }).get()
        
        if (newUserResult.data.length > 0) {
          const newUser = newUserResult.data[0]
          await db.collection('users').doc(newUser._id).update({
            data: {
              totalOrderCount: 1,
              totalSpent: totalAmount,
              lotteryCount: 1,
              updateTime: new Date()
            }
          })
        }
      }
    } catch (userUpdateErr) {
      console.warn('更新用户统计信息失败:', userUpdateErr)
    }
    
    // 发送订单确认模板消息
    try {
      await cloud.openapi.subscribeMessage.send({
        touser: wxContext.OPENID,
        templateId: 'order_confirm_template_id', // 需要在微信公众平台配置
        page: 'pages/order/order',
        data: {
          orderNo: {
            value: orderNo
          },
          totalAmount: {
            value: `¥${totalAmount}`
          },
          orderTime: {
            value: new Date().toLocaleString()
          },
          status: {
            value: '待确认'
          },
          tips: {
            value: '订单提交成功，获得1次抽奖机会！'
          }
        }
      })
    } catch (msgErr) {
      console.warn('发送模板消息失败:', msgErr)
    }
    
    return {
      success: true,
      data: {
        orderId: result._id,
        orderNo,
        totalAmount,
        lotteryCount: 1,
        message: '订单提交成功，获得1次抽奖机会！'
      }
    }
    
  } catch (err) {
    console.error('订单提交失败:', err)
    return {
      success: false,
      error: err.message || '订单提交失败'
    }
  }
}