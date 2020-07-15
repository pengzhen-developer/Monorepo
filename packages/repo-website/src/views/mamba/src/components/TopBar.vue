<template>
  <section id="topbar"
           class="d-none d-lg-block">
    <div class="container clearfix">
      <div class="social-links float-right">
        <div class=" role">
          <el-button class="role-content"
                     @click="gotoPharmacistWorkbench">
            <img src="../assets/img/my/icon_pharmacist.png"
                 class="role-img" />
            我是药师
          </el-button>
          <el-button class="role-content"
                     @click="gotoDoctorWorkbench">
            <img src="../assets/img/my/icon_doctor.png"
                 class="role-img" />
            我是医生
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

<style scoped>
.role {
  display: flex;
}
.role-content {
  margin-left: 20px;
  color: #3099a6;
  height: 40px;
  padding: 5px 25px;
  border: 1px #3099a6 solid;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  border-radius: 30px;
}
.role-img {
  width: 20px;
  margin-right: 5px;
  height: 20px;
}
</style>