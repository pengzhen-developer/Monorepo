<template>
  <div class="supplementary-allergies-container">
    <template name="search"
              v-if="!mode">
      <div class="input">
        <van-search @search="onSearch"
                    class="search"
                    placeholder="请输入搜索关键词"
                    shape="round"
                    show-action
                    v-model="searchAllergicHistory">
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
        </template>
      </div>

      <div v-if="!showAllergicSearchList"
           class="save">
        <van-button @click="save"
                    style="width: 100%;"
                    type="primary">保存</van-button>
      </div>
    </template>
    <template name="add"
              v-else>
      <div class="add-allergies-info">
        <div class="title">
          过敏源
        </div>
        <van-cell-group>
          <van-cell :title="name"
                    value="" />
        </van-cell-group>
        <div class="title">
          过敏类型
        </div>
        <van-cell-group>
          <van-cell value=""
                    :title="type||'请选择过敏类型'"
                    is-link
                    @click="showAllergicTypePicker = true">
          </van-cell>
        </van-cell-group>
        <van-button @click="saveAllergic"
                    style="width: 100%;position: fixed;bottom: 0;left: 0;"
                    type="primary">保存</van-button>

        <van-popup position="bottom"
                   round
                   v-model="showAllergicTypePicker">
          <van-picker :columns="allergicTypeColumns"
                      @cancel="showAllergicTypePicker = false"
                      @confirm="onConfirmAllergic"
                      show-toolbar />
        </van-popup>
      </div>
    </template>
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
      allergicHistoryCommonly: [],

      mode: false,
      name: '',
      type: null,
      typeValue: null,
      showAllergicTypePicker: false,
      allergicTypeColumns: [{ text: '药物', value: 2 }, { text: '食物/接触物', value: 6 }]
    }
  },

  methods: {
    onConfirmAllergic(el) {
      this.showAllergicTypePicker = false
      this.type = el.text
      this.typeValue = el.value
    },
    saveAllergic() {
      if (!this.typeValue) {
        return peace.util.alert('请选择过敏类型')
      }
      peace.service.inquiry
        .addAllergen({
          name: this.name,
          type: this.typeValue
        })
        .then(() => {
          this.mode = false
          this.allergicHistory.push({
            value: this.name,
            type: this.typeValue,
            checked: true
          })
          this.showAllergicSearchList = false
        })
    },

    goAddAllergyInfo(allergy) {
      this.name = allergy.text
      this.mode = true
    },

    onClickSearched(el) {
      console.log(el)
      if (el.needAdd) {
        this.goAddAllergyInfo(el)
      } else {
        this.onConfirm(el)
      }
    },

    getAllergicHistoryCommonly() {
      const params = { type: '2', isCommon: '1' }

      return peace.service.inquiry.searchIllInfo(params).then(res => {
        this.allergicHistoryCommonly = res.data.map(item => {
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
      this.showCancel = true
      peace.service.inquiry.searchIllInfo(params).then(res => {
        const include = res.data.find(allergy => {
          return allergy.name === this.searchAllergicHistory
        })
        if (!include) {
          res.data.push({ name: this.searchAllergicHistory, needAdd: true })
        }

        this.allergicHistoryList = res.data.map(item => {
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
      console.info(currentItem)
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
        const indexCommonly = this.allergicHistoryCommonly.findIndex(item => item.value === currentItem.value)

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

      const indexCommonly = this.allergicHistoryCommonly.findIndex(item => item.value === currentItem.value)
      if (indexCommonly !== -1) {
        this.allergicHistoryCommonly[indexCommonly].checked = true
      }
    },
    save() {
      const foodAllergy = []
      const drugAllergy = []

      this.allergicHistory.forEach(allergy => {
        const type = allergy.type
        if (ALLERGY_TYPE.DRUG === type) {
          drugAllergy.push(allergy)
        } else if (ALLERGY_TYPE.FOOD === type) {
          foodAllergy.push(allergy)
        }
      })

      this.$emit('input', this.allergicHistory.map(item => item.value).toString())
      this.$emit('onSave', { foodAllergy, drugAllergy })
    }
  },

  created() {
    this.getAllergicHistoryCommonly().then(() => {
      this.paramsHandler()
    })
  }
}
</script>

<style lang="scss" scoped>
.supplementary-allergies-container {
  height: 100%;
  height: 80vh;
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
.add-allergies-info {
  width: 100%;
  height: 100%;

  .title {
    background-color: #fafafa;
    height: 1.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;
    color: rgba(69, 90, 100, 0.6);
  }

  .custom-title {
    color: #999;
  }
}
</style>
