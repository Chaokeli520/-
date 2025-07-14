// pages/logs/logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },

  onShow: function() {
    console.log('日志页面显示')
  },

  // 清空日志
  clearLogs: function() {
    wx.showModal({
      title: '确认',
      content: '确定要清空所有日志吗？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('logs', [])
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

  // 返回首页
  goBack: function() {
    wx.navigateBack()
  }
})