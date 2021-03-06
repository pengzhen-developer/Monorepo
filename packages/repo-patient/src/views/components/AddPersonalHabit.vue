<template>
  <div class="add-habit-history">
    <div class="input">
      <van-search @cancel="onCancel"
                  class="search"
                  placeholder="请输入搜索关键词"
                  shape="round"
                  show-action
                  v-model="searchPersonalHabit">
        <span @click="onSearch"
              class="search-label"
              slot="action">搜索</span>
      </van-search>

      <hr />
      <h4 v-if="allPersonalHabit.length>0">已选(点击删除)</h4>
      <div class="checked-list">
        <van-tag :key="item.value"
                 @click="check(item)"
                 class="tag checked"
                 plain
                 v-for="item in allPersonalHabit">
          <span class="tag-span">{{ item.value }}</span>
        </van-tag>
      </div>

      <h4>个人习惯</h4>
      <div class="not-checked-list">
        <van-tag :class="{ checked: item.checked }"
                 :key="item.value"
                 @click="check(item)"
                 class="tag"
                 plain
                 v-for="item in allPersonalHabitCommonly">
          <span class="tag-span">{{ item.value }}</span>
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
               v-model="showPersonalHabit">
      <van-picker :columns="allPersonalHabitList"
                  @cancel="showPersonalHabit = false"
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

      showPersonalHabit: false,
      searchPersonalHabit: '',

      // 搜索
      allPersonalHabitList: [],
      // 已选
      allPersonalHabit: [],
      // 常见
      allPersonalHabitCommonly: []
    }
  },

  created() {
    this.getAllPersonalHabitCommonly().then(() => {
      this.parmasHandler()
    })
  },

  methods: {
    getAllPersonalHabitCommonly() {
      return peace.service.health.getPersonInfo({ type: 7, keyword: '' }).then((res) => {
        this.allPersonalHabitCommonly = res.data.map((item) => {
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
          this.allPersonalHabit.push({ value: habit, checked: true })

          if (this.allPersonalHabitCommonly.find((item) => item.value === habit)) {
            this.allPersonalHabitCommonly.find((item) => item.value === habit).checked = true
          }
        })
      }
    },

    onSearch() {
      const params = {
        keyword: this.searchPersonalHabit,
        type: 7
      }
      peace.service.health.getPersonInfo(params).then((res) => {
        this.allPersonalHabitList = (res.data && res.data.length ? res.data : [{ name: this.searchPersonalHabit, needAdd: true }]).map((item) => {
          return {
            text: item.name,
            needAdd: item.needAdd,
            disabled: !!this.allPersonalHabit.find((temp) => temp.value === item.name)
          }
        })

        this.showPersonalHabit = true
        this.searchPersonalHabit = ''
      })
    },
    onCancel() {
      this.showPersonalHabit = false
      this.searchPersonalHabit = ''
    },
    onConfirm(value) {
      this.check({ value: value.text, needAdd: value.needAdd })
      this.onCancel()
    },

    check(currentItem) {
      // let currentItem=JSON.parse(JSON.stringify(data))
      // 选择'无'， 重置所有
      if (currentItem.value === this.none) {
        this.allPersonalHabit = []
        this.allPersonalHabitCommonly.forEach((item) => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.allPersonalHabit.findIndex((item) => item.value === this.none)

        if (index !== -1) {
          this.allPersonalHabitCommonly[0].checked = false
          this.allPersonalHabit.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.allPersonalHabit.findIndex((item) => item.value === currentItem.value)
        const indexCommonly = this.allPersonalHabitCommonly.findIndex((item) => item.value === currentItem.value)

        if (index !== -1) {
          this.allPersonalHabit.splice(index, 1)
        }
        if (indexCommonly !== -1) {
          this.allPersonalHabitCommonly[indexCommonly].checked = false
        }
      } else {
        if (currentItem.needAdd) {
          if (currentItem.value.length < 50) {
            peace.service.health.addPersonInfo({ name: currentItem.value, type: 7 }).then(() => {
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
      this.allPersonalHabit.push(currentItem)

      const indexCommonly = this.allPersonalHabitCommonly.findIndex((item) => item.value === currentItem.value)
      if (indexCommonly !== -1) {
        this.allPersonalHabitCommonly[indexCommonly].checked = true
      }
    },
    save() {
      this.$emit('input', this.allPersonalHabit.map((item) => item.value).toString())

      this.$emit('onSave')
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-span {
  font-size: 12px;
}
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
    margin: 0 0 10px 0;
    padding: 0;
  }
}
</style>
