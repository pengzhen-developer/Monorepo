<template>
  <div class="container">
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
import FamilyMembersModel from '@src/views/components/FamilyMembersModel'

export default {
  name: 'MyFamilyMembers',

  components: {
    FamilyMembersModel
  },

  data() {
    return {
      members: [
        {
          id: 'zhoujiejie',
          name: '周杰杰',
          sex: '男',
          age: 28,
          relation: '亲友'
        },
        {
          id: 'wangkeke',
          name: '王可可',
          age: 3,
          sex: '女',
          relation: '孩子'
        },
        {
          id: 'wangfang',
          name: '王芳',
          age: 38,
          sex: '女',
          relation: '爱人'
        },
        {
          id: 'wangfang',
          name: '王芳',
          age: 38,
          sex: '女',
          relation: '爱人'
        },
        {
          id: 'wangfang',
          name: '王芳',
          age: 38,
          sex: '女',
          relation: '爱人'
        },
        {
          id: 'wangfang',
          name: '王芳',
          age: 38,
          sex: '女',
          relation: '爱人'
        },
        {
          id: 'kexinru',
          name: '可心如',
          age: 38,
          sex: '男',
          relation: '本人'
        }
      ],

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

  created() {}
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
