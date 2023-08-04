// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {OPENID}=wxContext;
  let {type}=event;

  if(type==="create_user"){
    let {nickname,phone}=event;
    return db.collection("wavelite_user").add({
      data:{
        openid:OPENID,
        phone:phone,
        nickname:nickname,
        address:[]
      }
    }).then(res=>{
      return {
        openid:OPENID,
        code:"200",
        msg:"user is created"
      }
    })
  }else if(type==="update"){
    //获取需要更新的用户字段和数据
    let {field,field_data}=event;
    return db.collection("wavelite_user").where({
      openid:OPENID
    }).get().then(res=>{
      //如果用户存在
      if(res.data.length>0){
        const user=res.data[0];
        db.collection("wavelite_user").doc(user._id).update({
          data:{
            [`${field}`]:field_data
          }
        })
      }
    }).then(res=>{
      return {
        code:`USER_IS_UPDATED`
      }
    })
  }
  
}