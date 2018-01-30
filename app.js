//app.js
App({
  data:{
    fileList: [], // 上传文件的数据 路径 
    aaasds: "sda"
  },
	onLaunch: function () {
		// 登录
		wx.login({
			success: res => {
				console.log(res)
				this.globalData.code=res.code
				//发送 res.code 到后台换取 openId, sessionKey, unionId
				if (res.code) {
         
                    // 获取系统权限设置
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            this.upUserInfo(res.userInfo)
                        }
                    })
				} else {
					wx.showModal({
						title: '',
						content: '获取用户登录态失败！' + res.errMsg,
						showCancel: false
					})
				}
			}
		})

	},
	globalData: {
		userInfo: null,
		url: 'http://47.94.44.32/printcms/',
		code:null,
    userId:null
	},

    //发送用户数据
    upUserInfo: function (res) {
        wx.request({
            url: this.globalData.url + 'clientMiniProgram/wxRegisterLogin',
            method: 'GET',
            data: {
                city: res.city,
                nickname: res.nickName,
                province: res.province,
                sex: res.gender,
                code: this.globalData.code
            },
            success: function (res) {
                //如果用户是第一次登录，就获取手机号
              console.log(res.data.userId);
              wx.setStorageSync('login',res.data.isOk)
              wx.setStorageSync("userId", res.data.userId);
              console.log(wx.getStorageSync("userId"));
            }
        })
    },
})