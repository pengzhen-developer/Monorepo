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
            <img :class="{ isDisable: menu.disable }"
                 v-bind:src="menu.icon" />
            <label :class="{ isDisable: menu.disable }">{{ menu.name }}</label>
            <div class="line"></div>
          </div>
        </div>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick().then(() => {
      Peace.$on('hideDrawer', () => {
        this.selectIndex = -1
      })
    })
  },

  destroyed() {
    Peace.$off('hideDrawer')
  },
  data() {
    return {
      menuList: [
        {
          name: '咨询',
          index: Peace.type.HEALTH_RECORD.ACTION_TYPE.咨询,
          disable: false,
          icon: require('@src/assets/images/health-record/health_records_talk.png')
        },
        {
          name: '病程',
          index: Peace.type.HEALTH_RECORD.ACTION_TYPE.病程,
          disable: false,
          icon: require('@src/assets/images/health-record/health_records_course.png')
        },
        {
          name: '随访',
          index: Peace.type.HEALTH_RECORD.ACTION_TYPE.随访,
          disable: false,
          icon: require('@src/assets/images/health-record/health_records_follow.png')
        },
        {
          name: '转诊',
          index: Peace.type.HEALTH_RECORD.ACTION_TYPE.转诊,
          disable: false,
          icon: require('@src/assets/images/health-record/health_records_referral.png')
        }
        // {
        //   name: '会诊',
        //   index: Peace.type.HEALTH_RECORD.ACTION_TYPE.会诊,
        //   disable: false,
        //   icon: require('@src/assets/images/health-record/health_records_groupConsultation.png')
        // }
      ],
      selectIndex: undefined
    }
  },
  methods: {
    menuSelect(index) {
      const tmp = this.menuList[parseInt(index) - 1]
      if (tmp.disable) {
        Peace.util.success('暂未开放')
        return
      }
      this.selectIndex = index
      Peace.$emit('showDrawer', { index: index })
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
    margin-bottom: 8px;
  }

  label {
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 15px;
  }

  .isDisable {
    filter: grayscale(90%);
    color: #cecece;
  }

  .line {
    width: 40px;
    height: 1px;
    background-color: #dddddd;
  }
}
</style>
