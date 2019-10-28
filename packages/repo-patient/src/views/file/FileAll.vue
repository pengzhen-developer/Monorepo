<template>
  <div class="file-all">
    <div class="time-line">
      <div class="item">
        <div class="time">
          <div class="y">02-20</div>
          <div class="s">2019</div>
        </div>
        <div class="text">
          <div class="note card case">
            <div class="case-left">
              <van-image width="50px"
                         height="50px"
                         src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="case-right">
              <p style="font-size: 16px; color: #333333; line-height: 32px;">门诊病历</p>
              <p style="font-size: 12px; color: #999999; line-height: 24px;">上医云馆 | 呼吸科</p>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="time">
          <div class="y">02-20</div>
          <div class="s">2019</div>
        </div>
        <div class="text">
          <div class="note card blood">
            <div class="blood-left">
              <van-image width="50px"
                         height="50px"
                         src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="blood-right">
              <span>
                <span style="font-size: 21px; color: #333333;">120/80</span>
                <span style="font-size: 12px; color: #333333;">mmHg</span>
              </span>
              <van-tag round
                       style="margin: 0 0 0 10px;"
                       color="#F2FFFD"
                       text-color="#00C6AE">正常</van-tag>
            </div>
          </div>
        </div>
      </div>

      <div class="item">
        <div class="time">
          <div class="y">02-20</div>
          <div class="s">2019</div>
        </div>
        <div class="text">
          <div class="note card blood">
            <div class="blood-left">
              <van-image width="50px"
                         height="50px"
                         src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="blood-right">
              <span>
                <span style="font-size: 21px; color: #333333;">3.5</span>
                <span style="font-size: 12px; color: #333333;">mmol/L</span>
              </span>
              <van-tag round
                       style="margin: 0 0 0 10px;"
                       color="#FA8C16"
                       text-color="#FFF7E6">偏高</van-tag>
            </div>
          </div>
          <div class="note card blood">
            <div class="blood-left">
              <van-image width="50px"
                         height="50px"
                         src="https://img.yzcdn.cn/vant/cat.jpeg" />
            </div>
            <div class="blood-right">
              <span>
                <span style="font-size: 21px; color: #333333;">3.5</span>
                <span style="font-size: 12px; color: #333333;">mmol/L</span>
              </span>
              <van-tag round
                       style="margin: 0 0 0 10px;"
                       color="#FA8C16"
                       text-color="#FFF7E6">偏高</van-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.file-all {
  height: 100%;
  background: #fff;
}

.time-line {
  padding: 25px 5px;

  .item {
    &:last-child {
      .text {
        border-left: 2px solid transparent;
      }
    }
  }

  .item {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    color: #999999;
    font-size: 16px;
  }
  .time {
    flex: 0 0 auto;
    width: 60px;
    padding-right: 20px;
    position: relative;
    text-align: right;
  }
  .item:last-child .text {
    min-height: 20px;
  }
  .text {
    border-left: 2px solid #d8d8d8;
    padding: 5px 20px;
    flex: 1;
    min-height: 60px;
  }
  .time::after {
    content: '';
    position: absolute;
    right: -6px;
    top: -5px;
    background: #d8d8d8;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .item.active .text {
    color: #00c6ae;
  }
  .item.active .time::after {
    content: '';
    width: 18px;
    height: 18px;
    right: -10px;
    background: #00c6ae;
  }
  .item.active .time {
    color: #000000;
  }
  .time .y {
    font-size: 14px;
    margin-top: -10px;
  }
  .text .status {
    margin-top: -10px;
  }
  .time .s,
  .text .note {
    font-size: 12px;
  }
}

.card {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;

  &.case {
    display: flex;
    align-items: center;

    .case-left {
      width: 64px;
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
    }
  }

  &.blood {
    display: flex;
    align-items: center;

    .blood-left {
      width: 64px;
    }
    .blood-right {
      flex: 1;
    }
  }
}
</style>