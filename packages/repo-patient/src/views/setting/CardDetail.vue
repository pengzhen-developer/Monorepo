<template>
    <div class="card-detail">
        <div class="form form-for-family">
            <div id="qrcode" class="qrcode" :style="{backgroundImage:'url(data:image/png;base64,'+ model.base64 + ')'}"></div>
            <div class="divider"></div>
            <van-field  label="姓名" placeholder="请输入姓名" readonly v-model="model.name" />
            <van-field  label="身份证号" placeholder="请输入身份证号" readonly v-model="model.idcard" />
            <van-field  label="电话" placeholder="请选择" readonly v-model="model.tel" />
            <div class="tip">
                <div class="icon"></div>
                <span>分诊、就诊、做检查、检验、取报告均可出示本二维码办理 </span>
            </div>
        </div>
    </div>
</template>

<script>
    import peace from '@src/library'
    export default {
        name: "CardDetail",
        data() {
            return {
                model : {}
            }
        },
        mounted() {
            const params = peace.util.decode(this.$route.params.json)
            peace.service.patient.healthcardInfo(params).then(res => {
               this.model = res.data.info;
            })
        }
    }
</script>

<style scoped lang="scss">
    .card-detail {
        height: 100%;
        padding: 15px;
        background: #F9F9F9;
        .form-for-family {
            background: #fff;
            height: 100%;
            overflow:hidden;
            .qrcode {
                width: 172px;
                height: 172px;
                background-size: cover;
                margin: 20px auto 20px;
            }
            .divider {
                height: 1px;
                border: 1px dashed #eee;
                margin-bottom: 10px;
            }
            .tip {
                width:312px;
                height:53px;
                background:rgba(235,251,249,1);
                border-radius:6px;
                margin: 0 auto;
                font-size:12px;
                font-weight:400;
                color:rgba(0,198,174,1);
                display: flex;
                align-items: center;
                padding: 0 15px;
                .icon {
                    width: 16px;
                    height: 16px;
                    background: url("../../assets/images/ic_tixing.png");
                    background-size : cover;
                    margin-right: 10px;
                }
            }
        }
    }
    .divider {
      height: 1px;
      border: 1px dashed #eee;
      margin-bottom: 10px;
    }
    .tip {
      width: 312px;
      height: 53px;
      background: rgba(235, 251, 249, 1);
      border-radius: 6px;
      margin: 0 auto;
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 198, 174, 1);
      display: flex;
      align-items: center;
      padding: 0 15px;
      .icon {
        width: 16px;
        height: 16px;
        background: url('../../assets/images/ic_tixing.png');
        background-size: cover;
        margin-right: 10px;
      }
    }
/deep/
  .form.form-for-family
  > .van-cell
  > .van-cell__value
  > .van-field__body
  > .van-field__control {
  color: #666;
  text-align: right;
  &::placeholder {
    color: #ccc;
  }
}
/deep/ .form.form-for-family > .van-cell:not(:last-child)::after {
  right: 10px !important;
}
</style>
