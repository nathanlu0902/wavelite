// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// 云函数入口函数
exports.main = async (event, context) => {
  let {operation,dishName}=event
  const db=cloud.database();

  switch (operation){
	case "create":
	case "get":
		if(dishName){
			const dish=await db.collection('dish').where({
				dishName:dishName
			}).get()
			return dish.data
		}else{
			const dishList=await db.collection('dish').get()
			console.log(dishList)
			return dishList.data
		}
		
	case "update":
	case "delete":
  }
  

}