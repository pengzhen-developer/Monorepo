export default {

  getFilterTextForList(value, list) {
    const item = list.find((item) => item.value === value)
    return item ? item.label : '--'
  }

  // rules: {
  //   handler() {
  //     this.scrollOptions.positionsList = []
  //     for (let i=0; i<this.rules.length; i++) {
  //       const offsetTop = this.$refs[`ruleItem_ref_${i}`][0].$el.offsetTop
  //       this.scrollOptions.positionsList.push(offsetTop)
  //     }
  //   },
  //   deep:true,
  // },
  // scrollOptions: {
  //   // 存放当前规则项的offsetTops
  //   positionsList: [],
  //   isScrolling: false,
  //   scrollTop: 0,
  // },
  //
  // oldScrollTop: 0, //记录上一次滚动结束后的滚动距离
  // scrollTop: 0, // 记录当前的滚动距离
  //
  // scrollTop(newValue, oldValue) {
  //   setTimeout(() => {
  //     if(newValue === this.scrollOptions.scrollTop) { //延时执行后当newValue等于window.scrollY，代表滚动结束
  //       console.log("滚动结束")
  //       this.scrollOptions.isScrolling = false
  //       this.oldScrollTop = newValue; //每次滚动结束后都要给oldScrollTop赋值
  //     }
  //   }, 20);
  //   //必须使用延时器，否则每次newValue和window.scrollY都相等，无法判断，20ms刚好大于watch的侦听周期，故延时20ms
  //   if(this.oldScrollTop === oldValue) { //每次滚动开始时oldScrollTop与oldValue相等
  //     this.scrollOptions.isScrolling = true
  //     console.log("滚动开始")
  //   }
  // }
  // onScroll(info) {
  //
  //   let top = info.position
  //   this.oldScrollTop = top
  //   this.scrollOptions.scrollTop = top
  //   const positionsList = this.scrollOptions.positionsList
  //   let next
  //   // 向下滚动
  //   if (info.direction === "down") {
  //
  //     if (top === 0) {
  //       this.tabSelectedIndex = 0
  //       return
  //     } else if (top >= positionsList[positionsList.length - 1]) {
  //       this.tabSelectedIndex = positionsList.length - 1
  //       return
  //     }
  //
  //   } else {
  //
  //     if (positionsList.length > 2 && (top <= positionsList[1])) {
  //       this.tabSelectedIndex = 0
  //       return
  //     }
  //
  //   }
  //
  //   for (let i=1; i<positionsList.length; i++) {
  //     const current = positionsList[i]
  //
  //     if (i < positionsList.length - 1) {
  //       next = positionsList[i+1]
  //     }
  //
  //     if (top >= current && top < next) {
  //       this.tabSelectedIndex = i
  //       return
  //     }
  //   }
  // },
}
