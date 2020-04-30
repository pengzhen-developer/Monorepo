<template>
    <div class="continer layout">
        <div class="layout-content">
            <div class="page">
                <RecordList :request-data="requestData" v-slot="item">
                    <FollowUpSchemeCell
                            :item="item"/>
                </RecordList>
            </div>
        </div>
        <div class="layout-footer">
            <div id="line"></div>
            <el-button @click="addNewScheme"
                       type="primary">新建自定义方案
            </el-button>
        </div>
    </div>
</template>

<script>
  import peace from '@src/library'
  import RecordList from '../RecordList'
  import FollowUpSchemeCell from "./FollowUpSchemeCell";

  export default {
    name: "FollowUpScheme",
    props: {
      params: {
        type: Object,
      }
    },
    data() {
      return {
        requestData: {
          request: peace.service.health.getFollowUpSchemeList,
          data: {}
        }
      }
    },
    components: {
      RecordList,
      FollowUpSchemeCell
    },
    methods: {
      addNewScheme() {
        $peace.$emit('showDrawer', peace.type.HEALTH_RECORD.ACTION_TYPE.新建自定义方案)
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
