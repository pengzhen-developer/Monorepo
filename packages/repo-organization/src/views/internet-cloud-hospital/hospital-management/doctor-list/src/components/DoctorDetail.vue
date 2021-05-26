<template>
  <div class="doctor">
    <div class="panel-box">
      <div class="panel-head">
        <div class="panel-title">基本信息</div>
        <div v-if="!isEdit">
          <el-button @click="isEdit = !isEdit"
                     size="medium"
                     type="text">
            <i class="el-icon-edit-outline ml-xs"></i>
            <span>修改</span>
          </el-button>
        </div>
      </div>
      <div class="panel-body">
        <div class="panel-info">
          <div class="panel-label">医生姓名</div>
          <div class="panel-value">{{info.name}}</div>
        </div>
        <div class="panel-info">
          <div class="panel-label">手机号码</div>
          <div v-if="!isEdit"
               class="panel-value">{{info.tel}}</div>
          <div v-else
               class="panel-value">
            <el-input placeholder="请输入手机号码"
                      maxlength="11"
                      v-model="submitInfo.tel"></el-input>
          </div>
        </div>
        <div class="panel-info">
          <div class="panel-label">身份证号</div>
          <div class="panel-value">{{info.id_card}}</div>
        </div>
        <div class="panel-info">
          <div class="panel-label">证书编号</div>
          <div class="panel-value">{{info.cert_no}}</div>
        </div>
        <div class="panel-info">
          <div class="panel-label">所在医院</div>
          <div class="panel-value">{{info.hospital_name}}</div>
        </div>
        <div class="panel-info">
          <div class="panel-label">医院职称</div>
          <div v-if="!isEdit"
               class="panel-value">{{info.doctor_title}}</div>
          <div v-else
               class="panel-value">
            <el-input placeholder="请输入医院职称"
                      v-model="submitInfo.doctorTitle"></el-input>
          </div>
        </div>
        <div class="panel-info">
          <div class="panel-label">一级科室</div>
          <div class="panel-value">{{info.dep_name}}</div>
        </div>
        <div class="panel-info">
          <div class="panel-label">医生编号</div>
          <div v-if="!isEdit"
               class="panel-value">{{info.doctorCode}} <span v-if="info.doctorCode">(HIS)</span></div>
          <div v-else
               class="panel-value">
            <el-input style="width: 80%;"
                      placeholder="请输入医生编号"
                      maxlength="20"
                      v-model="submitInfo.doctorCode">
            </el-input>
            <span v-if="info.doctorCode">(HIS)</span>
          </div>
        </div>
        <div class="panel-info">
          <div class="panel-label">二级科室</div>
          <div class="panel-value">{{info.dep_child}}</div>
        </div>
      </div>
    </div>

    <div class="panel-box">
      <div class="panel-head">
        <div class="panel-title">互联网医院信息</div>
      </div>
      <div class="panel-body">
        <div class="panel-info panel-column">
          <div class="panel-label"
               style="width: 128px;">执业互联网医院</div>
          <div class="panel-value">{{info.netHospital_name}}</div>
        </div>
        <div class="panel-info">
          <div class="panel-label">一级科室</div>
          <div v-if="!isEdit"
               class="panel-value">{{info.netdept_name}}</div>
          <div v-else
               class="panel-value">
            <el-select @focus.once="getDeptList"
                       filterable
                       :loading="loading"
                       placeholder="请选择科室名称"
                       v-model="submitInfo.netdeptName">
              <el-option v-for="item in options"
                         :key="item.id"
                         :label="item.netdeptName"
                         :value="item.netdeptName"
                         @click.native="getChildDeptList(item)"></el-option>
            </el-select>
          </div>
        </div>
        <div class="panel-info">
          <div class="panel-label">二级科室</div>
          <div v-if="!isEdit"
               class="panel-value">{{info.netdept_child}}</div>
          <div v-else
               class="panel-value">
            <el-select filterable
                       placeholder="请选择科室名称"
                       v-model="submitInfo.netdeptChild">
              <el-option v-for="item in childOptions"
                         :key="item.id"
                         :label="item.netdeptName"
                         :value="item.netdeptName"
                         @click.native="getChildDeptItem(item)"></el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-box">
      <div class="panel-head">
        <div class="panel-title">个人信息</div>
      </div>
      <div class="panel-body">
        <div class="panel-info panel-column">
          <div class="panel-label">医生简介</div>
          <div v-if="!isEdit"
               class="panel-value">{{info.summary || ''}}</div>
          <div v-else
               class="panel-value">
            <el-input type="textarea"
                      placeholder=""
                      rows="5"
                      v-model="submitInfo.summary"
                      maxlength="500"
                      show-word-limit>
            </el-input>
          </div>
        </div>
        <div class="panel-info panel-column">
          <div class="panel-label">医生擅长</div>
          <div v-if="!isEdit"
               class="panel-value">{{info.special_skill || ''}}</div>
          <div v-else
               class="panel-value">
            <el-input type="textarea"
                      placeholder=""
                      rows="5"
                      v-model="submitInfo.specialSkill"
                      maxlength="500"
                      show-word-limit>
            </el-input>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-box">
      <div class="panel-head">
        <div class="panel-title">证书信息</div>
      </div>
      <div class="panel-body img-list">
        <template v-for="(img, index) in imgs">
          <el-image class="preview-img"
                    :key="'img_' + index"
                    :src="img"
                    :preview-src-list="imgs">
          </el-image>
        </template>
      </div>
    </div>

    <div class="panel-box"
         style="border-bottom: none;">
      <div class="panel-head">
        <div class="panel-title">审核信息</div>
      </div>
      <div class="panel-body">
        <div class="panel-info panel-column">
          <div class="panel-label">审核状态</div>
          <div class="panel-value">{{ info.is_pass | getEnumLabel(source.ENUM_PASS_STATUS) }}</div>
        </div>
        <div v-if="info.is_pass_desc"
             class="panel-info panel-column">
          <div class="panel-label">备注原因</div>
          <div class="panel-value">{{info.is_pass_desc}}</div>
        </div>
      </div>
    </div>

    <div class="flex justify-end"
         v-if="isEdit">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="saved"
                 type="primary">保存</el-button>

    </div>
  </div>
