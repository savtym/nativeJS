
import Native from '/common/native.js';
import dom from './app-header.html!html';

const nameComponent = 'app-header';


export default class AppHeader extends Native {

  constructor(obj) {
    super(dom, obj);
  }

  static get nameComponent() {
    return nameComponent;
  }
}