Component({
  properties: {
    courseMessage: Array,
    showButton: String,
    isBinding: String
  },

  data: {
    courseDetail: {},
    detail_top: 0,
    detail_left: 0,
    detailShow: false,
    isCourseSelected: false,
  },
  lifetimes:{
    attached(){
      // 获取接口的状态，看看是否选完了课
      // this.setData({
      //   isCourseSelected: true
      // })
    }
  },
  methods: {
    confireCourse(){
      let courseMessage = this.properties.courseMessage
      let courseName = ""
      courseMessage.forEach((item, index)=>{
        if(item.isSelected){
          courseName = item.title
        }
      })
      if(courseName){
        wx.showModal({
          title: '确定选择这门课程？',
          content: courseName,
          success:(res)=>{
            if (res.confirm) {
              // 处理接口逻辑
              // 处理后选课状态更改
              this.setData({
                isCourseSelected: true
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '你未选择任何课程！',
          icon: "error"
        })
      }
      
    },
    handlerLongPress(e){
      let courseMessage = this.properties.courseMessage
      let courseDetail = courseMessage[e.target.dataset.index].detail
      if(e.touches[0].pageX > 180){
        this.setData({
          courseDetail: courseDetail,
          detailShow: true,
          detail_top: e.touches[0].pageY - 125,
          detail_left: e.touches[0].pageX - 200
        })
      }
    },
    handlerTouchEnd(){
      this.setData({
          detailShow: false,
          courseDetail: ""
      })
    },
    handlerClick(e){
      let courseMessage = this.properties.courseMessage
      courseMessage.forEach(item=>{
        if(item.title === e.target.dataset.title){
          item.isSelected = true
        }else if(item.isSelected === true){
          item.isSelected = false
        }
      })
      this.setData({
        courseMessage: courseMessage
      })
    },
    goBinding(){
      wx.navigateTo({url: '/components/in-edsy-login/index'})
    }
  }
})
