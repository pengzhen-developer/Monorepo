<template>
  <div class="file-case-detail">
    <van-cell-group>
      <van-cell title="病历号"
                value="201806299905441" />
      <van-cell title="就诊时间"
                value="2019-01-03 08:55:23" />
      <van-cell title="主诉"
                value="湿疹膏因着凉今日晨起时自觉咽喉疼痛，2小时前疼痛家具，1小时前患者感到咽部有球状物阻塞感，同时感到乏力、畏寒。无发热，无呼吸困难。" />
      <van-cell title="过敏史"
                value="无" />
      <van-cell title="既往史"
                value="无" />
      <van-cell title="检查指标">
        <div slot="label"
             class="file-case-detail-card">
          <div class="row">
            <div>
              <span>体温：</span><span>38度</span>
            </div>
            <div>
              <span>体重：</span><span>50kg</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span>心率：</span><span>38度</span>
            </div>
            <div>
              <span>血压：</span><span>50kg</span>
            </div>
          </div>
        </div>
      </van-cell>
      <van-cell title="辅助检查"
                value="无" />
      <van-cell title="诊断"
                value="无" />
      <van-cell title="医嘱小结"
                value="无" />
      <van-cell title="其它检查">
        <div slot="label"
             class="file-case-detail-card">
          <div class="row">
            <div>
              <span>谷丙转氨酶(ALT)：</span>
            </div>
            <div>
              <span>44IU/ml</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span>谷草转氨酶(AST)：</span>
            </div>
            <div>
              <span>44IU/ml</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span>HBV-DNA：</span>
            </div>
            <div>
              <span>44IU/ml</span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.van-cell__title {
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}

.van-cell__label,
.van-cell__value {
  flex: 2;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}

.file-case-detail {
  .file-case-detail-card {
    background: rgba(248, 248, 248, 1);
    border-radius: 8px;
    padding: 16px;

    .row {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
    }
  }
}
</style>