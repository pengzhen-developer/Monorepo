<template>
  <div class="about">
    <el-form :model="view.model"
             space-sm
             label-suffix
             label-width="auto">
      <el-form-item label="我的简介：">
        <div class="flex column">
          <el-input :rows="8"
                    maxlength="500"
                    placeholder
                    type="textarea"
                    v-model="view.model.summary"></el-input>
          <label class="msg">最多可以输入500字，还可以输入 {{ summaryMaxLength }} 字</label>
        </div>
      </el-form-item>
      <el-form-item label="我的擅长：">
        <div class="flex column">
          <el-input :rows="8"
                    maxlength="500"
                    placeholder
                    type="textarea"
                    v-model="view.model.special_skill"></el-input>
          <label class="msg">最多可以输入500字，还可以输入 {{ specialSkillMaxLength }}字</label>
        </div>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="save"
                   type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from './service/index.js'

export default {
  data() {
    return {
      view: {
        model: {}
      }
    }
  },

  computed: {
    summaryMaxLength() {
      if (this.view.model.summary) {
        return 500 - this.view.model.summary.length
      } else {
        return 500
      }
    },

    specialSkillMaxLength() {
      if (this.view.model.special_skill) {
        return 500 - this.view.model.special_skill.length
      } else {
        return 500
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
        doctorId: this.$store.state.user.userInfo.list.docInfo.doctor_id
      }

      Service.getDoctorInfo(params).then((res) => {
        this.view.model = res.data
      })
    },

    save() {
      const params = {
        doctorId: this.$store.state.user.userInfo.list.docInfo.doctor_id,
        type: '0',
        summary: this.view.model.summary,
        special_skill: this.view.model.special_skill
      }

      Service.upDoctorIntroduce(params).then((res) => {
        Peace.util.success(res.msg)

        this.get()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  ::v-deep .el-textarea {
    width: 500px;
  }

  .msg {
    display: block;
    font-size: 12px;
    color: rgba(155, 155, 155, 1);
  }
}
</style>
