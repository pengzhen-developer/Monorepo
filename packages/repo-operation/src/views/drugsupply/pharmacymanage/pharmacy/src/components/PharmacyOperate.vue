<template>
  <div>
    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title ">配送服务</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">免费配送</div>
        </div>
        <div class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">收费配送，配送费<span class="item-text-primary">10</span>元</div>
        </div>
        <div class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">满<span class="item-text-primary">10</span>元免配送费，否则收配送费<span class="item-text-primary">10</span>元</div>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">优惠活动</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">没有优惠活动</div>
        </div>
        <div class="item-child">
          <i class="el-icon-success"></i>
          <div class="item-text-grey">满减活动，满<span class="item-text-primary">10</span>元减<span class="item-text-primary">10</span>元</div>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="content-item">
      <div class="item-title">
        <div class="title-left"></div>
        <p class="title">标签设置</p>
      </div>
      <div class="item-content">
        <div class="item-child">
          <el-tag class="item-tag"
                  type="info"
                  effect="plain">政府监管</el-tag>
          <el-tag class="item-tag item-tag-primary"
                  type=""
                  effect="light">正品保证</el-tag>
          <el-tag class="item-tag"
                  type="info"
                  effect="plain">到店医保</el-tag>
          <el-tag class="item-tag"
                  type="info"
                  effect="plain">到店有礼</el-tag>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    data: String
  },
  data() {
    return {
      operateData: {},
      DistributSelfList: [{ code: 0, name: '自提' }],
      DistributionList: [{ code: 1, name: '配送' }],
      DistributSelfMode: [],
      DistributMode: [],
      PayselfList: [
        { code: 4, name: '在线支付' },
        { code: 2, name: '到店支付' }
      ],
      PayList: [
        { code: 1, name: '在线支付' },
        { code: 3, name: '货到付款' }
      ]
    }
  },

  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      const params = { UserID: this.data }
      Service.operate(params).then((res) => {
        this.operateData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.content-item {
  display: flex;
  flex-direction: column;
  background: white;
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px;
}
.title {
  color: var(--q-color-grey-333);
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}
.item-content {
  margin: 0px 14px 10px 0px;
  display: flex;
  flex-direction: column;
}
.item-child {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.line {
  width: 100%;
  margin: 10px 0 20px 0;
  height: 1px;
  background: #e9e9e9;
}
.el-icon-success {
  font-size: 16px;
  color: var(--q-color-primary);
}
.item-text-grey {
  margin: 0 16px;
  font-size: 14px;
  color: var(--q-color-grey-333);
}
.item-text-primary {
  margin: 0 10px;
  font-size: 14px;
  color: var(--q-color-primary);
}
.item-tag {
  height: 32px;
  margin-right: 10px;
  padding: 0 32px;
  font-size: 14px;
  line-height: 31px;
}

.item-tag-primary {
  border: 1px solid #3099a6;
}
</style>