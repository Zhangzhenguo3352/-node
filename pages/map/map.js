// pages/map/map.js
const app=getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		"longitude": 0,
		"latitude": 0,
		"markers": [
			{
				iconPath: "/image/point.png",
				id: 0,
				latitude: 31.2998500000,
				longitude: 120.5796800000,
				width: 20,
				height: 20,
				callout:{
					content:'打印设备1'	,
					color:"#ff0000",
					fontSize:"14",
					bgColor:"#ffffff",
					padding:5,
					display:"ALWAYS",
					borderRadius:'30'
				}
			},

		],
		"controls":[{
			id: 1,
			iconPath: '/image/update.png',
			position: {
				left: 0,
				top: 0,
				width: 50,
				height: 50
			},
			clickable: true
		}],
		current: 0,
		winHeight: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		that.getLocation();
		wx.getSystemInfo({
			success: function (res) {
				console.log(res)
				that.setData({
					winHeight: res.windowHeight,
					controls: [{
						id: 1,
						iconPath: '/image/update.png',
						position: {
							left: 15,
							top: res.windowHeight-150,
							width: 50,
							height: 50
						},
						clickable: true
					}],
				})
			},
		})
	},

	jumpMy: function () {
		wx.navigateTo({
			url: '../my/my',
		})
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
        this.lookupPrint();
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

	/**切换tab* */
	swithcTab: function (e) {
		if (this.data.current == e.target.dataset.current) {
			return false
		} else {
			this.setData({
				current: e.target.dataset.current
			})
		}
	},



	//找打印机
	lookupPrint:function(){
		var that=this;
		wx.request({
			url: app.globalData.url+'clientMiniProgram/searchPrinters',
			data: { lat: that.latitude,lon: that.longitude,type:'0'},
			method:'GET',
			success: function(res) {
				console.log(res)
			},
		})	
	},
	//刷新
	refresh:function(e){
		var that=this;
		that.getLocation();
	},
	//获取经纬度
	getLocation: function () {
		var that = this;
		wx.getLocation({
			"type": "gcj02",
			success: function (res) {
				that.setData({
					longitude: res.longitude,
					latitude: res.latitude
				})
				that.lookupPrint();
			}
		})
	},
	//点击打印机
	clickPrint:function(e){
		console.log(e)
	}
})