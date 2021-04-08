<template>
  <div class="supplementary-allergies-container">
    <div class="input">
      <van-search @search="onSearch"
                  class="search"
                  placeholder="请输入搜索关键词"
                  shape="round"
                  show-action
                  v-model.trim="searchAllergicHistory">
        <span v-show="!showCancel"
              @click="onSearch"
              class="search-label"
              slot="action">搜索
        </span>
        <span v-show="showCancel"
              @click="onCancel"
              class="search-label"
              slot="action">取消
        </span>
      </van-search>
      <template v-if="showAllergicSearchList">
        <div class="cell-wrapper">
          <van-cell-group>
            <van-cell v-for="child in allergicHistoryList"
                      :key="child.text"
                      :title="child.text"
                      @click="onClickSearched(child)">
              <van-icon v-if="child.needAdd"
                        slot="right-icon"
                        name="add"
                        style="line-height: inherit;"
                        color="#00C6AE" />
            </van-cell>
          </van-cell-group>
        </div>
      </template>
      <template v-else>
        <hr />
        <h4 v-if="allergicHistory.length>0">已选过敏源(点击删除)</h4>
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
      </template>
    </div>

    <div v-if="!showAllergicSearchList"
         class="save">
      <van-button @click="save"
                  round
                  style="margin-bottom: 15px;"
                  size="large"
                  class="full"
                  type="primary">保存</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

const ALLERGY_TYPE = {
  DRUG: 2,
  FOOD: 6
}

