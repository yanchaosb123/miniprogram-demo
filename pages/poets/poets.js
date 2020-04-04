
const util = require('../../utils/util.js')
Page({
	data: {
	    inputShowed: false,
	    inputVal: ""
	},
	onLoad() {
	    this.setData({
		search: this.search.bind(this)
	    });
	    this.search('all')

	},
	search: function (value) {
	    return new Promise((resolve, reject) => {
		if (!value) reject(new Error(" empty value is not allowed"))
		wx.request({
		  url: util.getServer() + '/poets/search?searchWord=' + value,
		  success: res => {
			resolve(res.data);
		  }
		})
	    })
	},
	selectResult: function (e) {
	    console.log('select result', e.detail)
	},
    });