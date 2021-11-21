<template>
  <div>

    <div class="el-dialog__body">
      <div class="q-mb-lg">
        <span class="text-subtitle1">{{ data?.SourceHospitalName }}智能审方设置</span>
      </div>

      <div class="q-mb-lg q-px-xl">
        <div class="q-mb-md">
          <el-radio v-bind:value="`开方机构`"
                    v-bind:label="`开方机构`">开方机构</el-radio>
        </div>
        <div>
          <div class="flex items-center q-mb-md">
            <el-radio disabled
                      v-bind:label="`指定机构`">指定机构</el-radio>
            <el-button disabled
                       type="text">请选择</el-button>
          </div>
          <div class="q-ml-lg text-grey-6">
            {{ data?.SourceHospitalName }}
          </div>
        </div>
      </div>
    </div>

    <div class="el-dialog__footer">
      <el-button v-on:click="$emit('cancel')">取消</el-button>
      <el-button type="primary"
                 v-on:click="$emit('save')">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style>
</style>