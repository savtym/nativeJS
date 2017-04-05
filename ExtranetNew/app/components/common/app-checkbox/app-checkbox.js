
import Native from '/common/native.js';
import dom from './app-checkbox.html!html';


const nameComponent = 'app-checkbox';


export default class AppCheckbox extends Native {

  constructor(obj) {
    super(dom, obj);
  }

  static get nameComponent() {
    return nameComponent;
  }
}