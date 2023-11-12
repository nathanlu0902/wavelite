// pages/nutri/nutri.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
	  popup_show:false,
	  nutri:{
		  热量 :"200"+" kCal",
		  蛋白质:"100"+" 克",
		  碳水化合物:"" +" 克",
		  脂肪:""+" 克",
		  纤维素:""+" 克"
	  }
	},
  
	onLoad(options) {
  
	},
	onClose(){
		this.setData({
		  popup_show:false
		})
	},
	onPickerChange(e){
		console.log(e.detail)
	},
	select_dish(e){
	  this.setData({
		  popup_show:true
	  })
	}
  })