<template>
  <span class="layout-header">
    <span class="user">
      <div class="notify">
        <i class="el-icon-bell"></i>
      </div>

      <el-divider class="vertical"
                  direction="vertical"></el-divider>
      <div class="logo">
        <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
      </div>

      <div class="user-name">
        <span>admin</span>
      </div>

      <el-dropdown>
        <span class="el-dropdown-link">
          <div class="menu-toggle">
            <i class="el-icon-s-operation"></i>
          </div>
        </span>

        <el-dropdown-menu class="el-dropdown-menu"
                          slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </span>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.layout-header {
  .user {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px 0;

    .notify {
      margin: 0 20px 0 0;
    }

    .el-dropdown-link {
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
      }
    }

    .el-dropdown-menu {
      width: 140px;
    }

    .vertical {
      margin: 0 20px 0 0;
    }

    .logo {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 10px 0 0;

      .el-image {
        width: 100%;
        height: 100%;
      }
    }

    .user-name {
      margin: 0 10px 0 0;

      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>