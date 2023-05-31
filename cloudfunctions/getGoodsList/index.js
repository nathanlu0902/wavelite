// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
// 云函数入口函数
exports.main = async (event, context) => {
  const db=cloud.database();
  let result={};
  const category=await db.collection("goodsCategory").get();
  const goodsList=await db.collection("goodsList").get();
//初始化结果对象
  category.data.forEach(item=>{
    result[item.categoryID]=[];
  })
  goodsList.data.forEach(item=>{
    result[item.categoryID].push(item)
  })
  return result;

}