<template>
  <div class="add-habit-history">
    <div class="input">
      <van-search @cancel="onCancel"
                  class="search"
                  placeholder="请输入搜索关键词"
                  shape="round"
                  show-action
                  v-model="searchSurgeryTrauma">
        <span @click="onSearch"
              class="search-label"
              slot="action">搜索</span>
      </van-search>

      <hr />
      <h4 v-if="allSurgeryTrauma.length>0">已选(点击删除)</h4>
      <div class="checked-list">
        <van-tag :key="item.value"
                 @click="check(item)"
                 class="tag checked"
                 plain
                 v-for="item in allSurgeryTrauma">
          <span style="font-size: 12px;">{{ item.value }}</span>
        </van-tag>
      </div>

      <h4>手术或外伤</h4>
      <div class="not-checked-list">
        <van-tag :class="{ checked: item.checked }"
                 :key="item.value"
                 @click="check(item)"
                 class="tag"
                 plain
                 v-for="item in allSurgeryTraumaCommonly">
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
               v-model="showSurgeryTrauma">
      <van-picker :columns="allSurgeryTraumaList"
                  @cancel="showSurgeryTrauma = false"
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

      showSurgeryTrauma: false,
      searchSurgeryTrauma: '',

      // 搜索
      allSurgeryTraumaList: [],
      // 已选
      allSurgeryTrauma: [],
      // 常见
      allSurgeryTraumaCommonly: []
    }
  },

  created() {
    this.getAllSurgeryTraumaCommonly().then(() => {
      this.parmasHandler()
    })
  },

  methods: {
    getAllSurgeryTraumaCommonly() {
      return peace.service.health.getPersonInfo({ type: 3, keyword: '' }).then((res) => {
        this.allSurgeryTraumaCommonly = res.data.map((item) => {
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
          this.allSurgeryTrauma.push({ value: habit, checked: true })

          if (this.allSurgeryTraumaCommonly.find((item) => item.value === habit)) {
            this.allSurgeryTraumaCommonly.find((item) => item.value === habit).checked = true
          }
        })
      }
    },

    onSearch() {
      const params = {
        keyword: this.searchSurgeryTrauma,
        type: 3
      }
      peace.service.health.getPersonInfo(params).then((res) => {
        this.allSurgeryTraumaList = (res.data && res.data.length ? res.data : [{ name: this.searchSurgeryTrauma, needAdd: true }]).map((item) => {
          return {
            text: item.name,
            needAdd: item.needAdd,
            disabled: !!this.allSurgeryTrauma.find((temp) => temp.value === item.name)
          }
        })

        this.showSurgeryTrauma = true
        this.searchSurgeryTrauma = ''
      })
    },
    onCancel() {
      this.showSurgeryTrauma = false
      this.searchSurgeryTrauma = ''
    },
    onConfirm(value) {
      this.check({ value: value.text, needAdd: value.needAdd })
      this.onCancel()
    },

    check(currentItem) {
      // let currentItem=JSON.parse(JSON.stringify(data))
      // 选择'无'， 重置所有
      if (currentItem.value === this.none) {
        this.allSurgeryTrauma = []
        this.allSurgeryTraumaCommonly.forEach((item) => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.allSurgeryTrauma.findIndex((item) => item.value === this.none)

        if (index !== -1) {
          this.allSurgeryTraumaCommonly[0].checked = false
          this.allSurgeryTrauma.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.allSurgeryTrauma.findIndex((item) => item.value === currentItem.value)
        const indexCommonly = this.allSurgeryTraumaCommonly.findIndex((item) => item.value === currentItem.value)

        if (index !== -1) {
          this.allSurgeryTrauma.splice(index, 1)
        }
        if (indexCommonly !== -1) {
          this.allSurgeryTraumaCommonly[indexCommonly].checked = false
        }
      } else {
        if (currentItem.needAdd) {
          if (currentItem.value.length < 50) {
            peace.service.health.addPersonInfo({ name: currentItem.value, type: 3 }).then(() => {
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
      this.allSurgeryTrauma.push(currentItem)

      const indexCommonly = this.allSurgeryTraumaCommonly.findIndex((item) => item.value === currentItem.value)
      if (indexCommonly !== -1) {
        this.allSurgeryTraumaCommonly[indexCommonly].checked = true
      }
    },

    save() {
      this.$emit('input', this.allSurgeryTrauma.map((item) => item.value).toString())

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
      margin: 0 0 20px 0;

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
