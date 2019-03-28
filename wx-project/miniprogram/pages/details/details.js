
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollInfo: [],
    productInfo:[],
    pid: 2
  },

  //加载左侧纵向滚动条的信息
  loadscroll: function () {
    const db = wx.cloud.database();
    db.collection('scroll').get({
      success: (res) => {
        //console.log(res.data)
        this.setData({
          scrollInfo: res.data
        })
      }
    })
  },
  // 在页面加载的时候默认显示右侧纵向滚动条商品详情
  loadInit: function () {
    const db = wx.cloud.database();
    db.collection('products').where({
      pid: this.data.pid
    }).get({
      success: (res) => {
        //console.log(res.data)
        this.setData({
          productInfo: res.data
        })
      }
    })
  },
  // 点接左侧滑动文字，获取当前的pid获取获取商品信息
  handleText: function (e) {
    var pid = e.target.dataset.pid;
    console.log(pid)
    //console.log(this.data.pid)
    this.setData({ pid: e.target.dataset.pid });
    const db = wx.cloud.database();
    db.collection('products').where({
      pid: e.target.dataset.pid
    }).get({
      success: (res) => {
        //console.log(res.data)
        this.setData({
          productInfo: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadscroll();
    this.loadInit();
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