// pages/order/order.js
Page({
  data: {
    // 当前选中的分类
    currentCategory: 0,
    
    // 商品分类
    categories: [
      { id: 0, name: '奶茶', icon: '🥛' },
      { id: 1, name: '果茶', icon: '🍹' },
      { id: 2, name: '咖啡', icon: '☕' },
      { id: 3, name: '小食', icon: '🍰' }
    ],
    
    // 商品列表
    products: [
      // 奶茶类
      {
        id: 1,
        categoryId: 0,
        name: '招牌奶茶',
        price: 18,
        originalPrice: 20,
        description: '经典奶茶，香醇顺滑，茶香浓郁',
        image: '/images/product1.jpg',
        sales: 1200,
        rating: 4.8,
        options: {
          size: ['小杯', '中杯', '大杯'],
          sugar: ['无糖', '三分糖', '五分糖', '七分糖', '全糖'],
          ice: ['去冰', '少冰', '正常冰', '多冰']
        }
      },
      {
        id: 2,
        categoryId: 0,
        name: '抹茶拿铁',
        price: 22,
        description: '日式抹茶，回味无穷，口感丝滑',
        image: '/images/product2.jpg',
        sales: 800,
        rating: 4.7
      },
      {
        id: 3,
        categoryId: 0,
        name: '珍珠奶茶',
        price: 20,
        description: 'Q弹珍珠，经典搭配，口感丰富',
        image: '/images/product3.jpg',
        sales: 1500,
        rating: 4.9
      },
      // 果茶类
      {
        id: 4,
        categoryId: 1,
        name: '柠檬蜂蜜茶',
        price: 16,
        description: '清香柠檬，天然蜂蜜，酸甜可口',
        image: '/images/product4.jpg',
        sales: 600,
        rating: 4.6
      },
      {
        id: 5,
        categoryId: 1,
        name: '草莓果茶',
        price: 24,
        description: '新鲜草莓，果香浓郁，颜值超高',
        image: '/images/product5.jpg',
        sales: 400,
        rating: 4.8
      }
    ],
    
    // 购物车
    cart: [],
    
    // 购物车总数量
    cartCount: 0,
    
    // 购物车总金额
    cartTotal: 0,
    
    // 是否显示购物车详情
    showCartDetail: false
  },

  onLoad() {
    console.log('点餐页面加载')
    this.loadProducts()
  },

  onShow() {
    console.log('点餐页面显示')
  },

  // 加载商品数据
  loadProducts() {
    // 这里可以调用API获取商品数据
    console.log('加载商品数据')
  },

  // 切换分类
  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      currentCategory: categoryId
    })
  },

  // 获取当前分类的商品
  getCurrentProducts() {
    return this.data.products.filter(product => 
      product.categoryId === this.data.currentCategory
    )
  },

  // 添加到购物车
  addToCart(e) {
    const productId = e.currentTarget.dataset.id
    const product = this.data.products.find(p => p.id === productId)
    
    if (!product) return
    
    const cart = [...this.data.cart]
    const existingItem = cart.find(item => item.id === productId)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        ...product,
        quantity: 1,
        selectedOptions: {
          size: '中杯',
          sugar: '五分糖',
          ice: '正常冰'
        }
      })
    }
    
    this.updateCart(cart)
    
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success',
      duration: 1000
    })
  },

  // 从购物车移除
  removeFromCart(e) {
    const productId = e.currentTarget.dataset.id
    let cart = [...this.data.cart]
    const itemIndex = cart.findIndex(item => item.id === productId)
    
    if (itemIndex > -1) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity -= 1
      } else {
        cart.splice(itemIndex, 1)
      }
    }
    
    this.updateCart(cart)
  },

  // 更新购物车
  updateCart(cart) {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    this.setData({
      cart,
      cartCount,
      cartTotal
    })
  },

  // 显示/隐藏购物车详情
  toggleCartDetail() {
    if (this.data.cartCount === 0) return
    
    this.setData({
      showCartDetail: !this.data.showCartDetail
    })
  },

  // 清空购物车
  clearCart() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空购物车吗？',
      success: (res) => {
        if (res.confirm) {
          this.updateCart([])
          this.setData({
            showCartDetail: false
          })
        }
      }
    })
  },

  // 去结算
  goToCheckout() {
    if (this.data.cartCount === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      })
      return
    }
    
    wx.showToast({
      title: '结算功能开发中',
      icon: 'none'
    })
  },

  // 查看商品详情
  viewProductDetail(e) {
    const productId = e.currentTarget.dataset.id
    wx.showToast({
      title: '商品详情开发中',
      icon: 'none'
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '悠然奶茶 - 新鲜好喝的奶茶等你来',
      path: '/pages/order/order'
    }
  }
})