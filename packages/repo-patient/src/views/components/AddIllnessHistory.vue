<template>
  <div class="add-illness-history">
    <div class="input">
      <van-search @cancel="onCancel"
                  class="search"
                  placeholder="请输入搜索关键词"
                  shape="round"
                  show-action
                  v-model.trim="searchIllnessHistory">
        <span @click="onSearch"
              class="search-label"
              slot="action">搜索</span>
      </van-search>

      <hr />

      <h4>已选诊断(点击删除)</h4>
      <div class="checked-list">
        <van-tag :key="item.value"
                 @click="check(item)"
                 class="tag checked"
                 plain
                 v-for="item in confirmIllness">
          <span class="tag-span">{{ item.value }}</span>
        </van-tag>
      </div>

      <h4>常见诊断</h4>
      <div class="not-checked-list">
        <van-tag :class="{ checked: item.checked }"
                 :key="item.value"
                 @click="check(item)"
                 class="tag"
                 plain
                 v-for="item in confirmIllnessCommonly">
          <span class="tag-span">{{ item.value }}</span>
        </van-tag>
      </div>
      <template v-if="hasSearch">
        <h4>搜索结果</h4>
        <div class="not-checked-list"
             v-if="confirmIllnessList.length>0">
          <van-tag :class="{ checked: item.checked }"
                   :key="item.value"
                   @click="check(item)"
                   class="tag"
                   plain
                   v-for="item in confirmIllnessList">
            <span class="tag-span">{{ item.value }}</span>
          </van-tag>
        </div>
      </template>

    </div>

    <div class="save">
      <van-button @click="save"
                  round
                  class="full"
                  size="large"
                  type="primary">保存</van-button>
    </div>

    <!-- <van-popup position="bottom"
               v-model="showIllnessHistory">
      <van-picker :columns="confirmIllnessList"
                  @cancel="showIllnessHistory = false"
                  @confirm="onConfirm"
                  show-toolbar />
    </van-popup> -->
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

      // 显示搜索框
      showIllnessHistory: false,
      // 搜索关键字
      searchIllnessHistory: '',

      // 搜索
      confirmIllnessList: [],
      // 已选
      confirmIllness: [],
      // 常见
      confirmIllnessCommonly: [],
      //已搜索
      hasSearch: false
    }
  },

  created() {
    this.getIllnessHistoryCommonly().then(() => {
      this.parmasHandler()
    })
  },

  methods: {
    getIllnessHistoryCommonly() {
      const params = { type: '1', isCommon: '1', methodType: 1 }

      return peace.service.inquiry.searchIllInfo(params).then((res) => {
        this.confirmIllnessCommonly = res.data.map((item) => {
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

        this.internalValue.forEach((allergic) => {
          this.confirmIllness.push({ value: allergic, checked: true })

          // console.log(this.confirmIllnessCommonly)
          if (this.confirmIllnessCommonly.find((item) => item.value === allergic)) {
            this.confirmIllnessCommonly.find((item) => item.value === allergic).checked = true
          }
        })
      }
    },

    onSearch() {
      if (this.searchIllnessHistory == '') {
        peace.util.alert('搜索内容不能为空')
        return
      }
      const params = {
        keyword: this.searchIllnessHistory,
        type: '3',
        methodType: 1
      }
      peace.service.inquiry.searchIllInfo(params).then((res) => {
        this.confirmIllnessList = (res.data && res.data.length ? res.data : [{ name: this.searchIllnessHistory, needAdd: true }]).map((item) => {
          return {
            text: item.name,
            value: item.name,
            checked: false,
            needAdd: item.needAdd,
            disabled: !!this.confirmIllness.find((temp) => temp.value === item.name)
          }
        })
        this.hasSearch = true
        this.showIllnessHistory = true
        this.searchIllnessHistory = ''
      })
    },

    onCancel() {
      this.hasSearch = false
      this.showIllnessHistory = false
      this.searchIllnessHistory = ''
    },

    onConfirm(value) {
      if (!value.disabled) {
        //库里面无数据时, 创建的诊断只有一个数据，设置为disabled任然可以选择，此处做校验
        this.check({ value: value.text, needAdd: value.needAdd })
        this.onCancel()
      } else {
        this.onCancel()
      }
    },

    check(currentItem) {
      // let currentItem=JSON.parse(JSON.stringify(data))
      if (currentItem.needAdd) {
        peace.service.inquiry.addAllergen({
          name: currentItem.value,
          type: -1
        })
      }
      // 选择'无'， 重置所有
      if (currentItem.value === '无') {
        this.confirmIllness = []
        this.confirmIllnessCommonly.forEach((item) => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.confirmIllness.findIndex((item) => item.value === '无')

        if (index !== -1) {
          this.confirmIllnessCommonly[0].checked = false
          this.confirmIllness.splice(index, 1)
        }
      }

      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.confirmIllness.findIndex((item) => item.value === currentItem.value)
        const indexCommonly = this.confirmIllnessCommonly.findIndex((item) => item.value === currentItem.value)
        const indexSearch = this.confirmIllnessList.findIndex((item) => item.value === currentItem.value)

        if (index !== -1) {
          this.confirmIllness.splice(index, 1)
        }
        if (indexCommonly !== -1) {
          this.confirmIllnessCommonly[indexCommonly].checked = false
        }
        if (indexSearch !== -1) {
          this.confirmIllnessList[indexSearch].checked = false
        }
      } else {
        currentItem.checked = true
        this.confirmIllness.push(currentItem)

        const indexCommonly = this.confirmIllnessCommonly.findIndex((item) => item.value === currentItem.value)
        const indexSearch = this.confirmIllnessList.findIndex((item) => item.value === currentItem.value)
        if (indexCommonly !== -1) {
          this.confirmIllnessCommonly[indexCommonly].checked = true
        }
        if (indexSearch !== -1) {
          this.confirmIllnessList[indexSearch].checked = true
          this.confirmIllnessList[indexSearch].needAdd = false //needAdd 新增诊断标签后修改
        }
      }
    },

    save() {
      this.$emit('input', this.confirmIllness.map((item) => item.value).join(' | '))

      this.$emit('onSave')

      if (this.$route.params.emit) {
        $peace.$emit(this.$route.params.emit, this.confirmIllness.map((item) => item.value).join(' | '))

        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-span {
  font-size: 12px;
}
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
      margin: 10px 16px;
      font-weight: normal;
      line-height: 1;
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
    margin-bottom: 15px;
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
