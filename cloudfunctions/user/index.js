// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
	const {
		OPENID
	} = cloud.getWXContext()
	const {
		operation
	} = event;

	switch (operation) {
		case "get":
			const result=await db.collection("wavelite_user").where({
				openid:	OPENID
			}).get()
			return result;
			break;
		case "create":
			const {
				phonenumber
			} = event;
			return await db.collection("wavelite_user").add({
				data: {
					openid: OPENID,
					phone: phonenumber,
				},
			})

		case "update":
			//取event中除operation以外的属性
			let {operation,...data}=event;
			return db.collection("wavelite_user").where({
				openid: OPENID
			}).get().then(res => {
				//如果用户存在
				if (res.data.length > 0) {
					const user = res.data[0];
					for(let key in data){
						return db.collection("wavelite_user").doc(user._id).update({
							data: {
								[`${key}`]:data[key]
							}
						})
					}
				}
			}).then(res => {
				return {
					code: `USER_IS_UPDATED`
				}
			})
		
	}
}