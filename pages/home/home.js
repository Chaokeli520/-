// pages/home/home.js
const app = getApp()

Page({
  data: {
    // 轮播图数据
    bannerList: [
      {
        id: 1,
        image: '/images/banner1.jpg',
        title: '新品上市',
        subtitle: '抹茶新品限时优惠'
      },
      {
        id: 2,
        image: '/images/banner2.jpg',
        title: '限时优惠',
        subtitle: '满30元减5元'
      },
      {
        id: 3,
        image: '/images/banner3.jpg',
        title: '会员专享',
        subtitle: '积分兑换免费奶茶'
      }
    ],
    
    // 公司介绍
    companyInfo: {
      name: '悠然奶茶',
      slogan: '一杯好茶，一份悠然',
      description: '悠然奶茶创立于2018年，专注于为顾客提供高品质的手工调制奶茶。我们坚持使用优质茶叶和新鲜食材，每一杯都是用心之作。',
      features: [
        {
          icon: '🍃',
          title: '精选茶叶',
          desc: '台湾高山茶叶'
        },
        {
          icon: '🥛',
          title: '新鲜现调',
          desc: '每一杯都是现做'
        },
        {
          icon: '🚫',
          title: '无添加剂',
          desc: '不含防腐剂'
        },
        {
          icon: '⭐',
          title: '个性定制',
          desc: '支持口味调整'
        }
      ]
    },
    
    // 热门推荐
    hotProducts: [
      {
        id: 1,
        name: '招牌奶茶',
        price: 18,
        originalPrice: 20,
        image: '/images/product1.jpg',
        description: '经典奶茶，香醇顺滑',
        sales: 1200,
        rating: 4.8
      },
      {
        id: 2,
        name: '抹茶拿铁',
        price: 22,
        image: '/images/product2.jpg',
        description: '日式抹茶，回味无穷',
        sales: 800,
        rating: 4.7
      },
      {
        id: 3,
        name: '水果茶',
        price: 20,
        image: '/images/product3.jpg',
        description: '新鲜水果，清香怡人',
        sales: 950,
        rating: 4.9
      }
    ],
    
    // 门店信息
    storeInfo: {
      address: '深圳市南山区科技园中区科苑路15号',
      phone: '0755-12345678',
      hours: '周一至周日 09:00-22:00',
      delivery: '支持外卖配送，30分钟内送达'
    },
    
    // 轮播图当前索引
    currentBannerIndex: 0
  },

  onLoad(options) {
    console.log('首页加载')
    this.loadCompanyData()
  },

  onShow() {
    console.log('首页显示')
  },

  onReady() {
    console.log('首页渲染完成')
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    this.loadCompanyData()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  // 加载公司数据
  loadCompanyData() {
    // 这里可以调用API获取最新的公司信息和产品数据
    console.log('加载公司数据')
    // 模拟异步加载
    setTimeout(() => {
      console.log('数据加载完成')
    }, 500)
  },

  // 轮播图变化
  onSwiperChange(e) {
    this.setData({
      currentBannerIndex: e.detail.current
    })
  },

  // 跳转到点餐页面
  goToOrder() {
    wx.switchTab({
      url: '/pages/order/order'
    })
  },

  // 查看产品详情
  viewProduct(e) {
    const productId = e.currentTarget.dataset.id
    console.log('查看产品详情：', productId)
    
    // 显示产品信息
    const product = this.data.hotProducts.find(p => p.id === productId)
    if (product) {
      wx.showModal({
        title: product.name,
        content: `${product.description}\n价格：¥${product.price}\n月销量：${product.sales}\n评分：${product.rating}⭐`,
        confirmText: '立即点餐',
        success: (res) => {
          if (res.confirm) {
            this.goToOrder()
          }
        }
      })
    }
  },

  // 拨打电话
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.storeInfo.phone,
      success: () => {
        console.log('拨打电话成功')
      },
      fail: () => {
        wx.showToast({
          title: '拨打失败',
          icon: 'none'
        })
      }
    })
  },

  // 查看地址
  viewLocation() {
    wx.showModal({
      title: '门店地址',
      content: this.data.storeInfo.address + '\n\n' + this.data.storeInfo.hours,
      confirmText: '导航',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '地图导航功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },

  // 跳转到抽奖页面
  goToLottery() {
    wx.switchTab({
      url: '/pages/lottery/lottery'
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '悠然奶茶 - 一杯好茶，一份悠然',
      path: '/pages/home/home',
      imageUrl: '/images/share-logo.jpg'
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '悠然奶茶 - 一杯好茶，一份悠然',
      imageUrl: '/images/share-logo.jpg'
    }
  }
})