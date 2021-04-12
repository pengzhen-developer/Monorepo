<template>
  <div class="doctor">
    <div class="doctor-hd">
      <div class="doctor-image-label mr-md">医生头像</div>
      <div class="doctor-image">
        <el-image :src="info.avartor">
          <template v-slot:error>
            <el-image src="../assets/images/doctor-pic.png">
            </el-image>
          </template>
        </el-image>
      </div>
      <div class="doctor-edit-btn"
           v-if="!isEdit && info.is_pass == 'wait'">
        <el-button @click="isEdit = !isEdit"
                   class="p-none"
                   size="medium"
                   type="text">
          <span>修改</span>
          <i class="el-icon-edit-outline ml-xs"></i>
        </el-button>
      </div>
    </div>
    <div class="doctor-info">
      <div class="doctor-info-title">基本信息</div>
      <div class="doctor-info-content">
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>医生姓名</span>
          </div>
          <div class="info-row-content">{{ info.name }}</div>
          <div class="info-row-label">
            <span>手机号码</span>
          </div>
          <div class="info-row-content">{{ info.tel }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>身份证号</span>
          </div>
          <div class="info-row-content">{{ info.id_card | hideMiddle }}</div>
          <div class="info-row-label">
            <span>证书编号</span>
          </div>
          <div class="info-row-content">{{ info.cert_no }}</div>
        </div>
        <div class="info-row two-cols more">
          <div class="info-row-label">
            <span>所在医院</span>
          </div>
          <div class="info-row-content">{{ info.hospital_name }} {{info.entryArea}}</div>
          <div class="info-row-label">
            <span>医院职称</span>
          </div>
          <div class="info-row-content">{{ info.doctor_title }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>一级科室</span>
          </div>

          <div class="info-row-content">{{ info.dep_name }}</div>
          <div class="info-row-label">
            <span>二级科室</span>
          </div>
          <div class="info-row-content">{{ info.dep_child }}</div>
        </div>
      </div>
    </div>
    <div class="doctor-info">
      <div class="doctor-info-title">执业信息</div>
      <div class="doctor-info-content">
        <div class="info-row">
          <div class="info-row-label t-7">
            <span>执业互联网医院</span>
          </div>
          <div class="info-row-content">{{ info.netHospital_name }}</div>
        </div>
        <div class="info-row two-cols">
          <div class="info-row-label">
            <span>一级科室</span>
          </div>
          <div class="info-row-content"
               v-if="!isEdit">{{ info.netdept_name }}</div>
          <div class="info-row-content pr-xs"
               v-else>
            <el-select @focus.once="getDeptList"
                       filterable
                       placeholder="请选择科室名称"
                       v-model="submitInfo.netdeptName">
              <el-option :key="item.id"
                         :label="item.netdept_name"
                         :value="item.netdept_name"
                         @click.native="getChildDeptList(item)"
                         v-for="item in options"></el-option>
            </el-select>
          </div>
          <div class="info-row-label">
            <span>二级科室</span>
          </div>
          <div class="info-row-content"
               v-if="!isEdit">{{ info.netdept_child }}</div>
          <div class="info-row-content pr-xs"
               v-else>
            <el-select filterable
                       placeholder="请选择科室名称"
                       v-model="submitInfo.netdeptChild">
              <el-option :key="item.id"
                         :label="item.netdept_name"
                         :value="item.netdept_name"
                         @click.native="getChildDeptItem(item)"
                         v-for="item in childOptions"></el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <div class="doctor-info">
      <div class="doctor-info-title">申请信息</div>
      <div class="doctor-info-content">
        <div class="info-row">
          <div class="info-row-label">
            <span>申请时间</span>
          </div>
          <div class="info-row-content">
            <span class="ml-md">{{info.entryTime}}</span>
          </div>
        </div>
        <div class="info-row"
             v-if="info.is_pass!=='wait'">
          <div class="info-row-label">
            <span>认证时间</span>
          </div>
          <div class="info-row-content">
            <span class="ml-md">{{info.created_time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Service from '../service'

export default {
  name: 'DoctorBasicInfo',
  filters: {
    hideMiddle: function(val) {
      if (val.length == 15) {
        return `${val.substring(0, 3)}********${val.substring(val.length - 4)}`
      } else {
        return `${val.substring(0, 3)}***********${val.substring(val.length - 4)}`
      }
    }
  },
  props: {
    info: [String, Object]
  },
  data() {
    return {
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
  computed: {
    imgs() {
      if (this.info.cert_file) {
        const arr = [].concat(JSON.parse(this.info.cert_file))
        return arr
      }
      return []
    }
  },
  methods: {
    // 获取科室列表
    getDeptList() {
      Service.getDeptList().then((res) => {
        this.options = res.data.list
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
    getSubmitInfo() {
      const {
        netHospital_id,
        doctor_id,
        name,
        tel,
        doctor_title,
        dep_nameId,
        dep_name,
        dep_childId,
        dep_child,
        netdept_nameId,
        netdept_name,
        netdept_childId,
        netdept_child
      } = this.info

      this.submitInfo = {
        hospitalId: netHospital_id,
        doctorId: doctor_id,
        doctorName: name,
        tel,
        depNameId: dep_nameId,
        depName: dep_name,
        depChildId: dep_childId,
        depChild: dep_child,
        doctorTitle: doctor_title,
        netdeptNameId: netdept_nameId,
        netdeptName: netdept_name,
        netdeptChildId: netdept_childId,
        netdeptChild: netdept_child
      }
      this.$emit('getSubmitInfo', this.submitInfo)
    },
    cancel() {
      this.isEdit = false
    }
  },
  created() {
    this.getSubmitInfo()
  }
}
</script>
<style lang="scss" scoped>
.info-row {
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &.t-7 > span {
      width: 7em;
    }
    &.t-7 + .info-row-content {
      width: calc(100% - 8em);
    }
    &:after {
      content: '：';
    }
  }
  &-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-label.t-6 + .info-row-content {
      width: calc(50% - 7em);
    }
    .info-row-content {
      width: calc(50% - 1em - 4.3em);
    }
  }
}

.doctor {
  color: var(--q-color-primary);
  &-hd > .doctor-edit-btn {
    line-height: 60px;
    float: right;
  }
  &-image,
  &-image-label {
    vertical-align: middle;
    display: inline-block;
  }
  &-image {
    width: 60px;
    height: 60px;
    border: 1px solid transparent;
    border-radius: 100%;
    overflow: hidden;
    .el-image {
      width: 100%;
      height: 100%;
      display: block;
    }
    &-label {
      line-height: 30px;
    }
  }
  &-info {
    &-title {
      margin-top: 10px;
      font-size: 16px;
      line-height: 25px;
      border-bottom: 1px solid #eee;
    }
    &-content {
      .preview-img {
        width: calc(33.3333% - 15px);
        border: 1px solid #fafafa;
        vertical-align: middle;
      }
      .preview-img + .preview-img {
        margin-left: 20px;
      }
    }
  }
  .info-row-label {
    color: #778899;
  }
  .info-row-content {
    font-weight: bold;
    color: #23313f;
    padding-right: 10px;
  }
}
.info-row.more {
  padding: 5px 0;
  .info-row-label,
  .info-row-content {
    line-height: 18px;
  }
}
// .info-row.two-cols .info-row-content {
//   width: calc(50% - 1em - 5em);
// }
// .info-row.two-cols .info-row-label:nth-child(2) {
//   margin-left: 1em;
// }
</style>
