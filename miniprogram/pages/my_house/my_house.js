// pages/my_house/my_house.js
let app = getApp();
Page({
 data: {
  isSubmit: false,
  warn: "",
  phone: "",
  pwd: "",
  isPub: false,
  sex: "男"
 },
 formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { phone, pwd, isPub, sex } = e.detail.value;
    if (!phone || !pwd) {
    this.setData({
      warn: "手机号或密码为空！",
      isSubmit: true
    })
    return;
    }
    this.setData({
      warn: "",
      isSubmit: true,
      phone,
      pwd,
      isPub,
      sex
    })
    const db = wx.cloud.database()
    db.collection('test').add({
      data: this.data,
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('进入到了初始化界面')
    console.log(options.houserid)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('init')
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