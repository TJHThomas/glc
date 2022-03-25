Component({
  properties: {
    isBinding:Boolean
  },

  data: {},

  methods: {
    goBinding(){
      wx.navigateTo({url: '/components/in-edsy-login/index'})
    }
  }
})
