import { getCacheSync, deleteCache } from "../../utils/cache"

Page({
  data: {
    isBinding: false,
    showPopupVersion: false,
    showPopupOur: false,
    _touchStartX: 0,
    _touchStartY: 0,
    contact_X: 0,
    contact_Y: 0,
    contact_X_init: 0,
    contact_Y_init: 0,
    animation: "dialog 1s none",
    di_text_arr: ["干嘛","摸一摸，两百多","你是不是傻","再摸就咬你","你好，为你服务","打工人，打工魂"],
    di_text:""
  },

  handlerShowVersion(){
    this.setData({
      showPopupVersion: true
    })
  },
  handlerShowOur(){
    this.setData({
      showPopupOur: true
    })
  },
  goLoginEadSysytem(){
    wx.navigateTo({url: '/components/in-edsy-login/index'})
  },
  goPrevious(){
    wx.navigateTo({url: '/pages/previous/index'})
  },
  handlerContactStart(e){
    this.data._touchStartX = e.touches[0].pageX
    this.data._touchStartY = e.touches[0].pageY
    this.data.contact_X_init = this.data.contact_X
    this.data.contact_Y_init = this.data.contact_Y
    let di_text = this.data.di_text_arr[Math.floor((Math.random()*this.data.di_text_arr.length))]
    this.setData({
      di_text: di_text,
    })
  },
  handlerContactMove(e){
    let touchStartX = this.data._touchStartX
    let touchStartY = this.data._touchStartY
    let XOffset = e.touches[0].pageX - touchStartX
    let YOffset = e.touches[0].pageY - touchStartY
    let contact_X = this.data.contact_X_init + XOffset
    let contact_Y = this.data.contact_Y_init + YOffset
    this.setData({
      contact_X: contact_X,
      contact_Y: contact_Y
    })
  },
  handlerContactEnd(){
    this.setData({
      di_text: "",
    })
  },
  handlerNotBinding(){
    deleteCache('login')
    this.setData({
      isBinding: false,
    })
    wx.showToast({
      title: '解绑成功！',
    })
  },
  onLoad: function () {
    
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
    let hasLogin = getCacheSync("login")
    if(hasLogin){
      this.setData({
        isBinding: true,
      })
    }
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