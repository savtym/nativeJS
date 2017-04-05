import Variables from './common/variables.js';
import Router from './router.js';
import Components from './components.js';
import Observer from './common/observer.js';


export default class Parse {

  constructor(page, component) {
    this.app = page.getElementsByTagName(Variables.nameApp)[0];

    let newComponent = Components.addComponent(component.nameComponent);
    newComponent.parent = this.app;
    const appendChild = this._getDomComponent(newComponent);

    this.app.innerHTML = '';
    this.app.appendChild(appendChild);

    this.mainDom = page.getElementsByTagName(Variables.nameMainContent)[0];
  }

  /*
  *   If exist callback for get data with API (json)
  */
  parsing(component) {
    const newComponent = Components.addComponent(component.nameComponent);
    if (!newComponent.requestOn)
      this.changeDomComponent(newComponent);
  }


  /*
  *   When return callback with API (json)
  */
  changeDomComponent(component) {
    let componentDom = this._getDomComponent(component);
    this.mainDom.innerHTML = '';
    this.mainDom.appendChild(componentDom);
    Observer.emit(Variables.documentIsReady, this);
  }



  _getDomComponent(component) {
    let componentDom = component.getHTML();
    return this._parsComponents(componentDom.children, componentDom);
  }

  _parsComponents(components, componentDom) {

    // recursion component
    for (let component of components) {

      // if tag have a link to router
      if (component.hasAttribute(Variables.routerAttr)) {
        component.onclick = function () {
          Router.routing(this.getAttribute(Variables.routerAttr));
        };
      }

      let obj;

      //if component have a object
      if (component.hasAttribute(Variables.objContent)) {
        obj = JSON.parse(component.getAttribute(Variables.objContent));
      }

      // if component have contentName
      let newComponent = Components.addComponent(component.tagName, obj);
      
      if (newComponent) {
        newComponent.parent = component.parentElement;
        component.appendChild(newComponent.getHTML());
      }

      this._parsComponents(component.children, componentDom);
    }

    return componentDom;
  }



}