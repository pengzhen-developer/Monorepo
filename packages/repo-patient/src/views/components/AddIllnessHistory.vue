<template>
  <div class="add-illness-history">
    <div class="input">
      <van-search @cancel="onCancel" class="search" placeholder="请输入搜索关键词" shape="round" show-action v-model="searchIllnessHistory">
        <span @click="onSearch" class="search-label" slot="action">搜索</span>
      </van-search>

      <hr />

      <h4>已选既往用药</h4>
      <div class="checked-list">
        <van-tag :key="item.value" @click="check(item)" class="tag checked" plain v-for="item in illnessHistory">{{ item.value }}</van-tag>
      </div>

      <h4>常见既往用药</h4>
      <div class="not-checked-list">
        <van-tag :class="{ checked: item.checked }" :key="item.value" @click="check(item)" class="tag" plain v-for="item in illnessHistoryTODO">{{ item.value }}</van-tag>
      </div>
    </div>

    <div class="save">
      <van-button @click="save" style="width: 100%;" type="primary">保存</van-button>
    </div>

    <van-popup position="bottom" v-model="showIllnessHistory">
      <van-picker :columns="illnessHistoryList" @cancel="showIllnessHistory = false" @confirm="onConfirm" show-toolbar />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 显示搜索框
      showIllnessHistory: false,
      // 搜索关键字
      searchIllnessHistory: '',

      // 搜索
      illnessHistoryList: [],
      // 已选
      illnessHistory: [],
      // 常见
      illnessHistoryTODO: []
    }
  },

  created() {
    this.illnessHistoryTODO = [
      { value: '无', checked: false },
      { value: '既往史1', checked: false },
      { value: '既往史2', checked: false },
      { value: '既往史3', checked: false },
      { value: '既往史4', checked: false },
      { value: '既往史5', checked: false },
      { value: '既往史6', checked: false }
    ]

    // 接收参数
    if (this.$route.params.illnessHistory) {
      this.$route.params.illnessHistory.forEach(illness => {
        this.illnessHistory.push({ value: illness, checked: true })

        if (this.illnessHistoryTODO.find(item => item.value === illness)) {
          this.illnessHistoryTODO.find(item => item.value === illness).checked = true
        }
      })
    }
  },

  methods: {
    onSearch() {
      this.showIllnessHistory = true
      this.searchIllnessHistory = ''
      this.illnessHistoryList = ['搜索出来的']
    },
    onCancel() {
      this.showIllnessHistory = false
      this.searchIllnessHistory = ''
    },
    onConfirm(value) {
      this.check({ value: value })
      this.onCancel()
    },

    check(currentItem) {
      // 选择'无'， 重置所有
      if (currentItem.value === '无') {
        this.illnessHistory = []
        this.illnessHistoryTODO.forEach(item => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.illnessHistory.findIndex(item => item.value === '无')

        if (index !== -1) {
          this.illnessHistoryTODO[0].checked = false
          this.illnessHistory.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.illnessHistory.findIndex(item => item.value === currentItem.value)

        if (index !== -1) {
          this.illnessHistory.splice(index, 1)
        }
      } else {
        currentItem.checked = true
        this.illnessHistory.push(currentItem)
      }
    },
    save() {
      this.$router.replace({
        name: $peace.referrer.name,
        params: {
          illnessHistory: this.illnessHistory
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-illness-history {
  height: 100%;
  display: flex;
  flex-direction: column;

  .input {
    overflow: auto;
    flex: 1;

    .search {
      .search-label {
        color: $-color--primary;
        border-radius: 10px;
      }
    }

    h4 {
      color: #999999;
      margin: 10px 15px 10px 15px;
    }

    .checked-list,
    .not-checked-list {
      padding: 0 15px;
      margin: 0 0 20px 0;

      .tag {
        background: #f5f5f5 !important;
        margin: 2px 10px 2px 0;
        padding: 10px;
        text-align: center;
        min-width: 45px;

        &::after {
          border: none;
        }

        &.checked {
          background-color: #d9f7f3 !important;
          color: $-color--primary !important;
        }
      }
    }
  }

  .save {
    min-height: 50px;
    position: relative;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
