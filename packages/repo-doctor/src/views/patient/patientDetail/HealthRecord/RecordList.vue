<template>
    <div class="infinite-list-wrapper">
        <template v-if="list && list.length > 0">
            <div class="list"
                 v-infinite-scroll="load"
                 infinite-scroll-disabled="disabled">
                <div v-for="item in list"
                     :key="item.createdTime">
                    <template v-if="listType === tempType.referralList">
                        <ReferralRecordCell :type="type"
                                            :item="item"/>
                    </template>
                    <template v-if="listType === tempType.consultList">
                        <ConsultRecordCell :type="type"
                                           :item="item"/>
                    </template>
                    <template v-if="listType === tempType.followUpList">
                        <FollowUpRecordListCell />
                    </template>
                </div>
            </div>
        </template>
        <template v-else>
            <NoData type="health"
                    :text="emptyText"></NoData>
        </template>
        <p v-if="loading">加载中...</p>
        <!-- <p v-if="noMore">没有更多了</p> -->
    </div>
</template>

<script>
  import peace from '@src/library'
  import FollowUpRecordListCell from "./FollowUp/FollowUpRecordListCell";
  import ReferralRecordCell from './Referral/ReferralRecordListCell'
  import ConsultRecordCell from './Consult/ConsultRecordListCell'
  import NoData from '@src/views/components/NoData'

  export default {
    props: {
      id: String,
      type: String,
      listType: undefined
    },
    components: {
      ReferralRecordCell,
      ConsultRecordCell,
      FollowUpRecordListCell,
      NoData
    },
    data() {
      return {
        list: [],
        count: 0,
        loading: false,
        p: 1,
        tempType: {
          referralList: peace.type.HEALTH_RECORD.ACTION_TYPE.转诊,
          consultList: peace.type.HEALTH_RECORD.ACTION_TYPE.会诊,
          followUpList: peace.type.HEALTH_RECORD.ACTION_TYPE.随访
        }
      }
    },
    computed: {
      noMore() {
        return this.count <= this.list.length
      },
      disabled() {
        return this.loading || this.noMore
      },
      emptyText() {
       return peace.type.HEALTH_RECORD.EMPTY_TEXT[this.listType][this.type];
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        if (this.listType === peace.type.HEALTH_RECORD.ACTION_TYPE.转诊) {
          //转诊
          this.loading = true
          const params = {referral_type: this.type, patientNo: this.id, p: this.p, size: 10}
          peace.service.health.getReferralRecordList(params).then(res => {
            if (res.data && res.data.list && Array.isArray(res.data.list)) {
              this.list = this.list.concat(res.data.list)
              this.count = res.data.count
              this.p = this.p + 1
            }
            this.loading = false
          })
        } else if (this.listType === peace.type.HEALTH_RECORD.ACTION_TYPE.会诊) {
          //会诊
          this.loading = true
          const params = {action: this.type, patientNo: this.id, p: this.p, size: 10}
          peace.service.health.getConsultRecordList(params).then(res => {
            if (res.data && res.data.list && Array.isArray(res.data.list)) {
              this.list = this.list.concat(res.data.list)
              this.count = res.data.count
              this.p = this.p + 1
            }
            this.loading = false
          })
        } else if(this.listType === peace.type.HEALTH_RECORD.ACTION_TYPE.随访) {

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .infinite-list-wrapper {
        width: 380px;

        p {
            text-align: center;
        }

        .list {
            margin: 0 10px;
        }
    }
</style>
