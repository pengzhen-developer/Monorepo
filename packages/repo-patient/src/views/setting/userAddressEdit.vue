<template>
  <div>
    <van-field class="require"
               label="收货人"
               v-model="internalAddr.consignee"
               data-name="consignee"
               type="text"
               maxlength="12"
               placeholder="请输入收货人的真实姓名" />
    <van-field class="require"
               type="phone"
               label="手机号"
               v-model="internalAddr.mobile"
               data-name="mobile"
               maxlength="11"
               minlength="11"
               placeholder="请输入收货人的手机号码" />
    <van-field class="require"
               readonly
               is-link
               clickable
               label="省市区"
               v-model="ssq"
               placeholder="选择城市"
               @click="showPicker = true" />
    <van-popup v-model="showPicker"
               position="bottom">
      <addressPicker province="internalAddr.province"
                     city="internalAddr.city"
                     district="internalAddr.district"
                     @onCancel="onCancel"
                     @onConfirm="onConfirm" />
    </van-popup>
    <van-field class="require"
               label="详细地址"
               type="textarea"
               autosize
               maxlength="120"
               placeholder="请输入收货人详细地址"
               v-model="internalAddr.address"
               data-name="address" />
    <div class="fixed-bottom">
      <!-- <div class="btn btn-blue"
           @click="submit">保存</div> -->
      <peace-button round
                    throttle
                    :throttleTime="1000"
                    type="primary"
                    size="large"
                    class="full"
                    @click="submit">保存</peace-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import addressPicker from './SelectAddress'

export default {
  components: {
    addressPicker
  },
  props: {},
  data() {
    return {
      internalAddr: {
        addressId: '',
        consignee: '',
        mobile: '',
        province: '',
        city: '',
        district: '',
        address: ''
      },
      showPicker: false
    }
  },
  computed: {
    canSubmit() {
      let bool = true
      if (!this.internalAddr.consignee.replace(/\s+/g, '')) {
        bool = false
      }
      if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.internalAddr.mobile)) {
        bool = false
      }
      if (!this.internalAddr.province || !this.internalAddr.city || !this.internalAddr.district) {
        bool = false
      }
      if (!this.internalAddr.address.replace(/\s+/g, '')) {
        bool = false
      }
      return bool
    },
    ssq() {
      if (this.internalAddr.province && this.internalAddr.city && this.internalAddr.district) {
        return this.internalAddr.province + ' ' + this.internalAddr.city + ' ' + this.internalAddr.district
      }
      return ''
    }
  },
  created() {
    const addr = peace.util.decode(this.$route.query.addr)
    const params = peace.util.decode(this.$route.params.json)
    if (params.hasOwnProperty('addressId')) {
      this.internalAddr = params
    }
    if (addr.hasOwnProperty('addressId')) {
      this.internalAddr = addr
    }
  },
  methods: {
    onConfirm(value) {
      this.internalAddr.province = value.province.name
      this.internalAddr.city = value.city.name
      this.internalAddr.district = value.district.name
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
    },
    submit() {
      if (!this.internalAddr.consignee.replace(/\s+/g, '')) {
        peace.util.warning('请填写收货人名称')
        return
      } else if (!this.internalAddr.mobile.replace(/\s+/g, '')) {
        peace.util.warning('请填写手机号')
        return
      } else if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.internalAddr.mobile)) {
        peace.util.warning('请填写正确手机号')
        return
      } else if (!this.internalAddr.province || !this.internalAddr.city || !this.internalAddr.district) {
        peace.util.warning('请选择省市区')
        return
      } else if (!this.internalAddr.address.replace(/\s+/g, '')) {
        peace.util.warning('请填写详细地址')
        return
      }
      const data = {
        addressId: this.internalAddr.addressId,
        consignee: this.internalAddr.consignee,
        mobile: this.internalAddr.mobile,
        province: this.internalAddr.province,
        city: this.internalAddr.city,
        district: this.internalAddr.district,
        address: this.internalAddr.address
      }
      peace.service.patient
        .addAddress(data)
        .then((res) => {
          peace.util.alert(this.internalAddr.addressId ? '编辑成功' : '添加成功')
          this.checkAddr(res.data.address_id)

          //
          // AccessCode: "GJ1FST"
          // Detailed: "湖北省武汉市汉阳区国信新城二期3号门面房"
          // DrugStoreId: "GJNEDR"
          // JZTClaimNo: "3O5NM0-201910281025390581-2019102839538594"
          // ShippingMethod: 2
          // familyId: "cishjjjduj"
        })
        .catch(() => {
          // console.log(res)
          // Dialog.alert({
          //   title: this.internalAddr.addressId ? '编辑失败' : '添加失败',
          //   message: res.data.msg
          // })
        })
    },
    checkAddr(addressId) {
      let data = { addressId }
      peace.service.patient.setDefaultAddress(data).then(() => {
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
