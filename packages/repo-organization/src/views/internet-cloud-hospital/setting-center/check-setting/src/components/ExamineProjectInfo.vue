<template>
  <div class="project-model">
    <!-- 添加或编辑 -->
    <el-form v-show="type !== 'detail'"
             :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="一级项目"
                        prop="parentId">
            <el-select v-model="ruleForm.parentId"
                       @change="onChange">
              <el-option :key="status.id"
                         :label="status.name"
                         :value="status.id"
                         v-for="status in parentList"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二级项目"
                        prop="childId">
            <el-select v-model="ruleForm.childId">
              <el-option :key="status.id"
                         :label="status.name"
                         :value="status.id"
                         v-for="status in childList"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目名称"
                    prop="name">
        <el-input type="input"
                  v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目价格"
                        prop="amount">
            <el-input-number v-model="ruleForm.amount"
                             :precision="2"
                             :step="1"
                             controls-position="right"
                             :max="9999999.99"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目图片">
        <el-upload accept=".jpg,.jpeg,.png,.gif"
                   list-type="picture-card"
                   :action="uploadUrl"
                   :multiple="false"
                   :auto-upload="true"
                   :on-remove="handleRemove"
                   :before-upload="beforeUpload"
                   :on-success="uploadSuccess"
                   :headers="extraHeaders"
                   :limit="1"
                   :on-exceed="handleExceed"
                   :file-list="fileList">
          <img style="width: 148px; height: 148px;"
               src="../assets/images/upload.png" />
          <div slot="tip"
               class="el-upload__tip">为保证图片效果，建议上传图片尺寸为200*200</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="项目详情"
                    prop="desc">
        <el-input type="textarea"
                  maxlength="2000"
                  show-word-limit
                  v-model="ruleForm.desc"
                  :autosize="{ minRows: 4, maxRows: 8}"></el-input>
      </el-form-item>
      <el-form-item class="bottom">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 详情 -->
    <el-form v-show="type === 'detail'"
             label-width="100px"
             label-suffix="："
             class="project-detail">
      <el-row>
        <el-col :span="12">
          <el-form-item label="一级项目">
            <div class="detail-value">{{projectDetail.parentName}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="二级项目">
            <div class="detail-value">{{projectDetail.childName}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目名称">
        <div class="detail-value">{{projectDetail.itemName}}</div>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目价格">
            <div class="detail-value">{{projectDetail.itemAmount}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="项目图片">
        <img v-if="projectDetail.itemPhoto"
             class="detail-img"
             :src="projectDetail.itemPhoto" />
      </el-form-item>
      <el-form-item label="项目详情">
        <div class="detail-value">{{projectDetail.itemDesc}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Service from '../service'

export default {
  props: ['type', 'projectId'],
  data() {
    let validateMoney = (rule, value, callback) => {
      const reg = /^(0|[1-9][0-9]{0,})(\.\d{1,2})?$/
      if (value && !reg.test(value)) {
        callback(new Error('金额为数字且最多保留两位小数'))
      } else {
        callback()
      }
    }
    return {
      uploadUrl: `${process.env.VUE_APP_API_BASE}nethospital/hospital/v1/doctor/uploadImages`,
      extraHeaders: {
        Authorization: ''
      },
      fileList: [],
      parentList: [],
      childList: [],
      ruleForm: {
        itemId: '',
        name: '',
        imageUrl: '',
        amount: '',
        desc: '',
        parentId: '',
        childId: ''
      },
      rules: {
        parentId: [{ required: true, message: '请选择一级项目', trigger: 'change' }],
        childId: [{ required: true, message: '请选择二级项目', trigger: 'change' }],
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 3, max: 30, message: '请输入3到30个字符', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入项目价格', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写项目详情', trigger: 'blur' },
          { min: 3, max: 2000, message: '请输入3到2000个字符', trigger: 'blur' }
        ]
      },
      projectDetail: {}
    }
  },

  watch: {
    fileList() {
      const dom = document.querySelector('div .el-upload.el-upload--picture-card')
      if (this.fileList && this.fileList.length > 0) {
        dom.style.display = 'none'
      } else {
        dom.style.display = 'block'
      }
    }
  },
  async mounted() {
    const token = (await Peace.identity.auth.getAuth()).access_token
    this.extraHeaders.Authorization = 'Bearer ' + token
  },
  created() {
    if (this.type === 'edit' || this.type === 'detail') {
      this.ruleForm.itemId = this.projectId
      this.getProjectInfo()
    }
    this.initPlist()
  },
  methods: {
    // 项目信息
    getProjectInfo() {
      Service.getProjectDetail({ itemId: this.ruleForm.itemId }).then((res) => {
        const data = res.data
        if (this.type === 'edit') {
          this.ruleForm.name = data.itemName
          this.ruleForm.imageUrl = data.itemPhoto
          // 因为传给后端后会加.00,处理一下，10，9
          if (data.itemAmount > 10) {
            let price = data.itemAmount.slice(0, 10)
            if (price.indexOf('.') === 9) {
              this.ruleForm.amount = price.slice(0, 9)
            } else {
              this.ruleForm.amount = price
            }
          } else {
            this.ruleForm.amount = data.itemAmount
          }
          this.ruleForm.desc = data.itemDesc
          this.ruleForm.parentId = data.parentId
          this.ruleForm.childId = data.childId
          if (data.itemPhoto) {
            let file = data.itemPhoto.split('/')
            this.fileList = [
              {
                name: file[file.length - 1],
                url: data.itemPhoto
              }
            ]
          }
          Service.getChilds({ parentId: data.parentId }).then((sres) => {
            this.childList = sres.data.list
          })
        } else {
          this.projectDetail = data
        }
      })
    },
    // 一级项目
    initPlist() {
      Service.getParentList().then((res) => {
        this.parentList = res.data.list
      })
    },
    // 项目级联切换
    onChange(value) {
      this.initSlist(value)
    },
    // 二级项目
    initSlist(parentId) {
      Service.getChilds({ parentId }).then((res) => {
        this.ruleForm.childId = ''
        this.childList = res.data.list
      })
    },
    uploadSuccess(response, file) {
      this.fileList.push(file)
      this.ruleForm.imageUrl = response.data
    },
    beforeUpload(file) {
      let isImg = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif'
      if (!isImg) {
        Peace.util.warning('上传图片格式不正确!')
      }
      return isImg
    },
    handleRemove(file) {
      const index = this.fileList.findIndex((item) => item.uid === file.uid)
      this.fileList.splice(index, 1)
      this.ruleForm.imageUrl = ''
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed() {
      Peace.util.warning('最多只能上传一张图片')
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`, '提示', {
        closeOnClickModal: false
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.itemId) {
            Service.editItemOrder(this.ruleForm).then(() => {
              Peace.util.success('项目修改成功！')
              this.$emit('success')
            })
          } else {
            Service.addItemOrder(this.ruleForm).then(() => {
              Peace.util.success('项目添加成功！')
              this.$emit('success')
            })
          }
        } else {
          return false
        }
      })
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.project-detail {
  .detail-value {
    word-wrap: break-word;
    word-break: break-all;
  }
  .detail-img {
    width: 200px;
    height: 200px;
  }
}

::v-deep .el-input-number__decrease,
::v-deep .el-input-number__increase {
  display: none;
}

::v-deep .el-input-number.is-controls-right .el-input__inner {
  padding-right: 15px;
  text-align: left;
}
</style>
