import Variables from '../Common/variables';
import Components from '../../components/components.js';


export default class Parse {
  constructor(page) {
    this.app = page.getElementsByTagName(Variables.nameApp)[0];
    this.app.innerHTML = '';
  }

  parsing(component) {
    component = Components.addComponent(component);
    let componentDom = component.getHTML();
    componentDom = this._parsComponents(componentDom.children, componentDom);


    this.app.appendChild(componentDom);
  }

//getElementsByTagName(elem.nameComponent)[0].

  _parsComponents(components, componentDom) {
    if (components.length !== 0) {
      for (let component of components) {
        if (Components.isComponentByTag(component)) {
          let newComponent = Components.addComponent(Components.getComponentByClassNameWithTag(component));
          component.appendChild(newComponent.getHTML());
        }
        this._parsComponents(component.children, componentDom);
      }
    }
    return componentDom;
  }



}