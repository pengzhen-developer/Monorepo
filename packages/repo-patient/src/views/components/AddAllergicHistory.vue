<template>
  <div class="add-allergic-history">
    <div class="input">
      <van-search @cancel="onCancel" class="search" placeholder="请输入搜索关键词" shape="round" show-action v-model="searchAllergicHistory">
        <span @click="onSearch" class="search-label" slot="action">搜索</span>
      </van-search>

      <hr />

      <h4>已选过敏源</h4>
      <div class="checked-list">
        <van-tag :key="item.value" @click="check(item)" class="tag checked" plain v-for="item in allergicHistory">{{ item.value }}</van-tag>
      </div>

      <h4>常见过敏源</h4>
      <div class="not-checked-list">
        <van-tag
          :class="{ checked: item.checked }"
          :key="item.value"
          @click="check(item)"
          class="tag"
          plain
          v-for="item in allergicHistoryTODO"
        >{{ item.value }}</van-tag>
      </div>
    </div>

    <div class="save">
      <van-button @click="save" style="width: 100%;" type="primary">保存</van-button>
    </div>

    <van-popup position="bottom" v-model="showAllergicHistory">
      <van-picker :columns="AllergicHistoryList" @cancel="showAllergicHistory = false" @confirm="onConfirm" show-toolbar />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAllergicHistory: false,
      searchAllergicHistory: '',
      AllergicHistoryList: [],

      // 已选
      allergicHistory: [],
      // 常见
      allergicHistoryTODO: []
    }
  },

  created() {
    this.allergicHistoryTODO = [
      { value: '无', checked: false },
      { value: '过敏1', checked: false },
      { value: '过敏2', checked: false },
      { value: '过敏3', checked: false },
      { value: '过敏4', checked: false },
      { value: '过敏5', checked: false },
      { value: '过敏6', checked: false }
    ]

    // 接收参数
    if (this.$route.params.allergicHistory) {
      this.$route.params.allergicHistory.forEach(allergic => {
        this.allergicHistory.push({ value: allergic, checked: true })

        if (this.allergicHistoryTODO.find(item => item.value === allergic)) {
          this.allergicHistoryTODO.find(item => item.value === allergic).checked = true
        }
      })
    }
  },

  methods: {
    onSearch() {
      this.showAllergicHistory = true
      this.searchAllergicHistory = ''
      this.AllergicHistoryList = ['搜索出来的']
    },
    onCancel() {
      this.showAllergicHistory = false
      this.searchAllergicHistory = ''
    },
    onConfirm(value) {
      this.check({ value: value })
      this.onCancel()
    },

    check(currentItem) {
      // 选择'无'， 重置所有
      if (currentItem.value === '无') {
        this.allergicHistory = []
        this.allergicHistoryTODO.forEach(item => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.allergicHistory.findIndex(item => item.value === '无')

        if (index !== -1) {
          this.allergicHistoryTODO[0].checked = false
          this.allergicHistory.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.allergicHistory.findIndex(item => item.value === currentItem.value)

        if (index !== -1) {
          this.allergicHistory.splice(index, 1)
        }
      } else {
        currentItem.checked = true
        this.allergicHistory.push(currentItem)
      }
    },
    save() {
      this.$router.replace({
        name: $peace.referrer.name,
        params: {
          allergicHistory: this.allergicHistory
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-allergic-history {
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
