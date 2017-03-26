import Variables from '../Common/variables';
import Router from './router.js';
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
    this.app.innerHTML = '';

    this.app.appendChild(componentDom);
  }

//getElementsByTagName(elem.nameComponent)[0].

  _parsComponents(components, componentDom) {

    // recursion component
    if (components.length !== 0) {
      for (let component of components) {

        // if tag have a link to router
        if (component.hasAttribute(Variables.routerAttr)) {
          component.onclick = function () {
            Router.routing(this.getAttribute(Variables.routerAttr));
          };
        }

        // if component have contentName
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