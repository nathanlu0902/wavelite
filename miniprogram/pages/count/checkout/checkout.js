import {generateUuid} from "../../../utils/utils"
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
		if(hourNow===23){
			var minhour=0
		}else{
			var minhour=hourNow+1
		}
		let minNow=now.getMinutes()
		this.setData({
			count: count,
			cart: cart,
			minhour:minhour,
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
		var {
			receiver,
			phone,
			address,
			delivery_time
		} = this.data.count
		//用户选择立即送出，自动生成一小时后的送达时间
		if(!delivery_time){
			let now=new Date()
			let hour=now.getHours()
			let minute=now.getMinutes()
			if(hour===23){
				var delivery_hour=0
			}else{
				var delivery_hour=hour+1
			}
			delivery_time=delivery_hour+':'+minute
		}
		const dish = this.data.cart[0]
		const delivery_order = {
			receiver: receiver,
			phone: phone,
			address: address,
			delivery_time: delivery_time,
			dishes: this.data.cart,
			status: "待配送",
			id:generateUuid()
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