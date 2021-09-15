<template>
  <div style="height: 100%;">
    <div class="content"
         v-if="doctorList.length">
      <div :key="index"
           class
           v-for="(doctor,index) in doctorList">
        <div :class="['card-strip',doctor.isPrivateDoctor ?  '' : doctor.isPrivateDoctorOnce ? 'disabled' : '']"
             v-if="doctor.isPrivateDoctor || doctor.isPrivateDoctorOnce">
          <div class="strip-info">
            <div class="label-jq">私人医生</div>
          </div>
          <div class="strip-eye">
            {{ doctor.isPrivateDoctor ? doctor.endTime + '结束' : doctor.isPrivateDoctorOnce ? doctor.endTime + '已到期' : ''}}
          </div>
        </div>
        <div :id="doctor.doctorId"
             :index="index"
             @click="goHomeIndex(doctor)"
             class="card">
          <div class="card-avatar avatar-circular">
            <img :src="doctor.avartor"
                 class />
          </div>
          <div class="card-body">
            <div class="card-name">
              {{doctor.name}}
              <div class="card-small title">{{doctor.doctorTitle}} </div>

              <!-- <div class="tag-work online"
                   v-if="doctor.workStatus==1">在线</div>
              <div class="tag-work outline"
                   v-else-if="doctor.workStatus==2">离线</div> -->
            </div>
            <div class="card-small">
              <span v-if="doctor.hospitalName">{{doctor.hospitalName}}</span>
              <span>{{doctor.deptName}}</span>
            </div>
            <div class="title-tag">
              <template v-for="(tag, index) in doctor.tags">
                <div :class="['doc-tags', 'tag-'+tag.key]"
                     :key="index"
                     v-if="tag.key!=='prvivateDoctor'">
                  {{tag.value}}
                </div>
              </template>
            </div>
            <div class="card-brief"
                 v-if="doctor.specialSkill">
              <div class="span s">擅长：</div>
              <div class="span xl">{{doctor.specialSkill}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="none-page"
         v-if="loaded&&this.doctorList.length==0">
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
      doctorList: [],
      loaded: false
    }
  },

  created() {
    peace.service.patient.getUserDctList().then((res) => {
      this.doctorList = res.data
      this.loaded = true
    })
  },

  methods: {
    goHomeIndex(doctor) {
      let json = peace.util.encode({
        doctorId: doctor.doctorId
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
.card-name {
  position: relative;
  /*{{it.tag == 'image' ? '问' : it.tag =='prvivateDoctor' ? '服务包' : it.tag == 'appoint' ? '号' : '视频'}}*/
  .label {
    border-radius: 2px;
    color: #fff;
    padding: 0px 2px;
    margin-right: 2.5px;
    font-size: 9px;
    &.label-image {
      background: #00c6ae;
      border-color: #00c6ae;
    }
    &.label-appoint {
      background: #74b0ff;
      border-color: #74b0ff;
    }
    &.label-prvivateDoctor {
      background: #ac91ff;
      border-color: #ac91ff;
    }
    &.label-video {
      background: #888;
      border-color: #888;
    }
    &.label-register {
      background: #74b0ff;
      border-color: #74b0ff;
    }
  }
}
.tag-work {
  height: 15px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: normal;
  margin: 0;
  box-sizing: content-box;
  border-radius: 3px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  &::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 4px;
  }
  &.online {
    color: $primary;
    &::before {
      background-color: $primary;
    }
  }
  &.outline {
    color: $gary;
    &::before {
      background-color: #ccc;
    }
  }
}
.title-tag {
  margin: 0 0 5px 0;
  .doc-tags {
    border-radius: 2px;
    color: #fff;
    padding: 1px 4px;
    margin-right: 4px;
    font-size: 10px;
    line-height: 14px;
    display: inline-block;
    font-family: PingFangSC-Regular, PingFang SC;
    &.tag-consult {
      color: $primary;
      background-color: rgba(0, 198, 174, 0.15);
    }
    &.tag-returnVisit {
      color: rgba(64, 178, 255, 1);
      background-color: rgba(64, 178, 255, 0.15);
    }
    &.tag-register {
      color: rgba(74, 131, 247, 1);
      background-color: rgba(74, 131, 247, 0.15);
    }
    &.tag-servicePackage {
      color: rgba(179, 136, 255, 1);
      background-color: rgba(179, 136, 255, 0.15);
    }
  }
}
.title-wait {
  padding: 6px 15px;
  background: rgba(235, 251, 249, 1);
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  span {
    font-size: 12px;
    margin-left: 10px;
  }
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
.card .card-small {
  &.title {
    margin-left: 5px;
  }
  span {
    margin-right: 10px;
  }
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
  word-break: break-all;
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