// pages/order/order.js
Page({
  data: {
    categories: [
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
      // 水果茶
      {
        id: 4,
        categoryId: 2,
        name: '柠檬蜂蜜茶',
        description: '新鲜柠檬片配天然蜂蜜',
        price: 16,
        image: 'https://via.placeholder.com/200x200/FFD700/FFFFFF?text=柠檬蜂蜜',
        hot: false
      },
      {
        id: 5,
        categoryId: 2,
        name: '草莓果茶',
        description: '新鲜草莓粒，酸甜可口',
        price: 22,
        image: 'https://via.placeholder.com/200x200/FF69B4/FFFFFF?text=草莓果茶',
        hot: true
      },
      // 咖啡系列
      {
        id: 6,
        categoryId: 3,
        name: '拿铁咖啡',
        description: '香醇咖啡配丝滑奶泡',
        price: 25,
        image: 'https://via.placeholder.com/200x200/8B4513/FFFFFF?text=拿铁',
        hot: false
      },
      // 特调饮品
      {
        id: 7,
        categoryId: 4,
        name: '抹茶拿铁',
        description: '日式抹茶配香浓牛奶',
        price: 28,
        image: 'https://via.placeholder.com/200x200/90EE90/FFFFFF?text=抹茶拿铁',
        hot: true
      }
    ],
    cart: [],
    totalPrice: 0,
    showCart: false
  },

  onLoad: function () {
    this.filterProducts()
  },

  // 切换分类
  switchCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id
    
    // 更新分类状态
    const categories = this.data.categories.map(cat => ({
      ...cat,
      active: cat.id === categoryId
    }))
    
    this.setData({
      categories,
      currentCategory: categoryId
    })
    
    this.filterProducts()
  },

  // 筛选商品
  filterProducts: function() {
    // 这里可以根据分类筛选商品，当前显示所有商品
    // 实际应用中可以根据 currentCategory 筛选
  },

  // 添加到购物车
  addToCart: function(e) {
    const productId = e.currentTarget.dataset.id
    const product = this.data.products.find(p => p.id === productId)
    
    if (!product) return
    
    const { cart } = this.data
    const existingItem = cart.find(item => item.id === productId)
    
    let newCart
    if (existingItem) {
      // 增加数量
      newCart = cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      // 添加新商品
      newCart = [...cart, { ...product, quantity: 1 }]
    }
    
    this.updateCart(newCart)
    
    // 显示添加成功提示
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
      duration: 1500
    })
  },

  // 更新购物车
  updateCart: function(newCart) {
    const totalPrice = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    this.setData({
      cart: newCart,
      totalPrice
    })
  },

  // 显示购物车
  showCartDetail: function() {
    if (this.data.cart.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      })
      return
    }
    
    this.setData({
      showCart: true
    })
  },

  // 隐藏购物车
  hideCart: function() {
    this.setData({
      showCart: false
    })
  },

  // 增加商品数量
  increaseQuantity: function(e) {
    const productId = e.currentTarget.dataset.id
    const newCart = this.data.cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
    this.updateCart(newCart)
  },

  // 减少商品数量
  decreaseQuantity: function(e) {
    const productId = e.currentTarget.dataset.id
    const newCart = this.data.cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    ).filter(item => item.quantity > 0)
    
    this.updateCart(newCart)
  },

  // 清空购物车
  clearCart: function() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          this.updateCart([])
          this.hideCart()
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

    // 模拟订单提交
    wx.showLoading({
      title: '正在提交订单...'
    })

    setTimeout(() => {
      wx.hideLoading()
      
      wx.showModal({
        title: '订单提交成功',
        content: `总金额：¥${this.data.totalPrice}\n\n点击确定参与抽奖活动！`,
        confirmText: '去抽奖',
        success: (res) => {
          if (res.confirm) {
            // 清空购物车
            this.updateCart([])
            this.hideCart()
            
            // 跳转到抽奖页面
            wx.switchTab({
              url: '/pages/lottery/lottery'
            })
          }
        }
      })
    }, 2000)
  }
})