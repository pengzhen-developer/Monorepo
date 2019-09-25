<template>
  <div>
    <form bindsubmit="submitAddrForm">
      <div class="form-dl">
        <div class="form-dt">
          收货人
          <div class="red">*</div>
        </div>
        <div class="form-dd {{page.red}}">
          <input
            name="consignee"
            type="text"
            class="form-input"
            value="{{addr.consignee}}"
            data-name="consignee"
            placeholder="请输入收货人的真实姓名"
            placeholder-class="placeholder"
            placeholder-style="{color:#BEBEBE}"
            bindinput="watchInput"
            bindblur="watchInput"
            bindfocus="watchInput"
          />
        </div>
      </div>
      <div class="form-dl">
        <div class="form-dt">
          手机号
          <div class="red">*</div>
        </div>
        <div class="form-dd {{page.red}}">
          <input
            name="mobile"
            type="number"
            class="form-input"
            value="{{addr.mobile}}"
            data-name="mobile"
            placeholder="请输入收货人的手机号码"
            maxlength="11"
            placeholder-class="placeholder"
            bindinput="watchInput"
            bindblur="watchInput"
            bindfocus="watchInput"
          />
        </div>
      </div>
      <div class="form-dl">
        <div class="form-dt">
          省市区
          <div class="red">*</div>
        </div>
        <div class="form-dd icon-next" data-type>
          <picker
            mode="region"
            value="{{ssq}}"
            bindchange="bindRegionChange"
          >{{addr.province ? addr.province + ' ' + addr.city + ' ' +addr.district : '请选择省市区'}}</picker>
        </div>
      </div>
      <div class="form-dl">
        <div class="form-dt">
          详细地址
          <div class="red">*</div>
        </div>
        <div class="form-dd">
          <input
            name="address"
            type="text"
            class="form-input"
            value="{{addr.address}}"
            data-name="address"
            placeholder="请输入收货人详细地址"
            placeholder-class="placeholder"
            bindinput="watchInput"
            bindblur="watchInput"
            bindfocus="watchInput"
          />
        </div>
      </div>

      <div class="fixed-bottom">
        <button class="btn" v-bind:class="{ 'btn-blue' : canSubmit, 'disabled' : !canSubmit}" form-type="submit">保存</button>
      </div>
    </form>s
  </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            addr: {
            addressId: '',
            consignee: '',
            mobile: '',
            province: '',
            city: '',
            district: '',
            address: '',
            },
            canSubmit: false,
            ssq: ['','','']
        }
    }
};
</script>

<style lang="scss" scoped>
</style>