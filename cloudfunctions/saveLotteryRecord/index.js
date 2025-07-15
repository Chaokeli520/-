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
    const { prizeInfo, wheelAngle } = event
    
    // 验证用户是否有抽奖次数
    const chanceResult = await cloud.callFunction({
      name: 'getLotteryChance',
      data: {}
    })
    
    if (!chanceResult.result.success || chanceResult.result.data.remainingChances <= 0) {
      return {
        success: false,
        error: '抽奖次数不足'
      }
    }
    
    // 创建抽奖记录
    const lotteryRecord = {
      openid: wxContext.OPENID,
      prizeId: prizeInfo.id,
      prizeName: prizeInfo.name,
      prizeIcon: prizeInfo.icon,
      prizeType: prizeInfo.name === '谢谢参与' ? 'none' : 'reward',
      wheelAngle: wheelAngle,
      used: false,
      createTime: new Date(),
      expireTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30天后过期
    }
    
    // 保存抽奖记录
    const saveResult = await db.collection('lottery_records').add({
      data: lotteryRecord
    })
    
    // 更新用户统计
    const userResult = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()
    
    if (userResult.data.length > 0) {
      const user = userResult.data[0]
      await db.collection('users').doc(user._id).update({
        data: {
          totalLotteryCount: (user.totalLotteryCount || 0) + 1,
          updateTime: new Date()
        }
      })
    }
    
    // 如果是有效奖品，发送模板消息通知用户
    if (prizeInfo.name !== '谢谢参与') {
      try {
        await cloud.openapi.subscribeMessage.send({
          touser: wxContext.OPENID,
          templateId: 'lottery_win_template_id', // 需要在微信公众平台配置
          page: 'pages/lottery/lottery',
          data: {
            prizeName: {
              value: prizeInfo.name
            },
            winTime: {
              value: new Date().toLocaleString()
            },
            expireTime: {
              value: lotteryRecord.expireTime.toLocaleString()
            },
            tips: {
              value: '请及时到店使用，过期无效'
            }
          }
        })
      } catch (msgErr) {
        console.warn('发送模板消息失败:', msgErr)
      }
    }
    
    return {
      success: true,
      data: {
        recordId: saveResult._id,
        prizeInfo: prizeInfo,
        expireTime: lotteryRecord.expireTime,
        message: prizeInfo.name === '谢谢参与' ? '谢谢参与，下次再来！' : `恭喜获得${prizeInfo.name}！`
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