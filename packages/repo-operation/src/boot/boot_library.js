// import library plugin
import Peace from '@src/library'

// export boot install function
// async is optional
export default async ({ Vue }) => {
  Vue.use(Peace.install)

  console.log(
    `%c ${'Library'} %c ${Peace.version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}
