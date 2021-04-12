<template>
  <div>
    <el-form ref="form"
             :model="model"
             :rules="rules"
             label-width="auto"
             label-suffix="："
             :class="{'detail':canShowInfo}">
      <el-form-item label="机构名称"
                    :prop="canEditInfo?'organizationName':''"
                    class="organizationName">

        <div class="flex justify-between full-width">
          <template v-if="canShowInfo">
            <span>{{model.organizationName}}</span>
          </template>
          <template v-if="canEditInfo">
            <el-select v-model.trim="model.organizationObject"
                       value-key="custCode"
                       clearable=""
                       :disabled="type==='detail'"
                       placeholder="请选择">
              <el-option v-bind:key="index"
                         v-bind:label="item.organizationName"
                         v-bind:value="item"
                         v-for="(item, index) in organizationList">
              </el-option>
            </el-select>
          </template>
          <el-button v-if="canShowInfo"
                     type="text"
                     v-on:click="isEdit=true"
                     icon="zyy-icon zyy-xiugai2">修改</el-button>
        </div>

      </el-form-item>
      <template v-if="isLoaded">
        <el-form-item v-for="(subMch,index) in subMchList"
                      v-bind:key="index"
                      class="order-type-item q-pt-24 q-pl-16 "
                      label="">
          <el-button class="del-btn"
                     type="text"
                     icon="zyy-icon zyy-shanchu1"
                     v-on:click="deleteOrderType(index)"
                     v-if="index>0&&canEditInfo">删除</el-button>
          <div class="flex full-width row">

            <el-form-item class="col-4 q-mr-24 "
                          label="订单类型"
                          :prop="'subMch.'+index+'.orderType'"
                          :rules="[{
                            required: canEditInfo?true:false, message: '请选择订单类型', trigger: 'change'
                          }]">
              <template v-if="canShowInfo">
                <span>{{subMch.orderTypeTxt}}</span>
              </template>
              <template v-if="canEditInfo">
                <el-select v-model="subMch.orderType"
                           :multiple="type==='add'?true:false"
                           :disabled="!!subMch.id"
                           placeholder="请选择"
                           style="width:240px;">
                  <el-option v-for="item in source.orderTypes"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>

            <el-form-item class="col-6"
                          label="特约商户号机构"
                          :prop="'subMch.'+index+'.subMchName'"
                          :rules="[{
                            required: canEditInfo?true:false, message: '请选择特约商户号机构名称', trigger: 'change'
                          }]">
              <template v-if="canShowInfo">
                <span>{{subMch.subMchName}}</span>
              </template>
              <template v-if="canEditInfo">

                <el-select v-model="subMch.subMchObject"
                           v-on:change="selectSubMchObject(subMch,index)"
                           value-key="value"
                           clearable=""
                           placeholder="请选择"
                           style="width:360px;">
                  <el-option v-for="item in source.subMchName"
                             v-bind:key="item.value"
                             v-bind:label="item.label"
                             v-bind:value="item"></el-option>
                </el-select>
              </template>
            </el-form-item>

            <el-form-item class="col-4 q-mr-24"
                          label="商户号"
                          :prop="'subMch.'+index+'.subMchId'"
                          :rules="[{
                            required: canEditInfo?true:false, message: '请选择特约商户号机构名称', trigger: 'change'
                          }]"
                          v-if="subMch.subMchId">
              <template v-if="canShowInfo">
                <span>{{subMch.subMchId}}</span>
              </template>
              <template v-if="canEditInfo">
                <el-input v-model="subMch.subMchId"
                          disabled></el-input>
              </template>
            </el-form-item>

            <el-form-item class="col-4 flex items-center q-mr-24 "
                          label="微信结算费率"
                          :prop="'subMch.'+index+'.accountingRate'"
                          :rules="[{
                            required: canEditInfo?true:false, message: '请选择微信结算费率', trigger: 'change'
                          }]">
              <template v-if="canShowInfo">
                <span>{{subMch.accountingRate}}%</span>
              </template>
              <template v-if="canEditInfo">
                <el-radio-group v-model="subMch.accountingRate">
                  <el-radio label="0.0">0%</el-radio>
                  <el-radio label="0.6">0.6%</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>

            <el-form-item class="col-4 q-mr-24"
                          label="允许最大分账比率"
                          :prop="'subMch.'+index+'.maxShareRatio'"
                          :rules="[{
                            required: canEditInfo?true:false, message: '请输入允许最大分账比率', trigger: 'blur'
                          }]">
              <template v-if="canShowInfo">
                <span>{{subMch.maxShareRatio}}%</span>
              </template>
              <template v-if="canEditInfo">
                <el-input-number v-model="subMch.maxShareRatio"
                                 controls-position="right"
                                 v-bind:min="1"
                                 v-bind:max="99"
                                 v-bind:precision="0"
                                 v-force="'pInterger'"></el-input-number>
                <span class="q-ml-sm">%</span>
              </template>
            </el-form-item>

          </div>
        </el-form-item>
      </template>
      <template v-if="canShowAddOrderTypeBtn">
        <el-button v-on:click="addOrderType"
                   icon="zyy-icon zyy-xinzeng"
                   type="text"
                   class="add-rule-btn text-primary">新增订单类型</el-button>
      </template>

      <el-form-item label=""
                    label-width="auto"
                    v-if="canShowFooter">
        <div class="flex  full-width row justify-end">
          <el-button v-on:click="cancel"
                     v-if="type==='add'">取消</el-button>
          <el-button v-on:click="cancelEdit"
                     v-if="isEdit">取消修改</el-button>
          <el-button v-on:click="submit"
                     type="primary">保存</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'
