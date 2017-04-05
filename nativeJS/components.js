//
// components.js
//

import * as pieces from '/components/index.js';

function addFunctionsWithParents(pieces, components) {
  for (let key in pieces) {
    if (typeof pieces[key] === 'function') components[pieces[key].nameComponent.toUpperCase()] = pieces[key];
    else if (typeof  pieces[key] === 'object' && key !== 'default') {
      components[key] = {};
      addFunctionsWithParents(pieces[key], components[key]);
    }
  }
  return components;
}

const components = addFunctionsWithParents(pieces, {});
let currentComponent = '';
let activeComponents = {};
let idActiveComponents = 0;

export default class Components {

  constructor() {
  }

  static get components() {
    return components;
  }

  static get activeComponents() {
    return activeComponents;
  }

  static get currentComponent() {
    return currentComponent;
  }

  static set currentComponent(newCurrentComponent) {
    this.currentComponent = newCurrentComponent;
  }

  static get componentsName() {
    let componentsName = [];
    components.forEach((component) => {
      componentsName.push(component.nameComponent);
    });
    return componentsName;
  }

  //TODO: need refactoring
  // static getComponentById(idChild, idParent,) {
  //   const parentComponent = activeComponents[idParent];
  //   let parentDomComponent = parentComponent.getHTML();
  //
  // }

  static getComponentByClassNameWithTag(nameComponent) {
    nameComponent = nameComponent.tagName.toUpperCase();
    return this.activeComponents.find(component => component.nameComponent.toUpperCase() === nameComponent);
  }

  // static isComponentByTag(tagComponent) {
  //   debugger
  //   tagComponent = tagComponent.tagName.toUpperCase();
  //   return !!this.activeComponents.find(component => component.nameComponent.toUpperCase() === tagComponent);
  // }

  static isComponentByNameComponent(isComponent, existComponents = components, result = false) {
    if (!result) {
      for (let key in existComponents) {
        if (typeof existComponents[key] === 'object') {
          result = this.isComponentByNameComponent(isComponent, existComponents[key], result);
        } else {
          result = existComponents[isComponent.toUpperCase()];
        }
        if (result) break;
      }
    }
    return result;
  }

  static addComponent(componentName, obj) {
    let newComponent = (typeof componentName === 'string') ? this.isComponentByNameComponent(componentName) : console.log(`Object don't create: ${componentName}`);
    if (newComponent) {
      newComponent = new newComponent(obj);
      newComponent.idActiveComponents = idActiveComponents;
      this.activeComponents[idActiveComponents] = newComponent;
      idActiveComponents++;
    }
    return newComponent;
  }

  static removeComponent(component) {
    if (activeComponents.indexOf(component)) {
      activeComponents.splice(index, 1);
    }
  }

}