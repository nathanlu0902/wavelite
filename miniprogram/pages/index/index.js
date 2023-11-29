const app = getApp()
Page({
	data: {
		top: app.globalData.menuTop + (app.globalData.menuTop - app.globalData.statusBarHeight) + app.globalData.menuHeight,
		bnrUrl: [{
				imgUrl: 'cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/swiper/1.png'
			},
			{
				imgUrl: 'cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/swiper/2.png'
			},
			{
				imgUrl: 'cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/swiper/3.png'
			},
		],

	},

	onLoad: function () {
			const db = wx.cloud.database()
			db.collection('dish').get().then(res => {
				wx.setStorageSync('dishList', res.data)
			})
			//获取用户信息
			wx.cloud.callFunction({
				name: "user",
				data: {
					operation: "get"
				}
			}).then(res => {
				if (res.result.data.length > 0) {
					console.log("登陆完成")
					let userinfo = res.result.data[0];
					this.setData({
						loggedIn: true,
						userinfo: userinfo
					})
					app.globalData.loggedIn = true;
					wx.setStorageSync('userinfo', userinfo)
				} else {
					this.setData({
						loggedIn: false
					})
					app.globalData.loggedIn = false;
				}
			})
			//获取用户次卡信息
			db.collection('count').get().then(res => {
				if (res.data.length === 0) {
					app.globalData.hasCount = false
				} else if (res.data.length > 0 && res.data[0].status === '已审批') {
					app.globalData.hasCount = true
					let count = res.data[0]
					if (count.set === "优享") {
						count.picUrl = "cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/card/购买后1.png"
					} else if (count.set === "尊享") {
						count.picUrl = "cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/card/购买后2.png"
					}
					wx.setStorageSync('count', count)
				}
			})
		}
		,

	onShow: function () {
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 0
			})
		}
	},



	onBindUserTap: function () {
		if (wx.getStorageSync('loggedIn') == true) {
			wx.navigateTo({
				url: '/pages/userInfo/index',
			})
		} else {
			wx.navigateTo({
				url: '../login/index',
			})
		}
	},
	toDelivery() {
		wx.showToast({
			title: '即将开放，敬请期待',
			icon: "none"
		})
	},
	toNutri() {
		wx.navigateTo({
			url: '../nutri/nutri',
		})
	},
	toCount() {
		if (app.globalData.hasCount) {
			wx.navigateTo({
				url: '../count/countmgt/countmgt',
			})
		} else {
			wx.navigateTo({
				url: '../count/count',
			})
		}

	},
	register(e) {
		const code = e.detail.code
		wx.cloud.callFunction({
			name: "getPhoneNumber",
			data: {
				code: code
			}
		}).then(res => {
			const phonenumber = res.result.phoneInfo.phoneNumber
			wx.cloud.callFunction({
				name: "user",
				data: {
					phonenumber: phonenumber,
					operation: "create"
				}
			}).then(res => {
				if (res.result._id) {
					app.globalData.loggedIn = true
					this.setData({
						loggedIn: true
					})
				}
			})
		})


	}
});