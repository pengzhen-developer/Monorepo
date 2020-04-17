<template>
  <div>
    <el-menu :collapse="true"
             class="nav-menu">
      <template v-for="menu in menuList">
        <div class="menuItem"
             :class="{ active: selectIndex === menu.index }"
             :key="menu.index"
             @click="menuSelect(menu.index)">
          <div class="nav-submenu">
            <img v-bind:src="menu.icon">
            <label>{{ menu.name }}</label>
            <div class="line"></div>
          </div>
        </div>
      </template>
    </el-menu>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  created() {
    $peace.$on('hideDrawer', params => {
      // switch (params) {
      //   case peace.type.HEALTH_RECORD.ACTION_TYPE.咨询:
      //   case peace.type.HEALTH_RECORD.ACTION_TYPE.病程:
      //   case peace.type.HEALTH_RECORD.ACTION_TYPE.随访:
      //   case peace.type.HEALTH_RECORD.ACTION_TYPE.转诊:
      //   case peace.type.HEALTH_RECORD.ACTION_TYPE.会诊:
      //   case peace.type.HEALTH_RECORD.ACTION_TYPE.发起转诊:
      //   case peace.type.HEALTH_RECORD.ACTION_TYPE.发起会诊:
      // }
      console.log(params)
      this.selectIndex = -1
    })
  },
  data() {
    return {
      menuList: [
        {
          name: '咨询',
          index: peace.type.HEALTH_RECORD.ACTION_TYPE.咨询,
          icon: require('@src/assets/images/health-record/health_records_talk.png')
        },
        {
          name: '病程',
          index: peace.type.HEALTH_RECORD.ACTION_TYPE.病程,
          icon: require('@src/assets/images/health-record/health_records_course.png')
        },
        {
          name: '随访',
          index: peace.type.HEALTH_RECORD.ACTION_TYPE.随访,
          icon: require('@src/assets/images/health-record/health_records_follow.png')
        },
        {
          name: '转诊',
          index: peace.type.HEALTH_RECORD.ACTION_TYPE.转诊,
          icon: require('@src/assets/images/health-record/health_records_referral.png')
        },
        {
          name: '会诊',
          index: peace.type.HEALTH_RECORD.ACTION_TYPE.会诊,
          icon: require('@src/assets/images/health-record/health_records_groupConsultation.png')
        }
      ],
      selectIndex: undefined
    }
  },
  methods: {
    menuSelect(index) {
      this.selectIndex = index
      $peace.$emit('showDrawer', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 4px;
}

.active {
  background: rgba(0, 0, 0, 0.06);
}

.menuItem {
  margin: 0;
  padding-top: 15px;
  height: 81px;
  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  &:focus {
    background: rgba(0, 0, 0, 0.06);
  }
}

.nav-submenu {
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
    margin-bottom: 8px;
    color: #cecece;
  }
  label {
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 15px;
  }
  .line {
    width: 40px;
    height: 1px;
    background-color: #dddddd;
  }
}
</style>