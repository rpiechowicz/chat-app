import directives from './directives'

import './styles/build.sass'

const install = (app: any) => {
  for (const directive of directives) {
    app.directive(directive.name, directive.logic)
  }
}

export default install
