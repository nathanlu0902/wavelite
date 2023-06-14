// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const {OPENID}=wxContext;
  const db=cloud.database();
  const {type,address}=event;
  //增
  if(type==="add_address"){
    //获取用户记录
    return db.collection("wavelite_user").where({
      openid:OPENID
    }).get().then(res=>{
      if(res.data.length>0){
        const user=res.data[0]
        db.collection("wavelite_user").doc(user._id).update({
          data:{
            address:address
          }
        })
      }
    }).then(()=>{
        return{
          code:"ADDRESS_IS_UPDATED"
        }
      })
    
  }

}