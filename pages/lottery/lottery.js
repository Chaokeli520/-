// pages/lottery/lottery.js
Page({
  data: {
    isSpinning: false,
    currentAngle: 0,
    prizes: [
      { id: 1, name: '免费奶茶', icon: '🥤', probability: 0.15, color: '#FFD700' },
      { id: 2, name: '5元优惠券', icon: '🎫', probability: 0.25, color: '#FF69B4' },
      { id: 3, name: '再来一杯', icon: '🍵', probability: 0.10, color: '#32CD32' },
      { id: 4, name: '谢谢参与', icon: '🌟', probability: 0.30, color: '#87CEEB' },
      { id: 5, name: '10元优惠券', icon: '💰', probability: 0.15, color: '#FFA500' },
      { id: 6, name: '精美茶具', icon: '🏆', probability: 0.05, color: '#DC143C' }
    ],
    lotteryHistory: [],
    showResult: false,
    currentPrize: null,
    userLotteryCount: 3, // 用户剩余抽奖次数
    totalLotteryCount: 0,  // 总共抽奖次数
    showRules: false,
    wheelAngle: 0
  },

  onLoad: function() {
    this.loadLotteryHistory()
    this.calculateAngles()
  },

  onShow: function() {
    // 页面显示时检查是否有新的抽奖机会
    this.checkLotteryChance()
  },

  // 计算每个奖品的角度
  calculateAngles: function() {
    const { prizes } = this.data
    const anglePerPrize = 360 / prizes.length
    
    const prizesWithAngles = prizes.map((prize, index) => ({
      ...prize,
      startAngle: index * anglePerPrize,
      endAngle: (index + 1) * anglePerPrize,
      midAngle: index * anglePerPrize + anglePerPrize / 2
    }))
    
    this.setData({
      prizes: prizesWithAngles
    })
  },

  // 检查抽奖机会
  checkLotteryChance: function() {
    // 从其他页面跳转过来可能获得抽奖机会
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]
    
    if (prevPage && prevPage.route === 'pages/order/order') {
      // 从点单页跳转过来，检查是否刚完成订单
      this.setData({
        userLotteryCount: Math.max(1, this.data.userLotteryCount)
      })
    }
  },

  // 开始抽奖
  startLottery: function() {
    if (this.data.isSpinning) return
    
    if (this.data.userLotteryCount <= 0) {
      wx.showModal({
        title: '抽奖次数不足',
        content: '您今日的抽奖次数已用完，完成订单可获得更多抽奖机会！',
        showCancel: true,
        cancelText: '知道了',
        confirmText: '去点单',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/order/order'
            })
          }
        }
      })
      return
    }

    this.setData({
      isSpinning: true
    })

    // 随机选择奖品
    const selectedPrize = this.getRandomPrize()
    
    // 计算旋转角度
    const baseRotation = 1800 // 基础旋转5圈
    const targetAngle = 360 - selectedPrize.midAngle // 反向计算
    const finalAngle = baseRotation + targetAngle + (Math.random() - 0.5) * 30 // 添加随机偏移
    
    // 更新轮盘角度
    this.setData({
      wheelAngle: this.data.wheelAngle + finalAngle
    })

    // 播放旋转动画并显示结果
    setTimeout(() => {
      this.showLotteryResult(selectedPrize)
    }, 3000)
  },

  // 随机获取奖品
  getRandomPrize: function() {
    const { prizes } = this.data
    const random = Math.random()
    let cumulativeProbability = 0
    
    for (let prize of prizes) {
      cumulativeProbability += prize.probability
      if (random <= cumulativeProbability) {
        return prize
      }
    }
    
    // 兜底返回最后一个奖品
    return prizes[prizes.length - 1]
  },

  // 显示抽奖结果
  showLotteryResult: function(prize) {
    // 减少抽奖次数
    const newLotteryCount = Math.max(0, this.data.userLotteryCount - 1)
    const newTotalCount = this.data.totalLotteryCount + 1
    
    // 添加到历史记录
    const newHistory = [
      {
        id: Date.now(),
        prize: prize,
        time: new Date().toLocaleString(),
        date: new Date()
      },
      ...this.data.lotteryHistory
    ].slice(0, 10) // 最多保留10条记录

    this.setData({
      isSpinning: false,
      showResult: true,
      currentPrize: prize,
      userLotteryCount: newLotteryCount,
      totalLotteryCount: newTotalCount,
      lotteryHistory: newHistory
    })

    // 保存到本地存储
    this.saveLotteryHistory(newHistory)
    
    // 震动反馈
    wx.vibrateShort()
  },

  // 关闭结果弹窗
  closeResult: function() {
    this.setData({
      showResult: false,
      currentPrize: null
    })
  },

  // 显示抽奖规则
  showLotteryRules: function() {
    this.setData({
      showRules: true
    })
  },

  // 关闭规则弹窗
  closeRules: function() {
    this.setData({
      showRules: false
    })
  },

  // 获取更多抽奖机会
  getMoreChance: function() {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  // 分享抽奖结果
  shareLottery: function() {
    if (!this.data.currentPrize) return
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    
    wx.showToast({
      title: '分享成功',
      icon: 'success'
    })
  },

  // 加载抽奖历史
  loadLotteryHistory: function() {
    try {
      const history = wx.getStorageSync('lotteryHistory') || []
      const totalCount = wx.getStorageSync('totalLotteryCount') || 0
      
      this.setData({
        lotteryHistory: history,
        totalLotteryCount: totalCount
      })
    } catch (e) {
      console.error('加载抽奖历史失败：', e)
    }
  },

  // 保存抽奖历史
  saveLotteryHistory: function(history) {
    try {
      wx.setStorageSync('lotteryHistory', history)
      wx.setStorageSync('totalLotteryCount', this.data.totalLotteryCount)
    } catch (e) {
      console.error('保存抽奖历史失败：', e)
    }
  },

  // 清空抽奖历史
  clearHistory: function() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有抽奖记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            lotteryHistory: [],
            totalLotteryCount: 0
          })
          
          try {
            wx.removeStorageSync('lotteryHistory')
            wx.removeStorageSync('totalLotteryCount')
            wx.showToast({
              title: '清空成功',
              icon: 'success'
            })
          } catch (e) {
            console.error('清空历史失败：', e)
          }
        }
      }
    })
  },

  // 页面分享
  onShareAppMessage: function() {
    return {
      title: '茶语堂抽奖活动，快来试试手气！',
      path: '/pages/lottery/lottery',
      imageUrl: '/images/lottery_share.png'
    }
  }
})