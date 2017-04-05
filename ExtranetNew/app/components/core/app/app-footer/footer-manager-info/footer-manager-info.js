
import Native from '/common/native.js';
import dom from './footer-manager-info.html!html';


const nameComponent = 'footer-manager-info';


export default class FooterManagerInfo extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}