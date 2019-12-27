<template>
  <div v-if="doctorInfo!=null"
       class="page">
    <div class="outline-body">
      <div class="card">
        <div class="card-avatar avatar-circular">
          <img class=""
               :src=" doctorInfo.avartor"
               style="height:100%;" />
        </div>
        <div class="card-body">
          <div class="card-name">
            {{doctorInfo.name}} <span class="card-small">{{doctorInfo.doctorTitle}}
              {{doctorInfo.deptName}}</span>
          </div>
          <div class="card-small">
            {{doctorInfo.hospitalName}}
          </div>
        </div>
      </div>
    </div>
    <div class="form-body"
         v-if="!hasComment">
      <div class="form">
        <div class="title">请为医生的服务打分</div>
        <div class="star">
          <van-rate v-model="model.starLevel"
                    size="26"
                    :icon="require('@src/assets/images/ic_star_active.png')"
                    :void-icon="require('@src/assets/images/ic_star.png')" />
        </div>
        <div class="form-labels">
          <div class="label"
               :class="item.select==true&&'label-blue'"
               v-for="(item,index) in labels"
               :key="index"
               @click="selectLabel(item,index)">{{item.name}}</div>
        </div>
        <van-cell-group>
          <van-field class="textarea"
                     v-model="model.content"
                     rows="5"
                     autosize
                     maxlength="500"
                     type="textarea"
                     :placeholder="placeholder" />
        </van-cell-group>
      </div>
      <div class="fixed-bottom">
        <div :class="['btn',canSubmit ? 'btn-blue' : 'disabled']"
             @click="submit">提交</div>
      </div>
    </div>
    <div class="form-body"
         v-else>
      <div class="form">
        <div class="title">我对医生的评价</div>
        <div class="star">
          <van-rate v-model="model.starLevel"
                    readonly
                    size="26"
                    :icon="require('@src/assets/images/ic_star_active.png')"
                    :void-icon="require('@src/assets/images/ic_star.png')" />
        </div>
        <div class="form-labels">
          <div class="label label-blue"
               v-for="(item,index) in model.tags"
               :key="index">{{item}}</div>
        </div>
        <div class="content">{{model.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { Rate } from 'vant'

Vue.use(Rate)
export default {
  data() {
    return {
      doctorInfo: null,
      hasComment: false, //是否已经评论
      labels: [],
      placeholder: '',
      model: {
        starLevel: 5,
        tags: '',
        content: '',
        inquiryNo: ''
      },
      hasSend: false
    }
  },
  computed: {
    canSubmit() {
      let bool = true
      if (this.model.tags.length == 0) {
        bool = false
      }
      return bool
    }
  },
  watch: {
    maxLength() {
      if (this.model.content.length >= 500) {
        peace.util.alert('评论内容应小于500字')
      }
    }
  },
  created() {
    let params = peace.util.decode(this.$route.params.json)
    this.hasComment = params.isComment
    this.model.inquiryNo = params.inquiryNo
    this.isComment(params.inquiryNo)
  },
  methods: {
    isComment(inquiryNo) {
      peace.service.group.isComment({ inquiryNo: inquiryNo }).then(res => {
        if (res.code == '200') {
          this.hasComment = res.data.isComment
          if (!this.hasComment) {
            this.getBaseInfo(inquiryNo)
          } else {
            this.getComment(inquiryNo)
          }
        }
      })
    },
    getComment(inquiryNo) {
      peace.service.group.commentDetail({ inquiryNo: inquiryNo }).then(res => {
        if (res.code == '200') {
          this.doctorInfo = res.data.doctorInfo
          this.model.content = res.data.content
          this.model.starLevel = res.data.starLevel
          this.model.tags = res.data.tags
        }
      })
    },
    getBaseInfo(inquiryNo) {
      peace.service.group.getBaseInfo({ inquiryNo: inquiryNo }).then(res => {
        if (res.code == '200') {
          this.doctorInfo = res.data.doctorInfo
          this.placeholder = res.data.content

          for (let i in res.data.tags) {
            this.labels.push({
              name: res.data.tags[i],
              id: i,
              select: false
            })
          }
        }
      })
    },
    selectLabel(item, index) {
      this.labels[index].select = !this.labels[index].select
      this.setTags()
    },
    setTags() {
      let labels = []
      this.labels.map(item => {
        if (item.select) {
          labels.push(item.id)
        }
      })
      this.model.tags = labels.join(',')
    },
    submit() {
      if (this.hasSend) {
        return
      }
      this.hasSend = true

      if (this.model.content.length == '') {
        this.model.content = this.placeholder
      }
      if (this.model.tags.length == '') {
        peace.util.alert('没有选择标签或没有填写评价内容')
        this.hasSend = false
        return
      }
      peace.service.group
        .doComment(this.model)
        .then(() => {
          this.hasComment = true
          this.getComment(this.model.inquiryNo)
        })
        .finally(() => {
          setTimeout(() => {
            this.hasSend = false
          }, 500)
        })
    }
  }
}
</script>

<style lang='scss'>
.page {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  .fixed-bottom {
    position: relative;
  }
}
.outline-body {
  padding: 5px 10px;
  border-bottom: 10px solid #f5f5f5;
}
.form-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form {
  padding: 15px;

  .title {
    text-align: center;
    margin-bottom: 15px;
    font-size: 15px;
    color: #000;
  }
  .star {
    display: flex;
    width: 100%;
    justify-content: center;
    border-top: 1px solid #f0f0f0;
    padding: 20px 0;
  }
  .content {
    font-size: 15px;
    color: #333;
  }
  .textarea {
    border: 1px solid rgba(209, 209, 209, 1);
    min-height: 150px;
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    &:placeholder-shown {
      color: #999;
    }
  }
}
.form-labels {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  .label {
    height: 33px;
    border-radius: 33px;
    border: 1px solid rgba(200, 200, 200, 1);
    color: #666;
    font-size: 13px;
    width: 30%;
    margin-right: 5%;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.label-blue {
      color: #00c6ae;
      border-color: #00c6ae;
      background-color: #e5f9f6;
    }
  }
}
</style>