<template>
  <div class="add-allergic-history">
    <div class="input">
      <van-search @cancel="onCancel"
                  class="search"
                  placeholder="请输入搜索关键词"
                  shape="round"
                  show-action
                  v-model="searchAllergicHistory">
        <span @click="onSearch"
              class="search-label"
              slot="action">搜索</span>
      </van-search>

      <hr />

      <h4>已选过敏源</h4>
      <div class="checked-list">
        <van-tag :key="item.value"
                 @click="check(item)"
                 class="tag checked"
                 plain
                 v-for="item in allergicHistory">
          <span style="font-size: 12px;">{{ item.value }}</span>
        </van-tag>
      </div>

      <h4>常见过敏源</h4>
      <div class="not-checked-list">
        <van-tag :class="{ checked: item.checked }"
                 :key="item.value"
                 @click="check(item)"
                 class="tag"
                 plain
                 v-for="item in allergicHistoryCommonly">
          <span style="font-size: 12px;">{{ item.value }}</span>
        </van-tag>
      </div>
    </div>

    <div class="save">
      <van-button @click="save"
                  style="width: 100%;"
                  type="primary">保存</van-button>
    </div>

    <van-popup position="bottom"
               v-model="showAllergicHistory">
      <van-picker :columns="allergicHistoryList"
                  @cancel="showAllergicHistory = false"
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

      showAllergicHistory: false,
      searchAllergicHistory: '',

      // 搜索
      allergicHistoryList: [],
      // 已选
      allergicHistory: [],
      // 常见
      allergicHistoryCommonly: []
    }
  },

  created() {
    this.getAllergicHistoryCommonly().then(() => {
      this.parmasHandler()
    })
  },

  methods: {
    getAllergicHistoryCommonly() {
      const params = { type: '2', isCommon: '1' }

      return peace.service.inquiry.searchIllInfo(params).then(res => {
        this.allergicHistoryCommonly = res.data.map(item => {
          return {
            value: item.name,
            checked: false
          }
        })

        // 接口已经有无了...... 不用手动添加了
      })
    },

    parmasHandler() {
      if (this.internalValue) {
        if (typeof this.internalValue === 'string') {
          this.internalValue = this.internalValue.split(',')
        }

        this.internalValue.forEach(allergic => {
          this.allergicHistory.push({ value: allergic, checked: true })

          if (this.allergicHistoryCommonly.find(item => item.value === allergic)) {
            this.allergicHistoryCommonly.find(item => item.value === allergic).checked = true
          }
        })
      }
    },

    onSearch() {
      const params = {
        keyword: this.searchAllergicHistory,
        type: '2'
      }
      peace.service.inquiry.searchIllInfo(params).then(res => {
        this.allergicHistoryList = (res.data && res.data.length
          ? res.data
          : [{ name: this.searchAllergicHistory, needAdd: true }]
        ).map(item => {
          return {
            text: item.name,
            needAdd: item.needAdd,
            disabled: !!this.allergicHistory.find(temp => temp.value === item.name)
          }
        })

        this.showAllergicHistory = true
        this.searchAllergicHistory = ''
      })
    },
    onCancel() {
      this.showAllergicHistory = false
      this.searchAllergicHistory = ''
    },
    onConfirm(value) {
      if (!value.disabled) {
        //库里面无数据时, 创建的诊断只有一个数据，设置为disabled任然可以选择，此处做校验
        value.text && this.check({ value: value.text })
        this.onCancel()
      } else {
        this.onCancel()
      }
    },

    check(currentItem) {
      if (currentItem.needAdd) {
        peace.service.inquiry.addAllergen({ name: currentItem.value, type: 1 })
      }
      // 选择'无'， 重置所有
      if (currentItem.value === '无') {
        this.allergicHistory = []
        this.allergicHistoryCommonly.forEach(item => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.allergicHistory.findIndex(item => item.value === '无')

        if (index !== -1) {
          this.allergicHistoryCommonly[0].checked = false
          this.allergicHistory.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.allergicHistory.findIndex(item => item.value === currentItem.value)
        const indexCommonly = this.allergicHistoryCommonly.findIndex(
          item => item.value === currentItem.value
        )

        if (index !== -1) {
          this.allergicHistory.splice(index, 1)
        }
        if (indexCommonly !== -1) {
          this.allergicHistoryCommonly[indexCommonly].checked = false
        }
      } else {
        currentItem.checked = true
        this.allergicHistory.push(currentItem)

        const indexCommonly = this.allergicHistoryCommonly.findIndex(
          item => item.value === currentItem.value
        )
        if (indexCommonly !== -1) {
          this.allergicHistoryCommonly[indexCommonly].checked = true
        }
      }
    },

    save() {
      this.$emit('input', this.allergicHistory.map(item => item.value).toString())

      this.$emit('onSave')
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
      font-size: 12px;

      .tag {
        background: #f5f5f5 !important;
        margin: 2px 10px 2px 0;
        padding: 10px;
        text-align: center;
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
    margin: 10px 0;
    padding: 0;
  }
}
</style>
