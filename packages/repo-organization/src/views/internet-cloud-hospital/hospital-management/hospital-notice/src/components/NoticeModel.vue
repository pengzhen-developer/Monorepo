<template>
  <div>
    <el-form :model="notice"
             label-width="auto">
      <el-form-item label="通知标题：">
        <el-input :maxlength="20"
                  placeholder="请输入不超过20个字的标题"
                  v-model="notice.title"></el-input>
      </el-form-item>

      <el-form-item label="通知内容：">
        <el-input :rows="13"
                  placeholder="请输入通知内容..."
                  resize="none"
                  type="textarea"
                  v-model="notice.content"></el-input>
      </el-form-item>
      <el-form-item label="通知类型：">
        <el-radio-group v-model="notice.type">
          <el-radio :key="type.label"
                    :label="type.value"
                    v-for="type in source.ENUM_NOTICE_TYPE">{{ type.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button @click="saved"
                   type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CONSTANT from '../constant'

export default {
  name: 'NoticeModel',
  data() {
    return {
      source: {
        ENUM_NOTICE_TYPE: CONSTANT.ENUM_NOTICE_TYPE
      },
      notice: {
        title: '',
        content: '',
        type: 1
      }
    }
  },
  methods: {
    // 保存
    saved() {
      const params = this.notice
      this.$emit('submit', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0 !important;
  padding-top: 24px;
}
</style>
