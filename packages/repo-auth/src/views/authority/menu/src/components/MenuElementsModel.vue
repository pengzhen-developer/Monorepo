<template>
  <div>
    <el-card class="q-mb-md"
             v-bind:header="`元素列表`">
      <el-table :data="menuElements">
        <PeaceTableColumn label="ID"
                          align="left"
                          width="90px"
                          prop="elementId">
        </PeaceTableColumn>
        <PeaceTableColumn label="元素编码"
                          align="left"
                          min-width="90px"
                          prop="elementCode">
        </PeaceTableColumn>
        <PeaceTableColumn label="元素名称"
                          align="left"
                          min-width="90px"
                          prop="elementName">
        </PeaceTableColumn>
        <PeaceTableColumn label="操作"
                          width="120px">
          <template slot-scope="scope">
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="updateSubElement(scope.row)">修改</el-button>
            <el-button class="q-px-none"
                       type="text"
                       v-on:click="deleteSubElement(scope.row)">删除</el-button>
          </template>
        </PeaceTableColumn>
      </el-table>
    </el-card>

    <el-card class="q-mb-md"
             v-bind:header="model.elementId ? `修改元素 - 当前修改项 : 【${model.elementId}】` : '新增元素'">
      <el-form ref="form"
               label-width="auto"
               label-position="right"
               label-suffix="："
               v-bind:model="model"
               v-bind:rules="rules">
        <el-form-item label="元素编码"
                      prop="elementCode">
          <el-input v-model.trim="model.elementCode"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="元素名称"
                      prop="elementName">
          <el-input v-model.trim="model.elementName"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button type="primary"
                     class="large hasmargin "
                     v-on:click="save">{{ model.elementId ? '修 改' : '新 增'}}</el-button>
          <el-button type="default"
                     class="large hasmargin "
                     v-if="model.elementId"
                     v-on:click="cancel">重置初始状态</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'MenuElementModel',

  props: {
    info: Object
  },

  data() {
    return {
      menuElements: [],
      model: {
        menuId: this.info.id,
        elementId: '',
        elementCode: '',
        elementName: ''
      },
      rules: {
        elementCode: [{ required: true, message: '请输入元素编码', trigger: 'blur' }],
        elementName: [{ required: true, message: '请输入元素名称', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    this.getMenuElements()
  },

  methods: {
    cancel() {
      this.model = {
        menuId: this.info.id,
        elementId: '',
        elementCode: '',
        elementName: ''
      }

      this.$refs.form.resetFields()
    },

    async save() {
      const params = Peace.util.deepClone(this.model)

      await this.validateForm()

      if (params.elementId) {
        await Service.modifyMenuElements(params)
      } else {
        await Service.saveMenuElements(params)
      }

      this.getMenuElements()
      this.cancel()
      this.$refs.form.resetFields()
    },

    updateSubElement(data) {
      this.model = Object.assign({}, this.model, data)
      this.$refs.form.resetFields()
    },

    async deleteSubElement(data) {
      const params = { elementId: data.elementId }

      await this.$confirm('确定删除？？？？？', '警告，非开发人员勿动!!!!', { type: 'error' })
      await Service.removeMenuElements(params)
      await this.getMenuElements()
    },

    async getMenuElements() {
      const params = { menuId: this.model.menuId }
      const res = await Service.getMenuElements(params)

      this.menuElements = res.data
    },

    validateForm() {
      return this.$refs.form.validate()
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
  &.three-col {
    width: 33.33333333%;
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