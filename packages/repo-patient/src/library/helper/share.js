import wx from "weixin-js-sdk"

function share(obj) {
  obj.url = obj.url || location.href.split('#')[0]
  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
  wx.updateAppMessageShareData({
    title: obj.title,
    desc: obj.desc,
    link: obj.url,
    imgUrl: obj.imgUrl,
    success: function () {
      // 设置成功
    }
  })
  // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
  wx.updateTimelineShareData({
    title: obj.title,
    link: obj.url,
    imgUrl: obj.imgUrl,
    success: function () {
      // 设置成功
    }
  })
  wx.ready(() => {

    //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
    wx.onMenuShareTimeline({
      title: obj.title,
      link: obj.url,
      imgUrl: obj.imgUrl,
      success: function () {
        // 用户点击了分享后执行的回调函数
      }
    })
    //获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
    wx.onMenuShareAppMessage({
      title: obj.title,
      desc: obj.desc,
      link: obj.url,
      imgUrl: obj.imgUrl,
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户点击了分享后执行的回调函数
      }
    })
    //获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
    wx.onMenuShareQQ({
      title: obj.title,
      desc: obj.desc,
      link: obj.url, // 分享链接
      imgUrl: obj.imgUrl,
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
    //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
    wx.onMenuShareWeibo({
      title: obj.title,
      desc: obj.desc,
      link: obj.url, // 分享链接
      imgUrl: obj.imgUrl,
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
    //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
    wx.onMenuShareQZone({
      title: obj.title,
      desc: obj.desc,
      link: obj.url, // 分享链接
      imgUrl: obj.imgUrl,
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
  })
}

export default {
  share
}