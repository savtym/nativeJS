
import Native from '/common/native.js';
import dom from './app-select.html!html';


const nameComponent = 'app-select';


export default class AppSelect extends Native {

  constructor(obj) {
    super(dom, obj);


    // this.callFuncAfterParseDom(this.callStyler);
  }

  static get nameComponent() {
    return nameComponent;
  }

}