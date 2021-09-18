<template>

  <van-popup v-model="show"
             @click-overlay="cancel"
             round
             position="bottom">

    <div class="header">医保类型</div>

    <div class="content">
      <van-radio-group v-model="model.medicalTreatmentType">
        <van-cell-group>
          <van-cell v-for="item in medicalTreatmentTypes"
                    :key="item.label"
                    :title="item.name"
                    clickable
                    @click="selectType(item)">
            <template #right-icon>
              <van-radio :name="item.label">
                <template #icon="props">
                  <van-image style="width:24px;"
                             :src="props.checked ? activeIcon : inactiveIcon"></van-image>
                </template>
              </van-radio>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="footer">
      <van-button round
                  class="is__dialog"
                  type="primary"
                  @click="submit">确认</van-button>
    </div>

  </van-popup>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'YiBaoTypeSelect',
  model: {
    prop: 'showModel',
    event: 'changeSelectYiBaoTypeDialog'
  },
  props: {
    showModel: {
      type: Boolean,
      required: true
    },
    medicalTreatmentTypes: {
      type: Array,
      required: true
    },
    medicalTreatmentType: {
      type: [String, Number],
      required: false
    }
  },
  watch: {
    medicalTreatmentType: {
      handler(val) {
        if (val) {
          this.model.medicalTreatmentType = val
        }
      },
      immediate: true
    },
    showModel: {
      handler(val) {
        if (val) {
          this.show = val
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      show: false,
      model: {
        medicalTreatmentType: '',
        medicalTreatmentTypeText: ''
      },
      activeIcon: require('@src/assets/images/ic_choose.png'),
      inactiveIcon: require('@src/assets/images/ic_choose_not.png')
    }
  },
  methods: {
    selectType(type) {
      this.model.medicalTreatmentType = type.label
      this.model.medicalTreatmentTypeText = type.name
    },
    cancel() {
      this.show = false
      this.$emit('changeSelectYiBaoTypeDialog', false)
      this.$emit('onCancel')
    },

    submit() {
      if (this.model.medicalTreatmentType === '') {
        peace.util.alert('请选择医保类型')
        return false
      }
      const yibaoInfo = peace.util.deepClone(this.model)
      this.show = false
      this.$emit('changeSelectYiBaoTypeDialog', false)
      this.$emit('onSuccess', { yibaoInfo: yibaoInfo })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
  width: 100%;
  padding: 20px 16px 24px 16px;
  background: #fff;
  border-radius: 16px 16px 0px 0px;
  .header {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  .content {
    min-height: 180px;
    max-height: 400px;
    overflow: auto;
    ::v-deep .van-cell {
      padding-left: 0;
      padding-right: 0;
      font-size: 16px;
      line-height: 24px;
      &::after {
        left: 0;
        right: 0;
      }
      .van-cell__left-icon {
        margin-right: 8px;
        font-size: 24px;
      }
      .van-radio__icon {
        font-size: 24px;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>