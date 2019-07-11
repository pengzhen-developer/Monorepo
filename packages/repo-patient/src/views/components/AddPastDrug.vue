<template>
  <div class="add-allergic-history">
    <div class="input">
      <van-search @cancel="onCancel" class="search" placeholder="请输入搜索关键词" shape="round" show-action v-model="searchPastDrug">
        <span @click="onSearch" class="search-label" slot="action">搜索</span>
      </van-search>

      <hr />

      <h4>已选既往用药</h4>
      <div class="checked-list">
        <van-tag :key="item.value" @click="check(item)" class="tag checked" plain v-for="item in pastDrug">{{ item.value }}</van-tag>
      </div>

      <h4>常见既往用药</h4>
      <div class="not-checked-list">
        <van-tag :class="{ checked: item.checked }" :key="item.value" @click="check(item)" class="tag" plain v-for="item in pastDrugTODO">{{ item.value }}</van-tag>
      </div>
    </div>

    <div class="save">
      <van-button @click="save" style="width: 100%;" type="primary">保存</van-button>
    </div>

    <van-popup position="bottom" v-model="showPastDrug">
      <van-picker :columns="pastDrugList" @cancel="showPastDrug = false" @confirm="onConfirm" show-toolbar />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 显示搜索框
      showPastDrug: false,
      // 搜索关键字
      searchPastDrug: '',

      // 搜索
      pastDrugList: [],
      // 已选
      pastDrug: [],
      // 常见
      pastDrugTODO: []
    }
  },

  created() {
    this.pastDrugTODO = [
      { value: '无', checked: false },
      { value: '既往用药1', checked: false },
      { value: '既往用药2', checked: false },
      { value: '既往用药3', checked: false },
      { value: '既往用药4', checked: false },
      { value: '既往用药5', checked: false },
      { value: '既往用药6', checked: false }
    ]

    // 接收参数
    if (this.$route.params.pastDrug) {
      this.$route.params.pastDrug.forEach(allergic => {
        this.pastDrug.push({ value: allergic, checked: true })

        if (this.pastDrugTODO.find(item => item.value === allergic)) {
          this.pastDrugTODO.find(item => item.value === allergic).checked = true
        }
      })
    }
  },

  methods: {
    onSearch() {
      this.showPastDrug = true
      this.searchPastDrug = ''
      this.pastDrugList = ['搜索出来的']
    },
    onCancel() {
      this.showPastDrug = false
      this.searchPastDrug = ''
    },
    onConfirm(value) {
      this.check({ value: value })
      this.onCancel()
    },

    check(currentItem) {
      // 选择'无'， 重置所有
      if (currentItem.value === '无') {
        this.pastDrug = []
        this.pastDrugTODO.forEach(item => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.pastDrug.findIndex(item => item.value === '无')

        if (index !== -1) {
          this.pastDrugTODO[0].checked = false
          this.pastDrug.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.pastDrug.findIndex(item => item.value === currentItem.value)

        if (index !== -1) {
          this.pastDrug.splice(index, 1)
        }
      } else {
        currentItem.checked = true
        this.pastDrug.push(currentItem)
      }
    },
    save() {
      this.$router.push({
        name: $peace.referrer.name,
        params: {
          pastDrug: this.pastDrug
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
        color: $-color--parimary;
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
          color: $-color--parimary !important;
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
