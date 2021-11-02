import drag from './drag.js'
import focus from './focus.js'
import force from './force.js'

const createDirective = ({ Vue }) => {
  const directive = [drag, focus, force]

  directive.map((directive) => {
    Vue.directive(directive.name, directive)
  })
}

export default createDirective
