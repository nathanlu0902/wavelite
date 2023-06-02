// components/popup.js
Component({
  /**
   * 组件的属性列表
   */
  // externalClasses:["popup"],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal(){
      var animation=wx.createAnimation({
        duration:200,
        timingFunction:"linear",
        delay:0
      })
      animation.translateY(-300).step()
      setTimeout(function() {
        animation.translateY(0).step(0);
        this.setData({
          animationData:animation.export(),
          showModal:false
        })}.bind(this),200)
    },

    showModal(){
      var animation=wx.createAnimation({
        duration:200,
        timingFunction:"linear",
        delay:0
      })
      animation.translateY(300).step()
      this.setData({
        animationData:animation.export(),
        showModal:true
      })
      setTimeout(function() {
        animation.translateY(0).step(0);
        this.setData({
          animationData:animation.export()
        })}.bind(this),200)
    }
}})
