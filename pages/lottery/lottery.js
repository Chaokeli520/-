// pages/lottery/lottery.js
Page({
  data: {
    // 抽奖次数
    lotteryCount: 3,
    
    // 是否正在抽奖
    isDrawing: false,
    
    // 奖品列表
    prizes: [
      {
        id: 1,
        name: '免费奶茶',
        description: '任选一杯中杯奶茶',
        probability: 15,
        color: '#FF6B35',
        icon: '🥛'
      },
      {
        id: 2,
        name: '5元优惠券',
        description: '满20元可用',
        probability: 20,
        color: '#4CAF50',
        icon: '💰'
      },
      {
        id: 3,
        name: '谢谢参与',
        description: '继续努力',
        probability: 30,
        color: '#9E9E9E',
        icon: '😊'
      },
      {
        id: 4,
        name: '买一送一',
        description: '限指定商品',
        probability: 10,
        color: '#2196F3',
        icon: '🎁'
      },
      {
        id: 5,
        name: '10元优惠券',
        description: '满50元可用',
        probability: 15,
        color: '#9C27B0',
        icon: '💳'
      },
      {
        id: 6,
        name: '谢谢参与',
        description: '继续努力',
        probability: 10,
        color: '#9E9E9E',
        icon: '😊'
      }
    ],
    
    // 中奖记录
    winRecords: [],
    
    // 抽奖规则
    rules: [
      '每日可抽奖3次',
      '消费满30元可获得1次抽奖机会',
      '优惠券有效期30天',
      '中奖后请及时使用',
      '最终解释权归商家所有'
    ],
    
    // 转盘旋转角度
    rotateAngle: 0,
    
    // 显示中奖弹窗
    showResult: false,
    
    // 中奖结果
    currentPrize: null
  },

  onLoad() {
    console.log('抽奖页面加载')
    this.loadUserLotteryInfo()
  },

  onShow() {
    console.log('抽奖页面显示')
  },

  // 加载用户抽奖信息
  loadUserLotteryInfo() {
    // 这里可以从本地存储或API获取用户的抽奖次数和记录
    const records = wx.getStorageSync('lotteryRecords') || []
    const todayCount = this.getTodayLotteryCount(records)
    
    this.setData({
      winRecords: records.slice(0, 10), // 只显示最近10条记录
      lotteryCount: Math.max(0, 3 - todayCount)
    })
  },

  // 获取今日抽奖次数
  getTodayLotteryCount(records) {
    const today = new Date().toDateString()
    return records.filter(record => 
      new Date(record.date).toDateString() === today
    ).length
  },

  // 开始抽奖
  startLottery() {
    if (this.data.lotteryCount <= 0) {
      wx.showToast({
        title: '今日抽奖次数已用完',
        icon: 'none'
      })
      return
    }

    if (this.data.isDrawing) {
      return
    }

    this.setData({
      isDrawing: true
    })

    // 随机选择奖品
    const prize = this.getRandomPrize()
    
    // 计算转盘旋转角度
    const prizeIndex = this.data.prizes.findIndex(p => p.id === prize.id)
    const anglePerPrize = 360 / this.data.prizes.length
    const baseAngle = prizeIndex * anglePerPrize
    const randomOffset = Math.random() * anglePerPrize
    const totalRotation = 360 * 5 + baseAngle + randomOffset // 转5圈加上目标角度

    this.setData({
      rotateAngle: this.data.rotateAngle + totalRotation
    })

    // 3秒后显示结果
    setTimeout(() => {
      this.showLotteryResult(prize)
    }, 3000)
  },

  // 随机获取奖品
  getRandomPrize() {
    const prizes = this.data.prizes
    let totalProbability = 0
    
    // 计算总概率
    prizes.forEach(prize => {
      totalProbability += prize.probability
    })
    
    // 生成随机数
    const random = Math.random() * totalProbability
    let currentProbability = 0
    
    // 根据概率选择奖品
    for (let i = 0; i < prizes.length; i++) {
      currentProbability += prizes[i].probability
      if (random <= currentProbability) {
        return prizes[i]
      }
    }
    
    // 兜底返回最后一个奖品
    return prizes[prizes.length - 1]
  },

  // 显示抽奖结果
  showLotteryResult(prize) {
    this.setData({
      isDrawing: false,
      showResult: true,
      currentPrize: prize,
      lotteryCount: this.data.lotteryCount - 1
    })

    // 保存中奖记录
    this.saveLotteryRecord(prize)
  },

  // 保存抽奖记录
  saveLotteryRecord(prize) {
    const records = wx.getStorageSync('lotteryRecords') || []
    const newRecord = {
      id: Date.now(),
      prize: prize,
      date: new Date().toISOString(),
      used: false
    }
    
    records.unshift(newRecord)
    wx.setStorageSync('lotteryRecords', records)
    
    // 更新页面显示的记录
    this.setData({
      winRecords: records.slice(0, 10)
    })
  },

  // 关闭结果弹窗
  closeResult() {
    this.setData({
      showResult: false,
      currentPrize: null
    })
  },

  // 查看中奖记录
  viewRecords() {
    if (this.data.winRecords.length === 0) {
      wx.showToast({
        title: '暂无中奖记录',
        icon: 'none'
      })
      return
    }
    
    wx.showToast({
      title: '中奖记录功能开发中',
      icon: 'none'
    })
  },

  // 查看抽奖规则
  viewRules() {
    const rulesText = this.data.rules.join('\n')
    wx.showModal({
      title: '抽奖规则',
      content: rulesText,
      showCancel: false,
      confirmText: '我知道了'
    })
  },

  // 获取更多抽奖机会
  getMoreChances() {
    wx.showModal({
      title: '获取抽奖机会',
      content: '消费满30元可获得1次抽奖机会，是否前往点餐？',
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/order/order'
          })
        }
      }
    })
  },

  // 使用奖品
  usePrize(e) {
    const recordId = e.currentTarget.dataset.id
    wx.showToast({
      title: '使用奖品功能开发中',
      icon: 'none'
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '悠然奶茶抽奖活动 - 免费奶茶等你来拿！',
      path: '/pages/lottery/lottery'
    }
  }
})