import Constant from '../contant'
export default {
  name: 'receiver-detail',
  props: {
    organizationList: Array,
    organizationInfo: Object,
    type: String
  },
  data() {
    return {
      model: {
        custCode: '',
        organizationName: '',
        organizationObject: {},
        subMch: [
          {
            custCode: '',
            organizationName: '',
            subMchId: '',
            subMchName: '',
            subMchObject: {},
            maxShareRatio: '',
            accountingRate: '',
            orderType: [],
            isDel: 0
          }
        ]
      },
      isEdit: false,
      isLoaded: false,
      //取消编辑，回退到初始化
      subMch: [],
      source: {
        subMchName: [],
        orderTypes: Constant.orderType
      },
      rules: {
        organizationName: [{ required: true, message: '请选择所属机构', trigger: 'change' }]
      }
    }
  },
  watch: {
    ['model.organizationObject']: {
      handler() {
        this.model.organizationName = this.model.organizationObject.organizationName
        this.model.custCode = this.model.organizationObject.custCode
      },
      immediate: true
    }
  },
  computed: {
    subMchList() {
      return this.model.subMch.filter((item) => !item.isDel)
    },
    canShowInfo() {
      return this.type === 'detail' && !this.isEdit
    },
    canEditInfo() {
      return this.type === 'add' || (this.type === 'detail' && this.isEdit)
    },
    canShowFooter() {
      return this.type === 'add' || (this.type === 'detail' && this.isEdit)
    },
    canShowAddOrderTypeBtn() {
      return ((this.type === 'detail' && this.isEdit) || this.type === 'add') && this.model.subMch.length < this.source.orderTypes.length ? true : false
    }
  },
  async created() {
    this.source.subMchName = await Peace.identity.dictionary.getList('wx_sbnc')

    this.getMchByCustCode()
  },

  methods: {
    getMchByCustCode() {
      if (this.type !== 'detail') {
        this.isLoaded = true
        return
      }
      const params = { custCode: this.organizationInfo.custCode }
      Service.getMchByCustCode(params).then((res) => {
        this.model.organizationObject = this.organizationInfo
        res.data.list.map((item) => {
          item.subMchObject = {
            value: item.subMchId,
            label: item.subMchName
          }
        })
        this.model.subMch = Peace.util.deepClone(res.data.list)
        this.subMch = Peace.util.deepClone(res.data.list)
        this.isLoaded = true
      })
    },
    selectSubMchObject(data) {
      data.subMchId = data.subMchObject.value
      data.subMchName = data.subMchObject.label
    },
    getIndex(subMch) {
      return this.subMchList.findIndex((item) => item.orderType == subMch.orderType)
    },
    addOrderType() {
      const info = {
        custCode: '',
        organizationName: '',
        subMchId: '',
        subMchName: '',
        subMchObject: {},
        maxShareRatio: '',
        accountingRate: '',
        orderType: this.type == 'add' ? [] : '',
        isDel: 0
      }

      this.model.subMch.push(info)
    },
    deleteOrderType(index) {
      this.model.subMch.splice(index, 1)
    },
    cancel() {
      this.$emit('onCancel')
    },
    cancelEdit() {
      this.isEdit = false
      this.model.subMch = Peace.util.deepClone(this.subMch)
      this.$refs.form.clearValidate()
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //将model.custCode model.organizationName 赋值给 model.subMch ，获取model.subMch,传给后端
          let params = Peace.util.deepClone(this.model.subMch)
          if (this.type == 'detail') {
            // 处理被删除的项
            this.subMch.forEach((before) => {
              let result = this.model.subMch.find((after) => after.id === before.id)
              if (!result) {
                before.isDel = 1
                params.push(before)
              }
            })
          }

          //检验订单类型
          //修改 单选 orderType 字符串
          let orderTypeList = []
          let result = []
          let flag = false
          if (this.type === 'detail') {
            this.subMchList.map((item) => orderTypeList.push(item.orderType))
            //新增 多选  orderType 数组
          } else {
            this.subMchList.map((item) => (orderTypeList = orderTypeList.concat(item.orderType)))
          }
          orderTypeList.map((item) => {
            if (result.findIndex((temp) => temp == item) !== -1) {
              flag = true
            } else {
              result.push(item)
            }
          })
          if (flag) {
            return Peace.util.warning('订单类型不能重复')
          }
          params.forEach((element) => {
            element.custCode = this.model.custCode
            element.organizationName = this.model.organizationName
            element.orderType = Array.isArray(element.orderType) ? element.orderType.join(',') : element.orderType
            if (this.type === 'detail') {
              element.id = element.id || ''
            }
          })

          const service = this.type === 'add' ? 'addSubMch' : 'updateSubMch'
          Service[service](params).then((res) => {
            Peace.util.alert(res.msg)
            this.$emit('onSucess')
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form.detail .el-form-item:not(.order-type-item) {
  margin-bottom: 0;
}
.el-form.detail:not(.element-ui-default) .el-form-item.organizationName {
  margin-bottom: 16px;
}
.el-form .el-form-item.organizationName {
  margin-bottom: 16px;
}
.el-form.detail .el-form-item.order-type-item {
  padding-bottom: 24px;
}
::v-deep .el-button--text i {
  margin-right: 4px;
}

::v-deep .el-form {
  .el-form-item__label-wrap,
  .el-form-item__content {
    margin-left: 0 !important;
    display: flex;
    align-items: center;
  }
}
::v-deep .order-type-item {
  background: #f5f5f5;
  border-radius: 2px;
  position: relative;
  margin-bottom: 16px !important;
  > .el-form-item__content {
    flex-direction: column;
  }
  .del-btn {
    position: absolute;
    right: 16px;
    top: -16px;
  }
}
</style>