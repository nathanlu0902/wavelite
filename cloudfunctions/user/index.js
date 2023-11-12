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
			db.collection("wavelite_user").where({
				openid:	OPENID
			}).get().then(res=>{
				const user=res.data[0];
				return user
			})
		case "create":
			const {
				nickname, phone
			} = event;
			return db.collection("wavelite_user").add({
				data: {
					openid: OPENID,
					phone: phone,
					nickname: nickname,

				}
			}).then(res => {
				return {
					code: "200",
					msg: "user is created"
				}
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