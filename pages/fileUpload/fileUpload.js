// pages/fileUpload/fileUpload.js
const app=getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	linkMyWord: function () {
		wx.navigateTo({
			url: '../myWord/myWord',
		})
	},
	linkPcUpload: function () {
		wx.navigateTo({
			url: '../pcUpload/pcUpload',
		})
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
	/***拍摄图片* */
	cameraImg:function(){
        let that=this;
		wx.chooseImage({
			sourceType: ['camera'],
			success: function(res) {
                that.upFile(res.tempFilePaths[0])
			},
		})
	},
	/**相册上传* */
	albumImg:function(){
    let that = this;
		wx.chooseImage({
			sourceType: ['album'],
			success: function (res) {
        // 设置成 全局的里面 为了在下一个页面使用
        app.data.fileList = res.tempFilePaths
        // 选择完成 到 文件列表页
        wx.navigateTo({
          url: '../fileList/fileList'
        })
			},
		})
	},
    

})

