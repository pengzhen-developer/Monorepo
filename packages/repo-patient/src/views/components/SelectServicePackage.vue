<template>

  <van-popup v-model="show"
             @click-overlay="cancel"
             round
             position="bottom">

    <div class="header">请选择您要使用的服务包</div>
    <div class="content">

      <div class="list">
        <div class="item"
             v-for="(item,idx) in list"
             v-bind:key="idx">
          <div class="title">{{item.servicePackageName}}</div>
          <div class="equities">
            <div class="equities-item"
                 v-for="(equity,index) in item.equities"
                 v-bind:key="index"
                 v-on:click="select(equity,item)">
              <van-image v-bind:src="require('@src/assets/images/ic_choose.png')"
                         v-if="model.patientEquitiesId==equity.patientEquitiesId"></van-image>
              <van-image v-bind:src="require('@src/assets/images/ic_choose_not.png')"
                         v-else></van-image>
              <div class="equities-item-name"><span>{{equity.equitiesName}}</span><span>(剩余{{equity.residueNum}}次)</span></div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="footer">
      <van-button round
                  @click="cancel">取消</van-button>
      <van-button round
                  @click="submit">确定</van-button>
    </div>
  </van-popup>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'SelectServicePackage',
  model: {
    prop: 'showModel',
    event: 'changeSelectServicePackageDialog'
  },
  props: {
    showModel: {
      type: Boolean,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  watch: {
    showModel: {
      handler(val) {
        if (val) {
          this.show = val
        }
      },
      immediate: true
    },
    info: {
      handler(val) {
        if (val.patientEquitiesId) {
          this.model = Object.assign({}, val)
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      show: false,
      model: {
        servicePackageId: '',
        servicePackageName: '',
        patientEquitiesId: '',
        patientEquitiesName: ''
      }
    }
  },

  methods: {
    select(child, parent) {
      if (child.patientEquitiesId == this.model.patientEquitiesId) {
        return
      }
      this.model.servicePackageId = parent.servicePackageId
      this.model.servicePackageName = parent.servicePackageName
      this.model.patientEquitiesId = child.patientEquitiesId
      this.model.patientEquitiesName = child.equitiesName
    },

    cancel() {
      this.show = false
      this.$emit('changeSelectServicePackageDialog', false)

      this.$emit('onCancel', null)
    },
    submit() {
      if (!this.model.patientEquitiesId) {
        return peace.util.alert('请选择您要使用的服务包')
      }

      this.show = false
      this.$emit('changeSelectServicePackageDialog', false)

      this.$emit('onSuccess', this.model)
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
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  .content {
    min-height: 299px;
    padding-bottom: 16px;
    .title {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 24px;
      position: relative;
      padding-left: 12px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 16px;
      &::before {
        content: '';
        background: $primary;
        width: 4px;
        height: 16px;
        border-radius: 4px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .equities {
      .equities-item {
        display: flex;
        align-items: center;
        padding: 12px 0;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 0.6);
        line-height: 24px;
        border-bottom: 1px solid rgba(51, 51, 51, 0.05);
        .van-image {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
        .equities-item-name {
          flex: 1;
          width: 0;
          display: flex;
          flex-wrap: nowrap;
          span {
            white-space: nowrap;
            &:first-child {
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &:last-child {
              color: rgba(51, 51, 51, 0.6);
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-button {
      width: 155px;
      height: 48px;
      background: rgba(51, 51, 51, 0.05);
      border-radius: 26px;
      &:first-child {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
      &:last-child {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #00c6ae;
        line-height: 24px;
      }
    }
  }
}
</style>