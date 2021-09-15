/** 云药房 */

<template>
  <div>

    <div class="q-mb-md row">
      <el-checkbox v-bind:checked="!!pharmacy.DrugStoreId"
                   v-model="checked"
                   label="云药房"></el-checkbox>
    </div>

    <div v-if="checked"
         class="flex items-baseline row q-col-gutter-md">

      <div style="width: 240px;"
           class="flex column justify-center">
        <div class="flex items-center line-bg q-mb-sm">云药房</div>

        <q-card>
          <el-upload action="#"
                     list-type="picture-card"
                     v-bind:http-request="upload"
                     v-bind:file-list="fileList"
                     v-bind:class="{ 'uploaded' : this.fileList.length > 0 }"
                     v-bind:multiple="false"
                     v-bind:limit="1"
                     v-bind:auto-upload="true">
            <i slot="default"
               class="el-icon-plus"></i>

            <div slot="file"
                 class="flex justify-center items-center full-width full-height"
                 slot-scope="{file}">

              <el-image style="min-height: 140px; min-width: 200px;"
                        class="el-upload-list__item-thumbnail"
                        v-if="file.url"
                        v-bind:src="file.url">
              </el-image>

              <q-spinner v-else
                         color="primary"
                         size="3em" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview"
                      v-on:click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span class="el-upload-list__item-delete"
                      v-on:click="handlePictureCardEdit(file)">
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <PeaceDialog fullscreen
                       style="background: transparent;"
                       v-bind:visible.sync="dialogVisible">
            <img width="100%"
                 v-bind:src="dialogImageUrl"
                 alt="">
          </PeaceDialog>

          <q-separator />

          <q-card-actions align="center"
                          style="min-height: 40px;">
            <el-input v-model="pharmacy.DisplayName"
                      placeholder="请输入云药房名称"></el-input>
          </q-card-actions>
        </q-card>
      </div>

      <div class="flex column justify-center">
        <div class="flex items-center q-mb-sm">
          <span class="flex items-center line-bg q-mr-sm">云仓</span>
          <span class="cursor-pointer text-primary text-caption"
                v-on:click="showDialog">请选择</span>
        </div>

        <q-card v-if="pharmacy.DrugStoreName">
          <q-card-section class="bg-white flex items-center">
            <div class="bg-primary q-pa-sm q-mr-md"
                 style="border-radius: 5px;">
              <q-icon class="text-white text-h5"
                      name="home"></q-icon>
            </div>

            <span>{{ pharmacy.DrugStoreName }}</span>
          </q-card-section>
        </q-card>

      </div>
    </div>

    <PeaceDialog title="选择仓库"
                 width="600px"
                 v-bind:visible.sync="dialog.visible">
      <peace-table ref="table"
                   height="400px"
                   class="q-mb-lg"
                   v-bind:data="cloudStoreList">
        <el-table-column label=""
                         align="center"
                         width="80px">
          <template slot-scope="scope">
            <el-radio name="仓库"
                      v-model="DrugStoreKeyId"
                      v-bind:label="scope.row.DrugStoreKeyId"
                      type="text"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="仓库名称"
                         prop="Name"></el-table-column>
        <el-table-column label="所在城市"
                         prop="City"></el-table-column>
      </peace-table>

      <div class="text-center">
        <el-button style="min-width: 120px;"
                   type=""
                   v-on:click="closeDialog">
          <div class="q-py-xs q-px-xl">取消</div>
        </el-button>
        <el-button style="min-width: 120px;"
                   type="primary"
                   v-on:click="check">
          <div class="q-py-xs q-px-xl">提交</div>
        </el-button>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service'

import { IPharmacyModel } from './../model/IPharmacyModel'

