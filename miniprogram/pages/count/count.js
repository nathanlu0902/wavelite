import {
	shorten_address
} from "../../utils/utils"
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		count_list: [5, 10, 20],
		show: false,
		workingDayOnly: false,
		set: [{
				name:"优享",
				url: 'cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/card/购买前1.png',
			},
			{
				name:"尊享",
				url: 'cloud://cloud1-8gf4k3n9d3a701cc.636c-cloud1-8gf4k3n9d3a701cc-1304230492/card/购买前2.png'
			}
		],
		currentSet:'优享',
		showTimePickerPopup: false,
		minhour: 10,
		maxhour: 19,
		currentIndex: 0,
		receiverError: '',
		phoneError: '',
		numError: '',
		addressError: ''
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
			currentSet: this.data.set[e.detail.current].name,
			currentIndex:e.detail.current
		})
	},
	handleChange(e) {
		this.setData({
			currentIndex: e.detail.current
		})
	},

	onReceiverInput(e) {
		//输入值非空
		if (e.detail.value) {
			this.setData({
				receiver: e.detail.value,
				receiverError: ''
			})
		}

	},

	onPhoneInput(e) {
		if (e.detail.value) {
			this.setData({
				phone: e.detail.value,
				phoneError: ''
			})
		}

	},

	onRemarkInput(e){
		console.log(e.detail.value)
		if(e.detail.value){
			this.setData({
				remark:e.detail.value
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
					address_name: e.name,
				})
			},
			fail: e => {
				console.log(e)
			}
		})
	},

	save() {
		if (!this.validate()) {
			var order = {}
			order['num'] = this.data.num,
			order['set'] = this.data.currentSet,
			order['receiver'] = this.data.receiver
			order['phone'] = this.data.phone
			order['address'] = this.data.address_name
			order['remark']=this.data.remark
			//每个菜品count的设置逻辑
			switch (order['set']){
				case "优享":
					switch(order['num']){
						case 5:
							order['level_a_count']=3
							order['level_b_count']=2
							order['price']=119
						case 10:
							order['level_a_count']=6
							order['level_b_count']=4
							order['price']=229
						case 20:
							order['level_a_count']=12
							order['level_b_count']=8
							order['price']=439
					}
				case "尊享":
					switch(order['num']){
						case 5:
							order['level_a_count']=3
							order['level_b_count']=2
							order['price']=129
						case 10:
							order['level_a_count']=6
							order['level_b_count']=4
							order['price']=249
						case 20:
							order['level_a_count']=12
							order['level_b_count']=8
							order['price']=479
					}
			}
			wx.setStorageSync('order', order)
			wx.navigateTo({
				url: './confirm/confirm',
			})
		}
	},

	validate() {
		let hasError = false
		//校验是否已填写
		if (!this.data.receiver) {
			this.setData({
				receiverError: "请输入收件人姓名"
			})
			hasError = true
		}
		if (!this.data.phone) {
			this.setData({
				phoneError: "请输入收件人手机号"
			})
			hasError = true
		}
		if (!this.data.num) {
			this.setData({
				numError: "请输入次数"
			})
			hasError = true
		}
		if (!this.data.address) {
			this.setData({
				addressError: "请输入次数"
			})
			hasError = true
		}
		return hasError
	}
})