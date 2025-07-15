// pages/order/order.js
const app = getApp()

Page({
  data: {
    categories: [
      { id: 0, name: '全部', active: false },
      { id: 1, name: '经典奶茶', active: true },
      { id: 2, name: '水果茶', active: false },
      { id: 3, name: '咖啡系列', active: false },
      { id: 4, name: '特调饮品', active: false }
    ],
    currentCategory: 1,
    products: [
      // 经典奶茶
      {
        id: 1,
        categoryId: 1,
        name: '珍珠奶茶',
        description: '经典珍珠奶茶，Q弹珍珠配香浓奶茶',
        price: 18,
        image: 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=珍珠奶茶',
        hot: true
      },
      {
        id: 2,
        categoryId: 1,
        name: '布丁奶茶',
        description: '香滑布丁搭配浓郁奶茶',
        price: 20,
        image: 'https://via.placeholder.com/200x200/D2691E/FFFFFF?text=布丁奶茶',
        hot: false
      },
      {
        id: 3,
        categoryId: 1,
        name: '红豆奶茶',
        description: '香甜红豆粒，温暖奶茶香',
        price: 19,
        image: 'https://via.placeholder.com/200x200/CD853F/FFFFFF?text=红豆奶茶',
        hot: true
      },
      {
        id: 4,
        categoryId: 1,
        name: '椰果奶茶',
        description: '清香椰果配丝滑奶茶',
        price: 17,
        image: 'https://via.placeholder.com/200x200/DEB887/FFFFFF?text=椰果奶茶',
        hot: false
      },
      // 水果茶
      {
        id: 5,
        categoryId: 2,
        name: '柠檬蜂蜜茶',
        description: '新鲜柠檬片配天然蜂蜜',
        price: 16,
        image: 'https://via.placeholder.com/200x200/FFD700/FFFFFF?text=柠檬蜂蜜',
        hot: false
      },
      {
        id: 6,
        categoryId: 2,
        name: '百香果绿茶',
        description: '酸甜百香果遇上清香绿茶',
        price: 18,
        image: 'https://via.placeholder.com/200x200/FFA500/FFFFFF?text=百香果茶',
        hot: true
      },
      {
        id: 7,
        categoryId: 2,
        name: '草莓果茶',
        description: '新鲜草莓制作，酸甜可口',
        price: 20,
        image: 'https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=草莓果茶',
        hot: false
      },
      {
        id: 8,
        categoryId: 2,
        name: '芒果绿茶',
        description: '香甜芒果粒配清香绿茶',
        price: 19,
        image: 'https://via.placeholder.com/200x200/FFB347/FFFFFF?text=芒果绿茶',
        hot: false
      },
      // 咖啡系列
      {
        id: 9,
        categoryId: 3,
        name: '美式咖啡',
        description: '浓郁香醇的经典美式咖啡',
        price: 15,
        image: 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=美式咖啡',
        hot: false
      },
      {
        id: 10,
        categoryId: 3,
        name: '拿铁咖啡',
        description: '香浓咖啡配丝滑奶泡',
        price: 22,
        image: 'https://via.placeholder.com/200x200/D2691E/FFFFFF?text=拿铁咖啡',
        hot: true
      },
      {
        id: 11,
        categoryId: 3,
        name: '卡布奇诺',
        description: '经典意式咖啡，奶泡丰富',
        price: 24,
        image: 'https://via.placeholder.com/200x200/CD853F/FFFFFF?text=卡布奇诺',
        hot: false
      },
      // 特调饮品
      {
        id: 12,
        categoryId: 4,
        name: '抹茶拿铁',
        description: '日式抹茶配香浓牛奶',
        price: 25,
        image: 'https://via.placeholder.com/200x200/9ACD32/FFFFFF?text=抹茶拿铁',
        hot: true
      },
      {
        id: 13,
        categoryId: 4,
        name: '焦糖玛奇朵',
        description: '香甜焦糖配浓郁咖啡',
        price: 26,
        image: 'https://via.placeholder.com/200x200/DAA520/FFFFFF?text=焦糖玛奇朵',
        hot: false
      }
    ],
    cart: [],
    showCart: false,
    totalAmount: 0,
    totalCount: 0
  },

  onLoad: function() {
    this.loadCart()
  },

  onShow: function() {
    this.updateCartDisplay()
  },

  // 切换分类
  switchCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id
    const categories = this.data.categories.map(item => ({
      ...item,
      active: item.id == categoryId
    }))
    
    this.setData({
      categories,
      currentCategory: categoryId
    })
  },

  // 添加到购物车
  addToCart: function(e) {
    const productId = e.currentTarget.dataset.id
    const product = this.data.products.find(item => item.id == productId)
    
    if (!product) return

    let cart = [...this.data.cart]
    const existingItem = cart.find(item => item.id == productId)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        ...product,
        quantity: 1
      })
    }
    
    this.setData({ cart })
    this.saveCart()
    this.updateCartDisplay()
    
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
      duration: 1500
    })
  },

  // 更新购物车显示
  updateCartDisplay: function() {
    const { cart } = this.data
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    this.setData({
      totalCount,
      totalAmount
    })
  },

  // 显示购物车
  showCartModal: function() {
    if (this.data.cart.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      })
      return
    }
    this.setData({ showCart: true })
  },

  // 隐藏购物车
  hideCartModal: function() {
    this.setData({ showCart: false })
  },

  // 增加商品数量
  increaseQuantity: function(e) {
    const productId = e.currentTarget.dataset.id
    let cart = [...this.data.cart]
    const item = cart.find(item => item.id == productId)
    
    if (item) {
      item.quantity += 1
      this.setData({ cart })
      this.saveCart()
      this.updateCartDisplay()
    }
  },

  // 减少商品数量
  decreaseQuantity: function(e) {
    const productId = e.currentTarget.dataset.id
    let cart = [...this.data.cart]
    const itemIndex = cart.findIndex(item => item.id == productId)
    
    if (itemIndex > -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1
      } else {
        cart.splice(itemIndex, 1)
      }
      
      this.setData({ cart })
      this.saveCart()
      this.updateCartDisplay()
    }
  },

  // 清空购物车
  clearCart: function() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ 
            cart: [],
            showCart: false
          })
          this.saveCart()
          this.updateCartDisplay()
        }
      }
    })
  },

  // 提交订单
  submitOrder: function() {
    if (this.data.cart.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '提交订单中...'
    })

    // 模拟提交订单
    setTimeout(() => {
      wx.hideLoading()
      
      // 增加全局订单数和抽奖次数
      app.globalData.orderCount += 1
      app.globalData.lotteryCount += 1
      
      // 清空购物车
      this.setData({ 
        cart: [],
        showCart: false
      })
      this.saveCart()
      this.updateCartDisplay()
      
      wx.showModal({
        title: '订单提交成功',
        content: '您的订单已提交成功，可以去抽奖页面参与抽奖活动！',
        confirmText: '去抽奖',
        cancelText: '继续购买',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/lottery/lottery'
            })
          }
        }
      })
    }, 2000)
  },

  // 保存购物车到本地存储
  saveCart: function() {
    wx.setStorageSync('cart', this.data.cart)
  },

  // 从本地存储加载购物车
  loadCart: function() {
    const cart = wx.getStorageSync('cart') || []
    this.setData({ cart })
    this.updateCartDisplay()
  }
})