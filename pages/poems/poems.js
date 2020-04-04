// pages/poems/poems.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookCategory: null,
    childCategory: null
  },

//
  getBookChildCategory: function (event) {
      wx.request({
        url: util.getServer() + '/bookCategory',
        method: 'POST',
        data: {
          msg: 'getBookChildCategory',
          parentId: event.target.id
        },

        success: (res) => {
          if (res.data.resultSuccess) {
            this.caculateChildMarginLeft(res.data.resultData);          
            this.setData({
              'childCategory': res.data.resultData
            });

          }
        },
        fail: () => {

        }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        wx.request({
          url: util.getServer() + '/book/category',
          method: 'GET',
          success: (res) => {
            if (res.statusCode === 200) {
              this.setData({bookCategory: res.data})
              console.log(res.data)
            }
          },
          fail: () => {

          }

        });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      this.setData({'childCategory': null})
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})