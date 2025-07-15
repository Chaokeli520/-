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
    const { userInfo } = event
    
    // 查询用户是否已存在
    const userResult = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()
    
    if (userResult.data.length === 0) {
      // 新用户，创建用户记录
      const userData = {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        userInfo: userInfo,
        lotteryCount: 0, // 初始抽奖次数
        totalOrderCount: 0, // 总订单数
        totalSpent: 0, // 总消费金额
        level: 'bronze', // 用户等级：bronze, silver, gold, platinum
        createTime: new Date(),
        updateTime: new Date(),
        lastLoginTime: new Date()
      }
      
      await db.collection('users').add({
        data: userData
      })
      
      return {
        success: true,
        data: userData,
        message: '用户信息创建成功'
      }
    } else {
      // 现有用户，更新登录时间和用户信息
      const existingUser = userResult.data[0]
      await db.collection('users').doc(existingUser._id).update({
        data: {
          userInfo: userInfo,
          lastLoginTime: new Date(),
          updateTime: new Date()
        }
      })
      
      return {
        success: true,
        data: existingUser,
        message: '用户信息更新成功'
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