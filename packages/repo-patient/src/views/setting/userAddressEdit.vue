<template>
  <div>
    <van-field
      required
      label="收货人"
      v-model="internalAddr.consignee"
      data-name="consignee"
      type="text"
      maxlength="12"
      placeholder="请输入收货人的真实姓名"
    />
    <van-field
      required
      type="phone"
      label="手机号"
      v-model="internalAddr.mobile"
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
      <addressPicker
        province="internalAddr.province"
        city="internalAddr.city"
        district="internalAddr.district"
        @onConfirm="onConfirm"
      />
    </van-popup>
    <van-field
      required
      label="详细地址"
      type="textarea"
      autosize
      placeholder="请输入收货人详细地址"
      v-model="internalAddr.address"
      data-name="address"
    />
    <div class="fixed-bottom">
      <div :class="['btn',canSubmit ? 'btn-blue' : 'disabled']" @click="submit">保存</div>
    </div>
  </div>
</template>

<script>
import peace from "@src/library";
import addressPicker from "./SelectAddress";
import { Dialog } from "vant";
export default {
  components: {
    addressPicker
  },
  props: {},
  data() {
    return {
      internalAddr: {
        addressId: "",
        consignee: "",
        mobile: "",
        province: "",
        city: "",
        district: "",
        address: ""
      },
      showPicker: false,
    };
  },
  computed: {
    canSubmit() {
      let bool = true;
      if (!this.internalAddr.consignee.replace(/\s+/g, "")) {
        bool = false;
      }
      if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.internalAddr.mobile)) {
        bool = false;
      }
      if (
        !this.internalAddr.province ||
        !this.internalAddr.city ||
        !this.internalAddr.district
      ) {
        bool = false;
      }
      if (!this.internalAddr.address.replace(/\s+/g, "")) {
        bool = false;
      }
      return bool;
    },
    ssq() {
      if (
        this.internalAddr.province &&
        this.internalAddr.city &&
        this.internalAddr.district
      ) {
        return (
          this.internalAddr.province +
          " " +
          this.internalAddr.city +
          " " +
          this.internalAddr.district
        );
      }
      return "";
    }
  },
  created() {
    const params = peace.util.decode(this.$route.params.json);
    if (params.hasOwnProperty('addressId')) {
      this.internalAddr = params;
    }
  },
  methods: {
    onConfirm(value) {
      this.internalAddr.province = value.province.name;
      this.internalAddr.city = value.city.name;
      this.internalAddr.district = value.district.name;
      this.showPicker = false;
    },

    submit() {
      const data = {
        addressId: this.internalAddr.addressId,
        consignee: this.internalAddr.consignee,
        mobile: this.internalAddr.mobile,
        province: this.internalAddr.province,
        city: this.internalAddr.city,
        district: this.internalAddr.district,
        address: this.internalAddr.address
      };
      peace.service.patient
        .addAddress(data)
        .then(res => {
          console.log(res);
          peace.util.alert(this.internalAddr.addressId ? "编辑成功" : '添加成功')
          this.$router.go(-1);
        })
        .catch(res => {
          Dialog.alert({
              title: this.internalAddr.addressId ? "编辑失败" : "添加失败",
              message: res.data.msg
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>