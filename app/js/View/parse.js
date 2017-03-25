import Variables from '../Common/variables';
import Components from '../../components/components.js';


export default class Parse {
  constructor(page) {
    this.app = page.getElementsByTagName(Variables.nameApp)[0];
    this.app.innerHTML = '';
  }

  parsing(component) {
    component = Components.addComponent(component);
    const compontDom = this._parsComponents(component.getHTML().children, document.createElement('template'));


    this.app.appendChild(componentDom);
  }

//getElementsByTagName(elem.nameComponent)[0].

  _parsComponents(components, componentDom) {
    if (components.length !== 0) {
      for (let component of components) {
        if (Components.isComponentByTag(component)) {
    debugger;
          let newComponent = Components.addComponent(Components.getComponentByClassNameWithTag(component));
          let newComponentDom = newComponent.getHTML();
          componentDom.appendChild(newComponentDom);
          componentDom.appendChild(this._parsComponents(newComponentDom.children, componentDom))
        } else { 
          this._parsComponents(component.children, componentDom);
        }
      }
    }
    return componentDom;
  }



}