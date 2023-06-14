// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {OPENID}=wxContext;
  let {type}=event;

  if(type=="create_user"){
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
  }else if(type=="update"){
    let {userinfo}=event;
    return db.collection("wavelite_user").where({
      openid:OPENID
    }).get().then(res=>{
      if(res.data.length>0){
        const data=res.data[0];
        db.collection("wavelite_user").doc(data._id).update({
          data:{
            openid:OPENID,
            phone:userinfo.phone,
            nickname:userinfo.nickname,
            avatarUrl:userinfo.avatarUrl,
            gender:userinfo.gender,
            birthday:userinfo.birthday
          }
        })
      }
    }).then(res=>{
      return {
        code:"200",
        msg:"user is updated"
      }
    })
  }
  
}