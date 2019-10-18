<template>
  <div class="pd">
    <div class="list-3tr">
      <div class="tit"
           style="font-size:17px; padding-left: 16px">{{ data.name }}</div>
      <div class="text">英文名称：{{ data.hypy }}</div>
      <div class="text">商品名称：{{ data.spm }}</div>
    </div>
    <div class="list-3tr">
      <div class="tit">【成份】</div>
      <div class="text">{{ data.zycf }}</div>
      <div class="tit">【适应症】</div>
      <div class="text">{{ data.syz }}</div>
      <div class="tit">【用法用量】</div>
      <div class="text">{{ data.yfyl }}</div>
      <div class="tit">【孕妇及哺乳期妇女用药】</div>
      <div class="text">{{ data.yfjprqfnyy }}</div>
      <div class="tit">【儿童用药】</div>
      <div class="text">{{ data.etyy }}</div>
      <div class="tit">【老年用药】</div>
      <div class="text">{{ data.lnyy || '无' }}</div>
      <div class="tit">【有效期】</div>
      <div class="text">{{ data.yxq }}</div>
      <div class="tit">【不良反应】</div>
      <div class="text">{{ data.blfy }}</div>
      <div class="tit">【禁忌】</div>
      <div class="text">{{ data.jj }}</div>
      <div class="tit">【注意事项】</div>
      <div class="text">{{ data.zysx }}</div>
      <div class="tit">【毒理研究】</div>
      <div class="text">{{ data.yldx }}</div>
      <div class="tit">【批准文号】</div>
      <div class="text">{{ data.pzwh }}</div>
      <div class="tit">【生产企业】</div>
      <div class="text">{{ data.scqy }}</div>
      <div class="tit">【药品分类】</div>
      <div class="text">{{ data.ypfl }}</div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      data: {}
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.purchasedrug.getDrugbookinfo(params).then(res => {
        this.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pd {
  background: #fff;

  .box {
    margin-top: 0;
    overflow: hidden;
    padding-bottom: 15px;
  }
  .mg {
    margin-top: 25px;
  }
  .outline .outline-body {
    margin-right: 0;
  }
  .list-3tr {
    border-bottom: 1px solid #eeeeee;
    line-height: 1.7;
    padding: 5px 0;
  }
  .list-3tr .tit {
    color: #333333;
    font-size: 15px;
    font-weight: 700;
  }
  .list-3tr .small {
    color: #666;
    font-size: 13px;
  }
  .list-3tr .text {
    color: #999999;
    font-size: 12px;
  }

  /*list-3tr*/
  .list-3tr .tit {
    padding: 0 10px;
  }
  .list-3tr .text {
    padding: 3px 16px;
  }
}
</style>