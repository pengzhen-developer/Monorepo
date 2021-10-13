<template>
  <div class="row col info-item">
    <span :class="{ active: isDiff, 'label': true }">资质图片</span>
    <div class="row flex-wrap">

      <template v-if="imageObject.length > 0">

        <div v-for="item in imageObject"
             :key="item.imgUrl"
             class="column q-mr-md items-center">
          <el-image :preview-src-list="imageList"
                    :src="item.imgUrl"
                    style="width: 144px; height: 108px">
          </el-image>

          <span class="value q-mt-sm">{{ item.title }}</span>
        </div>

      </template>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {
          practiceLincensePic: undefined,
          netHospitalLicensePic: undefined,
          businessLicensePic: undefined,
          otherLincesePic: undefined
        }
      }
    },
    preValue: {
      type: Object,
      default() {
        return {
          practiceLincensePic: undefined,
          netHospitalLicensePic: undefined,
          businessLicensePic: undefined,
          otherLincesePic: undefined
        }
      }
    }
  },
  computed: {
    isDiff() {
      const tmp = {
        practiceLincensePic: undefined,
        netHospitalLicensePic: undefined,
        businessLicensePic: undefined,
        otherLincesePic: undefined
      }
      if ((JSON.stringify(tmp) === JSON.stringify(this.preValue))) {
        return false
      }
      return !(JSON.stringify(this.value) === JSON.stringify(this.preValue))
    },
    otherImages() {
      if (Peace.validate.isEmpty(this.value.otherLincesePic)) {
        return []
      } else {
        return this.value.otherLincesePic.split(',')
      }
    },
    imageList() {
      return this.imageObject.map((item) => item.imgUrl)
    },
    imageObject() {
      const tmp =  [ { title: '执业许可证', imgUrl: this.value.practiceLincensePic }, { title: '互联网医院牌照', imgUrl: this.value.netHospitalLicensePic }, { title: '营业执照', imgUrl: this.value.businessLicensePic } ]
      const other = this.otherImages.map((item) => {
        return {
          title: '其他资质',
          imgUrl: item
        }
      })
      return tmp.filter((item) => !Peace.validate.isEmpty(item.imgUrl)).concat(other)
    }
  }
}
</script>

<style lang="scss" scoped>
.info-item {
  flex-wrap: nowrap; //强制标题不换行
}

.label {
  font-size: 14px;
  color: #333333;
  line-height: 22px;
  white-space: nowrap;

  &::after {
    content: '：';
  }
}

.active {
  color: #ff3a30;
}

.el-image {
  border-radius: 4px;
}

.value {
  font-size: 14px;
  color: #666666;
  line-height: 22px;
}
</style>
