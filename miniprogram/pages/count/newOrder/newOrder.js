Page({
	data: {
		cart_expanded: false,
		currentIndex: 0,
		configShow: false,
		selectedBaseIndex: 0,
		baseNutri:{
			"杂粮饭":{
				calories:200,
				fat:100,
				carb:100,
				protein:100
			},
			"沙拉菜":{
				calories:100,
				fat:100,
				carb:100,
				protein:100
			},
			"荞麦面":{
				calories:300,
				fat:100,
				carb:100,
				protein:100
			},
		},
		level: {
			'基础': {
				id: 'basic',
				count: '',
				valid: true
			},
			'中等': {
				id: 'medium',
				count: '',
				valid: true
			},
			'高级': {
				id: 'high',
				count: '',
				valid: true
			},
			// '尊享': {
			// 	id: 'best',
			// 	count: '',
			// 	valid: true
			// },
			'酱汁': {
				id: 'sauce',
				count: '',
				valid: true
			}
		},
		viewid: "",
		main_dish_limit: 1,
		sauce_limit: 1

	},

	onLoad() {
		//获取次卡中每个品类菜品剩余次数
		let count = wx.getStorageSync('count')
		let level = this.data.level
		level['基础']['count'] = count.level_a_count
		level['中等']['count'] = count.level_b_count
		level['高级']['count'] = count.level_b_count
		// level['尊享']['count'] = count.level_d_count
		for(let key in level){
			if(level[key].count>0){
				level[key].valid=true
			}else{
				level[key].valid=false
			}
		}

		//取出缓存中最新的菜品列表
		let dishList = wx.getStorageSync('dishList')
		let dishObj = {
			["基础"]: [],
			["中等"]: [],
			["高级"]: [],
			["酱汁"]: []
		}
		for (let key in dishObj) {
			dishObj[key] = dishList.filter(dish => {
				return dish.level === key
			})
		}
		this.setData({
			dishObj: dishObj,
			level: level
		})
		this.updateQty();



	},
	onShow() {},
	//根据cart，更新spu_qty
	updateQty() {
		let cart = wx.getStorageSync('cart')
		let dishObj = this.data.dishObj
		if (cart) {
			for (let i = 0; i < cart.length; i++) {
				let dish = cart[i]
				let dishIndex = dishObj[dish.level].findIndex(item => {
					return item._id === dish._id
				})
				if (dishIndex != -1) {
					dishObj[dish.level][dishIndex].spu_qty = dish.spu_qty
				}
			}
			this.setData({
				dishObj: dishObj,
				totalCount:this.updateTotalCount()
			})
		}

	},
	onLeftItemTap: function (e) {
		let {
			id
		} = e.currentTarget.dataset;
		//设置scroll-into-view的参考对象
		//id不能为中文，key全小写
		this.setData({
			viewid: id
		})

	},


	onRightItemTap(e) {
		let {
			category_index,
			good_index
		} = e.currentTarget.dataset;
		wx.navigateTo({
			url: '../../pages/goodsDetail/index?category_index=' + category_index + '&good_index=' + good_index,
			// success(res){
			//   res.eventChannel.emit('passGood',{data:{gcategory_id:category_id,id:id}})
			// },
			fail(err) {
				console.log(err)
			}
		})
	},

	checkout() {
		//根据主菜分类，扣减分类可用次数
		//创建delivery_order(create_time,status,dish,receiver,phone,address,remark)
		wx.navigateTo({
			url: '../checkout/checkout',
		})
	},


	//当popup隐藏时候做的一些动作
	updateList() {
		//选择所有qty-control组件，调用loadgood方法
		var list = this.selectAllComponents(".qty-control")
		list.forEach(item => {
			item.loadGood();
		})
	},

	expand_cart() {
		let cart = wx.getStorageSync('cart')
		this.setData({
			cart_expanded: true,
			cart: cart
		})

	},

	countAdd(e) {
		let {
			index,
			key
		} = e.currentTarget.dataset
		let cart = wx.getStorageSync('cart') || []
		let dishObj = this.data.dishObj
		let dish = dishObj[key][index]

		//遍历cart，如果已存在同类，则提示限购
		if (cart.findIndex(item => {
				return item.type === dish.type
			}) != -1) {
			wx.showToast({
				title: '限购1份',
				icon: "error"
			})
		} else {
			if (dish.needConfig) {
				this.setData({
					configShow: true,
					selectedIndex: index,
					selectedKey: key
				})
			} else {
				dish.spu_qty += 1
				cart.push(dish)
				wx.setStorageSync('cart', cart)
				this.setData({
					dishObj: dishObj
				})
				wx.showToast({
					title: '已添加购物车',
				})
				this.setData({
					totalCount:this.updateTotalCount()
				})

			}


		}
	},

	countMinus(e) {
		let {
			index,
			key
		} = e.currentTarget.dataset
		let dish = this.data.dishObj[key][index]
		wx.showModal({
			title: '确认删除',
			content: '是否确认删除该菜品？',
			complete: (res) => {
				if (res.confirm) {
					let cart = wx.getStorageSync('cart')
					let cart_index = cart.findIndex(item => {
						return item._id == dish._id
					})
					if (cart_index != -1) {
						cart.splice(cart_index, 1)
						wx.showToast({
							title: '删除成功',
						})
						let dishObj = this.data.dishObj
						dishObj[key][index].spu_qty -= 1
						wx.setStorageSync('cart', cart)
						this.setData({
							dishObj: dishObj,
							totalCount:this.updateTotalCount()
						})
					}
					
				}

			}
		})


	},

	updateTotalCount(){
		let cart=wx.getStorageSync('cart')
		let totalCount=0
		cart.forEach(item=>{
			totalCount+=item.spu_qty
		})
		return totalCount
	},


	onConfigChange(e) {
		let {
			index
		} = e.currentTarget.dataset;
		let {
			selectedIndex,
			selectedKey
		} = this.data
		let dishObj = this.data.dishObj
		let dish=dishObj[selectedKey][selectedIndex]
		dish.selectedBase=dish.base[index]
		this.setData({
			dishObj:dishObj,
			selectedBaseIndex:index
		})
	},

	add_cart(e) {
		let {
			selectedIndex,
			selectedKey
		} = this.data
		let dishObj = this.data.dishObj
		dishObj[selectedKey][selectedIndex].spu_qty += 1
		dishObj[selectedKey][selectedIndex].selectedBase = dishObj[selectedKey][selectedIndex].base[this.data.selectedBaseIndex]
		let cart = wx.getStorageSync('cart') || []
		cart.push(dishObj[selectedKey][selectedIndex])
		wx.setStorageSync('cart', cart)
		this.setData({
			configShow: false,
			dishObj: dishObj
		})
		wx.showToast({
			title: '已添加购物车',
		})
	},

	onCartPopupClose() {
		this.setData({
			cart_expanded: false
		})
	},

	onConfigPopupClose() {
		this.setData({
			configShow: false
		})
	}
})