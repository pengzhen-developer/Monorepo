<template>
  <div class="my-family-members">
    <template v-if="members && members.length > 0">
      <div class="content">
        <van-cell :key="item.id" @click="toViewDetails(item)" border class="info" is-link v-for="item in members">
          <template slot="title">
            <span class="custom-title">{{ item.name }}</span>
            <van-icon class-prefix="ic" class="danger" name="ic_boys" v-if="item.sex === '男'" />
            <van-icon class-prefix="ic" class="blue" name="ic_girls" v-else-if="item.sex === '女'" />
            <span class="custom-age" v-if="item.age">{{ item.age }}岁</span>
            <van-tag plain round>{{ item.relation }}</van-tag>
          </template>
        </van-cell>
      </div>
      <div class="bottom">
        <div class="tips">温馨提示：最多添加10位家人</div>
        <van-button @click="toAdd" type="primary">新增家人</van-button>
      </div>
    </template>

    <template v-else>
      <div class="none-page">
        <div class="icon icon_none_family"></div>
        <div class="none-text">您还未添加家人</div>
      </div>
    </template>

    <peace-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <FamilyMembersModel :data="dialog.data" @onComplete="onComplete" />
    </peace-dialog>
  </div>
</template>
<script>
import peace from '@src/library'

import FamilyMembersModel from '@src/views/components/FamilyMembersModel'

export default {
  name: 'MyFamilyMembers',

  components: {
    FamilyMembersModel
  },

  data() {
    return {
      members: [],

      dialog: {
        visible: false,
        title: '',
        data: undefined
      }
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      // 获取现有家人
      peace.service.patient.getMyFamilyList().then(res => {
        this.members = res.data
      })
    },

    onComplete() {
      this.get()
      this.dialog.visible = false
    },

    // 查看家人详细信息
    toViewDetails(item) {
      this.dialog.title = '家人信息'
      this.dialog.visible = true
      this.dialog.data = item
    },

    toAdd() {
      this.dialog.title = '新增家人'
      this.dialog.visible = true
      this.dialog.data = undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.my-family-members {
  position: relative;
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
  flex-direction: column;

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
