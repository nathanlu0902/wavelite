import {question} from "./question.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },


  onLoad(options) {
	  console.log(question)
	this.setData({
		question:question
	})

  },
  
})