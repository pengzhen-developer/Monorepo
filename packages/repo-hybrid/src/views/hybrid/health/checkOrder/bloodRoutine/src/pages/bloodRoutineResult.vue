<template>
    <div class="overflow-auto">
        <div class="section-header"></div>
        <div class="q-mx-md q-my-sm" v-for="(inspection, index) in bloodRoutine.resultItems"
             :key="inspection.toString()">
            <InspectionIndexCell v-bind:inspection="inspection"
                                 v-bind:show-separator="index < bloodRoutine.resultItems.length - 1"></InspectionIndexCell>
        </div>
        <div class="section-header"></div>
        <div class="q-mx-md">
            <div class="check-cell">
                <span class="row-3 label text-grey-333">检查医生</span>
                <span class="text-right col-grow text-grey-666 label">{{ bloodRoutine.inspectionPerson }}</span>
            </div>
            <div class="separator-line"/>
            <div class="check-cell">
                <span class="row-3 label text-grey-333">检查医生</span>
                <span class="text-right col-grow text-grey-666 label">{{ bloodRoutine.inspectionPerson }}</span>
            </div>
            <div class="separator-line"/>
            <div class="check-cell">
                <span class="row-3 label text-grey-333">审核医生</span>
                <span class="text-right col-grow label text-grey-666">{{ bloodRoutine.checkPerson }}</span>
            </div>
            <div class="separator-line"/>
            <div class="check-cell">
                <span class="row-3 label text-grey-333">审核时间</span>
                <span class="text-right col-grow label text-grey-666">{{ bloodRoutine.checkTime }}</span>
            </div>
        </div>
    </div>
</template>

<script>
  import InspectionIndexCell from "../components/InspectionIndexCell";
  export default {
    name: "bloodRoutineResult",
    props: {
      bloodRoutine: {
        resultItems: [],
        inspectionPerson: "",
        receiveTime: "",
        checkPerson: "",
        checkTime: "",
      }
    },
    components: {
      InspectionIndexCell,
    },
  }
</script>

<style lang="scss" scoped>

    .section-header {
        height: 8px;
        background-color: #F9F9F9;
    }

    .check-cell {
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: space-between;

        .label {
            font-size: 14px;
            font-weight: 400;
        }
    }
    .separator-line {
        height: 1px;
        background-color: #F5F5F5;
    }
</style>
