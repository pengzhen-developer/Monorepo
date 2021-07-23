<template>
  <div class="layout-route">

    <div class="card card-search">
      <div class="q-mb-18">
        <el-button plain
                   icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>
      <div class="org-name">
        {{props.Name}}
      </div>
    </div>

    <div class="card"
         v-loading="loading">
      <div class="q-pb-24">
        <el-button @click="addOrg"
                   type="primary">新增开户机构</el-button>
      </div>
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
                     :title="isEdit ? '修改开户机构':'新增开户机构'">
          <OrganModel v-on:onCloseOrgan="onCloseOrgan"
                      v-bind:data="orgModel"
                      v-bind:config="currentOrgForm"></OrganModel>
        </PeaceDialog>
      </div>
    </div>
  </div>
</template>

<script>
import Observable from '../observable'
import Service from '../service'

import OrganModel from './OrganModel'

let CLOUD_MODEL = {
  Id: '', // 云仓唯一标识
  Name: '', // 名称
  SystemCode: '', // 系统编码
  Type: '', // 系统类型 0 ERP  2 九州云仓
  CodeIn3PartPlatform: '', // 物流中心ID  / branchid
  IDIn3PartPlatform: '', // 运营方ID
  PrentCustList: [] // 机构数据信息
}

let ORGAN_MODEL = {
  PrentId: '', // 云仓唯一标识
  Id: '', // 机构唯一标识
  Name: '', // 机构名称
  Code: '', // 机构编码
  IDIn3PartPlatform: '', // 内码 / 委托方ID
  Type: '', // 类型  1 erp   4 九州云仓
  CodeIn3PartPlatform: '', // 编码
  Effective: '' // 启用状态 1 已启用 0已禁用
}

export default {
  components: {
    OrganModel
  },

  data() {
    return {
      loading: true,
      cloudInfo: {},
      prentCustList: [],
      orgDict: [],
      systemCode: '',

      orgVisible: false,
      isEdit: false,
      orgModel: Object.assign({}, ORGAN_MODEL),

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
    props() {
      return Observable.state.props
    },
    view() {
      return Observable.state.view
    },
    orgConfig() {
      let config = this.orgDict.find((item) => item.SystemCode === this.systemCode)
      return config ? config.item : []
    }
  },

  watch: {
    view(value) {
      if (value === Observable.constants.view.ORGAN) {
        this.getInfo()
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      if (this.props.Id) {
        this.getInfo()
      }
    })
  },

  methods: {
    getInfo() {
      this.loading = true
      let params = {
        ID: this.props.Id
      }
      Service.getInfo(params)
        .then((res) => {
          this.cloudInfo = res.data.GetCustIn3PartRes || Object.assign({}, CLOUD_MODEL)
          this.orgDict = res.data.CustomerStructure
          this.prentCustList = this.cloudInfo.PrentCustList
          this.systemCode = this.cloudInfo.SystemCode
          this.currentOrgForm = this.orgDict.find((item) => item.SystemCode === this.systemCode)
        })
        .finally(() => {
          this.loading = false
        })
    },
    addOrg() {
      this.orgModel = Object.assign({}, ORGAN_MODEL)
      this.orgModel.PrentId = this.cloudInfo.Id
      this.isEdit = false
      this.orgVisible = true
    },
    updateOrg(item) {
      this.orgModel = item
      this.isEdit = true
      this.orgVisible = true
    },
    onCloseOrgan() {
      this.getInfo()
      this.orgVisible = false
    },
    deleteOrg(item) {
      this.$confirm('确定删除此机构？', '提示', { closeOnClickModal: false })
        .then(() => {
          const params = {
            ID: item.Id
          }
          Service.deleteWarehouseOrg(params).then(() => {
            this.getInfo()
            Peace.util.success('删除成功')
          })
        })
        .catch(() => {})
    },

    back() {
      Observable.mutations.changeView(Observable.constants.view.LIST)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-name {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  line-height: 28px;
}

p {
  margin: 0;
  padding: 0;
}
.item-content {
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