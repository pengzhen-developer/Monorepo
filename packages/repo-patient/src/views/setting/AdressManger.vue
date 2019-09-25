<template>
  <div>
    <div class v-if="isGet">
      <div :key="item.id" class="dl-two" v-for="item in addr">
        <div class="dt" data-index="index" @click="checkAddr">
          <div class="tit">item.detailAddress</div>
          <div class="small">item.consignee item.mobile</div>
        </div>
        <div class="dd">
          <div class="icon icon-edit" data-index="index" @click="goUserAddressEdit"></div>
          <div class="icon icon-del" data-index="index" @click="delAddr"></div>
        </div>
      </div>
    </div>
    <div class="none-page" v-if="(!addr.length && isGet)">
      <div class="icon icon_none_address'"></div>
      <div class="none-text">暂无地址</div>
    </div>
    <div class="fixed-bottom btn-group" v-if="isGet">
      <div class="btn-group">
        <van-button
          class="btn btn-blue"
          @click="goUserAddressEdit"
          icon="https://img.yzcdn.cn/vant/logo.png"
          type="info"
        >新增地址</van-button>
        <van-button class="btn btn-blue-light" icon="star-o" @click="goWeXinAddress">微信添加</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import peace from "@src/library";
export default {
  props: {},
  data() {
    return {
      addr: [],
      isGet: false
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.getAddressList();
    },
    getAddressList() {
      peace.service.patient.getAddressLists().then(res => {
        const tmp = res.data.addressLists;
        if (tmp.length === 0) {
          this.isGet = true;
        }
        this.addr = tmp;
      });
    },
    goUserAddressEdit(address) {
      this.$router.push(`/setting/userAddressEdit/${address}`)
    },
    delAddr() {},
    goWeXinAddress() {}
  }
};
</script>

