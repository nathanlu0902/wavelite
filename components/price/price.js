// components/price/price.js
Component({

  externalClasses:[],
  useStore:[],
  /**
   * Component properties
   */
  properties: {
    priceUnit:{
      type:String,
      value:'fen',
    },
    price:{
      type:null,
      value:'',
      //数据监听器
      observer(price){
        this.format(price)
      }
    },
    type:{
      type:String,
      value:''
    }, // main 粗体，lighter 细体，mini 黑色，del中划线，delthrough 中划线带货币符号
    symbol:{
      type:String,
      value:"￥",
    },
    fill:Boolean,//是否自动补齐两位小数
    decimalSmaller:Boolean, //小数字号小一点
    lineThroughWidth:{
      type:null,
      value:'0.12em',
    },//划线价线条高度
  },

  /**
   * Component initial data
   */
  data: {
    pArr:[],
  },

  /**
   * Component methods
   */
  methods: {
    format(price){
      price=parseFloat(`${price}`);
      const pArr=[];
      if(!isNaN(price)){
        const isMinus=price<0;
        if(isMinus){
          price=-price;
        }
        if(this.properties.priceUnit==='yuan'){
          const priceSplit=price.toString().split('.');
          pArr[0]=priceSplit[0];
          //3.1->10；3.11->11
          pArr[1]=!priceSplit[1]?'00':priceSplit[1].length===1?`${priceSplit[1]}0`:priceSplit[1];
        }else{
          price=Math.round(price*10**8)/10**8; //恢复精度丢失
          price=Math.ceil(price);
          //123->1;99->0
          pArr[0]=price>100?`${price}`.slice(0,-2):'0';
        }
        if(!this.properties.fill){
          if(pArr[1]==='00') pArr[1]='';
          else if(pArr[1][1]==='0') pArr[1][1]=''
        }
        }
      this.setData({pArr})
      }
    }
  }
)
