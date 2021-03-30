<template>
  <div class="modelContent">
    <div class="add-model-tip"
         v-if="canShowAddTip">尚未添加分账人</div>
    <el-form v-for="(item,index) in receiverInfoList"
             label-width="auto"
             ref="item"
             class="row no-wrap"
             :model="item"
             :rules="item.isEdit ? rules : undefined"
             :key="index">

      <el-form-item label="机构名称："
                    prop="receiverName">
        <el-input v-model.trim="item.receiverName"
                  v-if="item.isEdit"
                  placeholder="请输入">
        </el-input>
        <div class="item-text"
             v-else>{{ item.receiverName }}</div>
      </el-form-item>

      <el-form-item label="商户号："
                    prop="receiver">
        <el-input v-model.trim="item.receiver"
                  v-if="item.isEdit"
                  placeholder="请输入">
        </el-input>
        <div class="item-text"
             v-else>{{ item.receiver }}</div>
      </el-form-item>

      <el-form-item>
        <el-button class="item-buttom"
                   v-if="item.isEdit"
                   @click="save(item,index,'item')"
                   type="text">保存</el-button>
        <!-- <el-button class="item-buttom"
                   @click="change(index)"
                   v-if="!item.isEdit"
                   type="text">修改</el-button> -->
        <el-button class="item-buttom"
                   @click="del(item,index)"
                   v-if="!item.isEdit"
                   type="text">删除</el-button>

      </el-form-item>

    </el-form>
    <div v-if="canShowAddButton"
         class="addModel">
      <span @click="addReceiver">+ 新增分账人</span>
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
      canShowAddTip: true,
      canShowAddButton: true,
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
    getList() {
      const params = { custCode: this.info.custCode }
      return Service.receiverList(params).then((res) => {
        this.receiverInfoList = res.data.list
        this.receiverInfoList.map((item) => (item.isEdit = false))
        this.canShowAddTip = this.receiverInfoList.length == 0 ? true : false
      })
    },

    // change(index) {
    //   const receiverInfo = this.receiverInfoList[index]
    //   receiverInfo.isEdit = true
    //   this.receiverInfoList.splice(index, 1, receiverInfo)
    //   this.canShowAddButton = false
    // },

    addReceiver() {
      this.receiverInfoList.push({
        receiver: '',
        receiverName: '',
        subMchId: this.info.subMchId,
        custCode: this.info.custCode,
        isEdit: true
      })
      this.canShowAddButton = false
    },

    save(item, index, formName) {
      this.$refs[formName][index].validate((valid) => {
        if (valid) {
          const params = Object.assign({}, item)
          Service.addReceiver(params).then((res) => {
            Peace.util.success(res.msg)
            this.getList()
            this.canShowAddButton = true
            this.canShowAddTip = false
          })
        } else {
          return false
        }
      })
    },

    del(data, index) {
      this.$confirm('', '是否确认删除？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false,
        center: true,
        closeOnClickModal: false,
        closeOnPressEscape: false
      }).then(() => {
        Service.delReceiver({ id: data.id }).then((res) => {
          Peace.util.success(res.msg)
          this.receiverInfoList.splice(index, 1)
          this.canShowAddTip = this.receiverInfoList.length == 0 ? true : false
          // this.$emit('onSucess')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.addModel {
  span {
    color: var(--q-color-primary);
    cursor: pointer;
  }
}
</style>