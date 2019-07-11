<template>
  <div class="doctor-inquiry-apply">
    <div class="title">
      <div class="title-avatar">
        <img />
      </div>

      <div class="title-info">
        <div class="title-doctor">
          <span class="title-doctor-name">张逗豆</span>
          <span>副主任医生</span>
          <span>妇产科</span>
        </div>
        <div class="title-hospital">
          <span>郑州大学第一附属医院</span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <van-cell-group>
      <van-field :value="value" @click="就诊人 = true" clickable label="就诊人" placeholder="请选择就诊人" readonly right-icon="arrow" />
      <van-popup position="bottom" v-model="就诊人">
        <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" show-toolbar />
      </van-popup>
    </van-cell-group>

    <van-cell-group>
      <van-field autosize label="病情描述" placeholder="请输入病情描述，如发病时间、主要病症、治疗经过、目前状况等，最少输入5字。" rows="5" type="textarea" v-model="model.病情描述" />
    </van-cell-group>

    <van-cell-group>
      <van-field label="附件上传">
        <van-uploader multiple slot="input" v-model="model.附件上传" />
      </van-field>
    </van-cell-group>

    <van-cell-group>
      <van-field label="是否复诊">
        <van-switch active-color="#00c6ae" slot="right-icon" v-model="model.是否复诊" />
      </van-field>
    </van-cell-group>

    <van-cell-group>
      <van-field :value="model.illnessHistory" @click="showIllnessHistory" clickable label="既往史" placeholder="请选择诊断" readonly right-icon="arrow" />
    </van-cell-group>

    <van-cell-group>
      <van-field :value="model.confirmTime" @click="showConfirmTime = true" clickable label="确认时间" placeholder="请选择时间" readonly right-icon="arrow" />
      <van-popup position="bottom" v-model="showConfirmTime">
        <van-datetime-picker @cancel="showConfirmTime = false" type="date" v-model="model.confirmTime" />
      </van-popup>
    </van-cell-group>

    <van-cell-group>
      <van-field :value="model.pastDrug" @click="showPastDrug" clickable label="既往用药" placeholder="请选择既往用药" readonly right-icon="arrow" />
    </van-cell-group>

    <van-cell-group>
      <van-field :value="model.allergicHistory" @click="showAllergicHistory" clickable label="过敏史" placeholder="请选择过敏史" readonly right-icon="arrow" />
    </van-cell-group>

    <van-cell-group>
      <van-field label="是否怀孕">
        <van-switch active-color="#00c6ae" slot="right-icon" v-model="model.是否怀孕" />
      </van-field>
    </van-cell-group>

    <van-cell-group>
      <van-field label="是否不良反应">
        <van-switch active-color="#00c6ae" slot="right-icon" v-model="model.是否不良反应" />
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        就诊人: '',
        病情描述: '',
        附件上传: [],
        是否复诊: false,
        是否怀孕: false,
        是否不良反应: false,

        illnessHistory: '',
        confirmTime: '',
        pastDrug: '',
        allergicHistory: ''
      },

      source: {
        confirmIllness: [],
        pastDrug: [],
        allergicHistory: []
      }
    }
  },

  activated() {
    if (this.$route.params.illnessHistory) {
      this.model.illnessHistory = this.$route.params.illnessHistory.map(item => item.value)
    }

    if (this.$route.params.allergicHistory) {
      this.model.allergicHistory = this.$route.params.allergicHistory.map(item => item.value)
    }

    if (this.$route.params.pastDrug) {
      this.model.pastDrug = this.$route.params.pastDrug.map(item => item.value)
    }
  },

  methods: {
    showIllnessHistory() {
      this.$router.push({
        name: '/components/addIllnessHistory',
        params: {
          keepAlive: false,
          pastDrug: this.model.illnessHistory
        }
      })
    },

    showPastDrug() {
      this.$router.push({
        name: '/components/addPastDrug',
        params: {
          keepAlive: false,
          pastDrug: this.model.pastDrug
        }
      })
    },

    showAllergicHistory() {
      this.$router.push({
        name: '/components/addAllergicHistory',
        params: {
          keepAlive: false,
          allergicHistory: this.model.allergicHistory
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-inquiry-apply {
  height: 100%;

  .title {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 20px;

    .title-avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(241, 248, 255, 1);
        border: 1px solid rgba(221, 225, 234, 1);
      }
    }

    .title-info {
      margin: 0 0 0 20px;

      .title-doctor {
        color: #000000;
        margin: 0 0 5px 0;

        .title-doctor-name {
          font-size: 18px;
          font-weight: 600;
        }

        span {
          margin: 0 10px 0 0;
        }
      }

      .title-hospital {
        margin: 0 0 5px 0;
        color: #000000;
      }
    }
  }

  .divider {
    height: 10px;
    background: #f5f5f5;
  }
}
</style>
