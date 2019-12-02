<template>
  <div style="height: 100%;">
    <div class
         v-if="isGet">
      <div :key="item.addressId"
           class="dl-two"
           v-for="item in addr">
        <div class="dt"
             data-index="index"
             @click="checkAddr(item)">
          <div class="tit">{{ item.detailAddress }}</div>
          <div class="small">{{ item.consignee }} {{ item.mobile }}</div>
        </div>
        <div class="dd">
          <div class="icons icon-edit"
               data-index="index"
               @click="goUserAddressEdit(item)"></div>
          <div class="icons icon-del"
               data-index="index"
               @click="delAddr(item.addressId)"></div>
        </div>
      </div>
    </div>
    <div class="none-page"
         v-if="!addr.length && isGet">
      <div class="icon icon_none_address"></div>
      <div class="none-text">暂无地址</div>
    </div>
    <div class="fixed-bottom btn-group"
         v-if="isGet">
      <div class="btn-group">
        <van-button class="btn btn-blue"
                    @click="addressEdit"
                    type="info">新增地址</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  props: {},
  data() {
    return {
      addr: [],
      isGet: false
    }
  },
  activated() {
    this.get()
  },
  methods: {
    get() {
      this.getAddressList()
    },
    getAddressList() {
      peace.service.patient.getAddressLists().then(res => {
        const tmp = res.data.addressLists
        this.isGet = true
        this.addr = tmp.map(item => item)
      })
    },
    goUserAddressEdit(address) {
      let json = this.$route.params.json
      let addr = peace.util.encode(address)
      this.$router.push({ path: `/setting/userAddressEdit/${json}`, query: { addr } })
    },
    addressEdit() {
      this.$router.push(`/setting/userAddressEdit/`)
    },
    delAddr(addressId) {
      peace.util.confirm(
        '确认删除',
        undefined,
        undefined,
        () => {
          debugger
          this.delAddress(addressId)
        },
        () => {}
      )
    },
    delAddress(id) {
      debugger
      const data = {
        addressId: id
      }
      peace.service.patient.delAddress(data).then(res => {
        this.get()
        console.log(res)
      })
    },
    checkAddr(address) {
      let json = this.$route.params.json
      let addr = peace.util.encode(address)
      let { addressId } = address
      let data = { addressId }
      peace.service.patient.setDefaultAddress(data).then(res => {
        console.log('设置成功', res)
        this.$router.push({ path: `/drug/drugOrderBefore/${json}`, query: { addr } })
      })
      // let json = this.$route.params.json
      // let addr = peace.util.encode(address)
      // this.$router.push({ path: `/drug/drugOrderBefore/${json}`, query: { addr } })
    }
  }
}
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
  padding: 10px 15px;
  border-bottom: 1px solid #dedede;
}
.dl-two .dt {
  flex: 1;
  flex-direction: column;
}
.dl-two .dd {
  float: 0 0 auto;
  width: 60px;
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
  font-size: 15px;
  font-weight: 700;
}
.dl-two .small {
  font-size: 15px;
  color: #666666;
  font-weight: normal;
  margin-top: 7.5px;
}
.icons {
  position: relative;
  width: 20px;
  height: 20px;
}
.icons::before {
  content: '';
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  background-size: cover;
}
.icons.icon-edit::before {
  content: '';
  background-image: url('../../assets/images/icon-edit.jpg');
}
.icons.icon-del {
  margin-left: 15px;
}
.icons.icon-del::before {
  content: '';
  background-image: url('../../assets/images/icon-del.jpg');
}

.icon_none_address::before {
  content: '';
  background-image: url('../../assets/images/icons/icon_none_address.jpg');
}
</style>
