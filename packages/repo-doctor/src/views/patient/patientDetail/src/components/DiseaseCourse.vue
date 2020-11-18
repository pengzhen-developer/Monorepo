<template>
  <div class="disease-course"
       v-if="data">
    <div class="info-row-first">
      <span class="name">{{ data.upInfo.familyInfo.name }}</span>
      <span class="sex">{{ data.upInfo.familyInfo.sex }}</span>
      <span class="age"
            v-if="data.upInfo.familyInfo.age">{{ data.upInfo.familyInfo.age }}岁</span>
    </div>

    <hr class="dashed" />

    <el-form>
      <el-form-item label="标签">
        <el-tag :key="item"
                type="info"
                v-for="item in data.upInfo.couseInfo.diseaseInfo.tag">{{ item }}</el-tag>
      </el-form-item>
      <el-form-item label="疾病诊断">
        <el-tag :key="item"
                type="info"
                v-for="item in data.upInfo.couseInfo.diagnoseInfo.tag">{{ item }}</el-tag>
      </el-form-item>
      <el-form-item label="基本病情">
        <span>{{ data.upInfo.couseInfo.illnessInfo && data.upInfo.couseInfo.illnessInfo.illness }}</span>
      </el-form-item>
    </el-form>

    <hr />

    <div class="info-detail">
      <div class="title">
        <div class="title-tag">
          <span class="line-block"></span>
          <span>患者病程</span>
        </div>
        <div class="title-tabs">
          <span :class="{ active: titleTabsCctive === '最早病程置顶'}"
                @click="changeSort('最早病程置顶')">最早病程置顶</span>
          <span style="margin: 0 5px;">/</span>
          <span :class="{ active: titleTabsCctive === '最新病程置顶'}"
                @click="changeSort('最新病程置顶')">最新病程置顶</span>
        </div>
      </div>

      <div :key="item.id"
           class="info-detail-item"
           v-for="item in data.downInfo.list">
        <div class="item-title">
          <span class="circle-block"></span>
          <span class="text">{{ item.courseType }}</span>
          <span class="date">{{ item.courseTime }}</span>
        </div>
        <div class="item-conytent">
          <span>病程管理：</span>
          <span>{{ item.courseRecord }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },

  data() {
    return {
      data: undefined,

      titleTabsCctive: '最新病程置顶'
    }
  },

  watch: {
    id: {
      handler() {
        this.get()
      },
      immediate: true
    }
  },

  methods: {
    get() {
      if (this.data && this.data.downInfo && this.data.downInfo.list) {
        this.data.downInfo.list = []
      }

      const params = {
        familyId: this.id,
        sort: this.titleTabsCctive === '最新病程置顶' ? 'desc' : 'asc'
      }

      Peace.service.follow.getDiseaseCourse(params).then((res) => {
        this.data = res.data
      })
    },

    changeSort(active) {
      this.titleTabsCctive = active

      this.get()
    }
  }
}
</script>

<style lang="scss" scoped>
.disease-course {
  .el-form .el-form-item--mini.el-form-item {
    margin-bottom: 4px;
  }

  .info-row-first {
    .name {
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .sex {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-left: 10px;
    }
    .age {
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-left: 10px;
    }
  }

  /deep/ .el-form-item__label {
    width: 4.5rem;
    text-align-last: justify;
    text-align: justify;
  }

  .info-detail {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 10px 0;

      .title-tag {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .title-tabs {
        cursor: pointer;

        .active {
          color: #00c6ae;
        }
      }
    }

    .info-detail-item {
      margin: 0 0 10px 0;

      .item-title {
        display: flex;
        align-items: center;
        margin: 0 0 10px 0;

        .text {
          font-size: 14px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .date {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          margin: 0 0 0 10px;
        }
      }
    }
  }

  .el-tag {
    border: 0;
    margin: 0 5px 0 0;
  }

  .dashed {
    border-top: 1px dashed #f2f2f2;
    margin: 10px 0;
  }

  .circle-block {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #00c6ae;
    margin: 0 10px 0 0;
  }

  .line-block {
    display: inline-block;
    width: 5px;
    height: 14px;
    background: #00c6ae;
    margin: 0 10px 0 0;
  }
}
</style>
