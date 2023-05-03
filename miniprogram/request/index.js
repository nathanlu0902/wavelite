// export const request=(para)=>{
//   const baseUrl="http://127.0.0.1:8000/api";
//   return new Promise((resolve,reject)=>{
//     wx.request({
//       ...para,
//       url:baseUrl+para.url,
//       success:(res)=>{
//         resolve(res);
//       },
//       fail:(err)=>{
//         reject(err);
//       }
//   })
//   })
// }