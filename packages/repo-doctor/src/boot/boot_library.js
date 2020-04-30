// import library plugin
import Library from '@src/library'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Library.install)

  console.log(
    `%c ${'Library.library'} %c ${Library.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
