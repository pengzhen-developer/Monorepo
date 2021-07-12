<template>
  <div>
    <PeaceDialog v-bind:title="title"
                 v-bind:visible.sync="visible"
                 width="450px">
      <el-form ref="form"
               label-suffix="："
               label-width="auto"
               v-bind:model="model"
               v-bind:rules="rules"
               v-on:submit.native.prevent
               v-on:keyup.enter.native="validateForm">

        <el-form-item v-if="model.id"
                      label="科室ID"
                      prop="name">
          <el-input v-model="model.id"
                    disabled></el-input>

        </el-form-item>

        <el-form-item label="科室名称"
                      prop="deptName">
          <el-input v-model="model.deptName"
                    clearable
                    maxlength="50"></el-input>
        </el-form-item>

        <el-form-item label="属性"
                      prop="attribute">

          <el-select v-model.trim="model.attribute"
                     class="block"
                     clearable
                     filterable
                     placeholder="请选择">
            <el-option v-for="item in source.DisplayAttrForDepartment"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="展示位置">
          <el-select v-model.trim="model.displayPosition"
                     class="block"
                     disabled
                     placeholder="请选择">
            <el-option v-for="item in source.DepartmentPosition"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="科室图标">

          <template>
            <el-button v-if="!selected.imageUrl && !model.imgUrl"
                       size="medium"
                       type="text"
                       @click="openIconsDialog">选择图标
            </el-button>

            <el-button v-else
                       class="p-none"
                       size="medium"
                       type="text"
                       @click="openIconsDialog">重新选择图标
            </el-button>
          </template>

          <img v-if="selected.imageUrl || model.imgUrl"
               :src="selected.imageUrl ? imageSrc(selected.imageUrl) : imageSrc(model.imgUrl)"
               class="select-icon" />

        </el-form-item>

        <el-form-item class="text-center">
          <el-button class="btn"
                     type="primary"
                     :loading="isLoading"
                     v-on:click="validateForm">保存
          </el-button>
        </el-form-item>

      </el-form>
    </PeaceDialog>

    <peace-dialog v-if="iconsDialogVisible"
                  :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="iconsDialogVisible"
                  append-to-body
                  title="科室图标"
                  width="400px">
      <images-selector :default-usage="2"
                       @getSelected="getSelectedIcon" />
    </peace-dialog>
  </div>
</template>

<script>
import Service from '../service/index'
import CONSTANT from '../constant'
import ImagesSelector from './ImagesSelector'

export default {
  props: {
    title: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: Boolean
    },
    data: undefined
  },
  components: { ImagesSelector },
  data() {
    return {
      iconsDialogVisible: false,
      isLoading: false,
      visible: this.value,
      selected: {
        imageUrl: undefined
      },
      model: {
        deptId: undefined,
        deptName: undefined,
        attribute: undefined,
        displayPosition: undefined,
        imgUrl: undefined
      },
      source: {
        DepartmentPosition: CONSTANT.DepartmentPosition,
        DisplayAttrForDepartment: CONSTANT.DisplayAttrForDepartment
      },
      rules: {
        deptName: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],
        attribute: [{ required: true, message: '请选择属性', trigger: 'blur' }]
        // imgUrl: [{required: true, message: '请选择图片', trigger: 'blur'}],
      }
    }
  },

  created() {
    if (this.data) {
      this.model = Object.assign({}, this.data)
    }
  },

  watch: {
    value(value) {
      this.visible = value
    },

    visible(value) {
      this.$emit('input', value)
    }
  },

  methods: {
    cancel() {
      this.visible = false
    },
    validateForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm()
        }
      })
    },
    submitForm() {
      const params = Object.assign({}, this.model)
      this.isLoading = true
      if (this.data.deptId) {
        Service.modifyData(params)
          .then((res) => {
            const msg = res.msg || '科室修改成功！'
            Peace.util.success(msg)
            this.visible = false
            this.$emit('refresh')
          })
          .finally(() => (this.isLoading = false))
      } else {
        params.imgUrl = params.imageUrl

        Service.addData(params)
          .then((res) => {
            const msg = res.msg || '科室新增成功！'
            Peace.util.success(msg)
            this.visible = false
            this.$emit('refresh')
          })
          .finally(() => (this.isLoading = false))
      }
    },

    // 选择科室图标
    openIconsDialog() {
      this.iconsDialogVisible = true
    },
    // 获取选中的图标
    getSelectedIcon(param) {
      this.selected = param
      this.model.imageUrl = param.imageUrl
      this.iconsDialogVisible = false
    },

    imageSrc(path) {
      return `${process.env.VUE_APP_API_BASE}nethospital${path}`
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item__content {
  span {
    color: #9da4af;
  }
}

.el-form-item {
  margin-bottom: 8px;

  &.is-error {
    margin-bottom: 24px;
  }
}
</style>
