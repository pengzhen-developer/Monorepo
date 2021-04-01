<template>
  <div>
    <el-form ref="form"
             v-bind:model="model"
             v-bind:rules="rules"
             label-width="110px"
             label-position="right"
             label-suffix="："
             size="mini">
      <el-form-item label="服务类型"
                    prop="serviceType">
        <template v-if="info.type=='edit'">
          <div>{{serviceTypesText(model.serviceType)}}</div>
        </template>
        <template ate
                  v-else>
          <el-radio-group v-model="model.serviceType"
                          @change="changeServiceType">
            <el-radio v-bind:label="item.key"
                      v-for="item in Constant.serviceTypes"
                      v-bind:key="item.key">{{item.value}}</el-radio>
          </el-radio-group>
        </template>

      </el-form-item>
      <el-form-item label="机构名称"
                    prop="custCode">
        <template v-if="info.type=='edit'">
          <div>{{model.organizationName}}</div>
        </template>
        <template v-if="info.type == 'add'">
          <el-select v-model="model.custCode"
                     @change="selectCustCode">
            <el-option v-for="item in organizationList"
                       v-bind:key="item.custCode"
                       v-bind:label="item.organizationName"
                       v-bind:value="item.custCode"></el-option>
          </el-select>
        </template>

      </el-form-item>

      <template v-for="(rule,index) in  model.profitsharingRule">
        <el-form-item label=""
                      label-width="0"
                      v-bind:key="index"
                      v-if="!rule.isDel">
          <el-divider></el-divider>
          <div class="row justify-between rule"><span class="num">规则{{toChinaNum(index+1)}}</span> <span class="del"
                  v-if="index>0"
                  @click="removeRule(rule,index)">删除</span></div>

          <el-form-item label="订单类型"
                        label-position="right"
                        label-width="110px"
                        :prop="'profitsharingRule.'+index+'.orderType'"
                        :rules="[{
                            required: true, message: '请选择订单类型', trigger:isChangeSerivceType? 'blur':'change'
                          }]">
            <el-select v-model="rule.orderType"
                       @change="selectOrderType">
              <el-option v-for="(item,index) in orderType"
                         :label="item.value"
                         :value="item.key"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否分账"
                        label-position="right"
                        label-width="110px"
                        :prop="'profitsharingRule.'+index+'.isProfitsharing'"
                        :rules="[{
                            required: true, message: '请选择', trigger: 'change'
                          }]">
            <el-switch v-model="rule.isProfitsharing"
                       :active-value="1"
                       :inactive-value="0"
                       @change="changeIsProfitsharing(rule,index)"></el-switch>
          </el-form-item>
          <template v-if="rule.isProfitsharing==1">
            <el-form-item v-for="(account,acc_index) in rule.accounts"
                          :key="acc_index">
              <el-form-item label="分账人账号"
                            label-position="right"
                            label-width="110px"
                            :prop="'profitsharingRule.'+index+'.accounts.'+acc_index+'.value'"
                            :rules="[{
                            required: true, message: '分账人账号信息不能为空', trigger: 'blur'
                          }]"
                            class="tow-col">
                <el-select v-model="account.value"
                           filterable
                           @change="selectAccount('profitsharingRule.'+index+'.accounts.'+acc_index+'.value')"
                           @focus="getReceiverList(rule)">
                  <el-option v-for="acc in accountsList"
                             :key="acc.receiver"
                             :label="acc.value"
                             :value="acc.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分账比例"
                            label-position="right"
                            label-width="110px"
                            :prop="'profitsharingRule.'+index+'.accounts.'+acc_index+'.percentage'"
                            :rules="[
                          {
                            required: true, message: '分账比例不能为空', trigger: 'blur'
                          },
                          { 
                            validator: validateNum,trigger: 'blur' 
                            }
                          ]"
                            class="tow-col">
                <el-input v-model="account.percentage"
                          @blur="changePercentage(account.percentage,index,acc_index)"
                          placeholder="请选择"
                          min="1"
                          max="99"></el-input>
                %

              </el-form-item>
              <el-form-item class="tow-col">
                <el-button v-on:click="delAccount(rule,index,acc_index)"
                           v-if="acc_index>0"
                           type="text">删除</el-button>
              </el-form-item>
              <el-button v-on:click="addAccount(rule,index)"
                         v-if="acc_index==rule.accounts.length-1&&rule.accounts.length<5"
                         class="add-account"
                         icon="el-icon-plus"
                         type="text">新增分账人</el-button>
            </el-form-item>
          </template>

        </el-form-item>
      </template>

      <template v-if="canShowAddRuleBtn">
        <el-divider></el-divider>
        <el-button v-on:click="addRule"
                   icon="el-icon-plus"
                   class="add-rule-btn">新增规则</el-button>
      </template>
      <el-form-item label=""
                    label-width="auto"
                    style="text-align:center;">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="submit"
                   type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'
