<template>
  <el-form :model="model" :rules="rules" label-position="left" label-width="85px" ref="model">
    <el-row>
      <el-form-item label="记录类型" prop="recordType">
        <span slot="label">记录类型</span>
        <el-select clearable placeholder="请选择" v-model="model.recordType" class="full-width">
          <el-option :key="item.id" :label="item.typeTag" :value="item.typeTag" v-for="item in recordTypeList"></el-option>
        </el-select>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="病程记录" prop="diseaseRecord">
        <span slot="label">病程记录</span>
        <el-input :rows="7" maxlength="500" placeholder="请输入病程记录" type="textarea" show-word-limit v-model.trim="model.diseaseRecord"></el-input>
      </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="病程日期" prop="recordDate">
        <span slot="label">病程日期</span>
        <el-date-picker placeholder="请选择病程日期" v-model="model.recordDate" value-format="yyyy-MM-dd HH:mm:ss" class="full-width"></el-date-picker>
      </el-form-item>
    </el-row>

    <el-row class="text-center q-mt-xl">
      <el-button style="width: 140px" v-on:click="saveItem" type="primary">提交</el-button>
    </el-row>
  </el-form>
</template>

<script>
import peace from '@src/library'

export default {
  name: 'AddDiseaseRecord',
  props: {
    params: {
      type: Object,
      required: true
    }
  },
  created() {
    peace.service.follow.getCourseType({}).then((res) => {
      this.recordTypeList = res.data
    })

    if (!peace.validate.isEmpty(this.params.item)) {
      //item 不为空，为编辑项目
      const [type, record, date] = [this.params.item.courseType, this.params.item.courseRecord, this.params.item.courseTime]
      this.model = {
        recordType: type,
        diseaseRecord: record,
        recordDate: date
      }
    }
  },
  data() {
    return {
      recordTypeList: [],
      model: {
        recordType: undefined,
        diseaseRecord: undefined,
        recordDate: undefined
      },
      rules: {
        recordType: [{ required: true, message: '请选择记录类型', trigger: 'blur' }],
        diseaseRecord: [{ required: true, message: '请输入病程记录', trigger: 'blur' }],
        recordDate: [{ required: true, message: '请选择记录类型', trigger: 'blur' }]
      }
    }
  },
  methods: {
    saveItem() {
      this.$refs.model.validate((valid) => {
        if (valid) {
          const tmp = {
            familyId: '',
            patientNo: '',
            patientId: '',
            type: this.model.recordType,
            courseTime: this.model.recordDate,
            courseRecord: this.model.diseaseRecord
          }
          const params = Object.assign(tmp, this.params.familyInfo)

          if (!peace.validate.isEmpty(this.params.item.id)) {
            params.courseId = this.params.item.id
          }

          peace.service.follow.addEditCourse(params).then((res) => {
            $peace.$emit('showDrawer', { index: peace.type.HEALTH_RECORD.ACTION_TYPE.病程 })
            peace.util.alert(res.msg)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding: 10px 15px;

  .el-form-item {
    .tag {
      margin: 2px 10px 2px 0;
      min-width: 62px;
      text-align: center;
      border: none;
      border-radius: 2px;
      height: 28px;
      line-height: 28px;
    }

    .patientStyle {
      width: 124px;
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
  }

  .el-form-item__label span {
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;

    &:after {
      content: '：';
    }
  }

  /deep/ .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before,
  .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
    content: '';
    margin: 0;
  }

  .el-button {
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
