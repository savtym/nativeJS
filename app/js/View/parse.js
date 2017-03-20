import Variables from '../Common/variables';
import Components from '/components/components';

export default class Parse {
  constructor(page) {
    this.app = page.getElementsByTagName(Variables.nameApp)[0];
    // this.components = Components.components;
    // this.componentsName = Components.componentsName;
  }

  pars() {
    // console.log(this.components, this.componentsName);
  }
}