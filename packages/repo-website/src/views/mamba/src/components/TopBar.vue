<template>
  <section id="topbar"
           class="d-none d-lg-block">
    <div class="container clearfix">
      <div class="social-links float-right">
        <div class=" role">
          <el-button class="role-content"
                     @click="gotoPharmacistWorkbench">
            <div>
              <i class="role-img zyy-icon zyy-icon_yaoshi"></i>
              <span style="line-height:nomal;">我是药师</span>
            </div>

          </el-button>
          <el-button class="role-content"
                     @click="gotoDoctorWorkbench">
            <div>
              <i class="role-img zyy-icon zyy-icon_yisheng"></i>
              <span style="line-height:nomal;">我是医生</span>
            </div>
          </el-button>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import Util from '@src/util'

export default {
  methods: {
    gotoDoctorWorkbench() {
      Util.route.redirectToDoctorWorkbench()
    },
    gotoPharmacistWorkbench() {
      Util.route.redirectTOPharmacistWorkbench()
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  display: flex;
}
.role-content {
  margin-left: 20px;
  color: var(--q-color-primary);
  height: 30px;
  padding: 5px 25px;
  border: 1px var(--q-color-primary) solid;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  border-radius: 30px;

  div {
    display: flex;
    align-items: center;
  }
}
.role-img {
  margin-right: 5px;
}
</style>