import Constant from '../contant'
import Util from '../util/utils'
export default {
  name: 'SeparateRuleModel',
  props: {
    info: Object
  },
  data() {
    return {
      Constant: Constant,
      toChinaNum: Util.toChinesNum,
      orgListObj: {},
      organizationList: [],
      accountsList: [],
      model: {
        serviceType: 1,
        organizationName: '',
        custCode: '',
        profitsharingRule: [
          {
            orderType: '', //订单类型（1咨询 2复诊 3购药）
            isProfitsharing: 0, //0否1是（是否分账）
            isDel: 0,
            accounts: [
              {
                value: '', //分账人名称+' '+分账接收账号
                subMchId: '', //分账接收账号
                receiveName: '', //分账人名称
                percentage: '' //分账百分比例
              }
            ]
          }
        ]
      },
      isChangeSerivceType: false,
      rules: {
        serviceType: [
          {
            required: true,
            message: '请选择',
            trigger: 'blur'
          }
        ],
        custCode: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ]
      },
      profitsharingRuleListBefore: []
    }
  },
  computed: {
    orderType() {
      if (this.model.serviceType == 1) {
        return Constant.orderType.filter((item) => item.value != '购药订单')
      } else {
        return Constant.orderType.filter((item) => item.value == '购药订单')
      }
    },

    canShowAddRuleBtn() {
      return this.model.profitsharingRule.length < this.orderType.length ? true : false
    }
  },
  watch: {
    isChangeSerivceType(val) {
      if (val == true) {
        this.rules.custCode = [].concat([{ required: true, message: '请选择', trigger: 'blur' }])
      } else {
        this.rules.custCode = [].concat([{ required: true, message: '请选择', trigger: 'change' }])
      }
    }
  },

  created() {
    if (this.info.type == 'edit') {
      this.model = Peace.util.deepClone(this.info)
    } else {
      this.model = Object.assign({}, this.model, this.info)
    }

    this.profitsharingRuleListBefore = Peace.util.deepClone(this.model.profitsharingRule)
    Constant.serviceTypes.map((item) => {
      this.getOrganizationList(item.key)
    })
  },
  methods: {
    changeIsProfitsharing(item, index) {
      if (item.accounts.length == 0 && item.isProfitsharing == 1) {
        const account = {
          value: '', //分账人名称+' '+分账接收账号
          subMchId: '', //
          receiveName: '', //分账人名称
          receiver: '', //分账接收账号
          percentage: '' //分账百分比例
        }
        item.accounts.push(account)
        this.model.profitsharingRule.splice(index, 1, item)
      }
    },
    changePercentage(percentage, index, acc_index) {
      const regexp = /^0+/
      if (percentage > 0) {
        this.model.profitsharingRule[index].accounts[acc_index].percentage = percentage.replace(regexp, '')
      }
    },
    serviceTypesText(type) {
      return Constant.serviceTypes.find((item) => item.key == type).value
    },
    validateNum(rule, value, callback) {
      let pattern = new RegExp(/^(0?[1-9]|[1-9][0-9])$/)
      if (value == 0) {
        return callback(new Error('比例输入应该大于0'))
      } else {
        if (pattern.test(value)) {
          callback()
        } else {
          return callback(new Error('支持输入1-99之间的整数'))
        }
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.model.organizationName = this.organizationList.find((item) => item.custCode == this.model.custCode).organizationName
          this.model.profitsharingRule.forEach((rule) => {
            rule.accounts.forEach((account) => {
              account.receiveName = rule.isProfitsharing == 1 ? account.receiverName : ''
              account.receiveAccount = rule.isProfitsharing == 1 ? account.receiver : ''
            })
            if (rule.isProfitsharing == 0) {
              rule.accounts = []
            }
          })
          let result = true
          for (let i = 0; i < this.model.profitsharingRule.length; i++) {
            let rule = this.model.profitsharingRule[i]
            if (rule.isDel == 0) {
              for (let j = i + 1; j < this.model.profitsharingRule.length; j++) {
                let temp = this.model.profitsharingRule[j]
                if (temp.isDel == 0 && rule.orderType == temp.orderType) {
                  result = false
                }
              }
            }
          }
          //同一类型订单类型，分账比例大于1时，提示“分账比例不能大于1，请重新填写”，提交失败。
          let percentageCount = 0
          this.model.profitsharingRule.forEach((rule) => {
            let allPercentage = 0
            rule.accounts.forEach((account) => {
              allPercentage += Number(account.percentage)
              if (allPercentage > 100) {
                percentageCount++
              }
            })
          })
          if (percentageCount > 0) {
            Peace.util.warning('分账比例不能大于1，请重新填写')
            return false
          }
          //判断订单类型是否重复，若已重复，则提示“订单类型不允许重复”，提交失败
          if (!result) {
            Peace.util.warning('订单类型不允许重复')
            return false
          }
          if (this.info.type == 'edit') {
            //新增和修改的规则无需处理，直接使用修改后的数据
            let list = Peace.util.deepClone(this.model.profitsharingRule)

            //遍历初始化的规则列表，找到被删除的规则，修改该规则，并插入
            this.profitsharingRuleListBefore.forEach((before) => {
              let result = this.model.profitsharingRule.find((after) => after.id == before.id)
              //删除的规则
              if (!result) {
                before.isDel = 1
                before.accounts = []
                list.push(before)
              }
            })
            this.model.profitsharingRule = Peace.util.deepClone(list)
            this.editProfitsharingRule()
          } else {
            this.addProfitsharingRule()
          }
        }
      })
    },

    cancel() {
      this.$emit('onCancel')
    },

    getReceiverList(info) {
      const params = { custCode: this.model.custCode, orderType: info.orderType }
      Service.getReceiverList(params).then((res) => {
        this.accountsList = res?.data?.list
        this.accountsList.map((item) => {
          item.value = item.receiverName + ' ' + item.receiver
        })
      })
    },
    changeServiceType() {
      const defaultProfitsharingRule = [
        {
          orderType: '', //订单类型（1咨询 2复诊 3购药）
          isProfitsharing: 0, //0否1是（是否分账）
          isDel: 0,
          accounts: [
            {
              value: '', //分账人名称+' '+分账接收账号
              subMchId: '', //
              receiveName: '', //分账人名称
              receiver: '', //分账接收账号
              percentage: '' //分账百分比例
            }
          ]
        }
      ]
      this.organizationList = this.orgListObj[this.model.serviceType]
      this.model.custCode = ''
      this.model.profitsharingRule = [].concat(defaultProfitsharingRule)

      this.isChangeSerivceType = true
    },
    selectCustCode() {
      this.isChangeSerivceType = false
    },
    selectOrderType() {
      this.isChangeSerivceType = false
    },
    selectAccount(props) {
      this.model = Object.assign({}, this.model)
      this.$refs.form.validateField(props)
    },
    addAccount(item, index) {
      const account = {
        value: '', //分账人名称+' '+分账接收账号
        subMchId: '', //
        receiveName: '', //分账人名称
        receiver: '', //分账接收账号
        percentage: '' //分账百分比例
      }

      this.model.profitsharingRule[index].accounts.push(account)
    },
    delAccount(item, index, acc_index) {
      this.model.profitsharingRule[index].accounts.splice(acc_index, 1)
    },
    addRule() {
      if (this.model.profitsharingRule.length >= this.orderType.length) {
        return
      }
      const profitsharingRule = {
        orderType: '', //订单类型（1咨询 2复诊 3购药）
        isProfitsharing: 0, //0否1是（是否分账）
        isDel: 0,
        accounts: [
          {
            value: '', //分账人名称+' '+分账接收账号
            subMchId: '', //
            receiveName: '', //分账人名称
            receiver: '', //分账接收账号
            percentage: '' //分账百分比例
          }
        ]
      }
      this.model.profitsharingRule.push(profitsharingRule)
    },
    removeRule(item, index) {
      if (index !== -1) {
        item.isDel = 1

        this.model.profitsharingRule.splice(index, 1)
      }
    },
    addProfitsharingRule() {
      Service.addProfitsharingRule(this.model).then((res) => {
        Peace.util.success(res.msg)
        this.$emit('onSucess')
      })
    },
    editProfitsharingRule() {
      Service.editProfitsharingRule(this.model).then((res) => {
        Peace.util.success(res.msg)
        this.$emit('onSucess')
      })
    },
    getOrganizationList(serviceType) {
      const params = { serviceType }
      Service.getOrganizationList(params).then((res) => {
        this.orgListObj[serviceType] = res?.data

        //this.model.serviceType 1	医疗服务 2 药品供应服务   新增初始化默认为 医疗服务
        if (this.model.serviceType == serviceType) {
          this.organizationList = res?.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  .el-form-item {
    margin-bottom: 10px;
  }
}

::v-deep .tow-col {
  width: 55%;
  display: inline-block;
  &:nth-child(1) {
    .el-select {
      width: 100%;
    }
  }
  &:nth-child(2) {
    width: 38%;
    .el-input {
      width: 40%;
    }
    .el-form-item__error {
      // left: -90px;
      white-space: nowrap;
    }
  }
  &:nth-child(3) {
    width: 7%;
    .el-button {
      padding: 3px 5px;
    }
  }
}
.el-divider {
  margin: 0 0 15px 0;
}
.rule {
  margin-bottom: 20px;
  .num {
    padding-left: 15px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    position: relative;
    &::before {
      width: 4px;
      height: 16px;
      background: var(--q-color-primary);
      border-radius: 2px 2px 0px 2px;
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .del {
    color: var(--q-color-primary);
    cursor: pointer;
  }
}
.add-rule-btn {
  color: var(--q-color-primary);
  background: #eaf4f6;
  border: 1px solid var(--q-color-primary);
  padding: 3px 20px;
}
.add-account {
  padding-left: 15px;
}
</style>