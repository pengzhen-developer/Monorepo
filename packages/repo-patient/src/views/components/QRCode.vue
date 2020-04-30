
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
          </div>
          <!--没有二维码-->
          <div v-if="!QRCodeURL"
               class="qr-code qr-code--empty">
            <div class="title">取药码</div>
            <img class="img-qr-code-empty"
                 :src="require('@src/assets/images/qrcode-empty.png')"
                 alt="" />
            <div class="context">暂无二维码</div>
            <div class="info">请使用取药码进行取药</div>
          </div>
        </div>
        <img :src="require('@src/assets/images/message-line.png')"
             alt=""
             style="display: block; margin: -0.5px 0;">
        <div class="text-area">
          取药码：{{ PickUpCode}}
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
      default: ''
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

        .img-qr-code-empty {
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
          color: #ccc;
        }
      }
    }

    .text-area {
      height: 50px;
      width: 100%;
      background-color: #fff;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>