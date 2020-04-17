<template>
  <div class="continer layout">
    <div class="layout-header">
      <el-radio-group v-model="selectIndex">
        <el-radio-button label="out">我发起的</el-radio-button>
        <el-radio-button label="in">发给我的</el-radio-button>
      </el-radio-group>
    </div>

    <div class="layout-content">
      <div class="page">
        <RecordList :id="params.id"
                    type="out"
                    :listType="listType"
                    v-show="selectIndex === 'out'"></RecordList>
        <RecordList :id="params.id"
                    type="in"
                    :listType="listType"
                    v-show="selectIndex === 'in'"></RecordList>
      </div>
    </div>

    <div class="layout-footer"
         v-show="selectIndex === 'out'">
      <div id="line"></div>
      <el-button @click="startReferral"
                 type="primary">发起转诊</el-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import RecordList from '../RecordList'
export default {
  props: {
    params: undefined
  },
  components: {
    RecordList
  },
  data() {
    return {
      selectIndex: 'out',
      listType: peace.type.HEALTH_RECORD.ACTION_TYPE.转诊
    }
  },
  methods: {
    startReferral() {
      $peace.$emit('showDrawer', peace.type.HEALTH_RECORD.ACTION_TYPE.发起转诊)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;

  .layout-header {
    margin: 0 0 16px 0;
  }

  .layout-content {
    flex: 1;
    overflow: auto;
    margin: 0 0 16px 0;
  }

  .layout-footer {
    margin: 0 0 16px 0;
  }
}
</style>