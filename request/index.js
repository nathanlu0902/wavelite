export const request=(para)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      ...para,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}