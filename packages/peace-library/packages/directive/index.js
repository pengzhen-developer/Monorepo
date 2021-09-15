import force from './force'

const createDirective = ({ Vue }) => {
  const directive = [force]

  directive.map((directive) => {
    Vue.directive(directive.name, directive)
  })
}

export default createDirective
