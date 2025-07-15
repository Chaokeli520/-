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
    // 获取用户信息
    const userResult = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()
    
    if (userResult.data.length === 0) {
      return {
        success: false,
        error: '用户不存在'
      }
    }
    
    const user = userResult.data[0]
    
    // 获取用户的抽奖记录
    const lotteryResult = await db.collection('lottery_chances').where({
      openid: wxContext.OPENID
    }).get()
    
    // 计算总获得的抽奖次数
    let totalEarnedChances = 0
    lotteryResult.data.forEach(record => {
      totalEarnedChances += record.lotteryCount
    })
    
    // 获取用户的抽奖使用记录
    const usedLotteryResult = await db.collection('lottery_records').where({
      openid: wxContext.OPENID
    }).get()
    
    const usedChances = usedLotteryResult.data.length
    
    // 计算剩余抽奖次数
    const remainingChances = totalEarnedChances - usedChances
    
    // 获取今日抽奖次数限制
    const today = new Date()
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    
    const todayLotteryResult = await db.collection('lottery_records').where({
      openid: wxContext.OPENID,
      createTime: db.command.gte(todayStart).and(db.command.lt(todayEnd))
    }).get()
    
    const todayUsedChances = todayLotteryResult.data.length
    const dailyLimit = 10 // 每日最多抽奖10次
    const todayRemainingChances = Math.max(0, dailyLimit - todayUsedChances)
    
    // 实际可用抽奖次数为两者的最小值
    const actualRemainingChances = Math.min(remainingChances, todayRemainingChances)
    
    return {
      success: true,
      data: {
        totalEarnedChances,
        usedChances,
        remainingChances: actualRemainingChances,
        todayUsedChances,
        todayRemainingChances,
        dailyLimit,
        userLevel: user.level,
        totalOrderCount: user.totalOrderCount
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