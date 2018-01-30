const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileListss: [],
    progress: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    console.log('appsList', app)
    console.log(' wx.getStorageSync("userId")', '|' + wx.getStorageSync("userId") + '|')
    // this.setData({
    //   fileListss: app.data.fileList
    // })
    // for (let i = 0; i < app.data.fileList.length; i++) {
    //   this.upFile(app.data.fileList[i])
    // }
    var num = 0
    var timer = setInterval(() => {
      var that = this
      that.data.fileListss.push('')
      this.setData({
        fileListss: that.data.fileListss
      })
      this.upFile(app.data.fileList[num], num)
      if (that.data.fileListss.length == 4) {
        clearInterval(timer)
      }
      num++
    },1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
  },
  //up fun
  upFile(path, i) {
    console.log(path)
    this.setData({
      progress: 0
    })
    const uploadTask = wx.uploadFile({
      url: app.globalData.url + 'clientMiniProgram/uploadUserDocument?userId=' + wx.getStorageSync("userId"),
      filePath: path,
      name: 'file',
      success: function (res) {
        console.log(res, 'ssssss')
      }
    })

    uploadTask.onProgressUpdate((res) => {
      
      setTimeout(() => {

      },1000)
      console.log('thisdata',this.data)
      this.setData({
        ['progress' + i]: res.progress == 100 ? '完成' : res.progress
      })
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
  }
})