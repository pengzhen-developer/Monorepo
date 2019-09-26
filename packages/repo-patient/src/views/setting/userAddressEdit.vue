<template>
  <div>
    <van-field
      required
      label="收货人"
      v-model="addr.consignee"
      data-name="consignee"
      type="text"
      maxlength="12"
      placeholder="请输入收货人的真实姓名"
    />
    <van-field
      required
      type="phone"
      label="手机号"
      v-model="addr.mobile"
      data-name="mobile"
      maxlength="12"
      placeholder="请输入收货人的手机号码"
    />
    <van-field
      required
      readonly
      is-link
      clickable
      label="省市区"
      v-model="ssq"
      placeholder="选择城市"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <addressPicker province="addr.province" city="addr.city" district="addr.district" @onConfirm="onConfirm"/>
    </van-popup>
    <van-field
      required
      label="详细地址"
      type="textarea"
      autosize
      placeholder="请输入收货人详细地址"
      v-model="addr.address"
      data-name="address"
    />
    <div class="fixed-bottom">
      <div :class="['btn',canSubmit ? 'btn-blue' : 'disabled']" @click="submit">保存</div>
    </div>
  </div>
</template>

<script>
import peace from "@src/library";
import addressPicker from "./SelectAddress"
export default {
  components: {
    addressPicker
  },
  props: {},
  data() {
    return {
      addr: {
        addressId: "",
        consignee: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        address: "",
      },
      showPicker: false,
    };
  },

  computed: {
    canSubmit() {
      let bool = true;
      if (!this.addr.consignee.replace(/\s+/g, "")) {
        bool = false;
      }
      if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.addr.mobile)) {
        bool = false;
      }
      if (!this.addr.province || !this.addr.city || !this.addr.district) {
        bool = false;
      }
      if (!this.addr.address.replace(/\s+/g, "")) {
        bool = false;
      }
      return bool;
    },
    ssq() {
      if (this.addr.province && this.addr.city  && this.addr.district) {
        return this.addr.province + ' ' + this.addr.city + ' ' + this.addr.district
      }
      return ''
    }
  },

  methods: {
    
    onConfirm(value) {
      this.addr.province = value.province.name
      this.addr.city = value.city.name
      this.addr.district = value.district.name
      this.showPicker = false;
    },

    submit() {

      const data = {
            addressId: this.addr.addressId,
            consignee: this.addr.consignee,
            mobile: this.addr.mobile,
            province: this.addr.province,
            city: this.addr.city,
            district: this.addr.district,
            address: this.addr.address,
        }
      peace.service.patient.addAddress(data).then(res => {
        debugger
        console.log(res.data);
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.form-dl {
  background-color: #fff;
  padding: 30rpx;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  color: #000;
  font-size: 30rpx;
  border-bottom: 2rpx solid #f5f5f5;
}

.form-dl .form-dt {
  position: relative;
  flex: 0 0 auto;
  min-width: 200rpx;
}

.form-dt .red {
  display: inline;
  color: #fb2828;
}

.form-dl .form-dd {
  position: relative;
  flex: 1;
  color: #999;
  text-align: right;
}
.form-dl .form-dd.blue {
  color: #00c6ae;
}
.form-dd.value {
  color: #333;
}
.form-dd.icon-next {
  padding-right: 30rpx;
}

.form-dd.icon-next::before {
  content: "";
  position: absolute;
  display: inline-block;
  top: 8rpx;
  right: -15rpx;
  width: 30rpx;
  height: 30rpx;
  background-size: 15rpx;
  background-repeat: no-repeat;
}

.form-dd input,
input {
  color: #666;
}

.form-dd input.placeholder {
  color: #bebebe;
}
</style>