export default {
  props: {
    pharmacyRule: Object,
    pharmacyConf: Object,
    data: Array
  },

  inject: ['provideCustCode', 'provideCustName', 'provideCloudStoreList'],

  data() {
    return {
      checked: false,

      pharmacy: new IPharmacyModel(),

      dialog: {
        visible: false
      },

      fileList: [],

      DrugStoreKeyId: '',

      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },

  computed: {
    cloudStoreList() {
      return this.provideCloudStoreList()
    },

    custCode() {
      return this.provideCustCode()
    },

    custName() {
      return this.provideCustName()
    }
  },

  watch: {
    checked() {
      if (this.checked === false) {
        this.pharmacy = new IPharmacyModel()
        this.fileList = [{ name: new Date().getTime(), url: this.pharmacy.DisplayImg }]

        for (let i = this.data.length - 1; i >= 0; i--) {
          const item = this.data[i]

          if (item.RuleFlag === this.pharmacyRule.value && item.ConfType === this.pharmacyConf.value && item.CustomerType === 50) {
            this.data.splice(i, 1)
          }
        }
      }
    },

    pharmacy: {
      handler() {
        // 移除云药房
        for (let i = this.data.length - 1; i >= 0; i--) {
          const item = this.data[i]

          if (item.RuleFlag === this.pharmacyRule.value && item.ConfType === this.pharmacyConf.value && item.CustomerType === 50) {
            this.data.splice(i, 1)
          }
        }

        // 添加修改后的云药房（已完成所有字段填写）
        if (
          !Peace.validate.isEmpty(this.pharmacy.RuleFlag) &&
          !Peace.validate.isEmpty(this.pharmacy.ConfType) &&
          !Peace.validate.isEmpty(this.pharmacy.CustomerType) &&
          !Peace.validate.isEmpty(this.pharmacy.DrugStoreId) &&
          !Peace.validate.isEmpty(this.pharmacy.DrugStoreName) &&
          !Peace.validate.isEmpty(this.pharmacy.DisplayImg) &&
          !Peace.validate.isEmpty(this.pharmacy.DisplayName)
        ) {
          this.data.push(this.pharmacy)
        }
      },
      deep: true
    }
  },

  created() {
    const pharmacyCloudData = this.data.find(
      (item) => item.RuleFlag === this.pharmacyRule.value && item.ConfType === this.pharmacyConf.value && item.CustomerType === 50
    )

    if (pharmacyCloudData) {
      this.pharmacy = pharmacyCloudData
      this.fileList = [{ name: new Date().getTime(), url: pharmacyCloudData.DisplayImg }]
      this.DrugStoreKeyId = this.pharmacy.DrugStoreId
    } else {
      this.fileList = [{ name: new Date().getTime(), url: this.pharmacy.DisplayImg }]
    }
  },

  methods: {
    showDialog() {
      this.dialog.visible = true

      this.DrugStoreKeyId = this.pharmacy.DrugStoreId
    },

    closeDialog() {
      this.dialog.visible = false
    },

    check() {
      const row = this.cloudStoreList.find((item) => item.DrugStoreKeyId === this.DrugStoreKeyId)

      // set pharmacy
      this.pharmacy.RuleFlag = this.pharmacyRule.value
      this.pharmacy.ConfType = this.pharmacyConf.value
      this.pharmacy.CustCode = ''
      this.pharmacy.CustomerType = 50
      this.pharmacy.DrugStoreId = row.DrugStoreKeyId
      this.pharmacy.DrugStoreName = row.Name

      this.dialog.visible = false
    },

    async getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },

    async upload(options) {
      this.fileList = [{}]

      const base64String = await this.getBase64(options.file)

      Service.upload({ Base64: base64String, ImgFormat: 'jpg' }).then((res) => {
        this.fileList = [{ name: new Date().getTime(), url: res.data.SignUrl }]

        this.pharmacy.DisplayImg = res.data.SignUrl
      })
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    handlePictureCardEdit() {
      this.fileList = []
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-radio__label {
  display: none;
}

.line-bg {
  &::before {
    content: ' ';
    display: inline-block;
    width: 4px;
    height: 16px;
    border-radius: 4px;
    margin: 0 8px 0 0;
    background: var(--q-color-primary);
  }
}

::v-deep .el-dialog.is-fullscreen {
  background: transparent;
}

::v-deep .uploaded .el-upload--picture-card {
  display: none;
}

::v-deep .el-upload-list--picture-card .el-upload-list__item {
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
  min-height: 148px;
  margin: 0;
  padding: 10px;
}

::v-deep .el-upload--picture-card {
  width: 100%;
  height: 100%;

  min-height: 148px;
}

::v-deep .el-upload-list__item {
  transition: none !important;
}
</style>