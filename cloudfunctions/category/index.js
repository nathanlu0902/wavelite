// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// 云函数入口函数
exports.main = async (event, context) => {
  let {type}=event
  const db=cloud.database();

  if(type=="get"){
    const category=await db.collection("category").get();
    return category;
  }
  
  

}