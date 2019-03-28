//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    gridList: [],
    scrollInfo: [],
    isSelected: false,
    productInfo: [],
    pid: 2,
    scrollImg: []


  },
  // 加载轮播图
  loadImg: function () {
    var db = wx.cloud.database();
    db.collection('swiper').get({
      success:(res)=>{
        //console.log(res.data);
        this.setData({
          imgList:res.data
        })
      }
    })
  },
  // 加载八宫格
  loadGrid: function () {
    const db = wx.cloud.database();
    db.collection('tab').get({
      success:(res)=>{
        //console.log(res.data);
        this.setData({
          gridList:res.data
        })
      }
    })
  },
  // 八宫格的点击跳转到商品列表页
  handleJump:function(e){
    var pid=e.target.dataset.id;
    // console.log(pid)
    wx.navigateTo({
      url: '/pages/productInfo/productInfo?pid='+pid,
    })
  },
  //加载横向滚动条的信息
  loadscroll: function () {
    const db = wx.cloud.database();
    db.collection('scroll').get({
      success:(res)=>{
        this.setData({
          scrollInfo:res.data
        })
      }
    })
    // wx.request({
    //   url: 'http://127.0.0.1:3000/ScrollInfo',
    //   success: (res) => {
    //     //console.log(res.data.data)
    //     this.setData({
    //       scrollInfo: res.data.data
    //     })
    //   }
    // })
  },
  // 横向滚动条单击事件，样式改变，发送请求
  handleChange: function (e) {
    var pid = e.target.dataset.pid;
    //console.log(pid)
    //console.log(this.data.pid)
    this.setData({ pid: e.target.dataset.pid });
    const db = wx.cloud.database();
    db.collection('products').where({
      pid : e.target.dataset.pid
    }).get({
      success:(res)=>{
        //console.log(res.data)
        this.setData({
          productInfo:res.data
        })
      }
    })
    // wx.request({
    //   url: 'http://127.0.0.1:3000/productInfo?pid=' + this.data.pid,
    //   success: (res) => {
    //     //console.log(res.data.data)
    //     this.setData({
    //       productInfo: res.data.data,
    //     })
    //   }
    // })
  },
  // 在页面加载的时候默认显示商品详情
  loadInit: function () {
    const db = wx.cloud.database();
    db.collection('products').where({
      pid:this.data.pid
    }).get({
      success:(res)=>{
        this.setData({
          productInfo: res.data
        })
      }
    })
    // wx.request({
    //   url: 'http://127.0.0.1:3000/productInfo?pid=' + this.data.pid,
    //   success: (res) => {
    //     this.setData({
    //       productInfo: res.data.data
    //     })
    //   }
    // })
  },
  // 获取分类的横向滚动的图片
  loadSrollImg: function () {
    const db = wx.cloud.database();
    db.collection('products').where({
      pid:1
    }).get({
      success:(res)=>{
        this.setData({
          scrollImg: res.data
        })
      }

      })
    
    // wx.request({
    //   url: 'http://127.0.0.1:3000/scrollImg?pid=1',
    //   success: (res) => {
    //     this.setData({
    //       scrollImg: res.data.data
    //     })
    //   }
    // })
  },

  // 点击滚动条下面的图片跳转到productDetails页面
  handleDetais:function(e){
    var id = e.target.dataset.id;
    wx.navigateTo({
      url: "/pages/productDetail/productDetail?id=" + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadImg();
    this.loadGrid();
    this.loadscroll();
    this.loadInit();
    this.loadSrollImg()

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