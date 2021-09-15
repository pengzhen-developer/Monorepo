
/**二维码 */
<template>
  <van-overlay :show="showQRCode"
               @click="changeFlag">
    <div class="wrapper">
      <div @click.stop
           class="qr-code-wrapper">
        <div class="qr-code-area">
          <!--有二维码-->
          <div v-if="QRCodeURL"
               class="qr-code">
            <div class="title">取药码</div>
            <van-image class="qr-code-img"
                       :src="QRCodeURL">
              <template v-slot:loading>
                <van-loading type="spinner"
                             size="20" />
              </template>
            </van-image>
          </div>
          <!--没有二维码-->
          <div v-if="!QRCodeURL"
               class="qr-code qr-code--empty">
            <div class="title">取药码</div>
            <img class="qr-code-img-empty"
                 :src="require('@src/assets/images/qrcode-empty.png')"
                 alt="" />
            <div class="context">暂无二维码</div>
            <div class="info">请使用取药码进行取药</div>
          </div>
        </div>
        <div class="q-code-line">
          <img :src="require('@src/assets/images/message-line.png')">
        </div>
        <div class="text-area">
          取药码：<span>{{ PickUpCode}}</span>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'QRCode',
  model: {
    prop: 'showQRCode',
    event: 'changeFlag'
  },
  props: {
    QRCodeURL: {
      type: String,
      default: () => {
        return ''
      }
    },
    PickUpCode: {
      type: String,
      default: ''
    },
    showQRCode: {
      type: Boolean,
      required: true
    }
  },
  // data() {
  //   return {
  //     showModel: this.showQRCode
  //   }
  // },
  methods: {
    changeFlag() {
      this.$emit('changeFlag', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-overlay {
  background: rgba(0, 0, 0, 0.5);
}
.wrapper {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .qr-code-wrapper {
    width: 250px;
    border-radius: 5px;
    overflow: hidden;

    .qr-code-area {
      width: 100%;
      background-color: #fff;

      display: flex;
      align-items: center;
      justify-content: center;

      .qr-code {
        width: 100%;
        height: 100%;
        font-size: 16px;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;

        .title {
          margin: 0.42rem 0;
          font-weight: bold;
        }
        .qr-code-img {
          width: 150px;
          height: 150px;
          margin-bottom: 15px;
        }
      }

      img {
        display: block;
      }

      .qr-code--empty {
        font-size: 15px;
        color: #000;

        .title {
          margin: 0.42rem 0;
        }

        .qr-code-img-empty {
          width: 118px;
          height: 100px;
          margin-bottom: 0.26rem;
          display: block;
        }

        .context {
          margin-bottom: 0.1rem;
        }

        .info {
          margin-bottom: 0.42rem;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .q-code-line {
      img {
        display: block;
      }
    }
    .text-area {
      padding: 10px 0 16px 0;
      width: 100%;
      background-color: #fff;

      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      span {
        color: #333;
      }
    }
  }
}
</style>