// components/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    totalCount:Number,
    totalPrice:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkout:function(){
      wx.navigateTo({
        url: '../../pages/cart/index',
      })
    },

    expand_cart:function(){
      this.cartpopup=this.selectComponent("#popup-cart")
      this.cartpopup.showModal()
    }
  }
})
