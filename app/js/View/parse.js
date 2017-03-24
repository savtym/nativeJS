import Variables from '../Common/variables';
import Components from '../../components/components.js';


export default class Parse {
  constructor(page) {
    this.app = page.getElementsByTagName(Variables.nameApp)[0];
    this.components = Components.components;
    this.componentsName = Components.componentsName;

  }

  pars() {
    // this.app.innerHTML = '';
    for (let Component of this.components) {
      // console.log(this.app.getElementsByTagName(elem.nameComponent)[0].appendChild(elem.getHTML()));
    }
    console.log(Components.isComponent('content'));
  }

  parsComponent() {

  }



}