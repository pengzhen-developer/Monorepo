<template>
  <div>
    <div class="content" v-if="doctorList.length">
      <div :key="index" class v-for="(item,index) in doctorList">
        <div
          :class="['card-strip',item.isPrivateDoctor ?  '' : item.isPrivateDoctorOnce ? 'disabled' : '']"
          v-if="item.isPrivateDoctor || item.isPrivateDoctorOnce"
        >
          <div class="strip-info">
            <div class="label-jq">私人医生</div>
          </div>
          <div class="strip-eye">{{ item.isPrivateDoctor ? item.endTime + '结束' : item.isPrivateDoctorOnce ? item.endTime + '已到期' : ''}}</div>
        </div>
        <div :id="item.doctorId" :index="index" @click="goHomeIndex(item)" class="card">
          <div class="card-avatar avatar-circular">
            <img :src="item.avartor" class />
          </div>
          <div class="card-body">
            <div class="card-name">
              {{item.name}}
              <div class="card-small">{{item.doctorTitle}} {{item.deptName}}</div>
            </div>
            <div class="card-small" v-if="item.hospitalName">{{item.hospitalName}}</div>
            <div class="card-brief" v-if="item.specialSkill">
              <div class="span s">擅长：</div>
              <div class="span xl">{{item.specialSkill}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="none-page" v-if="!doctorList.length">
      <div class="icon icon_none_doctor"></div>
      <div class="none-text">暂无医生信息</div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {},
  data() {
    return {
      doctorList: []
    }
  },
  created() {
    peace.service.patient.getUserDctList().then(res => {
      this.doctorList = res.data
    })
  },
  methods: {
    goHomeIndex(item) {
      let json = peace.util.encode({
        doctorId: item.doctorId
      })

      this.$router.push(`/components/doctorDetail/${json}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  box-sizing: border-box;
  width: 100%;
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
}
.card {
  padding: 10px;
  border-bottom: 1px solid #dedede;
  margin: 0;
}
.card-brief {
  color: #999;
}
.card .card-brief,
.card .p-small {
  display: flex;
  align-items: baseline;
  line-height: 1.3;
  font-size: 13px;
  padding: 7px 0;
}
.card .card-small,
.card .card-brief {
  /*line-height: 1.3;*/
}
.card-brief {
}
.card-brief,
.p-small {
  overflow: hidden;
}
.card-brief .span,
.p-small .span {
  position: relative;
  flex: 1;
}
.card-brief .span.s,
.p-small .span.s {
  flex: 0 0 auto;
  /*width: ;*/
}
.card-brief .span.xl {
  flex: 0 1 auto;
  word-wrap: break-word;
  white-space: pre-wrap;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 32px;
}
.p-small .span.m {
  font-size: 15px;
  /*flex: 0 1 auto;*/
}
.card-strip {
  padding-top: 10px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.card-strip .strip-info {
  flex: 1;
}
.card-strip .strip-eye {
  flex: none;
  color: #00c6ae;
  padding: 0 15px;
}

.label-jq {
  position: relative;
  background: #504c4f;
  padding: 2px 4px;
  color: #f7e9b3;
  display: inline-block;
  height: 20px;
  box-sizing: border-box;
  z-index: 3;
  padding-right: 6.5px;
  font-size: 12px;
}
.label-jq::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 0;
  width: 0;
  height: 0;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-top: 10px solid #504c4f;
  border-bottom: 10px solid #504c4f;
  z-index: 0;
}
.card-strip.disabled .strip-eye {
  color: #999999;
}
.card-strip.disabled .label-jq {
  color: #fff;
  background: #cccccc;
}
.card-strip.disabled .label-jq::after {
  content: '';
  border-top: 10px solid #cccccc;
  border-bottom: 10px solid #cccccc;
}
</style>