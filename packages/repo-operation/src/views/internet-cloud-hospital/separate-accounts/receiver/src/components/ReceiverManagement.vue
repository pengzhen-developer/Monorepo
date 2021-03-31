<template>
  <div class="modelContent">
    <div class="subMch q-px-24 q-pt-16 q-mb-16"
         v-for="(item,index) in receiverInfoList"
         :key="index">
      <div class="text-weight-bold q-mb-16"
           style="font-size:16px;">特约商户号机构：{{item.subMchName}}</div>
      <div>
        <el-form class="flex no-wrap element-ui-default"
                 label-width="auto"
                 label-suffix="："
                 :ref="'item-'+index+'-'+idx"
                 :model="receiver"
                 :rules="receiver.isEdit ? rules : undefined"
                 :key="idx"
                 v-for="(receiver,idx) in item.receivers">
          <el-form-item class="col-6"
                        label="机构名称"
                        prop="receiverName">
            <el-input v-model.trim="receiver.receiverName"
                      v-if="receiver.isEdit"
                      placeholder="请输入">
            </el-input>
            <div class="item-text"
                 v-else>{{ receiver.receiverName }}</div>
          </el-form-item>

          <el-form-item class="col-4"
                        label="商户号"
                        prop="receiver">
            <el-input v-model.trim="receiver.receiver"
                      v-if="receiver.isEdit"
                      placeholder="请输入">
            </el-input>
            <div class="item-text"
                 v-else>{{ receiver.receiver }}</div>
          </el-form-item>

          <el-form-item class="col flex row justify-end">
            <el-button v-if="receiver.isEdit"
                       @click="save(receiver,('item-'+index+'-'+idx))"
                       type="text">保存</el-button>

            <el-button icon="zyy-icon zyy-shanchu1"
                       @click="del(receiver,index,idx)"
                       v-if="!receiver.isEdit"
                       type="text">删除</el-button>

          </el-form-item>
        </el-form>
      </div>
      <div style="border-top:1px solid #e9e9e9;"
           class="q-py-16"
           v-if="canShowAddButton(item)">
        <el-button v-on:click="addReceiver(index)"
                   icon="zyy-icon zyy-xinzeng"
                   type="text"
                   class=" text-primary">新增分账人</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import Service from '../service/index'
export default {
  name: 'ReceiverManagement',
  props: {
    info: Object
  },

  data() {
    return {
      receiverInfoList: [],
      rules: {
        receiverName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        receiver: [{ required: true, message: '请输入商户号', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getList()
    })
  },

  methods: {
    canShowAddButton(item) {
      return item.receivers.length < 2 ? true : false
    },
    getList() {
      const params = { custCode: this.info.custCode }
      return Service.receiverManage(params).then((res) => {
        this.receiverInfoList = res.data
        this.receiverInfoList.forEach((item) => {
          item.receivers.map((item) => (item.isEdit = false))
        })
      })
    },

    addReceiver(index) {
      this.receiverInfoList[index].receivers.push({
        receiver: '',
        receiverName: '',
        subMchId: this.receiverInfoList[index].subMchId,
        custCode: this.info.custCode,
        isEdit: true
      })
    },
    save(item, formName) {
      this.$refs[formName][0].validate((valid) => {
        if (valid) {
          const params = Object.assign({}, item)
          Service.addReceiver(params).then((res) => {
            Peace.util.success(res.msg)
            this.getList()
          })
        } else {
          return false
        }
      })
    },

    del(data, index, idx) {
      this.$confirm('', '是否确认删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        Service.delReceiver({ id: data.id }).then((res) => {
          Peace.util.success(res.msg)
          this.receiverInfoList[index].receivers.splice(idx, 1)
          // this.$emit('onSucess')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-button--text i {
  margin-right: 4px;
}

.item-buttom {
  padding: 3px 0px;
}

::v-deep .el-input--mini .el-input__inner {
  min-width: 300px;
}
.item-text {
  min-width: 300px;
}
.modelContent {
  min-height: 298px;
}
.add-model-tip {
  border-bottom: 1px solid #eee;
  padding: 17px 0;
  color: #999;
  margin-bottom: 17px;
}
.subMch {
  background: #f5f5f5;
  border-radius: 2px;

  .el-form {
    &:not(:first-child) {
      padding-top: 16px;
      border-top: 1px solid #e9e9e9;
    }
  }
}
</style>