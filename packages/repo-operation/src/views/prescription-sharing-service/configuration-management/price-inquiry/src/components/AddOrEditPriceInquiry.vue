<template>
  <div>
    <el-form :model="model"
             :rules="model.Id === 0 ? rules : rulesChange"
             inline
             label-width="150px"
             class="element-ui-default"
             ref="form">

      <el-form-item label="医疗机构名称："
                    prop="SourceCustCode">
        <el-select clearable
                   filterable
                   v-if="model.Id === 0"
                   @change="SourceCustChange"
                   v-model.trim="model.SourceCustCode"
                   placeholder="请选择">
          <el-option v-for="item in source.Code"
                     :key="item.CustCode"
                     :label="item.CustName"
                     :value="item.CustCode">
          </el-option>
        </el-select>
        <div v-else>{{ model.SourceCustName }}</div>
      </el-form-item>

      <el-form-item label="药品供应方："
                    prop="TargetCustName">
        <div>{{ model.TargetCustName }}</div>
      </el-form-item>

      <el-form-item label="药品查询权限："
                    prop="PriceAuthority">
        <el-checkbox-group v-model="model.PriceAuthority">
          <el-checkbox v-for="item in priceStrList"
                       :key="item.value"
                       :label="item.value">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>

    <div class="bottom">
      <el-button v-on:click="onCancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="onSave">提交</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'AddOrEditPriceInquiry',
  props: {
    dataInfo: Object
  },
  watch: {
    dataInfo: {
      handler() {
        if (this.dataInfo != null) {
          this.model.Id = this.dataInfo.Id
          this.model.SourceCustCode = this.dataInfo.SourceCustCode
          this.model.SourceCustName = this.dataInfo.SourceCustName
          this.model.TargetCustCode = this.dataInfo.TargetCustCode
          this.model.TargetCustName = this.dataInfo.TargetCustName
          this.model.PriceAuthority = this.dataInfo?.PriceAuthority?.split(',') || []
          this.getTagetData(this.model.SourceCustCode)
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        Id: 0,
        SourceCustCode: '',
        SourceCustName: '',
        TargetCustCode: '',
        TargetCustName: '',
        PriceAuthority: []
      },
      priceStrList: [],
      source: {
        Code: []
      },
      rules: {
        SourceCustCode: [
          {
            required: true,
            message: '请选择医疗机构名称',
            trigger: 'blur'
          }
        ],
        TargetCustName: [
          {
            required: true,
            message: '药品供应方不能为空',
            trigger: 'change'
          }
        ],
        PriceAuthority: [
          {
            required: true,
            message: '请选择药品查询权限',
            trigger: 'change'
          }
        ]
      },
      rulesChange: {
        PriceAuthority: [
          {
            required: true,
            message: '请选择药品查询权限',
            trigger: 'change'
          }
        ]
      }
    }
  },

  async created() {
    // 获取价格类型字典
    this.priceStrList = await Peace.identity.dictionary.getList('PriceInquriyType')
    //获取医疗机构字典
    this.GetCustByCirculation()
  },

  methods: {
    onCancel() {
      this.$emit('onCancel')
    },

    onSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = Object.assign({}, this.model)
          params.PriceAuthority = params.PriceAuthority.sort().join(',')
          Service.SavePriceAuthority(params).then((res) => {
            Peace.util.success(res.msg)
            this.$emit('onSucess')
          })
        } else {
          return false
        }
      })
    },

    GetCustByCirculation() {
      Service.GetCustByCirculation().then((res) => {
        this.source.Code = res.data.list
      })
    },

    SourceCustChange(value) {
      this.model.SourceCustName = this.source.Code.find((item) => item.CustCode == value)?.CustName
      this.getTagetData(value)
    },

    getTagetData(value) {
      const params = { SourceCustCode: value }
      Service.GetTargetCustCodeByCustCode(params).then((res) => {
        this.model.TargetCustCode = res?.data?.TargetCustCode || ''
        this.model.TargetCustName = res?.data?.TargetCustName || ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  display: flex;
}
::v-deep .el-form-item__content {
  width: calc(100% - 125px);
  display: flex;
  align-items: center;
}
::v-deep .el-select {
  width: 100%;
}

.bottom {
  margin-top: 30px;
  display: flex;
  justify-content: space-around;

  .el-button {
    width: 120px;
    height: 32px;
  }
}
</style>