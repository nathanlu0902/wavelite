var dishObj = {}
import {base} from "../../config/config"

Page({
	data: {
		popup_show: false
	},

	onLoad(options) {
		//获取菜品列表
		const db = wx.cloud.database()
		var dishes
		db.collection("dish").get().then(res => {
			dishes = res.data
			//将dishes处理成picker可以用的格式
			dishes.forEach(item => {
				dishObj[item.dishName] = item
			})
			let columns = [{
						values: Object.keys(dishObj),
						className: "column1"
					},
					{
						values: Object.keys(base),
						className: "column2"
					}
			]
			this.setData({
				dishObj: dishObj,
				columns: columns,
				dish:dishObj["嫩煎鸡胸波奇碗"],
				base:base,
				selectedBase:base['杂粮饭']
			})
		})



	},
	onClose() {
		this.setData({
			popup_show: false
		})
	},
	onPickerChange(e) {
		console.log(e)
		const dishKey=e.detail.value[0]
		const base=e.detail.value[1]
		this.setData({
			dish: this.data.dishObj[dishKey],
			selectedBase:this.data.base[base],
			popup_show: false
		})
	},
	select_dish(e) {
		this.setData({
			popup_show: true
		})
	}
})