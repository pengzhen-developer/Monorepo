<template>
    <div class="continer layout">
        <div class="layout-header">
            <el-radio-group v-model="selectIndex">
                <el-radio-button label="out">随访方案</el-radio-button>
                <el-radio-button label="in">随访记录</el-radio-button>
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
            <el-button @click="startConsult"
                       type="primary">添加随访方案</el-button>
        </div>
    </div>
</template>

<script>
  import peace from '@src/library'
  import RecordList from '../RecordList'
  export default {
    name: "FollowUpRecord",
    props: {
      params: undefined
    },
    components: {
      RecordList
    },
    data() {
      return {
        selectIndex: 'out',
        listType: peace.type.HEALTH_RECORD.ACTION_TYPE.随访
      }
    },
    methods: {
      startConsult() {
        $peace.$emit('showDrawer', peace.type.HEALTH_RECORD.ACTION_TYPE.添加随访方案)
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
