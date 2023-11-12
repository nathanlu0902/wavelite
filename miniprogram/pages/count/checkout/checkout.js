// pages/count/checkout/checkout.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		showTimePickerPopup:false,
		maxhour:19
	},

	onLoad(options) {
		let count = wx.getStorageSync('count')
		let cart = wx.getStorageSync('cart')
		//获取此时时间
		let now= new Date()
		let hourNow=now.getHours()
		let minNow=now.getMinutes()
		this.setData({
			count: count,
			cart: cart,
			minhour:hourNow+1,
			minminute:minNow
		})
	},
	onReceiverChange(e) {
		this.setData({
			'count.receiver': e.detail.value
		})
	},

	onPhoneChange(e) {
		this.setData({
			'count.phone': e.detail.value
		})
	},

	showTimePopup() {
		this.setData({
			showTimePickerPopup: true
		})
	},
	
	onTimePickerPopupClose() {
		this.setData({
			showTimePickerPopup: false
		})
	},

	onTimePickerConfirm(e) {
		console.log(e.detail)
		this.setData({
			showTimePickerPopup: false,
			time: e.detail
		})
	},

	onTimePickerCancel() {
		this.setData({
			showTimePickerPopup: false
		})
	},

	submit() {
		const {
			receiver,
			phone,
			address,
			delivery_time
		} = this.data.count
		const dish = this.data.cart[0]
		const delivery_order = {
			receiver: receiver,
			phone: phone,
			address: address,
			delivery_time: delivery_time,
			dishes: this.data.cart,
			status: "待配送"
		}
		console.log(delivery_order)
		//扣除可用次数
		if (dish.level === "A") {
			var item = "level_a_count"
		} else if (dish.level === "B") {
			var item = "level_b_count"
		} else if (dish.level === "C") {
			var item = "level_c_count"
		} else {
			var item = "level_d_count"
		}

		wx.cloud.callFunction({
			name: "count",
			data: {
				operation: "deduct",
				item: item,
				delivery_order: delivery_order
			}
		}).then(res => {
			if (res.result.code === "DELIVERY_ORDER_ADDED") {
				wx.showToast({
				  title: '订单提交成功',
				  icon:'success'
				}).then(()=>{
					wx.navigateTo({
					  url: '../countHistory/countHistory',
					})
				})
			}
		})

	}
})