// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let {_id}=event;
  console.log(_id)
  //,goodsCategoryID,goodsName,goodsPic,goodsPrice,goodsRemark,goodsSale
  const _=db.command;
  try{
    //购物车已经存在
    let res=await db.collection("cart").doc(_id).get();
    await db.collection("cart").doc(_id).update({
      data:{
        qty:_.inc(1)
      }
    })
  }catch(err){
    //购物车不存在
    await db.collection("cart").add({
      data:{
        _id:_id,
        // goodsCategoryID,
        // goodsName,
        qty:1,
        // goodsPic,goodsPrice,goodsRemark,goodsSale
      }
    })

  }
}
