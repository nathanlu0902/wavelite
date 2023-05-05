// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  let {_id}=event;
  const _=db.command;
  db.collection("cart").doc(_id).update({
    data:{
      qty:_.inc(-1)
    }
  })
  if(db.collection("cart").doc(_id).qty==0){
    db.collection("cart").doc(_id).remove({
      success:res=>{
        console.log(res.data)
      }
    })
  }
}