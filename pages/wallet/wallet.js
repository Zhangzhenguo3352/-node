// pages/wallet/wallet.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  money:0,
      userInfo:null,
      recharge:'../recharge/recharge'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.getUserInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //获取用户信息
  getUserInfo() {
      var that = this;
      wx.request({
        url: app.globalData.url + 'clientMiniProgram/getUserInfo?userId=' + wx.getStorageSync("userId"),
          method: 'POST',
          success: function (res) {
              console.log(res)
              that.setData({
                  userInfo: res.data,
                  recharge: '../recharge/recharge?id='+res.data.money
              })
          },
          fail: function () {
              wx.showToast({
                  title: '信息获取失败',
                  image: '/image/shibai.png',
                  mask: 'true'
              })
          }
      })
  }
})