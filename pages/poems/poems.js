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


  caculateChildMarginLeft: function( childs ) {
      if(!childs && !childs[0] ) return ;
      let PADDING_LEFT = 20;
      let WIDTH = 32;
      let UNIT = PADDING_LEFT + WIDTH;
      let parents = this.data.bookCategory;
      let parentIndex = parents.findIndex( ele => ele.ID === childs[0].PARENT );
      let parentMarginLeft =  * parentIndex + 20;

      let len = childs.length;
      let leftOverflow = false, rightOverflow = false;

      // 如果偶数个
      if( len%2 === 0 ) {
      // 如果子类型 左边越界
         if ( parentMarginLeft - (len/2 -1)*72 - 52 < 0 ) {
           leftOverflow = true;
         } 
        if ( parentMarginLeft + (len / 2 - 1) * 72 + 104 > 750 ) {
          rightOverflow = true;
        }
      }
      let startMargin = null;
      if(leftOverflow)  { 
        startMargin = 0;
      } else if (rightOverflow) {
        startMargin = 750 - len * 72 + 20;
      } else {

      }
      for( let i=0; i<childs.length; i++ ) {
        childs[i].MARGIN_LEFT = startMargin + i * 72 + 'rpx';
      }



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
          url: util.getServer() + '/bookCategory',
          method: 'POST',
          data: {
            msg: 'getBookCategory'
          },
     
          success: (res) => {
            if (res.data.resultSuccess) { 
              this.setData({
                'bookCategory': res.data.resultData
              });
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