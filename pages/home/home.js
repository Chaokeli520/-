// pages/home/home.js
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
      description: '坐落在京西智谷的北京昇腾科技有限公司，是一家专注于人工智能和科技创新的高新技术企业。',
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
      ]
    },
    teaInfo: {
      name: '茶语堂',
      description: '位于京西智谷的精品茶饮店，为园区提供优质茶饮服务',
      highlight: '现在下单即可参与抽奖活动！'
    }
  },

  onLoad: function () {
    this.startBannerTimer()
  },

  onUnload: function() {
    if (this.bannerTimer) {
      clearInterval(this.bannerTimer)
    }
  },

  // 轮播图自动切换
  startBannerTimer: function() {
    this.bannerTimer = setInterval(() => {
      const { bannerImages, currentBanner } = this.data
      const nextBanner = (currentBanner + 1) % bannerImages.length
      this.setData({
        currentBanner: nextBanner
      })
    }, 3000)
  },

  // 手动切换轮播图
  onBannerChange: function(e) {
    this.setData({
      currentBanner: e.detail.current
    })
  },

  // 跳转到点单页
  goToOrder: function() {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  // 查看公司详情
  showCompanyDetail: function() {
    wx.showModal({
      title: '京西智谷 · 北京昇腾',
      content: '京西智谷作为北京西部重要的科技创新区域，汇聚了众多高新技术企业。北京昇腾科技有限公司作为其中的佼佼者，致力于人工智能技术的研发与应用，为行业发展贡献力量。',
      showCancel: false,
      confirmText: '了解更多'
    })
  },

  // 联系我们
  contactUs: function() {
    wx.showActionSheet({
      itemList: ['拨打电话', '查看地址', '官方网站'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            wx.makePhoneCall({
              phoneNumber: '400-888-8888'
            })
            break
          case 1:
            wx.showModal({
              title: '公司地址',
              content: '北京市石景山区京西智谷科技园区',
              showCancel: false
            })
            break
          case 2:
            wx.showToast({
              title: '敬请期待',
              icon: 'none'
            })
            break
        }
      }
    })
  }
})