Page({
	data: {
		cart_expanded: false,
		currentIndex: 0,
		configShow: false,
		selectedBaseIndex: 0,
		viewid: "A",
		main_dish_limit: 1,
		sauce_limit: 1

	},

	onLoad() {
		//取出缓存中最新的菜品列表
		let dishList = wx.getStorageSync('dishList')
		let dishObj = {
			"Tier 1": [],
			"Tier 2": [],
			"Tier 3": [],
			"酱汁": []
		}
		for (let key in dishObj) {
			dishObj[key] = dishList.filter(dish => {
				return dish.level === key
			})
		}
		this.setData({
			dishObj: dishObj
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
				dishObj: dishObj
			})
		}

	},
	onLeftItemTap: function (e) {
		let {
			key
		} = e.currentTarget.dataset;
		//设置scroll-into-view的参考对象
		//id不能为中文，key全小写
		this.setData({
			viewid: key
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
		let cart = wx.getStorageSync('cart')||[]
		let dishObj=this.data.dishObj
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
					console.log(cart_index)
					if (cart_index != -1) {
						cart.splice(cart_index, 1)
						wx.showToast({
							title: '删除成功',
						})
						let dishObj = this.data.dishObj
						dishObj[key][index].spu_qty -= 1
						this.setData({
							dishObj: dishObj
						})
					}
					wx.setStorageSync('cart', cart)
				}

			}
		})


	},

	onConfigChange(e) {
		let {
			index
		} = e.currentTarget.dataset;
		this.setData({
			selectedBaseIndex: index,
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