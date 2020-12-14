<template>
  <div class="my-family-members"
       :class="loaded&&guardianList.length == 0&&'no-family'">
    <template v-if="guardianList && guardianList.length > 0">
      <div class="content">
        <van-cell :key="item.id"
                  @click="setGardianInfo(item)"
                  border
                  class="info"
                  is-link
                  v-for="item in guardianList">
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
                  v-if="item.age">{{ item.age }}</span>
            <van-tag plain
                     round>{{ item.relation }}</van-tag>
          </template>
        </van-cell>
      </div>

      <div class="bottom">
        <van-button @click="setGardianInfo({})"
                    type="primary">新增监护人</van-button>
      </div>

    </template>
    <template v-if="loaded&&guardianList.length == 0">
      <div class="none-page">
        <div class="icon icon_none_family"></div>
        <div class="none-text">请先添加监护人信息</div>
      </div>
      <div class="bottom">
        <van-button @click="setGardianInfo({})"
                    type="primary">新增监护人</van-button>
      </div>
    </template>
  </div>
</template>
<script>
import peace from '@src/library'

export default {
  name: 'GuardianList',

  components: {},

  data() {
    return {
      guardianList: [],
      loaded: false
    }
  },

  mounted() {
    this.get()
  },
  methods: {
    get() {
      peace.service.patient.getGuardianList().then((res) => {
        this.guardianList = res.data.list
        this.loaded = true
      })
    },

    setGardianInfo(item) {
      // console.log(item)
      this.$emit('setGardianInfo', item)
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
  &.no-family {
    background-color: #fff;
  }
  .bottom {
    padding: 15px;
    .van-button {
      width: 100%;
    }
  }
  .card-line {
    height: 36px;
    background: rgba(235, 251, 249, 1);
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 198, 174, 1);
    line-height: 36px;
    text-align: center;
  }
  .content {
    flex: 1;
    overflow-y: auto;
    /deep/ .van-cell__title > span::after {
      content: '';
      width: 0;
      border: 0;
    }
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
