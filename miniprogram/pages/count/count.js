import {shorten_address} from "../../utils/utils"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		count_list: [5, 7, 15],
		show: false,
		workingDayOnly: false,
		set: "low",
		showTimePickerPopup: false,
		minhour: 10,
		maxhour: 19,
		currentIndex: 0,
		receiverError:'',
		phoneError:'',
		numError:'',
		addressError:''
	},

	onLoad(options) {

	},
	onShow() {

	},
	showNumPopup() {
		this.setData({
			show: true
		})
	},
	onNumPickerConfirm(e) {
		this.setData({
			num: e.detail.value,
			show: false
		})
	},
	onNumPickerCancel() {
		this.setData({
			show: false
		})
	},

	onNumPopupClose() {
		this.setData({
			show: false
		})
	},

	onSetChange(e) {
		this.setData({
			set: e.detail
		})
	},
	handleChange(e) {
		this.setData({
			currentIndex: e.detail.current
		})
	},
	// showTimePopup() {
	// 	this.setData({
	// 		showTimePickerPopup: true
	// 	})
	// },

	// onTimePickerPopupClose() {
	// 	this.setData({
	// 		showTimePickerPopup: false
	// 	})
	// },

	// onTimePickerConfirm(e) {
	// 	console.log(e.detail)
	// 	this.setData({
	// 		showTimePickerPopup: false,
	// 		time: e.detail
	// 	})
	// },

	// onTimePickerCancel() {
	// 	this.setData({
	// 		showTimePickerPopup: false
	// 	})
	// },

	onReceiverInput(e) {
		//输入值非空
		if(e.detail.value){
			this.setData({
				receiver: e.detail.value,
				receiverError:''
			})
		}

	},

	onPhoneInput(e) {
		if(e.detail.value){
			this.setData({
				phone: e.detail.value,
				phoneError:''
			})
		}

	},

	chooseAddress() {
		wx.chooseLocation({
			success: e => {
				console.log(e)
				// let {
				// 	city,
				// 	short_address
				// } = shorten_address(location);
				this.setData({
					address: e.address,
					address_name:e.name,
				})
			},
			fail: e => {
				console.log(e)
			}
		})
	},

	save() {
		if(!this.validate()){
			var order = {}
			order['num'] = this.data.num,
				order['set'] = this.data.set,
				order['receiver'] = this.data.receiver
			order['phone'] = this.data.phone
			order['address'] = this.data.address_name
			order['delivery_time'] = this.data.time
			wx.setStorageSync('order', order)
			wx.navigateTo({
			  url: './confirm/confirm',
			})
		}
	},

	validate() {
		let hasError=false
		//校验是否已填写
		if (!this.data.receiver) {
			this.setData({
				receiverError: "请输入收件人姓名"
			})
			hasError=true
		} 
		if (!this.data.phone) {
			this.setData({
				phoneError: "请输入收件人手机号"
			})
			hasError=true
		} 
		if (!this.data.num) {
			this.setData({
				numError: "请输入次数"
			})
			hasError=true
		} 
		if(!this.data.address){
			this.setData({
				addressError: "请输入次数"
			})
			hasError=true
		}
		return hasError
	}
})