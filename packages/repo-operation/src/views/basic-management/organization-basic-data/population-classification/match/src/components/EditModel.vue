
<template>
  <div>
    <div class="flex justify-between">
      <div class="flex column items-center">
        <div class="subtitle text-center">机构字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">主要编码</div>
            <div class="info-item-value">{{dictionaryOrg.mainCode}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">附加编码</div>
            <div class="info-item-value">{{dictionaryOrg.extraCode}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">疾病名称</div>
            <div class="info-item-value">{{dictionaryOrg.diseaseName}}</div>
          </div>
        </div>
      </div>
      <div class="text-primary flex column items-center justify-center q-pt-12">
        <span>已匹配平台字典</span>
        <el-image :src="require('../assets/images/ic_shuttle.png')"></el-image>
      </div>
      <div class="flex column items-center">
        <div class="subtitle text-center">平台字典</div>
        <div class="info">
          <div class="info-item flex">
            <div class="info-item-label">主要编码</div>
            <div class="info-item-value">{{dictionaryPlat.mainCode}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">附加编码</div>
            <div class="info-item-value">{{dictionaryPlat.extraCode}}</div>
          </div>
          <div class="info-item flex">
            <div class="info-item-label">疾病名称</div>
            <div class="info-item-value">{{dictionaryPlat.diseaseName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-36">
      <div class="title">ICD编码查找</div>
      <div class="card card-search q-mt-16">
        <el-form inline
                 label-suffix="："
                 v-on:keyup.enter.native="fetch"
                 v-on:submit.native.prevent
                 v-bind:model="model">
          <el-form-item label="疾病名称">
            <el-input v-model.trim="model.diseaseName"
                      placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="fetch"
                       type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="card">
        <PeaceTable ref="table"
                    pagination>
          <PeaceTableColumn label=""
                            width="35">
            <template slot-scope="scope">
              <el-radio v-model="radioId"
                        :label="scope.row.name"></el-radio>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="平台编码"
                            prop=""></PeaceTableColumn>
          <PeaceTableColumn label="附加编码"
                            prop=""></PeaceTableColumn>
          <PeaceTableColumn label="平台疾病名称"
                            prop=""></PeaceTableColumn>
        </PeaceTable>

      </div>
    </div>
    <div class="flex justify-between full-width q-pt-32">
      <div class="flex items-center">
        <el-button @click="skip"
                   class="skip-btn">跳过</el-button>
        <span style="color:#EA3930;"
              class="q-ml-8">点击进行下一条药品审核</span>
      </div>
      <div class="flex items-center">
        <el-button @click="reset">重置配码</el-button>
        <el-button @click="unabel">无法配码</el-button>
        <el-button type="primary"
                   @click="submit">保存配码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditModel',
  props: {
    info: Object,
    type: String
  },

  data() {
    return {
      model: {
        diseaseName: ''
      },
      radioId: '',
      dictionaryOrg: {
        mainCode: 'A01.001',
        diseaseName: '肠伤寒',
        extraCode: 'TJ000024'
      },
      dictionaryPlat: {
        mainCode: '',
        diseaseName: '',
        extraCode: ''
      }
    }
  },

  methods: {
    //保存配码
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.saveData()
        } else {
          return false
        }
      })
    },
    saveData() {
      this.$emit('complete')
    },
    //重置配码
    reset() {},
    //无法配码
    unabel() {},
    //跳过
    skip() {},
    fetch() {}
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #333333;
  line-height: 24px;
  margin-bottom: 8px;
}
.info {
  border-top: 1px solid #eaeaea;
  border-left: 1px solid #eaeaea;
  min-width: 384px;
  .info-item-label,
  .info-item-value {
    border-bottom: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    padding: 9px 16px;

    color: #333333;
    line-height: 20px;
  }
  .info-item-label {
    background: #fafafa;
    font-weight: bold;
    width: 35%;
  }
  .info-item-value {
    width: 65%;
  }
}
.title {
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  position: relative;
  padding-left: 12px;
  &::before {
    content: '';
    width: 4px;
    height: 16px;
    background: #3099a6;
    border-radius: 2px;
    left: 0;
    top: 4px;
    position: absolute;
  }
}
.skip-btn {
  width: 88px;
  height: 32px;
  background: rgba(48, 153, 166, 0.1);
  border: none;
  color: #3099a6 !important;
}
</style>