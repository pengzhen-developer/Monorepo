<template>
  <div class="flex column">
    <div class="flex justify-center items-center header">
      <q-icon class="q-mr-md"
              v-bind:name="`img:${require('@src/assets/images/inquiry/electronicmedical_icon.png')}`"></q-icon>
      <span class="text-subtitle1">电子病历</span>
    </div>

    <div class="flex column col">
      <el-tabs v-model="activeName"
               style="height: 40px;">
        <el-tab-pane label="健康档案"
                     name="健康档案"></el-tab-pane>
        <el-tab-pane label="就诊记录"
                     name="就诊记录"></el-tab-pane>
      </el-tabs>

      <q-scroll-area class="col"
                     v-bind:thumb-style="thumbStyle">

        <template v-if="activeName === '健康档案'">
          <HealthRecord></HealthRecord>
        </template>

        <template v-if="activeName === '就诊记录'">
          <MedicalRecord></MedicalRecord>
        </template>

      </q-scroll-area>
    </div>

    <el-button type="primary"
               class="q-mx-40 q-mb-md"
               v-on:click="showPatientDetail">查看更多</el-button>
  </div>
</template>

<script>
import HealthRecord from './SessionForExtend/HealthRecord'
import MedicalRecord from './SessionForExtend/MedicalRecord'

export default {
  inject: ['provideGetTab', 'provideAddTab'],

  components: {
    HealthRecord,
    MedicalRecord
  },

  data() {
    return {
      activeName: '健康档案'
    }
  },

  computed: {
    thumbStyle() {
      return {
        right: '2px',
        borderRadius: '5px',
        background: '#bdbdbd',
        width: '5px',
        opacity: 0.75
      }
    },

    patientInfo() {
      return this.$store.state.inquiry.session.content.patientInfo
    },

    getTab() {
      return this.provideGetTab
    },

    addTab() {
      return this.provideAddTab
    }
  },

  methods: {
    showPatientDetail() {
      const currentMenu = this.getTab('PatientDetail')
      currentMenu.menuName = this.patientInfo.familyName
      currentMenu.menuRoute = '/patient/patientDetail/' + this.patientInfo.patientNo
      // 跳转当前路由
      this.addTab(currentMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #efefef;
}

.content {
  flex: 1;
}

::v-deep .el-tabs__active-bar {
  display: none;
}

::v-deep .el-tabs__nav {
  width: 100%;
}

::v-deep .el-tabs__item {
  width: 50%;
  padding: 0;
  text-align: center;

  &.is-active {
    border-top: 2px solid #3099a6;
  }
}

::v-deep {
  .el-tabs__nav-wrap::after {
    display: none;
  }
}
</style>
