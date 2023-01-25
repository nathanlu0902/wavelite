// pages/cart/cart-bar/cart-bar.js
Component({
  /**
   * Component properties
   */
  properties: {
    goods_list:{
      type:Array,
      observer(goods_list){
        for(const good in goods_list){
          good.specs=goods.specinfo.map((item)=>item.specValue);
        }
      this.setData({_goods_list:goods_list})
      }
    }
  },

  /**
   * Component initial data
   */
  data: {
    _goods_list:[],
  },

  /**
   * Component methods
   */
  methods: {

  }
})
