<template>
  <div>
    <div class="form-dl">
      <div class="form-dt">店铺名称：</div>
      <div class="form-dd">{{phaInfo.DrugStoreName}}</div>
    </div>
    <div class="form-dl">
      <div class="form-dt">营业时间：</div>
      <div class="form-dd">{{phaInfo.BusinessHours}}</div>
    </div>
    <div class="form-dl">
      <div class="form-dt">商家电话：</div>
      <div class="form-dd blue"> <a :href="'tel:'+phaInfo.Phone">{{phaInfo.Phone}}</a> </div>
    </div>
    <div class="form-dl">
      <div class="form-dt">商家地址：</div>
      <div class="form-dd">{{phaInfo.Province}}{{phaInfo.City}}{{phaInfo.County}}{{phaInfo.Detailed}}</div>
    </div>
    <van-swipe>
      <van-swipe-item v-for="(img,index) in phaInfo.imgArr"
                      :key="index">
        <img :src="img.logo" />
        <div class="name">{{img.name}}</div>
      </van-swipe-item>
    </van-swipe>
    <!-- <div class="module">
      <div class="form-dl"
           v-if="phaInfo.DrugStoreLogo">
        <div class="form-dt w">药店门头照片：
          <div class="box-img"
               @click="preview(phaInfo.DrugStoreLogo)">
            <img :src="phaInfo.DrugStoreLogo" />
          </div>
        </div>
      </div>
      <div class="form-dl"
           v-if="phaInfo.BusinessLicenseImage">
        <div class="form-dt w">营业执照：
          <div class="box-img"
               @click="preview(phaInfo.BusinessLicenseImage)">
            <img :src="phaInfo.BusinessLicenseImage" />
          </div>
        </div>
      </div>
      <div class="form-dl"
           v-if="phaInfo.PermitImage">
        <div class="form-dt w">药品经营许可证：
          <div class="box-img"
               @click="preview(phaInfo.PermitImage)">
            <img :src="phaInfo.PermitImage" />
          </div>
        </div>
      </div>
      <div class="form-dl"
           v-if="phaInfo.GSPImage">
        <div class="form-dt w">药店经营质量管理规范认证证书
          <div class="box-img"
               @click="preview(phaInfo.GSPImage)">
            <img :src="phaInfo.GSPImage" />
          </div>
        </div>
      </div>
    </div> -->
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
      imagePreview: {
        visible: false,
        position: 0,
        images: []
      }
    }
  },
  mounted() {
    const params = peace.util.decode(this.$route.params.json)
    this.getDrugStoreApi(params.AccessCode, params.DrugStoreId, params.JZTClaimNo)
  },
  methods: {
    getDrugStoreApi(AccessCode, DrugStoreId, JZTClaimNo) {
      peace.service.patient.getDrugStoreApi(AccessCode, DrugStoreId, JZTClaimNo).then((res) => {
        let imgArr = [
          { title: 'DrugStoreLogo', logo: '', name: '药店门头照片' },
          { title: 'BusinessLicenseImage', logo: '', name: '营业执照' },
          { title: 'PermitImage', logo: '', name: '药品经营许可证' },
          { title: 'GSPImage', logo: '', name: '药品经营质量管理规范认证证书' }
        ]
        imgArr.map((img) => {
          if (res.data[img.title]) {
            img.logo = res.data[img.title]
          }
        })
        res.data.imgArr = imgArr
        this.phaInfo = res.data
      })
    },
    preview(img) {
      this.imagePreview.visible = true
      // this.imagePreview.position = fileIndex
      let images = []
      images.push(img)
      this.imagePreview.images = images
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