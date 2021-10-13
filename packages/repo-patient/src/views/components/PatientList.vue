<template>
  <div class="mainWrap">
    <div class="familyWrap">
      <div class="family-item"
           :class="{'checked':checkId==index}"
           @click="selcetMyFamily(item,index)"
           v-for="(item,index) in familyList"
           :key="index">
        <div class="item-top">
          <span class="name"
                :class="checkId==index&&'checked'">{{item.name}}</span>
          <span class="relative"
                :class="checkId==index&&'checked'">{{item.relation}}</span>
        </div>
        <div class="item-bottom"
             :class="checkId==index&&'checked'">{{item.sex}} {{item.age}}</div>
      </div>
      <div class="addWrap"
           @click="addFamily"
           v-if="familyList.length<4">
        <van-image width="20px"
                   height="20px"
                   :src="require('@src/assets/images/ic_add.png')"></van-image>
        <span>新增就诊人</span>
      </div>
    </div>

  </div>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'patient-list',

  props: {
    familyList: Array,
    checkedId: [Number, String]
  },
  data() {
    return {
      checkId: -1,
      familyId: '',
      familyInfo: {}
    }
  },
  watch: {
    checkedId: {
      handler(val) {
        this.checkId = val
      },
      immediate: true
    }
  },
  methods: {
    //选择就诊人 (家人)
    selcetMyFamily(item, index) {
      if (this.checkId == index) {
        this.checkId = -1
        this.familyId = ''
        this.familyInfo = {}
      } else {
        this.checkId = index
        this.familyId = item.familyId
        this.familyInfo = item
      }
      this.$emit('selectFamily', { familyId: this.familyId, familyInfo: this.familyInfo })
    },
    addFamily() {
      if (this.familyList && this.familyList.length >= 4) {
        return peace.util.alert('您最多可添加 4 位家人')
      }
      this.$emit('addFamily', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.mainWrap {
  flex: 1;
  width: 100%;
  overflow: auto;
}
.familyWrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .family-item {
    width: calc((100% - 11px) / 2);
    margin-right: 11px;
    background: #f9f9f9;
    padding: 8px 0.5em 8px 11px;
    border: 1px solid #ddd;
    border-radius: 3px;
    height: 74px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 11px;
    &.checked {
      background: #e5f9f6;
      border-color: #00c6ae;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 35px;
        height: 29px;
        background-image: url('~@src/assets/images/ic_checked.png');
        background-size: cover;
      }
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
    .item-top {
      display: flex;
      align-items: center;

      .name {
        color: #000;
        font-size: 16px;
        max-width: 5em;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &.checked {
          color: #00c6ae;
        }
      }
      .relative {
        color: #999;
        font-size: 13px;
        padding: 2px 5px;
        line-height: 1.2;
        margin-left: 0.5em;
        white-space: nowrap;
        border: 1px solid #ddd;
        border-radius: 20px;
        &.checked {
          color: #00c6ae;
          border-color: #00c6ae;
        }
      }
    }
    .item-bottom {
      color: #666;
      font-size: 14px;
      &.checked {
        color: #00c6ae;
      }
    }
  }
}
.addWrap {
  width: calc((100% - 11px) / 2);
  height: 74px;
  border-radius: 6px;
  border: 1px dashed rgba(187, 187, 187, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 11px;
  span {
    margin-left: 10px;
    color: #999;
    font-size: 14px;
  }
}
</style>