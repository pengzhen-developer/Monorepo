<template>
  <div>
    <q-scroll-area v-bind:thumb-style="thumbStyle"
                   v-bind:style="scrollAreaStyle"
                   style="height: 400px;background: #FBFBFB;">
      <el-checkbox-group v-model="checkedList"
                         class="review-team-list"
                         @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(item) in reviewTeamList"
                     class="team-list"
                     :label="item.Code"
                     :key="item.Code">{{item.Name}}</el-checkbox>
      </el-checkbox-group>
    </q-scroll-area>

    <p class="num q-my-8">已选择：<span>{{this.checkedList.length}}</span></p>

    <p class="tip q-mb-md">取消审方团队将会解除对应机构已设置规则的药师签名，请谨慎操作</p>

    <div class="text-right">
      <el-button v-on:click="cancelDialog">取消</el-button>
      <el-button type="primary"
                 v-bind:disabled="saveing"
                 v-on:click="save">保存</el-button>

    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    data: Object
  },

  data() {
    return {
      saveing: false,
      checkedList: [],
      reviewTeamList: [],

      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      },
      scrollAreaStyle: {},
      nowArray: []
    }
  },

  created() {
    this.get().then(() => {
      this.getTeam()
    })
  },

  methods: {
    get() {
      const fetch = Service.getReviewList()
      return fetch.then((res) => {
        this.reviewTeamList = res.data.list
      })
    },

    getTeam() {
      const fetch = Service.getTeamRelaction
      const params = { ClientID: this.data.code }

      return fetch(params).then((res) => {
        const array = JSON.parse(res?.data?.RelationJson ?? '[]')
        this.nowArray = array
        array.map((item) => {
          this.checkedList.push(item.patentid)
        })
      })
    },
    handleCheckedCitiesChange(value) {
      this.checkArray = []
      value.map((item) => {
        const obj = this.reviewTeamList.find((temp) => temp.Code === item)
        const nowObj = {}
        nowObj.patentid = obj.Code
        nowObj.custName = obj.Name
        nowObj.teamson = []
        this.checkArray.push(nowObj)
      })
      this.nowArray = this.checkArray
    },

    cancelDialog() {
      this.$emit('on-close')
    },

    save() {
      this.saveing = true

      var obj = {
        ClientID: this.data.code,
        ClientName: this.data.name,
        teams: this.nowArray
      }
      Service.save(obj)
        .then(() => {
          Peace.util.alert('保存成功')

          this.cancelDialog()
        })
        .finally(() => {
          this.saveing = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.review-team-list {
  margin-bottom: 20px;

  .team-list {
    width: 100%;
    padding: 15px 24px;
    color: #000;
    border-bottom: 1px solid #e8e8e8;
  }

  ::v-deep .el-checkbox__inner {
    border-radius: 2px !important;
  }
  ::v-deep .el-checkbox__label {
    padding-left: 34px !important;
  }
}

.el-checkbox {
  margin: 0;
}
.tip {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ea3930;
  line-height: 20px;
  background: #fff5f4;
  border-radius: 2px;
  padding: 6px 8px;
}
.num {
  line-height: 20px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);

  span {
    color: #3099a6;
  }
}

.dialog-btn {
  text-align: center;
}

.large {
  width: 120px;
  height: 34px;
}

.hasmargin {
  margin-right: 40px;
}
</style>