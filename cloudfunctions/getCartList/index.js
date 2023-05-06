// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  let res=await db.collection("cart").get();
  let cart=res.data;
  let totalCount=0;
  let totalPrice=0;
  cart.forEach(v=>{
    totalCount+=v.qty;
    totalPrice+=v.qty*v.goodsPrice;
  })
  return{
    cart:res.data,
    totalCount:totalCount,
    totalPrice:totalPrice
  }
}