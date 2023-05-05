import { remove_cart ,add_cart} from "../../utils/utils";

// components/add-cart-btn/add-cart-btn.js
Component({
  lifetimes:{
    attached:function(){
      this.setData({
        qty:this.properties.good_qty
      })
    }
  },
  properties: {
    good_id:{
      type:String,
      value:""
    },
    good_qty:{
      type:Number,
      value:0
    }
  },

  data: {
  },

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
        name:"addToCart",
        data:{
          _id:this.properties.good_id
        }
      }).then(res=>{
        let new_qty=this.data.qty+1;
        this.setData({
          qty:new_qty
        })
      }
      )
      this.updatePrice();

    },
  
    minus:function(){
      wx.cloud.callFunction({
        name:"removeFromCart",
        data:{
          _id:this.properties.good_id
        }
      }).then(res=>{
        let new_qty=this.data.qty-1;
        this.setData({
          qty:new_qty
        })
      })
      this.updatePrice();
    },
  }
})
