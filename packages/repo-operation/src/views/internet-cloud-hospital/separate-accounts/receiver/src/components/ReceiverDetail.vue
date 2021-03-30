<template>
  <div>
    <el-form ref="form"
             :model="model"
             :rules="rules"
             label-width="auto"
             label-suffix="：">
      <el-form-item label="机构名称"
                    :prop="canEdit?'organizationName':''">
        <template v-if="canEdit">
          <el-select v-model.trim="model.organizationObject"
                     value-key="custCode"
                     clearable=""
                     placeholder="请选择">
            <el-option v-bind:key="index"
                       v-bind:label="item.organizationName"
                       v-bind:value="item"
                       v-for="(item, index) in organizationList">
            </el-option>
          </el-select>
        </template>
        <template v-else>
          <div class="flex justify-between">
            <span>{{model.organizationName}}</span>

            <el-button type="text"
                       icon="zyy-icon zyy-xiugai2">修改</el-button>
          </div>
        </template>
      </el-form-item>

      <el-form-item v-for="(subMch,index) in model.subMch"
                    v-bind:key="index"
                    class="order-type-item q-pt-24 q-pl-16"
                    label="">
        <el-button class="del-btn"
                   type="text"
                   icon="zyy-icon zyy-shanchu1"
                   v-on:click="deleteOrderType(index)"
                   v-if="index>0">删除</el-button>
        <div class="flex full-width row">
          <el-form-item class="col-4 q-mr-24"
                        label="订单类型"
                        :prop="'subMch.'+index+'.orderType'"
                        :rules="[{
                            required: true, message: '请选择订单类型', trigger: 'change'
                          }]">
            <el-select v-model="subMch.orderType"
                       multiple
                       placeholder="请选择">
              <el-option v-for="item in source.orderTypes"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="col-6"
                        label="特约商户号机构"
                        :prop="'subMch.'+index+'.subMchName'"
                        :rules="[{
                            required: true, message: '请选择商户号机构名称', trigger: 'change'
                          }]">
            <el-select v-model="subMch.subMchObject"
                       v-on:change="selectSubMchObject(subMch,index)"
                       value-key="value"
                       clearable=""
                       placeholder="请选择">
              <el-option v-for="item in source.subMchName"
                         v-bind:key="item.value"
                         v-bind:label="item.label"
                         v-bind:value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="flex full-width row">
          <el-form-item class="col-4 q-mr-24"
                        label="商户号"
                        :prop="'subMch.'+index+'.subMchId'"
                        :rules="[{
                            required: true, message: '请选择商户号机构名称', trigger: 'change'
                          }]">
            <el-input v-model="subMch.subMchId"
                      class="readonly disabled"></el-input>
          </el-form-item>
          <el-form-item class="col-6 flex items-center"
                        label="微信结算费率"
                        :prop="'subMch.'+index+'.accountingRate'"
                        :rules="[{
                            required: true, message: '请选择微信结算费率', trigger: 'change'
                          }]">
            <el-radio-group v-model.number="subMch.accountingRate">
              <el-radio v-bind:label="0">0%</el-radio>
              <el-radio v-bind:label="0.6">0.6%</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="flex full-width row">
          <el-form-item class="col-4 q-mr-24"
                        label="允许最大分账比率"
                        :prop="'subMch.'+index+'.maxShareRatio'"
                        :rules="[{
                            required: true, message: '请输入允许最大分账比率', trigger: 'blur'
                          }]">
            <el-input-number v-model="subMch.maxShareRatio"
                             controls-position="right"
                             v-bind:min="1"
                             v-bind:max="99"
                             v-bind:precision="0"
                             v-force="'pInterger'"></el-input-number>
          </el-form-item>
          <el-form-item class="col-6"
                        label="">

          </el-form-item>
        </div>
      </el-form-item>

      <template v-if="canShowAddOrderTypeBtn">
        <el-button v-on:click="addOrderType"
                   icon="zyy-icon zyy-xinzeng"
                   type="text"
                   class="add-rule-btn text-primary">新增订单类型</el-button>
      </template>

      <el-form-item label=""
                    label-width="auto">
        <div class="flex  full-width row justify-end">
          <el-button v-on:click="cancel">取消</el-button>
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
    type: String
  },
  data() {
    return {
      model: {
        custCode: '',
        organizationName: '',
        organizationObject: {},
        subMch: [{ custCode: '', organizationName: '', subMchId: '', subMchName: '', maxShareRatio: '', accountingRate: '', orderType: [] }]
      },
      isEdit: false,
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
    canEdit() {
      return this.type === 'add' || (this.type === 'detail' && this.isEdit)
    },
    canShowAddOrderTypeBtn() {
      return this.canEdit && this.model.subMch.length < this.source.orderTypes.length ? true : false
    }
  },
  async created() {
    this.source.subMchName = await Peace.identity.dictionary.getList('wx_sbnc')
  },

  methods: {
    selectSubMchObject(data) {
      data.subMchId = data.subMchObject.value
      data.subMchName = data.subMchObject.label
    },
    addOrderType() {
      const info = {
        custCode: '',
        organizationName: '',
        subMchId: '',
        subMchName: '',
        maxShareRatio: '',
        accountingRate: '',
        orderType: ''
      }

      this.model.subMch.push(info)
    },
    deleteOrderType(index) {
      this.model.subMch.splice(index, 1)
    },
    cancel() {
      this.$emit('onCancel')
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //将model.custCode model.organizationName 赋值给 model.subMch ，获取model.subMch,传给后端
          const params = Peace.util.deepClone(this.model.subMch)
          params.forEach((element) => {
            element.custCode = this.model.custCode
            element.organizationName = this.model.organizationName
            element.orderType = element.orderType.join(',')
          })
          Service.addSubMch(params).then((res) => {
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
.el-select {
  width: 240px;
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