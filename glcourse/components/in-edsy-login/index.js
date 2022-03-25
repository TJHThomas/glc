import { setCacheSync } from "../../utils/cache"
Component({
  properties: {
  },

  data: {
    snoRule:[
      { required: true, message:"学号不能为空" },
      { type: 'number', len: 14, message: "学号长度14" }
    ],
    pwdRule:[{ required: true,message:"密码不能为空" }],
    _errorNumber: false,
    _errorPassword: false
  },
  methods: {
    checkNumber(error){
      if(error.detail.errors){
        this.data._errorNumber = true
      }else{
        this.data._errorNumber = false
      }
    },
    checkPassword(error){
      if(error.detail.errors){
        this.data._errorPassword = true
      }else{
        this.data._errorPassword = false
      }
    },
    handlerLogin(){
      if(!this.data._errorNumber && !this.data._errorPassword){
        setCacheSync("login","true")
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    },
  }
})
