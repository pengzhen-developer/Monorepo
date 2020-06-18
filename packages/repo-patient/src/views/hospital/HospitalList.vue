<template>
  <!-- eslint-disable -->
  <div :style="items.length!=0||data.length==0&& 'height:100%;'">
    <van-skeleton :key="item.netHospitalId"
                  :loading="loading"
                  :name="item.hospitalName"
                  :nethospitalid="item.netHospitalId"
                  :row="3"
                  avatar
                  title
                  type="organHome"
                  v-for="(item,index) in data"
                  v-if="index < showNum">
      <div @click="goMenuPage(item)"
           class="cards">
        <div class="card-avatar">
          <img :src="item.icon"
               class />
        </div>
        <div class="card-body">
          <div class="card-name">{{item.hospitalName}}</div>
          <div class="block">
            <div :key="tit"
                 class="card-small"
                 v-for="(tit,i) in item.brief">{{ (i == 0 ? '' : ' / ' ) + tit}}</div>
          </div>
          <div class="block">
            <van-tag :key="it"
                     v-for="it in (item.tags || item.labels)">{{it}}</van-tag>
          </div>
        </div>
      </div>
    </van-skeleton>
    <div class="none"
         v-if="!loading&&data.length==0">
      <div class="none-page">
        <div class="icon icon_none_source"></div>
        <div class="none-text">暂无可预约号源</div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    items: {
      type: Array,
      default: function() {
        return []
      }
    },
    max: {
      type: Number,
      default: function() {
        return this.items.length
      }
    }
  },
  data() {
    return {
      loading: true,
      data: [],
      showNum: 100,
      params: {},
      type: 'recommendHsp' // 默认值
    }
  },

  created() {
    const params = peace.util.decode(this.$route.params.json)
    this.params = params || {}
    this.type = params.type || this.type
    this.data = this.items || []
    this.showNum = this.max

    if (!this.data.length) {
      this.getHspList()
    } else {
      this.loading = false
    }
  },
  mounted() {
    // this.loading = true
  },
  methods: {
    goMenuPage(item) {
      if (this.type == 'appoint') {
        let json = peace.util.encode({
          netHospitalId: item.netHospitalId,
          id: 'appointment',
          Date: new Date()
        })

        this.$router.push(`/hospital/depart/hospitalDepartSelect/${json}`)
        return
      }

      if (this.type == 'report') {
        $peace.$recordCondition.formData.hsp = item
        this.$router.go(-1)
        $peace.$recordCondition = null
        return
      }
      // 没有type值时 默认为recommendHsp
      if (this.type == 'recommendHsp') {
        let json = peace.util.encode({ netHospitalId: item.netHospitalId })

        this.$router.push(`/hospital/HospitalHome/${json}`)
        return
      }
    },
    getHspList() {
      // 推荐医院
      if (this.params.type == 'recommendHsp') {
        peace.service.index.getMenu().then(res => {
          this.data = res.data.recommendOrgan
          this.showNum = res.data.recommendOrgan.length
          this.loading = false
        })
      }
      // 报告单医院
      if (this.params.type == 'report') {
        peace.service.hospital.getNethospitalList({ page: 1 }).then(res => {
          this.data = res.data.netHospitals || []
          this.showNum = this.data.length
          this.loading = false
        })
      }

      // 预约医院
      if (this.params.type == 'appoint') {
        peace.service.hospital.getHospitalByRegister({ p: 1, size: 100 }).then(res => {
          this.data = res.data.list || []
          this.showNum = this.data.length
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.none {
  height: 100%;
  width: 100%;
}
.cards {
  display: flex;
  margin: 15px 10px;
  font-size: 13px;
  color: #000;
  border: 0;
  border-bottom: 1px solid #f5f5f5;
  &:first-child {
    margin-top: 0;
  }
  .card-avatar {
    position: relative;
    flex: none;
    border: 1px solid #dde1ea;
    width: 60px;
    height: 60px;
    margin: 6px;
    margin-right: 14px;
    position: relative;
    background-color: #f5f5f5;
    border-radius: 2px;
    flex: 0 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .card-body {
    flex: 1 0 1%;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }
  .card-small {
    font-weight: normal;
    font-size: 13px;
    line-height: 1.5;
    display: inline;
    vertical-align: text-bottom;
    color: #999;
    margin-bottom: 8px;
  }
  .card-name {
    font-size: 17px;
    font-weight: 600;
    line-height: 2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .block {
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.van-tag {
  padding: 0.1em 0.5em;
  margin-right: 5px;
  background: #e5f9f6 !important;
  color: #00c6ae;
}
</style>
