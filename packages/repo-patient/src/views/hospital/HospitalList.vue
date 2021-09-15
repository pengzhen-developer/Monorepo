<template>
  <!-- eslint-disable -->
  <div :style="items.length!=0||list.length==0&& 'height:100%;'">
    <template v-if="items.length>0">
      <van-skeleton :key="item.netHospitalId"
                    :loading="loading"
                    :name="item.hospitalName"
                    :nethospitalid="item.netHospitalId"
                    :row="3"
                    avatar
                    title
                    type="organHome"
                    v-for="(item,index) in items"
                    v-if="index < showNum">
        <div @click="goMenuPage(item)"
             class="cards"
             :class="{'isHome':isHome}">
          <div class="card-avatar">
            <img :src="item.icon"
                 class />
          </div>
          <div class="card-body">
            <div class="card-name els">{{item.hospitalName}}</div>
            <div class="mb8 els">
              <div :key="tit"
                   class="card-small"
                   v-for="(tit,i) in item.brief">{{ (i == 0 ? '' : ' / ' ) + tit}}</div>
            </div>
            <div class=" els">
              <van-tag :key="it"
                       v-for="it in (item.tags || item.labels)">{{it}}</van-tag>
            </div>
          </div>
        </div>
      </van-skeleton>
    </template>

    <template v-if="items.length==0">
      <van-list :loading="loading"
                v-model="loading"
                :finished="finish"
                @load="getHspList">
        <div @click="goMenuPage(item)"
             class="cards"
             :class="{'isHome':isHome}"
             v-for="(item,index) in list"
             :key="index">
          <div class="card-avatar">
            <img :src="item.icon"
                 class />
          </div>
          <div class="card-body">
            <div class="card-name els">{{item.hospitalName}}</div>
            <div class="mb8 els">
              <div :key="tit"
                   class="card-small"
                   v-for="(tit,i) in item.brief">{{ (i == 0 ? '' : ' / ' ) + tit}}</div>
            </div>
            <div class=" els">
              <van-tag :key="it"
                       v-for="it in (item.tags || item.labels)">{{it}}</van-tag>
            </div>
          </div>
        </div>
      </van-list>
    </template>

    <div class="none-page blank"
         v-if="loaded&&list.length==0">
      <div class="icon icon_none_source"></div>
      <div class="none-text">暂无可预约号源</div>
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
    },
    isHome: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {
      loaded: false,
      finish: false,
      loading: false,
      p: 0,
      size: 10,
      list: [],
      showNum: 100,
      params: {},
      type: 'recommendHsp' // 默认值
    }
  },

  created() {
    const params = peace.util.decode(this.$route.params.json)
    this.params = params || {}
    this.type = params.type || this.type
    this.showNum = this.max
  },
  activated() {
    this.p = 0
    this.loaded = false
    this.finish = false
    this.list = []
    this.getHspList()
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
        peace.service.index.getMenu().then((res) => {
          this.list = res.data.recommendOrgan
          this.showNum = res.data.recommendOrgan.length
          this.loaded = true
          this.finish = true
        })
      }
      // 报告单医院
      if (this.params.type == 'report') {
        this.p++
        peace.service.hospital.getNethospitalList({ p: this.p, size: this.size }).then((res) => {
          this.list = this.list.concat(res.data.list)
          this.showNum = res.data.total
          this.loading = false
          this.loaded = true
          if (this.p * this.size >= res.data.total) {
            this.finish = true
          }
        })
      }

      // 预约医院
      if (this.params.type == 'appoint') {
        this.p++
        peace.service.hospital.getHospitalByRegister({ p: this.p, size: this.size }).then((res) => {
          this.list = this.list.concat(res.data.list)
          this.showNum = res.data.total
          this.loading = false
          this.loaded = true
          if (this.p * this.size >= res.data.total) {
            this.finish = true
          }
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
  padding: 15px 16px;
  font-size: 13px;
  color: #000;
  border: 0;
  border-bottom: 1px solid $-color--line;
  &.isHome {
    &:first-child {
      padding-top: 0;
    }
  }
  &:first-child {
    margin-top: 0;
  }
  .card-avatar {
    position: relative;
    flex: none;
    border: 1px solid #dde1ea;
    width: 60px;
    height: 60px;
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
    line-height: 1.4;
    margin-bottom: 4px;
  }
  .mb8 {
    margin-bottom: 8px;
  }
  .els {
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
