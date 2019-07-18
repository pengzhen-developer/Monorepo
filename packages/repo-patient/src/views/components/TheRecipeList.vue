<template>
  <div class="the-recipe-list">
    <!-- 
      todo:
      暂时屏蔽未读消息
    -->
    <div :data-index="index" :key="index" @click="goprescripDetailPage(item)" class="word-list" v-for="(item, index) in internalData">
      <div class="word-avatar">
        <div class="icon"></div>
      </div>
      <div class="word-body">
        <div class="word-title">
          <div class="title">{{item.patientName}}的用药建议</div>
          <div
            :class="{ [`label-${item.prescriptionStatus.key}`] : true }"
            class="label label-default"
            v-if="item.prescriptionStatus"
          >{{item.prescriptionStatus.prescriptionStatus}}</div>
        </div>
        <div class="word-inline">
          <div class="span l">{{item.hospitalName}}</div>
          <div class="span">| {{item.deptName}}</div>
          <div class="span s">{{item.date}}</div>
        </div>
      </div>
    </div>
    <div class="tips-bottom" v-if="internalData && internalData.length">
      <div>为确保广大患者的用药安全，请注意：</div>
      <div>1. 医生开具用药建议之后，会有专业药师团队对用药建议进行审核。审核通过的用药建议方能进行购药。</div>
      <div>2. 用药建议开具3日内有效。</div>
      <div>3. 用药建议仅限平台认证的药店配药，自行下载用药建议去其他药店购药，药品安全平台不做担保。</div>
    </div>
    <div class="none-page" v-else>
      <div class="icon icon_none_prescrip"></div>
      <div class="none-text">暂无用药建议</div>
    </div>

    <peace-dialog :visible.sync="recipeDetail.visible" title="处方详情">
      <TheRecipe :data="recipeDetail.data"></TheRecipe>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

import TheRecipe from '@src/views/components/TheRecipe'

export default {
  components: {
    TheRecipe
  },

  props: {
    data: {
      type: Array,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      internalData: [],

      recipeDetail: {
        visible: false,
        data: {}
      }
    }
  },

  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  },

  created() {
    if (!this.data) {
      this.get()
    }
  },

  methods: {
    get() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.patient.getMyPrescripList(params).then(res => {
        this.internalData = res.data
      })
    },

    goprescripDetailPage(item) {
      this.recipeDetail.visible = true
      this.recipeDetail.data = undefined

      const params = {
        prescribeId: item.prescribeId
      }

      peace.service.patient.getPrescripInfo(params).then(res => {
        this.recipeDetail.data = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.the-recipe-list {
  min-height: 100%;
  background: #f5f5f5;
  padding: 15px;

  .word-list {
    position: relative;
    background: #fff;

    margin: 10px 0;
    box-shadow: 0 2px 1px #dedede;
    display: flex;
  }
  .word-list::after {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 20px 0 0 20px;
    right: -10px;
    top: 30px;
    position: absolute;
    display: block;
    background: #f5f5f5;
    box-shadow: 1px 0 0 #dedede inset;
  }
  .word-list.new::before {
    content: '';
    color: #fff;
    position: absolute;
    font-size: 12px;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;
    right: -4px;
    top: -4px;
  }
  .word-list .icon {
    margin-top: 10px;
  }
  .word-list .icon::before {
    content: '';
    width: 25px;
    height: 30px;
    background-image: url(data:image/png;base64,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);
  }
  .word-list .word-avatar {
    flex: 0 0 auto;
    width: 55px;
    padding: 15px;
    position: relative;
    box-sizing: border-box;
  }
  .word-list .word-body {
    padding: 10px 25px 10px 0;
    flex: 1;
  }
  .word-list .word-inline,
  .word-list .word-title {
    width: 100%;
    display: flex;
    position: relative;
  }
  .word-title .title {
    flex: 1;
    font-size: 16px;
    margin-bottom: 10px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .word-title .label {
    flex: initial;
    width: 60px;
    height: 22px;
    margin-right: 10px;
    border: 0;
    border-radius: 2px;
    text-align: center;
  }
  .word-list .word-inline {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;

    border-top: 1px solid #dedede;
    padding-top: 10px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .word-inline .span {
    font-size: 14px;
    color: #999;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .span.s {
    max-width: 125px;
    text-align: right;
  }
  .span.g {
    width: 75px;
    text-align: right;
  }
  .label-default,
  .label-1,
  .label-3,
  .label-4 {
    background: #e5e5e5;
    color: #999;
  }
  .label-red,
  .label-2 {
    background: #f2223b;
    color: #fff;
  }
  .label-blue,
  .label-5,
  .label-6 {
    background: #00c6ae;
    color: #fff;
  }
  .tips-bottom {
    margin: 10px 15px;
    line-height: 1.7;
  }
}
</style>
