<template>
  <div v-if="loaded">
    <div class="form-dl">
      <div class="form-dt">店铺名称：</div>
      <div class="form-dd">{{drugStoreName}}</div>
    </div>
    <div class="form-dl">
      <div class="form-dt">营业时间：</div>
      <div class="form-dd">{{businessHours}}</div>
    </div>
    <div class="form-dl">
      <div class="form-dt">商家电话：</div>
      <div class="form-dd blue"> <a :href="'tel:'+contractTel">{{contractTel}}</a> </div>
    </div>
    <div class="form-dl">
      <div class="form-dt">商家地址：</div>
      <div class="form-dd">{{storeAddress}}</div>
    </div>
    <van-swipe>
      <van-swipe-item v-for="(img,index) in storeDetailsImgs"
                      :key="index">
        <img :src="img.logo"
             @click="preview(img.logo)" />
        <div class="name">{{img.name}}</div>
      </van-swipe-item>
    </van-swipe>

    <van-image-preview v-model="imagePreview.visible"
                       :start-position="imagePreview.position"
                       :images="imagePreview.images">
    </van-image-preview>
  </div>
</template>
<script>
import peace from '@src/library'
export default {
  data() {
    return {
      phaInfo: {},
      loaded: false,
      imagePreview: {
        visible: false,
        position: 0,
        images: []
      }
    }
  },
  computed: {
    //联系电话
    contractTel() {
      return this.phaInfo.contractTel || this.phaInfo.ContractTel
    },
    //营业时间
    businessHours() {
      return this.phaInfo.businessHours || this.phaInfo.BusinessHours
    },
    //药店地址
    storeAddress() {
      return this.phaInfo.storeAddress || this.phaInfo.Province + this.phaInfo.City + this.phaInfo.County + this.phaInfo.Detailed
    },
    //药店名称
    drugStoreName() {
      return this.phaInfo.drugStoreName || this.phaInfo.DrugStoreName
    },
    //药店图片
    storeDetailsImgs() {
      return this.phaInfo.storeDetailsImgs
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      const params = peace.util.decode(this.$route.params.json)
      peace.service.yibao
        .GtDrugStoreInfo(params)
        .then((res) => {
          this.phaInfo = res.data
        })
        .finally(() => {
          this.loaded = true
        })
    },
    preview(img) {
      this.imagePreview.visible = true
      // this.imagePreview.position = fileIndex
      let images = []
      images.push(img)
      this.imagePreview.images = this.phaInfo.storeDetailsImgs.map((item) => item.logo)
    }
  }
}
</script>
<style lang="scss" scoped>
.van-swipe {
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 20px 0;
  img {
    width: 100%;
    height: 225px;
  }
  .name {
    margin-top: 10px;
    text-align: center;
    font-size: 15px;
  }
  /deep/.van-swipe__indicators {
    bottom: 44px;
  }
}
.form-dl .form-dd {
  text-align: left;
}
.form-dd a {
  color: #00c6ae;
}
.box-img {
  width: 137px;
  height: 136px;
  padding: 8px;
  margin: 0 auto;
  margin-top: 10px;
  border: 1px solid #d4d4d4;
  border-radius: 2px;
}
.box-img image {
  width: 100%;
  height: 100%;
}
.form-dl .form-dt {
  min-width: 75px;
}
.form-dt.w {
  width: 100%;
}
</style>