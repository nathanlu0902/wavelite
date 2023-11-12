const app = getApp()

Page({
	data: {
		nickname: "",
		gender: "",
		phone: "",
		birthday: "",
		popup_show: false,
		maxDate: new Date().getTime(),
		minDate: new Date(1960, 1, 1).getTime()
	},

	onLoad(options) {
		var userinfo = wx.getStorageSync('userinfo')
		this.setData({
			gender: userinfo.gender,
			phone: userinfo.phone,
			nickname: userinfo.nickname,
			birthday: userinfo.birthday,
			avatarUrl: userinfo.avatarUrl,
			openid: userinfo.openid
		})
	},

	onNicknameChange(e) {
		this.setData({
			nickname: e.detail
		})
	},
	onPhoneChange(e) {
		this.setData({
			phone: e.detail
		})
	},
	onChooseAvatar(e) {
		//avatarUrl为临时url
		let {
			avatarUrl
		} = e.detail;
		wx.cloud.uploadFile({
			cloudPath: "avatar/" + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg",
			filePath: avatarUrl,
			success: res => {
				const fileID=res.fileID
				//将fileID上传到用户数据库
				wx.cloud.callFunction({
					name: "user",
					data: {
						avatarUrl: fileID,
						operation: "update",
					}
				}).then(res => {
					if (res.result.code === "USER_IS_UPDATED") {
						wx.showToast({
							title: '上传成功',
						})
						//fileID为永久链接
						this.setData({
							avatarUrl: fileID
						})
						let userinfo=wx.getStorageSync('userinfo')
						userinfo.avatarUrl=fileID;
						wx.setStorageSync('userinfo', userinfo)
					}

				}).catch(e => {
					console.log(e)
				})

			},
			//上传到云存储产生的错误
			fail: e => {
				console.log(e)
			}
		})

	},
	onGenderChange(e) {
		console.log(e.detail)
		let gender = e.detail;
		this.setData({
			gender: gender
		})
	},
	show_popup() {
		this.setData({
			popup_show: true
		})
	},
	onClose() {
		this.setData({
			popup_show: false
		})
	},

	onBirthdayConfirm(e) {
		var date = new Date(e.detail)
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()
		let birthday = `${year}-${month}-${day}`
		console.log(birthday)
		this.setData({
			popup_show: false,
			birthday: birthday
		})
	},

	onBirthdayCancel() {
		this.setData({
			popup_show: false
		})
	},

	submit(e) {
		wx.cloud.callFunction({
			name: "user",
			data: {
				operation: "update",
				nickname: this.data.nickname,
				phone: this.data.phone,
				gender: this.data.gender,
				birthday: this.data.birthday
			}
		}).then(res => {
				let userinfo = {
					nickname: this.data.nickname,
					phone: this.data.phone,
					gender: this.data.gender,
					birthday: this.data.birthday
				}
				wx.showToast({
					title: '个人资料已更新',
				})
				wx.setStorageSync('userinfo', userinfo)
			}

		)
	}

})