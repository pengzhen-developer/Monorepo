<template>
  <div class="add-allergic-history">
    <div class="input">
      <van-search @cancel="onCancel" class="search" placeholder="请输入搜索关键词" shape="round" show-action v-model="searchFoodAllergy">
        <span @click="onSearch" class="search-label" slot="action">搜索</span>
      </van-search>

      <hr />

      <h4>已选食物/接触物过敏源</h4>
      <div class="checked-list">
        <van-tag :key="item.value" @click="check(item)" class="tag checked" plain v-for="item in allFoodAllergy">{{ item.value }}</van-tag>
      </div>

      <h4>常见食物/接触物过敏源</h4>
      <div class="not-checked-list">
        <van-tag
                :class="{ checked: item.checked }"
                :key="item.value"
                @click="check(item)"
                class="tag"
                plain
                v-for="item in allFoodAllergyCommonly"
        >{{ item.value }}</van-tag>
      </div>
    </div>

    <div class="save">
      <van-button @click="save" style="width: 100%;" type="primary">保存</van-button>
    </div>

    <van-popup position="bottom" v-model="showFoodAllergy">
      <van-picker :columns="allFoodAllergyList" @cancel="showFoodAllergy = false" @confirm="onConfirm" show-toolbar />
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

        showFoodAllergy: false,
        searchFoodAllergy: '',

        // 搜索
        allFoodAllergyList: [],
        // 已选
        allFoodAllergy: [],
        // 常见
        allFoodAllergyCommonly: []
      }
    },

    created() {
      this.getAllFoodAllergyCommonly().then(() => {
        this.parmasHandler()
      })
    },

    methods: {
      getAllFoodAllergyCommonly() {
        const params = { type: '6', isCommon: '1' }

        return peace.service.inquiry.searchIllInfo(params).then(res => {
          this.allFoodAllergyCommonly = res.data.map(item => {
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
            this.allFoodAllergy.push({ value: allergic, checked: true })

            if (this.allFoodAllergyCommonly.find(item => item.value === allergic)) {
              this.allFoodAllergyCommonly.find(item => item.value === allergic).checked = true
            }
          })
        }
      },

      onSearch() {
        const params = {
          keyword: this.searchFoodAllergy,
          type: '6'
        }
        peace.service.inquiry.searchIllInfo(params).then(res => {
          this.allFoodAllergyList = (res.data && res.data.length ? res.data : [{name: this.searchFoodAllergy,needAdd: true}]).map(item => {
            return {
              text: item.name,
              needAdd: item.needAdd,
              disabled: !!this.allFoodAllergy.find(temp => temp.value === item.name)
            }
          })

          this.showFoodAllergy = true
          this.searchFoodAllergy = ''
        })
      },
      onCancel() {
        this.showFoodAllergy = false
        this.searchFoodAllergy = ''
      },
      onConfirm(value) {
        this.check({ value: value.text,needAdd: value.needAdd })
        this.onCancel()
      },

      check(currentItem) {

        if (currentItem.needAdd) {
          peace.service.inquiry.addAllergen({name: currentItem.value,type:2})
        }
        // 选择'无'， 重置所有
        if (currentItem.value === this.none) {
          this.allFoodAllergy = []
          this.allFoodAllergyCommonly.forEach(item => (item.checked = false))
        }
        // 非 '无'， 删除 '无' 选中
        else {
          const index = this.allFoodAllergy.findIndex(item => item.value === this.none)

          if (index !== -1) {
            this.allFoodAllergyCommonly[0].checked = false
            this.allFoodAllergy.splice(index, 1)
          }
        }

        if (currentItem.checked) {
          currentItem.checked = false
          const index = this.allFoodAllergy.findIndex(item => item.value === currentItem.value)
          const indexCommonly = this.allFoodAllergyCommonly.findIndex(item => item.value === currentItem.value)

          if (index !== -1) {
            this.allFoodAllergy.splice(index, 1)
          }
          if (indexCommonly !== -1) {
            this.allFoodAllergyCommonly[indexCommonly].checked = false
          }
        } else {
          currentItem.checked = true
          this.allFoodAllergy.push(currentItem)

          const indexCommonly = this.allFoodAllergyCommonly.findIndex(item => item.value === currentItem.value)
          if (indexCommonly !== -1) {
            this.allFoodAllergyCommonly[indexCommonly].checked = true
          }
        }
      },

      save() {
        this.$emit('input', this.allFoodAllergy.map(item => item.value).toString())

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
