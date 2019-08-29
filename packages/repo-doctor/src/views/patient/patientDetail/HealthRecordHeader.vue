<template>
  <div class="health-record-header">
    <div class="header-left">
      <img src="~@/assets/images/female.png" v-if="internalData.familyInfo.sex === '女'" />
      <img src="~@/assets/images/male.png" v-else />
    </div>
    <div class="header-right">
      <div class="card">
        <div class="title">基本信息</div>
        <div class="content">
          <el-row>
            <el-col :span="8">
              <label class="label">姓名：</label>
              <span :title="internalData.familyInfo.name" class="value">{{ internalData.familyInfo.name }}</span>
            </el-col>
            <el-col :span="8">
              <label class="label">性别：</label>
              <span :title="internalData.familyInfo.sex" class="value">{{ internalData.familyInfo.sex }}</span>
            </el-col>
            <el-col :span="8">
              <label class="label">联系电话：</label>
              <span :title="internalData.familyInfo.tel" class="value">{{ internalData.familyInfo.tel }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <label class="label">标签：</label>
              <span>
                <el-tag
                  :key="item"
                  size="medium"
                  style="margin: 0 5px 10px 0; border: 0;"
                  type="info"
                  v-for="item in internalData.familyInfo.diagnoseInfo"
                >{{ item }}</el-tag>
              </span>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="card">
        <div class="title">健康信息</div>
        <div class="content">
          <el-row>
            <el-col :span="8">
              <label class="label">婚姻状态：</label>
              <span :title="internalData.personalInfo.maritalStatus" class="value">{{ internalData.personalInfo.maritalStatus }}</span>
            </el-col>
            <el-col :span="8">
              <label class="label">生育状态：</label>
              <span :title="internalData.personalInfo.fertilityStatus" class="value">{{ internalData.personalInfo.fertilityStatus }}</span>
            </el-col>
            <el-col :span="8">
              <label class="label label-7">手术或外伤：</label>
              <span :title="internalData.personalInfo.surgeryTrauma" class="value">{{ internalData.personalInfo.surgeryTrauma }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <label class="label">家族病史：</label>
              <span :title="internalData.personalInfo.familyHistory" class="value">{{ internalData.personalInfo.familyHistory }}</span>
            </el-col>
            <el-col :span="8">
              <label class="label">药物过敏：</label>
              <span :title="internalData.personalInfo.drugAllergy" class="value">{{ internalData.personalInfo.drugAllergy }}</span>
            </el-col>
            <el-col :span="8">
              <label class="label label-7">食物/接触物过敏：</label>
              <span :title="internalData.personalInfo.foodAllergy" class="value">{{ internalData.personalInfo.foodAllergy }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <label class="label">个人习惯：</label>
              <span :title="internalData.personalInfo.personalHabit" class="value">{{ internalData.personalInfo.personalHabit }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    id: String
  },

  data() {
    return {
      collspace: true,

      internalData: {
        familyInfo: {},
        personalInfo: {}
      }
    }
  },

  created() {
    this.get()
  },

  methods: {
    get() {
      const params = { familyId: this.id }

      peace.service.patient.getOneHealth(params).then(res => {
        this.internalData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.health-record-header {
  display: flex;

  .header-left {
    width: 140px;
    min-width: 140px;

    img {
      width: 105px;
      height: 126px;
    }
  }

  .header-right {
    flex: 1;

    label {
      width: 5em;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
      color: rgba(96, 98, 102, 1);

      &.label-7,
      &.label-8 {
        width: auto;
      }
    }

    .el-col {
      display: flex;
    }

    .value {
      margin: 0 0 0 5px;
      color: rgba(96, 98, 102, 1);
      display: inline-block;
      width: 140px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .card {
      display: flex;
      margin: 0 0 10px 0;

      .title {
        width: 100px;
        color: $--color-primary;
      }
      .content {
        flex: 1;

        .el-row {
          margin: 0 0 10px 0;
        }
      }
    }
  }
}
</style>