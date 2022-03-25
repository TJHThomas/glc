import { getCacheSync } from "../../utils/cache"

Page({
  data: {
    courseMessage: [{
      title: "葫芦丝",
      isSelected: false,
      detail:{
        teacherName: "李四",
        pictch: "3-4节",
        place: "行政楼2楼办公厅",
        credit: "3",
        number: "45"
      }
    },{
      title: "吉他",
      isSelected: false,
      detail:{
        teacherName: "张三",
        pictch: "1-2节",
        place: "行政楼1楼办公厅",
        credit: "2",
        number: "55"
      }
    },{
      title: "头脑风暴",
      isSelected: false,
      detail:{
        teacherName: "老王",
        pictch: "7-8节",
        place: "行政楼11楼办公厅",
        credit: "1",
        number: "105"
      }
    }],
    startSelectCourse: false,
    isBinding: false
  },
  hanlderLinend(){
    // 接口请求数据返回
    this.setData({
      startSelectCourse: true
    })
  },
  onLoad: function (options) {
    let login = getCacheSync('login')
    this.setData({
      isBinding: login
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
    let login = getCacheSync('login')
    this.setData({
      isBinding: login
    })
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