// pages/lottery/lottery.js
const app = getApp()

Page({
  data: {
    isSpinning: false,
    currentAngle: 0,
    finalAngle: 0,
    prizes: [
      { 
        id: 1, 
        name: '免费奶茶', 
        icon: '🥤', 
        probability: 0.15, 
        color: '#FFD700',
        angle: 0,
        startAngle: 0,
        endAngle: 60
      },
      { 
        id: 2, 
        name: '5元优惠券', 
        icon: '🎫', 
        probability: 0.25, 
        color: '#FF69B4',
        angle: 60,
        startAngle: 60,
        endAngle: 120
      },
      { 
        id: 3, 
        name: '再来一杯', 
        icon: '🍵', 
        probability: 0.10, 
        color: '#32CD32',
        angle: 120,
        startAngle: 120,
        endAngle: 180
      },
      { 
        id: 4, 
        name: '谢谢参与', 
        icon: '🌟', 
        probability: 0.30, 
        color: '#87CEEB',
        angle: 180,
        startAngle: 180,
        endAngle: 240
      },
      { 
        id: 5, 
        name: '10元优惠券', 
        icon: '💰', 
        probability: 0.15, 
        color: '#FFA500',
        angle: 240,
        startAngle: 240,
        endAngle: 300
      },
      { 
        id: 6, 
        name: '精美茶具', 
        icon: '🏆', 
        probability: 0.05, 
        color: '#DC143C',
        angle: 300,
        startAngle: 300,
        endAngle: 360
      }
    ],
    lotteryHistory: [],
    showResult: false,
    currentPrize: null,
    userLotteryCount: 0, // 用户剩余抽奖次数
    totalLotteryCount: 0,  // 总共抽奖次数
    showRules: false,
    showHistory: false,
    wheelAngle: 0,
    animationDuration: 3000, // 动画持续时间
    rules: [
      '每成功下一单可获得1次抽奖机会',
      '每人每天最多可抽奖10次',
      '奖品有效期为30天，请及时使用',
      '中奖后请联系店员领取实物奖品',
      '最终解释权归茶语堂所有'
    ]
  },

  onLoad: function() {
    this.calculatePrizeAngles()
    this.loadLotteryData()
  },

  onShow: function() {
    // 页面显示时检查是否有新的抽奖机会
    this.checkLotteryChance()
  },

  // 计算每个奖品的角度
  calculatePrizeAngles: function() {
    const { prizes } = this.data
    const anglePerPrize = 360 / prizes.length
    
    const prizesWithAngles = prizes.map((prize, index) => ({
      ...prize,
      angle: index * anglePerPrize,
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
    const lotteryCount = app.globalData.lotteryCount || 0
    const orderCount = app.globalData.orderCount || 0
    
    this.setData({
      userLotteryCount: lotteryCount,
      totalLotteryCount: this.data.totalLotteryCount
    })
  },

  // 开始抽奖
  startLottery: function() {
    if (this.data.isSpinning) {
      return
    }

    if (this.data.userLotteryCount <= 0) {
      wx.showModal({
        title: '抽奖次数不足',
        content: '您暂无抽奖次数，请先下单获取抽奖机会！',
        confirmText: '去下单',
        cancelText: '取消',
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

    // 开始转动
    this.setData({
      isSpinning: true
    })

    // 随机选择奖品
    const selectedPrize = this.selectPrize()
    const targetAngle = selectedPrize.midAngle
    
    // 计算最终角度（多转几圈 + 目标角度）
    const extraRotations = 5 // 额外转5圈
    const finalAngle = this.data.currentAngle + (360 * extraRotations) + (360 - targetAngle)
    
    this.setData({
      finalAngle: finalAngle,
      wheelAngle: finalAngle,
      currentPrize: selectedPrize
    })

    // 动画结束后显示结果
    setTimeout(() => {
      this.showLotteryResult(selectedPrize)
    }, this.data.animationDuration + 500)
  },

  // 根据概率选择奖品
  selectPrize: function() {
    const random = Math.random()
    let cumulative = 0
    
    for (let prize of this.data.prizes) {
      cumulative += prize.probability
      if (random <= cumulative) {
        return prize
      }
    }
    
    // 默认返回最后一个奖品
    return this.data.prizes[this.data.prizes.length - 1]
  },

  // 显示抽奖结果
  showLotteryResult: function(prize) {
    // 减少抽奖次数
    const newLotteryCount = Math.max(0, this.data.userLotteryCount - 1)
    app.globalData.lotteryCount = newLotteryCount
    
    // 增加总抽奖次数
    const newTotalCount = this.data.totalLotteryCount + 1
    
    // 保存抽奖记录
    const lotteryRecord = {
      id: Date.now(),
      prize: prize,
      date: new Date().toLocaleString(),
      used: false
    }
    
    const newHistory = [lotteryRecord, ...this.data.lotteryHistory]
    
    this.setData({
      isSpinning: false,
      showResult: true,
      currentPrize: prize,
      userLotteryCount: newLotteryCount,
      totalLotteryCount: newTotalCount,
      lotteryHistory: newHistory,
      currentAngle: this.data.finalAngle % 360
    })
    
    // 保存数据到本地存储
    this.saveLotteryData()
    
    // 显示中奖提示
    let congratsMessage = ''
    if (prize.name === '谢谢参与') {
      congratsMessage = '很遗憾，再接再厉！'
    } else {
      congratsMessage = `恭喜您获得：${prize.name}！`
    }
    
    wx.showToast({
      title: congratsMessage,
      icon: prize.name === '谢谢参与' ? 'none' : 'success',
      duration: 2000
    })
  },

  // 关闭结果弹窗
  closeResult: function() {
    this.setData({
      showResult: false
    })
  },

  // 显示抽奖规则
  showRules: function() {
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

  // 显示抽奖历史
  showHistory: function() {
    this.setData({
      showHistory: true
    })
  },

  // 关闭历史弹窗
  closeHistory: function() {
    this.setData({
      showHistory: false
    })
  },

  // 使用奖品
  usePrize: function(e) {
    const recordId = e.currentTarget.dataset.id
    let history = [...this.data.lotteryHistory]
    const record = history.find(item => item.id == recordId)
    
    if (record && !record.used) {
      record.used = true
      this.setData({
        lotteryHistory: history
      })
      this.saveLotteryData()
      
      wx.showToast({
        title: '奖品已使用',
        icon: 'success'
      })
    }
  },

  // 保存抽奖数据到本地存储
  saveLotteryData: function() {
    wx.setStorageSync('lotteryHistory', this.data.lotteryHistory)
    wx.setStorageSync('totalLotteryCount', this.data.totalLotteryCount)
  },

  // 从本地存储加载抽奖数据
  loadLotteryData: function() {
    const history = wx.getStorageSync('lotteryHistory') || []
    const totalCount = wx.getStorageSync('totalLotteryCount') || 0
    
    this.setData({
      lotteryHistory: history,
      totalLotteryCount: totalCount
    })
  },

  // 去下单
  goToOrder: function() {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  // 分享功能
  onShareAppMessage: function() {
    return {
      title: '茶语堂抽奖活动，快来试试手气！',
      path: '/pages/lottery/lottery',
      imageUrl: '/images/share-lottery.jpg'
    }
  }
})