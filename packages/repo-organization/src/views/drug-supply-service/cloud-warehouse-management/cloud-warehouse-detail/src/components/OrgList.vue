<template>
  <div class="item-content row q-col-gutter-lg">
    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6"
         v-for="item in prentCustList"
         v-bind:key="item.Id">
      <div class="child-wrap">
        <div class="child-content">
          <div class="title-wrap">
            <p class="title-key">开户机构：</p>
            <p class="title-value">{{item.Name}}</p>
          </div>

          <div class="title-wrap"
               v-for="orgDictItem in orgConfig"
               :key="orgDictItem.Label">
            <p class="title-key">{{orgDictItem.Label}}：</p>
            <p class="title-value">{{item[orgDictItem.Name]}}</p>
          </div>

          <div class="title-wrap">
            <p class="title-key">使用状态：</p>
            <p class="title-value">{{item.Effective==1?"已启用":"已禁用"}} </p>
          </div>
        </div>
        <div class="child-tips">开户详情</div>
        <div class="child-operate">
          <el-button type="text"
                     size="mini"
                     icon="el-icon-edit"
                     v-on:click="updateOrg(item)">修改</el-button>
          <span class="split-line">|</span>
          <el-button type="text"
                     size="mini"
                     icon="el-icon-delete"
                     v-on:click="deleteOrg(item)">删除</el-button>
        </div>
      </div>
    </div>
    <PeaceDialog v-if="orgVisible"
                 width="450px"
                 v-bind:visible.sync="orgVisible"
                 title="修改开户机构">
      <AddOrgan v-on:onCloseOrgan="onCloseOrgan"
                v-bind:data="orgItem"
                v-bind:config="currentOrgForm"></AddOrgan>
    </PeaceDialog>
  </div>
</template>

<script>
import AddOrgan from '../components/AddOrgan'
import Service from '../service'

export default {
  props: {
    prentCustList: {
      type: Array
    },
    orgDict: {
      type: Array
    },
    systemCode: {
      type: String
    }
  },
  components: {
    AddOrgan
  },

  data() {
    return {
      orgVisible: false,
      orgItem: {},

      // 当前机构使用的表单配置
      currentOrgForm: {
        Code: '',
        Name: '',
        Type: '',
        item: []
      }
    }
  },

  computed: {
    orgConfig() {
      let config = this.orgDict.find((item) => item.SystemCode === this.systemCode)
      return config ? config.item : []
    }
  },

  methods: {
    updateOrg(item) {
      this.orgItem = item
      this.currentOrgForm = this.orgDict.find((item) => item.SystemCode === this.systemCode)
      this.orgVisible = true
    },
    onCloseOrgan() {
      this.orgVisible = false
      this.$emit('onUpdateOrgan')
    },
    deleteOrg(item) {
      this.$confirm('确定删除此机构？', '提示', { closeOnClickModal: false })
        .then(() => {
          const params = {
            ID: item.Id
          }
          Service.deleteWarehouseOrg(params).then(() => {
            Peace.util.success('删除成功')
            this.$emit('onUpdateOrgan')
          })
        })
        .catch(() => {})
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
  padding: 62px 24px 16px 24px;
}
.title-wrap {
  display: flex;
  margin-bottom: 8px;
}
.title-key {
  width: 120px;
  padding-right: 8px;
  font-size: 14px;
  color: #666666;
  text-align: right;
  word-break: break-all;
}
.title-value {
  flex: 1;
  font-size: 14px;
  color: #333333;
  word-break: break-all;
  word-wrap: break-word;
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

.child-operate {
  position: absolute;
  top: 14px;
  right: 16px;
  .split-line {
    padding: 0 12px;
    font-size: 16px;
    color: var(--q-color-primary);
    text-align: center;
  }
}
</style>