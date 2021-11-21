<template>
  <div style="border: 1px solid rgba(0,0,0,0.10);">
    <div class="flex justify-between items-center q-px-md q-py-sm"
         style="border-bottom: 1px solid rgba(0,0,0,0.10);">
      <div>
        <span style="font-size: 16px;
                     color: #333333;
                     line-height: 22px;">
          <slot name="title">{{ data.SchemeName }}</slot>
        </span>
      </div>

      <div>
        <el-button type="text"
                   v-on:click="$emit('edit', data)">修改</el-button>

        <!-- 优先方案才允许删除 -->
        <template v-if="data.SchemeType === 2">
          <el-divider class="q-mx-md"
                      direction="vertical"></el-divider>
          <el-button type="text"
                     v-on:click="$emit('delete', data)">删除</el-button>
        </template>
      </div>
    </div>

    <div class="q-px-md q-py-md">
      <el-form space-none
               label-width="auto"
               label-suffix="：">
        <el-form-item required
                      label="药品">
          <template v-if="data.SchemeType === 1">
            <span>全品类</span>
          </template>
          <template v-else>
            <span v-for="(drug, index) in data.DrugInfo"
                  v-bind:key="drug.Code">
              {{ drug.Code }} {{ drug.Name }}

              <span v-show="index !== data.DrugInfo.length - 1">，</span>
            </span>
          </template>
        </el-form-item>
        <el-form-item required
                      label="审方团队">
          <template v-if="data.AuditorTeamInfo.length === 0">
            <i class="el-icon-edit cursor-pointer"
               v-on:click="$emit('edit', data)"></i>
          </template>
          <template v-else>
            <span v-for="(auditorTeam, index) in data.AuditorTeamInfo"
                  v-bind:key="auditorTeam.Code">
              <span>{{ auditorTeam.Code }} {{ auditorTeam.Name }}</span>
              <span v-show="index !== data.AuditorTeamInfo.length - 1">，</span>
            </span>
          </template>
        </el-form-item>
        <el-form-item required
                      label="超时设置"
                      v-if="data.IsTimeoutPasses">
          <span>响应时间 {{ data.OvertimeTime }} 秒，设置药师签名 {{ data.SignaturePharmacistName }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style>
</style>