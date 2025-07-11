// pages/logs/logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  
  onLoad() {
    console.log('日志页加载')
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },

  onShow() {
    console.log('日志页显示')
  },

  onReady() {
    console.log('日志页初次渲染完成')
  },

  onHide() {
    console.log('日志页隐藏')
  },

  onUnload() {
    console.log('日志页卸载')
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
    wx.stopPullDownRefresh()
  },

  // 清空日志
  clearLogs() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有日志吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('logs')
          this.setData({
            logs: []
          })
          wx.showToast({
            title: '清空成功',
            icon: 'success'
          })
        }
      }
    })
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: '启动日志',
      path: '/pages/logs/logs'
    }
  }
})