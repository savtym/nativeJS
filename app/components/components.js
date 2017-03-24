//
// variables.js
//

import Content from './common/content/content.js';


const components = [
  Content,
];

let activeComponents = [];

export default class Components {

  constructor() {
  }

  static get components() {
    return components;
  }

  static get componentsName() {
    let componentsName = [];
    components.forEach((component) => {
      componentsName.push(component.nameComponent);
    });
    return componentsName;
  }

  static getComponentByKey(componentName) {
    return components.find(component => component.nameComponent === componentName);
  }

  static isComponent(componentName) {
    return !!components.find(component => component.nameComponent === componentName);
  }

  static addComponent(componentName) {
    if (this.isComponent(componentName)) {
      activeComponents.push(new this.getComponentByKey(componentName));
    }
  }

  static removeComponent(component) {
    if (activeComponents.indexOf(component)) {
      activeComponents.splice(index, 1);
    }
  }

}