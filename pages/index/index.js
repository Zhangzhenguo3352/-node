//index.js
//获取应用实例
const app = getApp()

Page({

    /**
     * @param {arrary} 文档列表
     * @param {delBtnWidth} 删除按钮宽度
     * @param {winHeight} 可用窗口高度
     * 
     */
	data: {
		array: [],
		delBtnWidth :120,
		winHeight:0,
		count:0
	},
	//事件处理函数
	onLoad: function () {
		var that = this;

		//获取设备信息
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					winHeight: res.windowHeight
				})
			},
		})
		//获取经纬度
		wx.getLocation({
			"type": "gcj02",
			success: function (res) {
				wx.setStorage({
					key: 'latitude',
					data: res.latitude,
				})
				wx.setStorage({
					key: 'longitude',
					data: res.longitude,
				})
			},
		})
	},
    onShow:function(){
        this.getList();

    },
    

	//获取用户文档列表
	getList:function(){
        var that = this;
        var setInt = setInterval(function(){
            var isLogin = wx.getStorageSync('login')
            if (isLogin == true) {
                wx.request({
                  url: app.globalData.url + 'clientMiniProgram/getUserDocumentList?userId=' + wx.getStorageSync("userId"),
                    method: 'GET',
                    success: function (res) {
                        console.log(res, 'getList')
                        that.setData({
                            array: res.data.list
                        })
                        clearTimeout(setInt);
                    },
                    fail: function () {
                        wx.showToast({
                            title: '系统出错',
                            image: '/image/shibai.png',
                        })
                    }
                })
            }
        },300)
	},
	
	//删除文档
	delWord:function(e){
		var that =this;
		wx.request({
      url: app.globalData.url + 'clientMiniProgram/delMyDocument?userId=' + wx.getStorageSync("userId"),
			method: 'GET',
			data: { uf_id: e.currentTarget.dataset.id },
			success: function (res) {
				if (res.data.isOk) {
					wx.showToast({
						title: '删除成功',
						icon: 'success'
					})
					that.getList();
				} else {
					wx.showToast({
						title: res.data.msg,
						image: '/image/shibai.png',
					})
				}
			},
			fail: function () {
				wx.showToast({
					title: '系统出错',
					image: '/image/shibai.png',
				})
			}
		})
	},
	//添加打印文档
	addWord:function(e){
		var that=this;
		wx.request({
      url: app.globalData.url + 'clientMiniProgram/addDocumentToWaitPrint?userId=' + wx.getStorageSync("userId"),
			data: {uf_id: e.currentTarget.dataset.id},
			method:'GET',
			success:function(res){
				that.setData({
					count:that.data.count+1
				})

				if (res.data.isOk){
					wx.showToast({
						title: '添加成功',
						icon: 'success',
					})
				}else{
					wx.showToast({
						title: '系统出错',
						image: '/image/shibai.png',
					})
				}
			},
			fail:function(){
				wx.showToast({
					title: '系统出错',
					image: '/image/shibai.png',
				})
			}
		})
	},
	//长按删除
	longTap:function(e){
		var that=this;
		wx.showModal({
			title: '文档删除',
			content: '是否删除该文档',
			success: function (res) {
				if(res.confirm){
					wx.request({
            url: app.globalData.url + 'clientMiniProgram/delMyDocument?userId=' + wx.getStorageSync("userId"),
						method:'GET',
						data:{uf_id:e.currentTarget.dataset.id},
						success:function(res){
							if(res.data.isOk){
								wx.showToast({
									title: '删除成功',
									icon: 'success'
								})
								that.getList();
							}else{
								wx.showToast({
									title: res.data.msg,
									image: '/image/shibai.png',
								})
							}
						},
						fail:function(){
							wx.showToast({
								title: '系统出错',
								image: '/image/shibai.png',
							})
						}
					})
				}
				
			}

		})
	},


	/*================================
	 滑动删除
	 ================================*/

	 //触摸开始
	touchS:function(e){
		var that=this
		if (e.touches.length===1){
			that.setData({
				startX: e.touches[0].clientX
			})
		}

	},
	//触摸移动
	touchM:function(e){
		var that=this;
		if(e.touches.length===1){
			var moveX = e.touches[0].clientX  //触摸点X轴坐标
			var disX = that.data.startX - moveX 	//触摸点起点X轴坐标与当前触摸点X轴差值
			var delBtnWidth = that.data.delBtnWidth 
			var txtStyle=''
			if(disX===0 || disX<0){	//如果移动距离小于等于0，位置不变
				txtStyle='left:0rpx'
			}else if(disX>0){
				txtStyle='left:-'+disX+'rpx'
				if(disX>=delBtnWidth){
					txtStyle='left:-'+delBtnWidth+'rpx'
				}
			}

			var index = e.currentTarget.dataset.index
			var list=that.data.array
			list[index].txtStyle=txtStyle
			that.setData({
				array:list
			})
		}
	},
	//触摸结束
	touchE:function(e){
		var that=this
		if (e.changedTouches.length===1){
			var endX = e.changedTouches[0].clientX
			var disX = that.data.startX - endX;
			var delBtnWidth = that.data.delBtnWidth;
			var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
			var index = e.currentTarget.dataset.index;
			var list = that.data.array;
			list[index].txtStyle = txtStyle; 
			that.setData({
				array: list
			});
		}
	},
	//一堆跳转
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	linkMy: function () {
		wx.navigateTo({
			url: '../my/my',
		})
	},
	linkFileUpload: function () {
		wx.navigateTo({
			url: '../fileUpload/fileUpload',
		})
	},
	linkNotPrint: function () {
		wx.navigateTo({
			url: '../notPrint/notPrint',
		})
	},

	linkIndex: function () {
		wx.navigateTo({
			url: '../index/index',
		})
	},
	linkGetFile: function () {
		wx.navigateTo({
			url: '../getFile/getFile',
		})
	},
	linkFindPrint: function () {
		wx.navigateTo({
			url: '../findPrint/findPrint',
		})
	},

})
