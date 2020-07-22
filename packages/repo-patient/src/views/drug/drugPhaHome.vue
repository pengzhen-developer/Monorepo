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
      <div class="form-dt">商家：</div>
      <div class="form-dd">{{phaInfo.Detailed}}</div>
    </div>
    <div class="module">
      <div class="form-dl">
        <div class="form-dt w">营业执照：
          <div class="box-img"
               @click="preview(phaInfo.BusinessLicenseImage)">
            <img :src="phaInfo.BusinessLicenseImage" />
          </div>
        </div>
      </div>
      <div class="form-dl">
        <div class="form-dt w">药品经营许可证：
          <div class="box-img"
               @click="preview(phaInfo.PermitImage)">
            <img :src="phaInfo.PermitImage" />
          </div>
        </div>
      </div>
    </div>
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
    this.getDrugStoreApi(params.AccessCode, params.DrugStoreId, params.JZTClaimNo, params.IsMergeStore)
  },
  methods: {
    getDrugStoreApi(AccessCode, DrugStoreId, JZTClaimNo, IsMergeStore) {
      peace.service.patient.getDrugStoreApi(AccessCode, DrugStoreId, JZTClaimNo, IsMergeStore).then((res) => {
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
<style >
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