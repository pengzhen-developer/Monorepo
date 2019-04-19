<template>
  <div>
    <div class="title">
      <h4>图文问诊</h4>
      <span>（开通后，患者可以向您发起问诊）</span>
      <el-switch :active-value="1" :inactive-value="0" v-model="view.model.status"></el-switch>
    </div>

    <transition name="el-fade-in-linear">
      <div v-if="view.model.status === 1">
        <div class="input">
          <span>咨询费用</span>
          <el-select placeholder style="width: 100px; margin: 0 20px" v-model="view.model.money">
            <el-option :value="10" label="10"></el-option>
            <el-option :value="20" label="20"></el-option>
            <el-option :value="30" label="30"></el-option>
            <el-option :value="50" label="50"></el-option>
            <el-option label="自定义" value="自定义"></el-option>
          </el-select>
          <el-input-number
            :max="500"
            :min="0"
            controls-position="right"
            placeholder
            v-if="view.model.money === '自定义'"
            v-model="view.model.moneyForCustom"
          ></el-input-number>
          <span>元</span>
        </div>
        <div class="tip">
          <span>(温馨提示：费用修改后立即生效，费用最低0元，最高500元)</span>
        </div>
      </div>
    </transition>

    <hr>

    <el-button @click="save" type="primary">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api: {
        getDoctorInfo: 'client/v1/Personalcenter/getDoctorInfo',

        upConsultationSet: 'client/v1/Personalcenter/upConsultationSet'
      },

      view: {
        model: {
          money: 10
        }
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const params = {
        doctorId: $peace.cache.get('USER').list.docInfo.doctor_id
      }

      this.$http.get(this.api.getDoctorInfo, { params }).then(res => {
        this.view.model = res.data.doctor_consultation_setting[0]
      })
    },

    save() {
      const params = {
        doctorId: $peace.cache.get('USER').list.docInfo.doctor_id,
        tag: 'image',
        status: this.view.model.status,
        money: this.view.model.status ? (this.view.model.money === '自定义' ? this.view.model.moneyForCustom : this.view.model.money) : 0,
        inquiry_time: 0
      }

      this.$http.post(this.api.upConsultationSet, params).then(res => {
        $peace.util.alert(res.msg)

        this.get()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0 0 20px 0;

  h4 {
    margin: 0;
    display: inline-block;
    font-size: 18px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 25px;
  }

  span {
    font-size: 14px;
  }

  .el-switch {
    margin: 0 0 0 100px;
  }
}

.input {
  margin: 20px 0;

  .el-input-number {
    width: 100px;
    margin: 0 20px;
  }
}

.tip {
  margin: 20px 0;

  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid transparent;
  margin: 20px 0;
  padding: 0;
}
</style>
