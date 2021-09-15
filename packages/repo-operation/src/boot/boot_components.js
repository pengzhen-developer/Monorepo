import RegionSelector from '@src/views/region-selector/index'

export default ({ Vue }) => {
  // 注册 component
  const components = [RegionSelector]
  components.map((component) => {
    Vue.use(component)
  })
}
