// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const openid = wxContext.OPENID
	const {
		operation
	} = event
	const db = cloud.database()
	const count_collection = db.collection("count")

	switch (operation) {
		case "create":
			var {
				order
			} = event
			order.openid=openid
			order.create_time=db.serverDate()
			order.status="待审批"
			return count_collection.add({
				data:order
			}).then((e) => {
				return {
					code: "COUNT_ADDED"
				}
			})
		case "deduct":
			const _ = db.command
			const {
				delivery_order, item
			} = event
			return count_collection.where({
				openid: openid
			}).get().then(res => {
				return count_collection.doc(res.data[0]._id).update({
					data: {
						[`${item}`]: _.inc(-1),
						delivery_order: _.push(delivery_order)
					}
				}).then(res => {
					return {
						code: "DELIVERY_ORDER_ADDED"
					}
				}).catch(err => {
					console.log(err)
				})
			})
		case "get":
			return count_collection.where({
				openid: openid
			}).get().then(res => {
				return res.data
			})
	}

}