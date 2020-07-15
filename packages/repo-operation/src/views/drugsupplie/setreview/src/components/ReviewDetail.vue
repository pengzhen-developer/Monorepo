<template>
  <div>
    <div class="content-wrap">
      <el-checkbox-group v-model="checkedList"
                         class="review-team-list"
                         @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(item) in reviewTeamList"
                     class="team-list"
                     :label="item.id"
                     :key="item.id">{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <p class="num">已选择：<span>{{this.checkedList.length}}</span></p>

    <div class="text-center">
      <el-button type="primary"
                 class="large hasmargin "
                 v-on:click="save">保 存</el-button>
      <el-button class="large"
                 v-on:click="cancelDialog">取 消</el-button>
    </div>
  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    data: Array
  },

  data() {
    return {
      isLoading: false,
      checkedList: [],

      reviewTeamList: [
        { name: '湖北省人民医院1', id: '1' },
        { name: '湖北省人民医院2', id: '2' },
        { name: '湖北省人民医院3', id: '3' },
        { name: '湖北省人民医院4', id: '4' },
        { name: '湖北省人民医院5', id: '5' },
        { name: '湖北省人民医院6', id: '6' },
        { name: '湖北省人民医院7', id: '7' },
        { name: '湖北省人民医院8', id: '8' },
        { name: '湖北省人民医院9', id: '9' },
        { name: '湖北省人民医院10', id: '10' },
        { name: '湖北省人民医院11', id: '11' },
        { name: '湖北省人民医院12', id: '12' }
      ]
    }
  },

  created() {
    this.checkedList = this.data
  },

  methods: {
    handleCheckedCitiesChange(value) {
      this.nowArray = []

      value.map((item) => {
        const obj = this.reviewTeamList.find((temp) => temp.id === item)
        obj.a = 'd'
        this.nowArray.push(obj)
      })
    },

    cancelDialog() {
      this.$emit('on-close')
    },

    save() {
      Service.save({ list: this.nowArray }).then(() => {
        this.cancelDialog()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrap {
  width: 100%;
  overflow: hidden;
}

.review-team-list {
  width: 105%;
  height: 535px;
  overflow-y: auto;
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