// pages/subscribe/confirm/confirm.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	onLoad(options) {
		let order = wx.getStorageSync('order')
		this.setData({
			order:order
		})
	},

	onOrderConfirm() {
		let order =this.data.order
		//数据库创建新订单
		wx.cloud.callFunction({
			name: "count",
			data: {
				order:order,
				operation: "create",
			}
		}).then(res => {
			if (res.result.code == "COUNT_ADDED") {
				wx.showModal({
					title: '订单提交成功',
					content: '您的订单提交成功，请微信联系客服付款',
					showCancel: false,
				})
			}

		})
	}
})