<template>
  <div class="item-content row q-col-gutter-lg">
    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4"
         v-for="item in prentCustList"
         v-bind:key="item.Id">
      <div class="child-wrap">
        <div class="child-content">
          <div class="title-wrap">
            <p class="title-key">开户机构：</p>
            <p class="title-value">{{item.Name}}</p>
          </div>
          <div class="title-wrap">
            <p class="title-key">内码（custid）：</p>
            <p class="title-value">{{item.IDIn3PartPlatform}}</p>
          </div>
          <div class="title-wrap">
            <p class="title-key">编码（custno）：</p>
            <p class="title-value">{{item.CodeIn3PartPlatform}}</p>
          </div>
          <div class="title-wrap">
            <p class="title-key">使用状态：</p>
            <p class="title-value">{{item.Effective==1?"已启用":"已禁用"}} </p>
          </div>
        </div>
        <div class="child-tips">开户详情</div>
        <img src="../assets/img/zyy-icon-xiugai.png"
             class="zyy-icon-xiugai"
             v-on:click="updateOrgan(item)" />
      </div>
    </div>
    <el-dialog v-if="oragnVisible"
               width="516px"
               v-bind:visible.sync="oragnVisible"
               title="修改机构">
      <AddOrgan v-on:onCloseOrgan="oncloseOrgan"
                v-bind:data="custItem"></AddOrgan>
    </el-dialog>
  </div>
</template>

<script>
import AddOrgan from '../components/AddOrgan'

export default {
  props: {
    prentCustList: Array
  },
  components: {
    AddOrgan
  },

  data() {
    return {
      oragnVisible: false,
      custItem: {}
    }
  },

  created() {},

  computed: {},

  methods: {
    updateOrgan(item) {
      this.oragnVisible = true
      this.custItem = item
    },
    oncloseOrgan() {
      this.oragnVisible = false
      this.$emit('onUpdateOrgan')
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.item-content {
  padding-top: 26px;
  flex-direction: row;
}
.child-wrap {
  padding-left: 10px;
  position: relative;
}
.child-content {
  background: rgba(249, 249, 249, 1);
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.01);
  border-radius: 4px;
  border: 0px solid rgba(245, 245, 245, 1);
  padding: 62px 16px 4px 16px;
}
.title-wrap {
  display: flex;
  margin-bottom: 16px;
}
.title-key {
  width: 114px;
  font-size: 14px;
  color: var(--q-color-grey-666);
  word-break: break-all;
}
.title-value {
  font-size: 14px;
  color: var(--q-color-grey-333);
  flex: 1;
  min-width: 0;
}
.child-tips {
  position: absolute;
  padding: 0 10px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  background: #3099a6;
  border-radius: 2px;
  left: 0;
  top: 10px;
}
.zyy-icon-xiugai {
  position: absolute;
  right: 17px;
  top: 11px;
  cursor: pointer;
}
</style>