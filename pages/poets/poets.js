
const util = require('../../utils/util.js')
Page({
	data: {
	    inputShowed: false,
	    inputVal: "",
	    searchResult:[]
	},
	// 分页相关属性 
	minId: 0,
	pageSize: 10,
	//

	onLoad() {
	    this.setData({
		search: this.search.bind(this),
		initPage: this.initPage.bind(this)
	    });
	    console.log("poets page  load")
	},

	initPage: function() {
		wx.request({
			url: util.getServer() + '/poets/page',
			data: {
				minId: this.minId,
				pageSize: this.pageSize
			},
			success: (res) => {
				console.log("data return")
				console.log(" " + (res.data.code == 200) + "")
				if (res.data.code == 200) {
				    this.setData({'searchResult': res.data.data })
				}
			}
		      })
	},
	search: function (value) {
	    return new Promise((resolve, reject) => {
		if (!value) reject(new Error(" empty value is not allowed"))
		wx.request({
			// TODO 搜索结果很多的话,响应较慢
		  url: util.getServer() + '/poets/search?searchWord=' + value,
		  success: res => {
			if (res.data.code == 200) {
			    resolve(res.data.data);
			}
			
		  }
		})
	    })
	},
	selectResult: function (e) {
	    console.log('select result', e.detail)
	    wx.navigateTo({
	      url: '/pages/poems/poems?poetId=' + e.detail.item.id + '&poemCount=' + e.detail.item.poemCount,
	      events:{},
	      success: function (res) {
		      res.eventChannel.emit('accepetDataFromOpenerPage',{data: 'test' })
	      }
	    })
	},
	onShow: function() {
		this.initPage()
	}
    });