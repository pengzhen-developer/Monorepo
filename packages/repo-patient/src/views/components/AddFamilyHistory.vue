<template>
  <div class="add-habit-history">
    <div class="input">
      <van-search @cancel="onCancel"
                  class="search"
                  placeholder="请输入搜索关键词"
                  shape="round"
                  show-action
                  v-model="searchFamilyHistory">
        <span @click="onSearch"
              class="search-label"
              slot="action">搜索</span>
      </van-search>

      <hr />
      <h4 v-if="allFamilyHistory.length>0">已选(点击删除)</h4>
      <div class="checked-list">
        <van-tag :key="item.value"
                 @click="check(item)"
                 class="tag checked"
                 plain
                 v-for="item in allFamilyHistory">
          <span style="font-size: 12px;">{{ item.value }}</span>
        </van-tag>
      </div>

      <h4>家族病史</h4>
      <div class="not-checked-list">
        <van-tag :class="{ checked: item.checked }"
                 :key="item.value"
                 @click="check(item)"
                 class="tag"
                 plain
                 v-for="item in allFamilyHistoryCommonly">
          <span style="font-size: 12px;">{{ item.value }}</span>
        </van-tag>
      </div>
    </div>

    <div class="save">
      <van-button @click="save"
                  round
                  style="margin-bottom: 15px;"
                  size="large"
                  class="full"
                  type="primary">保存</van-button>
    </div>

    <van-popup position="bottom"
               v-model="showFamilyHistory">
      <van-picker :columns="allFamilyHistoryList"
                  @cancel="showFamilyHistory = false"
                  @confirm="onConfirm"
                  show-toolbar />
    </van-popup>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    }
  },

  data() {
    return {
      internalValue: this.value,
      none: '暂无',

      showFamilyHistory: false,
      searchFamilyHistory: '',

      // 搜索
      allFamilyHistoryList: [],
      // 已选
      allFamilyHistory: [],
      // 常见
      allFamilyHistoryCommonly: []
    }
  },

  created() {
    this.getAllFamilyHistoryCommonly().then(() => {
      this.parmasHandler()
    })
  },

  methods: {
    getAllFamilyHistoryCommonly() {
      return peace.service.health.getPersonInfo({ type: 4, keyword: '' }).then((res) => {
        this.allFamilyHistoryCommonly = res.data.map((item) => {
          return {
            value: item.name,
            checked: false
          }
        })
      })
    },

    parmasHandler() {
      if (this.internalValue) {
        if (typeof this.internalValue === 'string') {
          this.internalValue = this.internalValue.split(',')
        }

        this.internalValue.forEach((habit) => {
          this.allFamilyHistory.push({ value: habit, checked: true })

          if (this.allFamilyHistoryCommonly.find((item) => item.value === habit)) {
            this.allFamilyHistoryCommonly.find((item) => item.value === habit).checked = true
          }
        })
      }
    },

    onSearch() {
      const params = {
        keyword: this.searchFamilyHistory,
        type: 4
      }
      peace.service.health.getPersonInfo(params).then((res) => {
        this.allFamilyHistoryList = (res.data && res.data.length ? res.data : [{ name: this.searchFamilyHistory, needAdd: true }]).map((item) => {
          return {
            text: item.name,
            needAdd: item.needAdd,
            disabled: !!this.allFamilyHistory.find((temp) => temp.value === item.name)
          }
        })

        this.showFamilyHistory = true
        this.searchFamilyHistory = ''
      })
    },
    onCancel() {
      this.showFamilyHistory = false
      this.searchFamilyHistory = ''
    },
    onConfirm(value) {
      this.check({ value: value.text, needAdd: value.needAdd })
      this.onCancel()
    },

    check(currentItem) {
      // let currentItem=JSON.parse(JSON.stringify(data))
      // 选择'无'， 重置所有
      if (currentItem.value === this.none) {
        this.allFamilyHistory = []
        this.allFamilyHistoryCommonly.forEach((item) => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.allFamilyHistory.findIndex((item) => item.value === this.none)

        if (index !== -1) {
          this.allFamilyHistoryCommonly[0].checked = false
          this.allFamilyHistory.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.allFamilyHistory.findIndex((item) => item.value === currentItem.value)
        const indexCommonly = this.allFamilyHistoryCommonly.findIndex((item) => item.value === currentItem.value)

        if (index !== -1) {
          this.allFamilyHistory.splice(index, 1)
        }
        if (indexCommonly !== -1) {
          this.allFamilyHistoryCommonly[indexCommonly].checked = false
        }
      } else {
        if (currentItem.needAdd) {
          if (currentItem.value.length < 50) {
            peace.service.health.addPersonInfo({ name: currentItem.value, type: 4 }).then(() => {
              this.onAddCallback(currentItem)
            })
          } else {
            peace.util.alert('您输入的字数过长！')
          }
        } else {
          this.onAddCallback(currentItem)
        }
      }
    },
    onAddCallback(currentItem) {
      currentItem.checked = true
      this.allFamilyHistory.push(currentItem)

      const indexCommonly = this.allFamilyHistoryCommonly.findIndex((item) => item.value === currentItem.value)
      if (indexCommonly !== -1) {
        this.allFamilyHistoryCommonly[indexCommonly].checked = true
      }
    },
    save() {
      this.$emit('input', this.allFamilyHistory.map((item) => item.value).toString())

      this.$emit('onSave')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-habit-history {
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
      margin: 10px 16px;
      font-weight: normal;
    }

    .checked-list,
    .not-checked-list {
      padding: 0 16px;
      margin: 0 0 30px 0;
      font-size: 16px;
      display: flex;
      flex-wrap: wrap;
      .tag {
        background: #f5f5f5 !important;
        margin: 7px 10px 0 0;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
        min-width: 45px;
        border: none;
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
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #f2f2f2;
    margin: 0 0 10px 0;
    padding: 0;
  }
}
</style>
