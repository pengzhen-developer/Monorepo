<template>
  <el-menu :collapse="true"
           class="nav-menu">
    <template v-for="menu in menuList">
      <el-menu-item :index="menu.index"
                    :key="menu.index">
        <div class="nav-submenu">
          <img v-bind:src="menu.icon">
          <label>{{ menu.name }}</label>
        </div>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: '咨询',
          title: '咨询',
          path: '/home',
          index: '1',
          icon: require('@src/assets/images/health-record/health_records_talk.png')
        },
        {
          name: '病程',
          title: '病程',
          path: '/home',
          index: '2',
          icon: require('@src/assets/images/health-record/health_records_course.png')
        },
        {
          name: '随访',
          title: '随访',
          path: '/home',
          index: '3',
          icon: require('@src/assets/images/health-record/health_records_follow.png')
        },
        {
          name: '转诊',
          title: '转诊',
          path: '/home',
          index: '4',
          icon: require('@src/assets/images/health-record/health_records_referral.png')
        },
        {
          name: '会诊',
          title: '会诊',
          path: '/home',
          index: '5',
          icon: require('@src/assets/images/health-record/health_records_groupConsultation.png')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  width: 100%;
  height: 100%;
  border: none;
}

/deep/ .el-menu-item {
  margin: 15px 0 20px 0;

  &:hover {
    background: transparent;
  }

  &:focus {
    background: transparent;
  }
}

.nav-submenu {
  height: 72px;
  line-height: 1;

  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  img {
    width: 22px;
    height: 22px;
    /* font-size: 24px; */
    margin-bottom: 4px;

    color: #cecece;
  }
  label {
    line-height: 24px;

    color: #333333;
  }
}
</style>