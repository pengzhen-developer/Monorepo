<template>
  <div class="my-family-members">
    <div class="card-line" v-if="isFromHospital">点击家人记录查看电子健康卡/就诊卡信息</div>
    <template v-if="members && members.length > 0">
      <div class="content">
        <van-cell :key="item.id"
                  @click="toViewDetails(item)"
                  border
                  class="info"
                  is-link
                  v-for="item in members">
          <template slot="title">
            <span class="custom-title">{{ item.name }}</span>
            <van-icon class-prefix="ic"
                      class="blue"
                      name="ic_boys"
                      v-if="item.sex === '男'" />
            <van-icon class-prefix="ic"
                      class="danger"
                      name="ic_girls"
                      v-else-if="item.sex === '女'" />
            <span class="custom-age"
                  v-if="item.age">{{ item.age }}岁</span>
            <van-tag plain
                     round>{{ item.relation }}</van-tag>
          </template>
        </van-cell>
      </div>
    </template>

    <template v-if="loaded && members.length==0">
      <div class="none-page">
        <div class="icon icon_none_family"></div>
        <div class="none-text">您还未添加家人</div>
      </div>
    </template>

    <div class="bottom">
      <div class="tips">温馨提示：最多添加10位家人</div>
      <van-button @click="toAdd"
                  type="primary">新增家人</van-button>
    </div>

    <!--    <peace-dialog :title="dialog.title"-->
    <!--                  :visible.sync="dialog.visible">-->
    <!--      <FamilyMembersModel :canShowSelf="members && !members.find(item => item.relation === '本人')"-->
    <!--                          :data="dialog.data"-->
    <!--                          @onComplete="onComplete" />-->
    <!--    </peace-dialog>-->
  </div>
</template>
<script>
import peace from '@src/library'

//import FamilyMembersModel from '@src/views/components/FamilyMembersModel'

export default {
  name: 'MyFamilyMembers',

  components: {
    // FamilyMembersModel
  },

  data() {
    return {
      isFromHospital: null,
      cardList: [],
      members: [],
      loaded: false,
      dialog: {
        visible: false,
        title: '',
        data: {
          familyId: ''
        }
      }
    }
  },
  created() {
    if (this.$route.params.addFamily) {
      this.dialog.title = '新增家人'
      this.dialog.visible = true
      this.dialog.data = undefined
    }
    this.isFromHospital = peace.cache.get(peace.type.SYSTEM.NETHOSPITALID);
    this.get()
  },

  methods: {
    get() {
      // 获取现有家人
      peace.service.patient.getMyFamilyList().then(res => {
        this.members = res.data
        this.loaded = true
      })
    },

    onComplete() {
      if (this.$route.params.back) {
        this.$router.go(-1)
      } else {
        this.dialog.visible = false
        this.get()
      }
    },

    // 查看家人详细信息
    toViewDetails(item) {
      let params,
        json = ''
      switch (item) {
        case 'recordCondition':
          $peace.$recordCondition.formData.family = item
          $peace.$recordCondition.canSubmitProcesses()
          $peace.$recordCondition = null
          this.$router.go(-1)
          break
        default:
          params = { id: item.familyId, source: 2 }
          json = peace.util.encode(params)
          this.$router.push(`/setting/familyMember/${json}`)
          // peace.service.patient.getFamilyInfo(params).then(res => {
          //   this.dialog.data = res.data
          //   this.dialog.data.familyId = item.familyId
          //   this.dialog.title = '家人信息'
          //   this.dialog.visible = true
          // })
          break
      }
    },

    toAdd() {
      if (this.members && this.members.length >= 10) {
        return peace.util.alert('您最多可添加 10 位家人')
      }
      let json = peace.util.encode({ type: 'add' })
      this.$router.push(`/setting/familyMember/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-family-members {
  position: relative;
  background-color: #f9f9f9;
  height: 100%;
  display: flex;
  flex-direction: column;
  .card-line {
    height: 36px;
    // background: rgba(235, 251, 249, 1);
    font-size: 14px;
    font-weight: 400;
    // color: rgba(0, 198, 174, 1);
    line-height: 36px;
    text-align: center;
    color: #666;
  }
  .content {
    flex: 1;
    overflow-y: auto;
  }

  .bottom {
    padding: 15px;
    .van-button {
      width: 100%;
    }
  }
}

.van-cell {
  &__title {
    .custom-title,
    .custom-age {
      display: inline-block;
    }
    .custom-title {
      width: 60px;
    }
    .custom-age {
      margin-left: 24px;
      margin-right: 10px;
      width: 40px;
    }
  }
}
.tips {
  // padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #999;
}
</style>
