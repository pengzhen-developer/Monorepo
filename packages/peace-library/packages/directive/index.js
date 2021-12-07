import drag from './drag.js'
import focus from './focus.js'
import force from './force.js'
import permission from './permission.js'

const createDirective = ({ Vue }) => {
  const directive = [drag, focus, force, permission]

  directive.map((directive) => {
    Vue.directive(directive.name, directive)
  })
}

export default createDirective