<style lang="scss" scoped>
.dl-two {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 30rpx;
  border-bottom: 2rpx solid #dedede;
}
.dl-two .dt {
  flex: 1;
  flex-direction: column;
}
.dl-two .dd {
  float: 0 0 auto;
  width: 120rpx;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

/*私有*/
.dl-two .dt .icon {
  flex: 1 0 auto;
}
.dl-two .tit {
  color: #000;
  font-size: 30rpx;
  font-weight: 700;
}
.dl-two .small {
  font-size: 30rpx;
  color: #666666;
  font-weight: normal;
  margin-top: 15rpx;
}
.icon {
  position: relative;
  width: 40rpx;
  height: 40rpx;
}
.icon::before {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 40rpx;
  height: 40rpx;
  background-size: cover;
}
.icon.icon-edit::before {
  content: "";
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAFNUlEQVR4Xu3cW2gcVRgH8O+b3WyTSnBWq1ChNQqKDxUVlIKKgi9ioYIUF3wwNWvmHEEjUgz64IMgvgQvaFU8Z5ONxKK4tihIg+JlJbZUqggFqw8aFAO+eNkKNZpMdj6ZkJXpZmd2N5Ody+nZ1zln5ju/+e/Zy8wZBP0KFCiXyzts234eEW8DgN+J6HXG2KuISG5H1H7+AkKIawHgMwDY1tTqrXw+P1woFOoaMCBBQojvAeAanyaHOOf3a0AfHSHEhQBwJugdahiGBgwCEkJ8BQA3BrT5YF0ChRDbEfFOIhpCxIG0zpFE5CDiKcuy3mlM+N2OpVQqXeE4zucAsLNVX0T86H/A2dnZLQsLC08j4jgRZbo9WFLbI+JBxtij7eqbnJzc5ThOaW3OO2Ka5lihUPinXC5fadu2i7ijeR+I+NgqYLlcvsS2bffTZle7A6VtOyKeYYzlg+qWUl4PAJ8S0UWNdoj4iWmad3sQq01JnMvn83esAkopDxPRvrThdFjvKc65C9Ty1QqvFeL09PTQ8vKyQMQbAODoWkLPopRyHxEd7rCYtDX7FgD2c86/aVV4EJ4Xsa+vb+/IyMi/LedBKeVRItrj3YiIE4j4guM4f6ZNrFFvPp933C+6G0lei7lugjH2REtAIcSvALDds/EE5/zmtMJ1UncnyWsK1EnG2G6/BC4RUc4T2dcYYw93Ukga23SL544REV9kjB3wS6ANAFkP4CuMsbE04rSreSN4ADAHAHdxzhfPa8CN4g0MDOwZHh7+2+/koBBC+QT2Cm/17a06YC/xlAfsNZ7SgFHgKQsYFZ6SgFHiKQcYNZ5SgHHgKQO42XgzMzMXLC0t3ZTJZOaLxeJC0C+c1H8P3Gy8qampy1ZWVk6s/XlqG4ax37Kst5X8JbLZeC6SlPIZInrKA/YD5/xq5QB7geciCSHc6yKjHrCznPNBpQB7hXdeAPYST3nAXuMpDRgFnrKAUeEpCRglnnKAUeMpBRgHnjKAceEpARgnXuoB48ZLNWAS8FILmBS8VAImCS91gEnDSxXg2gqgrwHg0qC/zJu2zbW7V6WLfbVsmor/A9duaD/WZglB8wB7jpeaBEopp4nogS7SEgleKgBLpRJzHEckES/xgJVKZaBWq/3cxbwXWfIaJzTRc6CUcoyIXu4wfZHjJTqBlUolV6vVfmy14qcZFBE/7u/vvyfoztAOT0LXzRKbwFKp9KDjOJPtRoSIz5mm+WTQEoV2+wizPbGAUsrjRBS0fGLRMIyiuzgwDEDYvokFFEK4K322+Azww0wmMz46OuquLIr1lWTALwDg1oaOuwSViN4DgGf9lmLFIZlkwJ3u8jEAGAKAY9lsVhaLxe/iQAo6ZmIBkwblV48GDHmmNKAGDCkQsrtOoAYMKRCyu06gBgwpELK7TqAGDCkQsrtOoAYMKRCyu06gBgwpELK7TqAGDCkQsrtOYAyA51yrQETBGHsoZB2p7S6EeMN94ptnAH9xzk2/AbnrhX/xXqtFxNOmaV4X12XFOOWFEH0AcBoArvLU0Xa5awUA7vUWjohHEPGlTCbzR5wDivLYjuNsq9frjwPA3iaLNxljw74JlFLeDgBVItKPRF6v5BiGcYtlWV/6ArobpJQHieiRKM94Go7l3iXBGBsPqnU1dUKIrYj4bvOTLNMwyB7W+H4ul7vP79GfjeOe87aVUhaJaAIALu5hYYneNSL+hogHLMs61Emh6+a9arWanZ+f312v1y8HgK2d7ESRNovZbPanwcHBk918A9EfHCHP/n+fMZ77GtDjkwAAAABJRU5ErkJggg==);
}
.icon.icon-del {
  margin-left: 30rpx;
}
.icon.icon-del::before {
  content: "";
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAET0lEQVR4Xu2dyS9sQRTGvzbGkJhJDIkpSCywIUKMQQwbFnYWNv4oGws7CzZYIGaR2JCIGEJIJBbmiHl8OR0t3uvbbl1179Vevtr2Oaeqfn2qTp0qfXje3t7e4HJ7eHjA+Pg4Tk5ObOk5MjISbW1tSElJscWeFSMetwHe399jbGwMZ2dnVsZpKhsREYHW1lakpaWZytop4CrA29tbjI6O4vLy0s45fNgKDw9HS0sL0tPTHbFvZNQ1gNfX1154V1dXjk4uLCwMTU1NyMrKcrQfn3FXAAo0gScQ3WihoaFobGxEdna24905DlCWq+x5Nzc3hpOJiYlBbW0tZA+z2lZWVnB0dGSoFhISgvr6euTl5Vk1a0neUYDn5+deeHd3d4aDiouLQ3t7O2JjYy0N2if88vKCiYkJHB4eGup7PB7vl1NQUPAt+ypKAQFeXFyo6AeUEY+bnp6GRF2jlpSU5D16REVFafXz+vqKqakpHBwcBIRYWVmJjIwMrX4SEhKM7Qc6xvT392t1+JWyHDXkyPGdZWtkVyDOzMxgb2/PsTH39fUFB8DMzEw0NzdDoqWdTfKBubk57Ozs2Gn2w1ZQAMzNzUVDQwNkg3eqLSwsYHNz03bzPw6wqKgINTU1tk/MyODy8jLW19dt7etHAZaUlKCiosLWCZkZkyPO2tqamZjy55YBPj8/Kxs3E7R7vzPrz/e5G3Nw9ByoOtHfLEeAmt8eARKgJgFNdXogAWoS0FSnBxKgJgFNdXrgbwIod4y7u7t+Qy4rK7N8OyNZxurqqp+t/Px8BLq702RlqK7sgUb3g3I5IJcEqm1/fx+Tk5N+4j09PZYvVuWWe3Bw0M+WPCjl5OSoDulDbmtrC/Pz8356gXJgnyABvpMgwHcQ9EDFxccl/AkU90BFr2EQ+QcUozDAKMwo/PeyYBRW3E8ZhRmF4X3nZSqn+DfSzIWN9xZGYUZhRmEwlVM8ejCVYyrn5yoMIgwiDCIMIooxBAwiDCIMIoFWC1/l+Cpn7RdLvA/kfSDvA8UHmIkwE2EmwkyEmYgCAb6J8E3kSzdhJsJMhJmIwk4avCK/YgkHLz6AADW/HQIkQE0Cmur0QALUJKCpTg8kQE0Cmur0QALUJKCpTg8MdoADAwN4enr6a5jl5eUoLS3VHHpwqEudLam39blJVeDe3t4vB6j8qDQ0NORXvjgxMRFdXV2OlrNzA68UcBweHoaULP3c4uPj0d3dbQ/ApaUlbGxs+BmTUp6FhYWIjo52Y6629yG1rbe3tw0LgxcXF6OqqsoegKenpxgZGYHiryJsn6jbBqWAbWdnJ5KTk+0BKFZmZ2cdK7HpNiCz/qTyb11dnZmY+sO6WJJKGVJQ+/j42NTwbxZITU1FR0eHUiUR5SDiAyK1mxcXF72e+L8tZ1m24nnV1dWQaugqzTJAn1GJWHL4lEriUuL98fFRpb+gk5FSzFIIXP6BgfzuT04WVtofLbqkXKPv5Y8AAAAASUVORK5CYII=);
}
</style>