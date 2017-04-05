
import Native from '/common/native.js';
import dom from './app-footer.html!html';


const nameComponent = 'app-footer';


export default class AppFooter extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}