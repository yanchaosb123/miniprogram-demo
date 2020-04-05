// pages/poems/poems.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hello: 'world',
    list: [
      {
          id: 'poetLife',
          name: '诗人生平',
          open: false
      },
      {
          id : 'poetWorks',
          name: '诗人作品',
          open: false
      }

     ]
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].id == id) {
            list[i].open = !list[i].open
        } else {
            list[i].open = false
        }
    }
    this.setData({
        list: list
    });
  },

  initPage: function (poetId) {
    wx.request({
      url: util.getServer() + '/poems/query',
      data: {
        'poetId': poetId
      },
      method: 'GET',
      success: (res) => {
        console.log(res.data, "haha", this)
        if (res.data.code == 200) {
          this.setData({...res.data.data})
        }
        console.log(this.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
         initPage: this.initPage.bind(this)
     });
     this.initPage(options.poetId);
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
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
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