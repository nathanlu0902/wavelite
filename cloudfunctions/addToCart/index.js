// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const good=event.item;
  const _=db.command;
  console.log(good)
  try{
    //购物车已经存在
    await db.collection("cart").doc(good._id).update({
      data:{
        qty:_.inc(1)
      }
    })
  }catch(err){
    //购物车不存在
    await db.collection("cart").add({
      data:{
       _id:good._id,
       goodsCategoryID:good.goodsCategoryID,
       goodsName:good.goodsName,
       goodsPic:good.goodsPic,
       goodsPrice:good.goodsPrice,
       goodsRemark:good.goodsRemark,
       goodsSale:good.goodsSale,
       qty:1
      }
    })

  }
}
