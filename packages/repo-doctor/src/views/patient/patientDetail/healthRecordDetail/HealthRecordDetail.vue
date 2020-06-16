<template>
  <div>
    <el-tabs>
      <el-tab-pane lazy
                   label="全部">
        <RecordAll :id="id"
                   :key="1"
                   type="1"></RecordAll>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="日常检测">
        <RecordAll :id="id"
                   :key="2"
                   type="2"></RecordAll>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="门诊病历">
        <RecordAll :id="id"
                   :key="3"
                   type="3"></RecordAll>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="住院病历">
        <RecordAll :id="id"
                   :key="4"
                   type="4"></RecordAll>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="体检报告">
        <RecordAll :id="id"
                   :key="5"
                   type="5"></RecordAll>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="检验检查">
        <RecordAll :id="id"
                   :key="7"
                   type="7"></RecordAll>
      </el-tab-pane>
      <el-tab-pane lazy
                   label="其它">
        <RecordAll :id="id"
                   :key="6"
                   type="6"></RecordAll>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RecordAll from './../components/RecordAll'
export default {
  components: {
    RecordAll
  },

  props: {
    id: String
  }
}
</script>
