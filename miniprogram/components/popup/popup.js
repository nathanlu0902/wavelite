Component({

  externalClasses:["popup-outer-class"],
  properties: {

  },

  data: {
    showModal:false
  },

  methods: {
    created(){
      this.setData({
        width:this.properties.width,
        height:this.properties.height
      })
    },
    hideModal(){
      var animation=wx.createAnimation({
        duration:200,
        timingFunction:"linear",
        delay:0
      })
      animation.translateY(-`${this.properties.height}px`).step()
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
      animation.translateY(600).step()
      this.setData({
        animationData:animation.export(),
        showModal:true
      })
      setTimeout(function() {
        animation.translateY(0).step();
        this.setData({
          animationData:animation.export()
        })}.bind(this),200)
    }
}})
