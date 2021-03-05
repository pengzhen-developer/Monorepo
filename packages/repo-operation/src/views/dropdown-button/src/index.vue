<script>
export default {
  props: {
    data: Array,
    max: Number
  },
  render() {
    if (this.data.length > this.max) {
      return (
        <div>
          {this.data.slice(0, this.max).map((item) => item.component)}

          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right q-ml-10"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              {this.data.slice(this.max, this.data.length).map((item) => {
                return <el-dropdown-item> {item.component}</el-dropdown-item>
              })}
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      )
    } else {
      return <div>{this.data.map((item) => item.component)}</div>
    }
  }
}
</script>
