// pages/home/home.js
const app = getApp()

Page({
  data: {
    bannerImages: [
      'https://via.placeholder.com/750x300/8B4513/FFFFFF?text=京西智谷',
      'https://via.placeholder.com/750x300/D2691E/FFFFFF?text=北京昇腾',
      'https://via.placeholder.com/750x300/CD853F/FFFFFF?text=科技创新'
    ],
    currentBanner: 0,
    companyInfo: {
      name: '北京昇腾科技有限公司',
      location: '京西智谷',
      description: '坐落在京西智谷的北京昇腾科技有限公司，是一家专注于人工智能和科技创新的高新技术企业。公司致力于推动AI技术在各行业的应用落地，为客户提供完整的智能化解决方案。',
      features: [
        {
          icon: '🏢',
          title: '优质办公环境',
          desc: '现代化办公空间，舒适的工作环境'
        },
        {
          icon: '🚀',
          title: '技术创新',
          desc: '前沿AI技术，推动行业发展'
        },
        {
          icon: '🤝',
          title: '合作共赢',
          desc: '开放合作，共创美好未来'
        },
        {
          icon: '🌟',
          title: '人才荟萃',
          desc: '汇聚行业精英，共同成长'
        }
      ],
      contact: {
        phone: '400-123-4567',
        email: 'contact@shengteng.com',
        address: '北京市门头沟区京西智谷科技园'
      }
    },
    teaInfo: {
      name: '茶语堂',
      description: '位于京西智谷的精品茶饮店，为园区提供优质茶饮服务',
      highlight: '现在下单即可参与抽奖活动！'
    },
    showCompanyModal: false,
    showContactModal: false
  },

  onLoad: function () {
    this.startBannerTimer()
  },

  onUnload: function() {
    if (this.bannerTimer) {
      clearInterval(this.bannerTimer)
    }
  },

  // 轮播图相关方法
  startBannerTimer: function() {
    this.bannerTimer = setInterval(() => {
      const { currentBanner, bannerImages } = this.data
      const nextBanner = (currentBanner + 1) % bannerImages.length
      this.setData({
        currentBanner: nextBanner
      })
    }, 4000)
  },

  onBannerChange: function(e) {
    this.setData({
      currentBanner: e.detail.current
    })
  },

  // 显示公司详情
  showCompanyDetail: function() {
    this.setData({
      showCompanyModal: true
    })
  },

  // 联系我们
  contactUs: function() {
    this.setData({
      showContactModal: true
    })
  },

  // 关闭模态框
  closeModal: function() {
    this.setData({
      showCompanyModal: false,
      showContactModal: false
    })
  },

  // 拨打电话
  makeCall: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.companyInfo.contact.phone,
      success: function() {
        console.log('拨号成功')
      },
      fail: function() {
        wx.showToast({
          title: '拨号失败',
          icon: 'none'
        })
      }
    })
  },

  // 复制邮箱
  copyEmail: function() {
    wx.setClipboardData({
      data: this.data.companyInfo.contact.email,
      success: function() {
        wx.showToast({
          title: '邮箱已复制',
          icon: 'success'
        })
      }
    })
  },

  // 复制地址
  copyAddress: function() {
    wx.setClipboardData({
      data: this.data.companyInfo.contact.address,
      success: function() {
        wx.showToast({
          title: '地址已复制',
          icon: 'success'
        })
      }
    })
  },

  // 跳转到点单页面
  goToOrder: function() {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  // 跳转到抽奖页面
  goToLottery: function() {
    wx.switchTab({
      url: '/pages/lottery/lottery'
    })
  }
})