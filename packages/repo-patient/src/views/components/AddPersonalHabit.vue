<template>
  <div class="add-habit-history">
    <div class="input">
      <h4>已选</h4>
      <div class="checked-list">
        <van-tag :key="item.value"
                 @click="check(item)"
                 class="tag checked"
                 plain
                 v-for="item in allPersonalHabit">
          <span style="font-size: 12px;">{{ item.value }}</span>
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
      return peace.service.health.lists({ type: 7 }).then(res => {
        this.allPersonalHabitCommonly = res.data.map(item => {
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

        this.internalValue.forEach(habit => {
          this.allPersonalHabit.push({ value: habit, checked: true })

          if (this.allPersonalHabitCommonly.find(item => item.value === habit)) {
            this.allPersonalHabitCommonly.find(item => item.value === habit).checked = true
          }
        })
      }
    },

    onSearch() {
      const params = {
        keyword: this.searchPersonalHabit,
        type: '6'
      }
      peace.service.inquiry.searchIllInfo(params).then(res => {
        this.allPersonalHabitList = (res.data && res.data.length
          ? res.data
          : [{ name: this.searchPersonalHabit, needAdd: true }]
        ).map(item => {
          return {
            text: item.name,
            needAdd: item.needAdd,
            disabled: !!this.allPersonalHabit.find(temp => temp.value === item.name)
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
      if (currentItem.needAdd) {
        peace.service.inquiry.addAllergen({ name: currentItem.value, type: 2 })
      }
      // 选择'无'， 重置所有
      if (currentItem.value === this.none) {
        this.allPersonalHabit = []
        this.allPersonalHabitCommonly.forEach(item => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.allPersonalHabit.findIndex(item => item.value === this.none)

        if (index !== -1) {
          this.allPersonalHabitCommonly[0].checked = false
          this.allPersonalHabit.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.allPersonalHabit.findIndex(item => item.value === currentItem.value)
        const indexCommonly = this.allPersonalHabitCommonly.findIndex(
          item => item.value === currentItem.value
        )

        if (index !== -1) {
          this.allPersonalHabit.splice(index, 1)
        }
        if (indexCommonly !== -1) {
          this.allPersonalHabitCommonly[indexCommonly].checked = false
        }
      } else {
        currentItem.checked = true
        this.allPersonalHabit.push(currentItem)

        const indexCommonly = this.allPersonalHabitCommonly.findIndex(
          item => item.value === currentItem.value
        )
        if (indexCommonly !== -1) {
          this.allPersonalHabitCommonly[indexCommonly].checked = true
        }
      }
    },

    save() {
      this.$emit('input', this.allPersonalHabit.map(item => item.value).toString())

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
