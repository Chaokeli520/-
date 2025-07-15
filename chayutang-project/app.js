// app.js
App({
  onLaunch: function () {
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'chayutang-env', // 云开发环境ID，需要在微信开发者工具中创建
        traceUser: true
      })
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功：', res.code)
        this.globalData.code = res.code
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  onShow: function() {
    console.log('应用切前台')
  },
  
  onHide: function() {
    console.log('应用切后台')
  },
  
  onError: function(msg) {
    console.error('应用发生错误：', msg)
  },
  
  globalData: {
    userInfo: null,
    code: null,
    openid: null,
    cart: [], // 购物车
    orderCount: 0, // 订单数量，用于计算抽奖次数
    lotteryCount: 3 // 剩余抽奖次数
  }
})