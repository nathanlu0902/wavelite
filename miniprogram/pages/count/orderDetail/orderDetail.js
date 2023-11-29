// pages/count/orderDetail/orderDetail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const {
			index
		} = options
		
		const order = wx.getStorageSync('count').delivery_order[index]
		this.setData({
			order: order,
			is_overtime:this.is_overtime(order)
		})

	},
	is_overtime(order) {
		const now = new Date()
		const hour_now=now.getHours()
		const minute_now=now.getMinutes()
		const hour_delivery=order.delivery_time.split(":")[0]
		const minute_delivery=order.delivery_time.split(":")[1]
		//距离配送时间一小时内，无法取消
		if (hour_delivery*60+minute_delivery-hour_now*60-minute_now>60) {
			return false
		} else {
			return true
		}
	},

	cancel(e) {
		let {
			index
		} = e.currentTarget.dataset
		let order = this.data.count.delivery_order[index]
		if (!this.is_overtime(order)) {
			order.status = "已取消"
			wx.showToast({
				title: '订单已取消',
			})
		} else {
			wx.showToast({
				title: '已过取消时间，无法取消',
			})
		}
	}


})