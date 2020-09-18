<template>
  <div v-if="dictList.length>0">
    <el-form ref="form"
             label-position="right"
             label-width="140px"
             label-suffix="："
             v-bind:model="query"
             v-bind:rules="rules">
      <div class="info-content">
        <el-form-item label="产品名称"
                      prop="productName">
          <el-input v-model.trim="query.productName"
                    placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品编码"
                      prop="productCode">
          <el-select v-model="query.productCode"
                     placeholder="请选择产品编码">
            <el-option v-for="item in dictList"
                       :key="item.name"
                       :label="item.name"
                       :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="text-center">
        <el-button type="primary"
                   class="large hasmargin "
                   v-bind:disabled="loading"
                   v-on:click="save">确 定</el-button>
        <el-button class="large"
                   v-on:click="cancelDialog">取 消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from '../service'
export default {
  name: 'ProduceModel',
  props: {
    info: Object
  },
  data() {
    return {
      query: {
        //编号
        clientId: '',
        //终端名称
        productName: '',
        //产品编码
        productCode: ''
      },
      dictList: [],
      loading: false,
      rules: {
        productName: [
          {
            required: true,
            message: '请输入输入产品名称',
            trigger: 'blur'
          }
        ],
        productCode: [
          {
            required: true,
            message: '请输入选择产品编码',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  mounted() {
    this.query = Object.assign({}, this.query, this.info)
    this.getDict()
  },
  methods: {
    getDict() {
      Service.product()
        .getDict()
        .then((res) => {
          this.dictList = res.data
        })
    },
    save() {
      this.validateForm().then(() => {
        this.loading = true
        const params = Peace.util.deepClone(this.query)
        if (!this.info?.productId) {
          Service.product()
            .post(params)
            .then(() => {
              Peace.util.success('新建成功')
              this.cancelDialog()
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          Service.product()
            .put(params)
            .then(() => {
              Peace.util.success('修改成功')
              this.cancelDialog()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
    },
    cancelDialog() {
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  width: 100%;
  &.tow-col {
    width: 50%;
  }
}
.el-select {
  width: 100%;
}
::v-deep .el-checkbox {
  margin-right: 15px;
}
.info-content {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>