<template>
    <div>
        <span class="check-title-label">{{ inspection.itemName }}</span>
        <div class="row q-my-sm">
            <div class="col">
                <div class="column">
                    <span class="result-label">{{ inspection.quantitativeResult }}</span>
                    <span class="title-label">量化结果</span>
                </div>
            </div>
            <div class="col">
                <div class="column">
                    <span class="result-label">{{ inspection.itemReference }}</span>
                    <span class="title-label">参考值</span>
                </div>
            </div>
            <div class="col">
                <div class="column">
                    <span class="result-label">{{ inspection.itemUnit }}</span>
                    <span class="title-label">单位</span>
                </div>
            </div>
        </div>
        <div v-show="showSeparator" class="separator-line"></div>
    </div>
</template>

<script>
  // import { Inspection } from "../model/inspection"
  export default {
    name: "InspectionIndexCell",
    props: {
      inspection: {
        type: Object,
        default: function () {
          return {
            itemName: "",
            quantitativeResult: "",
            itemReference: "",
            itemUnit: "",
          }
        }
      },
      showSeparator: {
        type: Boolean,
        default: function () {
            return true
        }
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
    .separator-line {
        height: 1px;
        background-color: #F5F5F5;
    }

    .check-title-label {
        font-size: 14px;
        font-weight: 400;
        color: var(--q-color-grey-333);
    }

    .result-label {
        margin-bottom: 4px;
        font-size: 15px;
        font-weight: 500;
        color: var(--q-color-grey-333);
    }

    .title-label {
        font-size: 12px;
        font-weight: 400;
        color: var(--q-color-grey-999);
    }

</style>
