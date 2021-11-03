<template>
  <div class="health-record-header">
    <div class="header-left">
      <img src="~@src/assets/images/female.png"
           v-if="internalData.familyInfo.sex === '女'" />
      <img src="~@src/assets/images/male.png"
           v-else />
    </div>
    <div class="header-right">
      <div class="card">
        <div class="title">基本信息</div>
        <div class="content">
          <el-form space-view
                   label-suffix="：">
            <div class="row q-col-gutter-lg-x-md">
              <el-form-item class="col"
                            label="姓名">{{ internalData.familyInfo.name }}</el-form-item>
              <el-form-item class="col"
                            label="性别">{{ internalData.familyInfo.sex }}</el-form-item>
              <el-form-item class="col"
                            label="年龄">{{ internalData.familyInfo.age }}</el-form-item>
              <el-form-item class="col"
                            label="联系电话">{{ internalData.familyInfo.tels }}</el-form-item>
            </div>
            <div class="row q-col-gutter-lg-x-md">
              <el-form-item class="col">
                <template v-slot:label>标签：</template>
                <div class="flex">
                  <div v-if="internalData.familyInfo.diagnoseInfo && internalData.familyInfo.diagnoseInfo.length">
                    <el-tag :key="item"
                            size="medium"
                            style="margin: 0 5px 10px 0; border: 0;"
                            type="info"
                            v-for="item in internalData.familyInfo.diagnoseInfo">{{ item }}</el-tag>
                  </div>
                  <div v-else>
                    -
                  </div>
                </div>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>

      <div class="card">
        <div class="title">健康信息</div>
        <div class="content">
          <el-form space-view
                   label-suffix="：">
            <div class="row q-col-gutter-x-md">
              <el-form-item class="col"
                            label="婚姻状态">{{ internalData.personalInfo.maritalStatus || "-" }}</el-form-item>
              <el-form-item class="col"
                            label="生育状态">{{ internalData.personalInfo.fertilityStatus || "-" }}</el-form-item>
            </div>
            <div class="row q-col-gutter-x-md">
              <el-form-item class="col"
                            label="手术或外伤">{{ internalData.personalInfo.surgeryTrauma || "-" }}</el-form-item>
              <el-form-item class="col"
                            label="家族病史">{{ internalData.personalInfo.familyHistory || "-" }}</el-form-item>
            </div>
            <div class="row q-col-gutter-x-md">
              <el-form-item class="col"
                            label="药物过敏">{{ internalData.personalInfo.drugAllergy || "-" }}</el-form-item>
              <el-form-item class="col"
                            label="食物/接触物过敏">{{ internalData.personalInfo.foodAllergy || "-" }}</el-form-item>
            </div>
            <div class="row q-col-gutter-x-md">
              <el-form-item class="col"
                            label="个人习惯">{{ internalData.personalInfo.personalHabit || "-" }}</el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    internalData: undefined
  },
  data() {
    return {
      collspace: true
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
      display: inline-block;
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .card {
      display: flex;
      margin: 0 0 10px 0;

      .title {
        width: 100px;
        color: #000;
        font-weight: 600;

        &::before {
          content: ' ';
          display: inline-block;
          position: relative;
          top: 2px;
          width: 4px;
          height: 14px;
          margin: 0 15px 0 0;
          background: $--color-primary;
          border-radius: 4px;
        }
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