</template>
<script>
import CONSTANT from '../constant'
import Service from '../service'

export default {
  name: 'DoctorDetail',
  props: {
    info: [String, Object]
  },
  data() {
    return {
      loading: false,
      source: {
        ENUM_PASS_STATUS: CONSTANT.ENUM_PASS_STATUS
      },
      submitInfo: {},
      options: [],
      childOptions: [],
      isEdit: false
    }
  },
  watch: {
    isEdit(val) {
      if (val) {
        this.getSubmitInfo()
      }
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  computed: {
    imgs() {
      if (this.info.cert_file) {
        const arr = [].concat(JSON.parse(this.info.cert_file))
        return arr.map((item) => item.img)
      }
      return []
    }
  },
  created() {
    this.getSubmitInfo()
  },
  methods: {
    getSubmitInfo() {
      this.submitInfo = {
        hospitalId: this.info.netHospital_id,
        doctorId: this.info.doctor_id,
        doctorName: this.info.name,
        tel: this.info.tel,
        depNameId: this.info.dep_nameId,
        depName: this.info.dep_name,
        depChildId: this.info.dep_childId,
        depChild: this.info.dep_child,
        doctorTitle: this.info.doctor_title,
        netdeptNameId: this.info.netdept_nameId,
        netdeptName: this.info.netdept_name,
        netdeptChildId: this.info.netdept_childId,
        netdeptChild: this.info.netdept_child,
        doctorCode: this.info.doctorCode,
        summary: this.info.summary,
        specialSkill: this.info.special_skill
      }
    },
    // 获取科室列表
    getDeptList() {
      this.loading = true
      Service.getDeptList().then((res) => {
        this.options = res.data.list
        this.loading = false
      })
    },
    getChildDeptList(item) {
      this.submitInfo.netdeptNameId = item.id
      this.submitInfo.netdeptName = item.netdeptName
      this.childOptions = item.children || []
      this.submitInfo.netdeptChildId = this.childOptions.length ? this.childOptions[0].id : ''
      this.submitInfo.netdeptChild = this.childOptions.length ? this.childOptions[0].netdeptName : ''
    },
    getChildDeptItem(item) {
      this.submitInfo.netdeptChildId = item.id
      this.submitInfo.netdeptChild = item.netdeptName
    },
    saved() {
      const info = this.submitInfo
      if (Peace.validate.isEmpty(info.tel)) {
        Peace.util.error('请填写手机号码')
        return false
      } else if (!Peace.validate.isMobile(info.tel)) {
        Peace.util.error('请填写正确的手机号码')
        return false
      }
      Service.editDoctorInfo(info).then((res) => {
        const msg = res.msg || '医生信息编辑成功！'
        Peace.util.success(msg)
        this.$emit('update', info.doctorId)
        this.isEdit = false
      })
    },
    cancel() {
      this.isEdit = false
    }
  }
}
</script>
<style lang="scss" scoped>
.panel-box {
  margin-bottom: 20px;
  border-bottom: 1px solid #e9e9e9;
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
  .panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 22px;
    .panel-title {
      position: relative;
      padding-left: 12px;
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      &:before {
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
  }
  .panel-body {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .panel-info {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 50%;
    padding-right: 20px;
    margin-bottom: 12px;
    white-space: normal;
    word-wrap: normal;
    word-break: break-all;
    &:last-child {
      margin-bottom: 0;
    }
    &.panel-column {
      width: 100%;
    }
    .panel-label {
      position: relative;
      flex: none;
      width: 80px;
      height: 20px;
      padding-right: 20px;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      line-height: 32px;
      text-align: justify;
      text-align-last: justify;
      &::after {
        content: '：';
        position: absolute;
        top: 0;
        right: 12px;
        width: 10px;
        height: 20px;
      }
    }
    .panel-value {
      flex: 1;
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      line-height: 32px;
      white-space: normal;
      word-wrap: normal;
      word-break: break-all;
    }
  }

  .img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    .preview-img {
      flex: none;
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }
  }
}
</style>
