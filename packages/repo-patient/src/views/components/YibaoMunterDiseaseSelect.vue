<template>

  <van-popup v-model="show"
             @click-overlay="cancel"
             round
             position="bottom">

    <div class="header">门特病种</div>
    <div class="content">
      <van-radio-group v-model="model.diseasesCode">
        <van-cell-group>
          <template v-for="item in diseases">
            <van-cell :key="item.label"
                      v-bind:title="item.name"
                      clickable
                      @click="selectDiseases(item)">
              <template #right-icon>
                <van-radio :name="item.label">
                  <template #icon="props">
                    <van-image style="width:24px;"
                               :src="props.checked ? activeIcon : inactiveIcon"></van-image>
                  </template>
                </van-radio>
              </template>
            </van-cell>
          </template>
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
  name: 'YibaoMunterDiseaseSelect',
  model: {
    prop: 'showModel',
    event: 'changeSelectYibaoMunterDiseaseDialog'
  },
  props: {
    showModel: {
      type: Boolean,
      required: true
    },
    diseases: {
      type: Array,
      required: true
    },
    diseasesCode: {
      type: [String, Number],
      required: false
    }
  },
  watch: {
    diseasesCode: {
      handler(val) {
        if (val) {
          this.model.diseasesCode = val
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
        diseasesName: '',
        diseasesCode: ''
      },
      activeIcon: require('@src/assets/images/ic_choose.png'),
      inactiveIcon: require('@src/assets/images/ic_choose_not.png')
    }
  },

  methods: {
    selectDiseases(data) {
      if (data.diseasesCode !== this.model.diseasesCode) {
        this.model.diseasesName = data.name
        this.model.diseasesCode = data.label
      } else {
        this.model.diseasesName = ''
        this.model.diseasesCode = ''
      }
    },

    cancel() {
      this.show = false
      this.$emit('changeSelectYibaoMunterDiseaseDialog', false)
      this.$emit('onCancel')
    },

    submit() {
      const yibaoInfo = peace.util.deepClone(this.model)
      this.show = false
      this.$emit('changeSelectYibaoMunterDiseaseDialog', false)
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
    height: 240px;
    padding: 0 40px;
    overflow: auto;
    .van-cell {
      padding-left: 0;
      padding-right: 0;
      font-size: 16px;
      line-height: 24px;
      &::after {
        left: 0;
        right: 0;
      }
      v-deep.van-cell__left-icon {
        margin-right: 8px;
        font-size: 24px;
      }
      v-deep.van-radio__icon {
        font-size: 24px;
      }
    }
  }
  .footer {
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>