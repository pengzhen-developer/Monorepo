<template>

  <div class="list">
    <van-loading v-if="!loading"></van-loading>
    <template v-else>
      <div class="case-card"
           v-for="(value, key) in firstVisitData"
           :key="key">
        <div class="case-card-time">
          <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
          <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
        </div>
        <div class="case-box">
          <!-- @click="gotoCaseDetail(item.dataNo)" -->
          <div class="case-card-note"
               v-for="(item,index) in value"
               :key="index">
            <div class="case-card-note-content">
              <div class="case-left">
                <van-image width="35px"
                           height="35px"
                           :src="require('@src/assets/images/file/ic_medical record.png')" />
              </div>
              <div class="case-right">
                <p class="title">
                  {{item.title}}
                </p>
                <p class="name">
                  {{ item.hospitalName }} | {{ item.deptName }}
                </p>
              </div>
            </div>
            <div class="case-diagnosis"
                 v-if="item.diagnosis">{{item.diagnosis}}</div>
          </div>
        </div>

      </div>
    </template>
  </div>

</template>

<script>
import peace from '@src/library'
export default {
  data() {
    return {
      firstVisitData: [],
      loading: false
    }
  },
  mounted() {
    this.getFirstOptionList()
  },
  methods: {
    getFirstOptionList() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.yibao
        .GetFirstOptionList(params)
        .then((res) => {
          if (res.data == null || !res.data.firstOptionList) {
            return
          }
          let list = []
          if (res.data.firstOptionList.length > 2) {
            this.canSeeMoreCase = true
            list = res.data.firstOptionList.slice(0, 2)
          } else {
            this.canSeeMoreCase = false
            list = res.data.firstOptionList
          }
          const temp = {}
          // 遍历时间
          const timeList = new Set(list.map((item) => item.createdTime))
          if (timeList.size) {
            timeList.forEach((time) => {
              temp[time] = list.filter((item) => item.createdTime === time)
            })
          }
          this.firstVisitData = temp
        })
        .finally(() => {
          this.loading = true
        })
    }
  }
}
</script> 

<style lang="scss" scoped>
.list {
  padding: 15px;
}
.case-card {
  display: flex;

  .case-card-time {
    padding: 8px 15px 0 0;
    min-width: 70px;
    position: relative;
    text-align: right;
    font-family: monospace;
    .y {
      font-size: 12px;
      color: #999999;
    }
    .m {
      font-size: 17px;
      font-weight: 600;
      color: #333333;
    }
  }
  .case-box {
    flex: 1;
    width: 0;
  }
  .case-card-note {
    width: 100%;
    min-height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    margin: 0 0 15px 0;
    .case-card-note-content {
      display: flex;
      align-items: center;
      padding: 6px 0px 6px 16px;
    }
    .case-left {
      width: 50px;
      text-align: left;
      position: relative;
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      width: 0;
      .title {
        color: #333;
        font-size: 14px;
      }
      .name {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 98%;
      }
    }
    .case-diagnosis {
      padding-left: 16px;
      height: 25px;
      line-height: 25px;
      border-top: 1px solid #e8e8e8;
      color: $primary;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>