export default {
  name: 'supplementaryAllergies',

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
      showCancel: false,

      internalValue: this.value,

      showAllergicSearchList: false,
      searchAllergicHistory: '',

      // 搜索
      allergicHistoryList: [],
      // 已选
      allergicHistory: [],
      // 常见
      allergicHistoryCommonly: []
    }
  },

  methods: {
    onEmits() {
      $peace.$on(peace.type.EMIT.SUPPLEMENTARY_ALLERGIES, this.addAllergiesInfoCallback)
    },

    offEmits() {
      $peace.$off(peace.type.EMIT.SUPPLEMENTARY_ALLERGIES)
    },

    checkUniq(name) {
      const allergyNames = this.allergicHistory.map((el) => {
        return el.value
      })
      const seen = new Set(allergyNames)
      return !seen.has(name)
    },
    // 删除 「无」
    deleteNone() {
      const index = this.allergicHistory.findIndex((item) => item.value === '无')

      if (index !== -1) {
        this.allergicHistoryCommonly[0].checked = false
        this.allergicHistory.splice(index, 1)
      }
    },

    addAllergiesInfoCallback(allergy) {
      if (this.checkUniq(allergy.value)) {
        this.deleteNone()
        this.showCancel = false
        this.allergicHistory.push({ ...allergy, ...{ checked: true } })
      }
      this.showAllergicSearchList = false
    },

    goAddAllergyInfo(allergy) {
      const sourceJson = peace.util.decode(this.$route.params.json)
      sourceJson.emit = peace.type.EMIT.SUPPLEMENTARY_ALLERGIES
      sourceJson.allergy = allergy
      const json = peace.util.encode(sourceJson)

      this.$router.push({
        name: `/components/addAllergiesInfo`,
        params: {
          json
        }
      })
    },

    onClickSearched(el) {
      if (el.needAdd) {
        this.goAddAllergyInfo(el)
      } else {
        if (!this.checkUniq(el.text)) {
          el.disabled = true
        }
        this.onConfirm(el)
      }
    },

    getAllergicHistoryCommonly() {
      const params = { type: '2', isCommon: '1' }

      return peace.service.inquiry.searchIllInfo(params).then((res) => {
        this.allergicHistoryCommonly = res.data.map((item) => {
          return {
            value: item.name,
            checked: false,
            type: item.type
          }
        })

        // 接口已经有无了...... 不用手动添加了
      })
    },

    paramsHandler() {
      if (this.internalValue) {
        if (typeof this.internalValue === 'string') {
          this.internalValue = this.internalValue.split(',')
        }

        this.internalValue.forEach((allergic) => {
          this.allergicHistory.push({ value: allergic, checked: true })

          if (this.allergicHistoryCommonly.find((item) => item.value === allergic)) {
            this.allergicHistoryCommonly.find((item) => item.value === allergic).checked = true
          }
        })
      }
    },

    onSearch() {
      const params = {
        keyword: this.searchAllergicHistory,
        type: '2'
      }
      this.showCancel = true
      peace.service.inquiry.searchIllInfo(params).then((res) => {
        // this.allergicHistoryList = (res.data && res.data.length
        //     ? res.data.push({ name: this.searchAllergicHistory, needAdd: true })
        //     : [{ name: this.searchAllergicHistory, needAdd: true }]
        // ).map(item => {
        //   return {
        //     text: item.name,
        //     needAdd: item.needAdd,
        //     type: item.type,
        //     disabled: !!this.allergicHistory.find(temp => temp.value === item.name)
        //   }
        // })

        const include = res.data.find((allergy) => {
          return allergy.name === this.searchAllergicHistory
        })
        if (!include && this.searchAllergicHistory !== '') {
          res.data.push({ name: this.searchAllergicHistory, needAdd: true })
        }

        this.allergicHistoryList = res.data.map((item) => {
          return {
            text: item.name,
            needAdd: item.needAdd,
            type: item.type
          }
        })

        this.showAllergicSearchList = true
        this.searchAllergicHistory = ''
      })
    },

    onCancel() {
      this.showCancel = false
      this.showAllergicSearchList = false
      this.searchAllergicHistory = ''
    },

    onConfirm(value) {
      if (!value.disabled) {
        //库里面无数据时, 创建的诊断只有一个数据，设置为disabled任然可以选择，此处做校验
        value.text &&
          this.check({
            value: value.text,
            needAdd: value.needAdd,
            type: value.type
          })
        this.onCancel()
      } else {
        this.onCancel()
      }
    },

    check(currentItem) {
      // let currentItem=JSON.parse(JSON.stringify(data))
      // 选择'无'， 重置所有
      if (currentItem.value === '无') {
        this.allergicHistory = []
        this.allergicHistoryCommonly.forEach((item) => (item.checked = false))
      }
      // 非 '无'， 删除 '无' 选中
      else {
        const index = this.allergicHistory.findIndex((item) => item.value === '无')

        if (index !== -1) {
          this.allergicHistoryCommonly[0].checked = false
          this.allergicHistory.splice(index, 1)
        }
      }
      if (currentItem.checked) {
        currentItem.checked = false
        const index = this.allergicHistory.findIndex((item) => item.value === currentItem.value)
        const indexCommonly = this.allergicHistoryCommonly.findIndex((item) => item.value === currentItem.value)

        if (index !== -1) {
          this.allergicHistory.splice(index, 1)
        }
        if (indexCommonly !== -1) {
          this.allergicHistoryCommonly[indexCommonly].checked = false
        }
      } else {
        if (currentItem.needAdd) {
          if (currentItem.value.length < 50) {
            peace.service.inquiry.addAllergen({ name: currentItem.value, type: 1 }).then(() => {
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
      this.allergicHistory.push(currentItem)

      const indexCommonly = this.allergicHistoryCommonly.findIndex((item) => item.value === currentItem.value)
      if (indexCommonly !== -1) {
        this.allergicHistoryCommonly[indexCommonly].checked = true
      }
    },
    save() {
      const foodAllergy = []
      const drugAllergy = []

      this.allergicHistory.forEach((allergy) => {
        const type = allergy.type
        if (ALLERGY_TYPE.DRUG === type) {
          drugAllergy.push(allergy)
        } else if (ALLERGY_TYPE.FOOD === type) {
          foodAllergy.push(allergy)
        } else {
          throw new Error('Allergy type error')
        }
      })
      let len = this.allergicHistory.map((item) => item.value).join(',').length
      if (len > 100) {
        return peace.util.alert('过敏史信息不得超过100字')
      }
      const params = peace.util.decode(this.$route.params.json)
      if (params.emit) {
        $peace.$emit(params.emit, { foodAllergy, drugAllergy })
      }
      this.$router.go(-1)
    }
  },

  created() {
    this.onEmits()

    this.getAllergicHistoryCommonly().then(() => {
      this.paramsHandler()
    })
  },

  destroyed() {
    this.offEmits()
  }
}
</script>

<style lang="scss" scoped>
.supplementary-allergies-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .input {
    overflow: auto;
    flex: 1;

    .cell-wrapper {
      overflow-y: scroll;
      height: calc(100% - 54px);
    }

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
    margin: 0 0 10px 0;
    padding: 0;
  }
}
</style>
