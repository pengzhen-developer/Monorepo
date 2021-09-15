<template>
  <div class="drug-inter-list">

    <template v-if="loading&&list.length > 0">
      <div class="no-data">
        <i class="icon icon_none_drugInter">
          <span class="no-data-text">暂无该药品说明书</span>
        </i>
      </div>

      <div class="divider"></div>

      <div class="list">
        <h4>为您推荐</h4>
        <div class="item"
             v-for="item in list"
             :key="item.id"
             @click="goDetailPage(item)">
          <div class="tit">{{item.name}}</div>
          <div class="small">{{item.gg}}</div>
          <div class="text">{{item.scqy}}</div>
        </div>
      </div>
    </template>

    <template v-if="loading&&list.length == 0">
      <div class="no-data h100"
           style="text-align: center;">
        <i class="icon icon_none_drugInter">
          <span class="no-data-text">
            <p>很抱歉，说明书离家出走了</p>
            <p>您拿到药品后</p>
            <p>它应该在药盒里面哦</p>
          </span>
        </i>
      </div>
    </template>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      list: [],
      loading: false
    }
  },

  created() {
    this.getDrugBookList()
  },

  methods: {
    getDrugBookList() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.purchasedrug.getDrugBookList(params).then(res => {
        this.loading = true
        if (res.data.length === 1) {
          const params = peace.util.encode({ pzwh: res.data.list[0].pzwh })
          this.$router.replace('/inter/drugInterDetail/' + params)
        } else {
          this.list = res.data
        }
      })
    },

    goDetailPage(item) {
      const params = peace.util.encode({ pzwh: item.pzwh })
      this.$router.push('/inter/drugInterDetail/' + params)
    }
  }
}
</script>

<style lang="scss" scoped>
.drug-inter-list {
  height: 100%;
  background: #fff;

  display: flex;
  flex-direction: column;

  .no-data {
    height: 30%;
    min-height: 30%;
    &.h100 {
      height: 100%;
      .icon {
        margin-top: -50px;
      }
    }
    .icon {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &::before {
        position: relative;
        width: 160px;
        height: 100px;
      }

      .no-data-text {
        font-size: 15px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin: 10px;
      }
    }
  }

  .divider {
    height: 10px;
    background: #f5f5f5;
  }

  .list {
    flex: 1;
    padding: 12px;
    overflow: auto;

    h4 {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);

      display: inline-flex;
      align-items: center;

      &::before {
        content: ' ';
        display: inline-block;
        background: $-color--primary;
        width: 4px;
        height: 20px;
        vertical-align: middle;
        margin: 0 10px 0 0;
      }
    }

    .item {
      padding: 10px 0;
      border-bottom: 1px solid rgba(238, 238, 238, 1);

      .tit {
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .small {
        font-size: 13px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      .text {
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>