// miniprogram/pages/productInfo/productInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var  pid = options.pid;
    const db = wx.cloud.database();
    db.collection('products').where({
      pid:parseInt(pid)
    }).get({
      success:(res)=>{
        //console.log(res.data);
        this.setData({
          productList:res.data
        })
      }
    })
  },
  // 点击图片的时候跳转到商品详情页
  handleDetails:function(e){
    var id = e.target.dataset.id;
    //console.log(id);
    wx.navigateTo({
      url: "/pages/productDetail/productDetail?id="+id,
    })
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