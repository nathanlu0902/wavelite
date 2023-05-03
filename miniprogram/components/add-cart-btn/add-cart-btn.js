import { remove_cart ,add_cart} from "../../utils/utils";

// components/add-cart-btn/add-cart-btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // add_btn_text:{
    //   type:String,
    //   value:""
    // },
    good_id:{
      type:String,
      value:""
    },
    good_qty:{
      type:Number,
      value:0
    }
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
    updatePrice:function(){
      this.triggerEvent("priceUpdate");
    },

    updateGood:function(){
      this.triggerEvent("goodUpdate",{
        id:this.properties.good_id,
        qty:this.properties.good_qty
      });
    },

    add:function(){
      wx.cloud.callFunction({
        name:"add_cart",
        data:{
          _id:this.properties.good_id,
        }
      })
      this.updatePrice();
      this.updateGood();

    },
  
    minus:function(){
      if(this.properties.good_qty>0){
        this.properties.good_qty-=1;
      }
      // this.setData({
      //   good_qty:this.properties.good_qty-1
      // })
      remove_cart(this.properties.good_id);
      this.updatePrice();
      this.updateGood();
    },
  }
})
