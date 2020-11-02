<template>
  <div>
    <el-form ref="form"
             label-position="left"
             label-width="80px"
             v-bind:model="model"
             v-bind:rules="rules">
      <div>
        <div class="info-item">
          <div class="info-title">药房基本信息</div>
          <el-row class="q-pl-14">
            <el-col :span="12">
              <el-form-item prop="UserName">
                <span slot="label"
                      class="form-label">姓名</span>
                <el-input v-model.trim="model.UserName"
                          maxlength="10"
                          placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item prop="UserName">
                <span slot="label"
                      class="form-label">身份证号</span>
                <el-input v-model.trim="model.UserName"
                          maxlength="10"
                          placeholder="身份证号"></el-input>
              </el-form-item>
              <el-form-item prop="resource"
                            label-width="110px"
                            label="任职资格类型：">
                <el-radio-group v-model="model.resource">
                  <el-form-item>
                    <el-radio label="线上品的犯得上反"></el-radio>
                  </el-form-item>
                  <el-form-item>
                    <el-radio label="线地方大师傅士大夫士大"></el-radio>
                  </el-form-item>
                </el-radio-group>
              </el-form-item>
              <el-form-item prop="UserName">
                <span slot="label"
                      class="form-label">资质级别</span>
                <el-select v-model="model.selectValue"
                           placeholder="请选择"
                           style="width: 100%;">
                  <el-option v-for="item in selectList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="UserName">
                <span slot="label"
                      class="form-label">身份证号</span>
                <el-input v-model.trim="model.UserName"
                          maxlength="10"
                          placeholder="身份证号"></el-input>
              </el-form-item>
              <el-form-item>
                <span slot="label"
                      class="form-label">资质证明</span>
                <div class="upload-list">
                  <div class="upload-item">
                    <el-upload action
                               :http-request="uploadlogoUrl"
                               :show-file-list="false"
                               :before-upload="beforeUpload"
                               class="el-upload">
                      <img v-show="model.logoUrl"
                           :src="model.logoUrl"
                           class="upload-img" />
                      <img v-show="!model.logoUrl"
                           class="icon-add"
                           :src='require("../assets/img/add.png")'>
                    </el-upload>
                  </div>
                </div>
                <div class="upload-name">请上传资格证书图片</div>
                <div class="upload-name">建议尺寸：100*100、小于100KB</div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="info-item">
          <div class="info-title">账号信息</div>
          <el-form-item prop="roleName">
            <span slot="label"
                  class="form-label">上级部门</span>
            <el-cascader placeholder="请选择上级部门"
                         :options="options"
                         :props="{value:'id',label:'name' ,children:'child'}"
                         filterable
                         clearable></el-cascader>
          </el-form-item>
          <el-form-item prop="roleName2">
            <span slot="label"
                  class="form-label">账号角色</span>
            <el-cascader placeholder="请选择上级部门"
                         :options="options2"
                         :props="{ multiple: true, checkStrictly: true }"
                         clearable></el-cascader>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="UserName">
                <span slot="label"
                      class="form-label">姓名</span>
                <el-input v-model.trim="model.UserName"
                          maxlength="10"
                          placeholder="请输入姓名"></el-input>
              </el-form-item>

            </el-col>
            <el-col :span="12">
              <el-form-item prop="UserName">
                <span slot="label"
                      class="form-label">姓名</span>
                <el-input v-model.trim="model.UserName"
                          maxlength="10"
                          placeholder="请输入姓名"
                          resize="none"></el-input>
              </el-form-item>

            </el-col>
          </el-row>
          <el-form-item>
            <span slot="label"
                  class="form-label">备注</span>
            <el-input type="textarea"
                      resize="none"
                      v-model="model.UserName"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="text-center">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        UserName: '',
        resource: '',
        selectValue: '',
        logoUrl: ''
      },
      selectList: [
        { label: '选择一', value: 1 },
        { label: '选择二', value: 2 }
      ],
      rules: {},
      options: [
        {
          id: 'zhinan',
          name: '指南',
          child: [
            {
              id: 'shejiyuanze',
              name: '设计原则',
              child: [
                {
                  id: 'yizhi',
                  name: '一致'
                },
                {
                  id: 'fankui',
                  name: '反馈'
                },
                {
                  id: 'xiaolv',
                  name: '效率'
                },
                {
                  id: 'kekong',
                  name: '可控'
                }
              ]
            },
            {
              id: 'daohang',
              name: '导航',
              child: [
                {
                  id: 'cexiangdaohang',
                  name: '侧向导航'
                },
                {
                  id: 'dingbudaohang',
                  name: '顶部导航'
                }
              ]
            }
          ]
        }
      ],
      options2: [
        {
          value: 'zhinan',
          label: '指南'
        },
        {
          value: 'zhinan',
          label: '指南'
        },
        { value: 'zhinan', label: '指南' }
      ]
    }
  },
  methods: {
    // 校验上传文件
    beforeUpload(file) {
      let isJPG = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/bmp' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片支持jpg、jpeg、bmp、gif、png 格式')
      } else if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2M')
      }
      return isJPG && isLt2M
    },
    // 上传药房门头照片
    uploadlogoUrl(file) {
      this.uploadFile(file, 'logoUrl')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-radio-group {
  .el-form-item {
    &.el-form-item--mini {
      margin-bottom: 0;
    }
  }
}
.form-label {
  position: relative;
  display: inline-block;
  width: 70px;
  padding-right: 12px;
  text-align: justify;
  text-align-last: justify;
  &::after {
    content: '：';
    position: absolute;
    top: 0;
    right: 0;
  }
}
.info-item {
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 24px;
  &:last-child {
    border-bottom: none;
  }
}

.info-title {
  position: relative;
  padding-left: 14px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 0;
    width: 4px;
    height: 16px;
    background-color: var(--q-color-primary);
    border-radius: 2px;
  }
}

.upload-list {
  display: flex;
}
::v-deep .upload-item {
  flex: none;
  width: 130px;
  margin-right: 20px;
  background: #ffffff;
  &:last-child {
    margin-right: 0;
  }
  .el-upload {
    width: 130px;
    height: 130px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(238, 238, 238, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .upload-img {
      width: 100%;
      height: 100%;
    }
    .icon-add {
      width: 54px !important;
      height: 54px !important;
      display: block;
    }
  }
}
.upload-name {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
}
</style>