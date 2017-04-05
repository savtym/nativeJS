
import Native from '/common/native.js';
import dom from './services.html!html';


const nameComponent = 'services';


export default class Services extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}