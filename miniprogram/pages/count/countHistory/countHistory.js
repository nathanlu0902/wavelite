// pages/count/countmgt/countmgt.js
Page({

	data: {
		active:0
	},
  
	onLoad(options) {
		wx.cloud.callFunction({
			name:"count",
			data:{
				operation:"get"
			}
		}).then(res=>{
			let count=res.result[0]
			this.setData({
				count:count
			})
		})
	},
	toDetail(e){
		const {index}=e.currentTarget.dataset;
		wx.navigateTo({
		  url: `../orderDetail/orderDetail?index=${index}`,
		})
	}
	
  })