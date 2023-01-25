// components/swipeout/swipeout.js
let ARRAY=[];
Component({
  /**
   * Component properties
   */
  properties: {
    disabled:Boolean,
    leftwidth:{
      type:Number,
      value:0,
    },
    rightwidth:{
      type:Number,
      value:0,
    },
    asyncClose:Boolean,
  },

  attached(){
    ARRAY.push(this);
  },

  detached(){
    ARRAY.filter((item)=>item!==this);
  },

  /**
   * Component initial data
   */
  data: {
    wrapperStyle:'',
    asyncClose:false,
    closed:true,
  },

  /**
   * Component methods
   */
  methods: {

  }
})
