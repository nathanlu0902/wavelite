// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const {type,good}=event;
  const cart_collection=db.collection("cart")
  if(type==="add_cart"){
    cart_collection.where({
      id:good.id
    }).get(res=>{
      //cart中没有该商品，则新建
      if(res.data.length==0){
        good.qty=1
        cart_collection.add({
          data:{
            id:good.id,
            goodsCategoryID:good.goodsCategoryID,
            goodsName:good.goodsName,
            goodsPic:good.goodsPic,
            goodsPrice:good.goodsPrice,
            goodsRemark:good.goodsRemark,
            goodsSale:good.goodsSale,
            qty:good.qty
          }
        })
      }else{
        //res.data是包含以上结果的数组
        let cart_item=res.data[0]
        let id=cart_item.id
        cart_collection.doc(id).update({
          data:{
            qty:cart_item.qty+1
          }
        })
      }
    })
  }
  
}
