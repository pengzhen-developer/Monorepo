
<template>
  <div class="flex column full-height">
    <el-collapse class="flex column col collapse"
                 v-model="activeName"
                 accordion>
      <el-collapse-item v-bind:key="faceToFace.name"
                        v-bind:name="faceToFace.name"
                        disabled>
        <div slot="title"
             class="flex justify-between items-center full-width"
             v-on:click="gotoPath(faceToFace)">

          <div class="flex items-center">
            <img class="q-mr-md"
                 style="width: 20px; height: 20px;"
                 v-bind:src="faceToFace.icon">
            <span class="text-subtitle1">{{ faceToFace.title }}</span>
          </div>

          <el-button type="text"
                     v-on:click="addPatient">
            <img class="add_button_style"
                 src="~@src/assets/images/add_button.png">
          </el-button>

        </div>
        <div class="flex column full-height">
          <slot></slot>
        </div>
      </el-collapse-item>

      <el-collapse-item v-bind:key="inquiry.name"
                        v-bind:name="inquiry.name"
                        disabled>
        <div slot="title"
             class="flex justify-between items-center full-width"
             v-on:click="gotoPath(inquiry)">

          <div class="flex items-center">
            <img class="q-mr-md"
                 style="width: 20px; height: 20px;"
                 v-bind:src="inquiry.icon">
            <span class="text-subtitle1">{{ inquiry.title }}</span>
          </div>

        </div>

      </el-collapse-item>

      <el-collapse-item v-bind:key="returnVisit.name"
                        v-bind:name="returnVisit.name"
                        disabled>
        <div slot="title"
             class="flex justify-between items-center full-width"
             v-on:click="gotoPath(returnVisit)">

          <div class="flex items-center">
            <img class="q-mr-md"
                 style="width: 20px; height: 20px;"
                 v-bind:src="returnVisit.icon">
            <span class="text-subtitle1">{{ returnVisit.title }}</span>
          </div>

        </div>

      </el-collapse-item>

      <el-collapse-item v-bind:key="consultation.name"
                        v-bind:name="consultation.name"
                        disabled>
        <div slot="title"
             class="flex justify-between items-center full-width"
             v-on:click="gotoPath(consultation)">

          <div class="flex items-center">
            <img class="q-mr-md"
                 style="width: 20px; height: 20px;"
                 v-bind:src="consultation.icon">
            <span class="text-subtitle1">{{ consultation.title }}</span>
          </div>

        </div>

      </el-collapse-item>

    </el-collapse>
  </div>

</template>
<script>
import { mutations } from '../faceToFace/src/store'

export default {
  // props: {
  //   active: {
  //     type: String,
  //     default() {
  //       return 'inquriy'
  //     }
  //   }
  // },

  data() {
    return {
      activeName: 'faceToFace',
      faceToFace: {
        name: 'faceToFace',
        title: '面诊开方',
        icon: require('./assets/img/ic_face to face@2x.png'),
        routePath: '/clinic/faceToFace'
      },
      inquiry: {
        name: 'inquiry',
        title: '在线咨询',
        icon: require('./assets/img/ic_online@2x.png'),
        routePath: '/clinic/inquiry'
      },
      returnVisit: {
        name: 'returnVisit',
        title: '复诊续方',
        icon: require('./assets/img/ic_return visit@2x.png'),
        routePath: '/clinic/returnVisit'
      },
      consultation: {
        name: 'consultation',
        title: '我的会诊',
        icon: require('./assets/img/ic_consultation@2x.png'),
        routePath: '/clinic/consultation'
      }
    }
  },

  methods: {
    gotoPath(item) {
      this.$router.push(item.routePath)
    },

    addPatient() {
      mutations.setShowAddPatient(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-collapse {
  border: 0;
}

.add_button_style {
  width: 20px;
}

::v-deep .el-collapse-item {
  &.is-disabled .el-collapse-item__header {
    color: rgb(39, 39, 39);
    cursor: pointer;
  }

  &.is-active {
    display: flex;
    flex-direction: column;
    flex: 1;

    .el-collapse-item__header {
      padding: 0 16px;
    }

    .el-collapse-item__wrap {
      height: 100%;
      border-top: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
    }

    .el-collapse-item__content {
      height: 100%;
    }
  }

  &:not(.is-active) {
    padding: 0 0 0 16px;

    .el-collapse-item__header {
      padding: 0 16px 0 0;
    }
  }

  .el-collapse-item__content {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .el-collapse-item__arrow.el-icon-arrow-right {
    display: none;
  }
}
</style>