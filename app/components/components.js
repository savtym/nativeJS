//
// variables.js
//

import Content from './common/content/content.js';

const nameApp = 'app';

const components = [
  Content,
];

export default class Components {
  constructor() {

  }

  static get componentsName() {
    let componentsName = [];
    components.forEach((component) => {
      componentsName.push(component.nameComponent);
    })
    return componentsName;
  }

  static get components() {
    return components;
  }

  static get nameApp() {
    return nameApp;
  }
}