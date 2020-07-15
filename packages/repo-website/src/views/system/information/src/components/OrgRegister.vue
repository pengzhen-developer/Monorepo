<template>
  <div class="org-bg">
    <Steps v-bind:list='list'
           v-bind:active="active"
           v-on:increase='increase'
           v-on:decrease='decrease'></Steps>
    <!-- 选择机构 -->
    <template v-if="active==0">
      <OrgSelect v-bind:list='orgList'
                 @selectOrg="selectOrg"></OrgSelect>
    </template>
    <!-- 完善信息 -->
    <template v-if="active==1">
      <CompleteInfo v-bind:role="role"
                    v-bind:roleName="roleName"
                    v-on:updateInfo="updateInfo"
                    v-on:back="back"></CompleteInfo>
    </template>

    <!-- 已提交 -->
    <template v-if="active==2">
      <CheckPending></CheckPending>
    </template>
  </div>
</template>

<script>
import Steps from './steps'
import Constant from '../../constant'
import OrgSelect from './OrgSelect'
import CompleteInfo from './CompleteInfo'
import CheckPending from './CheckPending'
export default {
  components: { Steps, OrgSelect, CompleteInfo, CheckPending },
  props: {
    checkStatus: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: 0,
      checkStatusList: Constant.checkStatus,
      list: [
        {
          title: '选择机构类型'
        },
        {
          title: '完善机构信息'
        },
        {
          title: '提交审核'
        }
      ],
      /**角色（1医疗机构 2店配机构 3仓配机构） */

      orgList: [
        {
          id: 1,
          bg: require('../assets/images/ic_org_yl.png'),
          title: '医疗机构',
          msg: '适用于实体医院或线上医疗机构'
        },
        {
          id: 2,
          bg: require('../assets/images/ic_org_dp.png'),
          title: '店配机构',
          msg: '适用于拥有线下门店的单体药房或连锁药房，可提供门店自提或配送到家服务'
        },
        {
          id: 3,
          bg: require('../assets/images/ic_org_cp.png'),
          title: '仓配机构',
          msg: '适用于拥有药品供应能力的医药企业，可提供仓库配送服务'
        }
      ],
      role: '',
      roleName: ''
    }
  },
  watch: {
    checkStatus: {
      handler() {
        if (this.checkStatus == this.checkStatusList.待审核) {
          this.active = 2
        }
      },
      immediate: true
    }
  },
  methods: {
    increase() {
      // if (this.active == this.list.length - 1) return
      this.$emit('increase', this.active++)
    },
    decrease() {
      // if (this.active == 0) return
      this.$emit('increase', this.active--)
    },
    selectOrg(data) {
      this.role = data.id
      this.roleName = data.title
      this.increase()
    },
    back(data) {
      if (data) {
        this.role = ''
        this.roleName = ''
        this.decrease()
      }
    },
    updateInfo(data) {
      if (data) {
        this.increase()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.org-bg {
  width: 100%;
  min-height: 100%;
  // height: 100%;
  // overflow: auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: #fff;
  .steps {
    margin-top: 80px;
    margin-bottom: 100px;
    width: 800px;
  }
  .org-list {
    width: 956px;
  }
  .form-info {
    // width: 600px;
    width: 500px;
  }
}
</style>