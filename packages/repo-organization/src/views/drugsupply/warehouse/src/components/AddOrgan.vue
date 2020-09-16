<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="140px"
             label-suffix="："
             v-bind:model="internalData"
             v-bind:rules="rules">
      <div class="info-content">
        <el-form-item label="开户机构"
                      prop="Code">
          <el-select clearable
                     filterable
                     v-model="internalData.Code"
                     placeholder="请输入机构名称查询"
                     style="width: 100%;"
                     class="org-type"
                     v-on:change="changeValue">
            <el-option v-for="item in custList"
                       v-bind:key="item.Code"
                       v-bind:label="item.Name"
                       v-bind:value="item.Code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内码（custid）"
                      prop="IDIn3PartPlatform">
          <el-input v-model.trim="internalData.IDIn3PartPlatform"
                    maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="编码（custno）"
                      prop="IDIn3PartPlatform">
          <el-input v-model.trim="internalData.CodeIn3PartPlatform"
                    maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="使用状态"
                      prop="Effective">
          <el-select clearable
                     v-model="internalData.Effective"
                     placeholder="请选择"
                     style="width: 100%;"
                     class="org-type">
            <el-option v-for="(value,label) in source.ORGANIZATION_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
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
import CONSTANT from '../constant'
import Peace from '@src/library'
import Service from '../service'

export default {
  props: {
    data: Object
  },
  components: {},

  data() {
    return {
      internalData: Object.assign({}, this.data),
      loading: false,
      rules: {
        Code: [
          {
            required: true,
            message: '请选择开户机构',
            trigger: 'change'
          }
        ],
        IDIn3PartPlatform: [
          {
            required: true,
            message: '请填写内码（custid）',
            trigger: 'blur'
          }
        ],
        CodeIn3PartPlatform: [
          {
            required: true,
            message: '请填写编码（custno）',
            trigger: 'blur'
          }
        ],
        Effective: [
          {
            required: true,
            message: '请选择使用状态',
            trigger: 'change'
          }
        ]
      },
      custList: [],
      source: {
        ORGANIZATION_STATUS: CONSTANT.ORGANIZATION_STATUS
      }
    }
  },
  created() {
    this.getCust()
  },

  methods: {
    getCust() {
      Service.getCustlist().then((res) => {
        this.custList = res.data.list
      })
    },
    save() {
      this.validateForm().then(() => {
        this.loading = true
        const params = Peace.util.deepClone(this.internalData)
        params.NameIn3PartPlatform = params.Name
        if (params.Id == 0) {
          Service.InsertCircconfig(params)
            .then(() => {
              Peace.util.alert('新建成功')
              this.cancelDialog()
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          Service.updateCircconfig(params)
            .then(() => {
              Peace.util.alert('修改成功')
              this.cancelDialog()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    changeValue(value) {
      let options = {}
      options = this.custList.find((item) => {
        return item.Code === value
      })
      this.internalData.NameIn3PartPlatform = options.Name
      this.internalData.Name = options.Name
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
      this.$emit('onCloseOrgan')
    }
  }
}
</script>

<style lang="scss" scoped>
.large {
  width: 120px;
  height: 34px;
}
.hasmargin {
  margin-right: 40px;
}
.info-content {
  padding: 5px 15px 22px 15px;
}
</style>