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
			console.log(res)
			let count=res.result[0]
			this.setData({
				count:count
			})
		})
	},
  

  })