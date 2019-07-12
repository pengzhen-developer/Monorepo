<template>
  <div class="my-family-members">
    <div class="content">
      <van-cell :key="item.id" @click="toViewDetails(item)" border class="info" is-link v-for="item in members">
        <template slot="title">
          <span class="custom-title">{{ item.name }}</span>
          <van-icon class-prefix="ic" class="danger" name="ic_girls" v-if="item.sex === '男'" />
          <van-icon class-prefix="ic" class="blue" name="ic_boys" v-else-if="item.sex === '女'" />
          <span class="custom-age" v-if="item.age">{{ item.age }}岁</span>
          <van-tag plain round>{{ item.relation }}</van-tag>
        </template>
      </van-cell>
    </div>
    <div class="bottom">
      <div class="tips">温馨提示：最多添加10位家人</div>
      <van-button @click="toViewDetails" type="primary">新增家人</van-button>
    </div>

    <peace-dialog :visible.sync="dialog.visible">
      <FamilyMembersModel />
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
        visible: false
      }
    }
  },

  methods: {
    // 查看家人详细信息
    toViewDetails() {
      this.dialog.visible = true
    }
  },

  created() {
    // 获取现有家人
    peace.service.patient.getMyFamilyList().then(res => {
      this.members = res.data
    })
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
