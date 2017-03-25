//
// variables.js
//

import * as pieces from './index.js';

let elements = [];
for (let key in pieces)
  if (typeof pieces[key] === 'function') elements.push(pieces[key]);


const components = elements;
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

  static getComponentByClassNameWithTag(nameComponent) {
    nameComponent = nameComponent.tagName.toUpperCase();
    return components.find(component => component.nameComponent.toUpperCase() === nameComponent);
  }

  static isComponentByTag(tagComponent) {
    tagComponent = tagComponent.tagName.toUpperCase();
    return !!components.find(component => component.nameComponent.toUpperCase() === tagComponent);
  }

  static isComponent(newComponent) {
    return !!components.find(component => component === newComponent);
  }

  static addComponent(component) {
    let newComponent;
    if (this.isComponent(component)) {
      newComponent = new component;
      activeComponents.push(newComponent);
    }
    return newComponent;
  }

  static removeComponent(component) {
    if (activeComponents.indexOf(component)) {
      activeComponents.splice(index, 1);
    }
  }

}