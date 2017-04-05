
import Native from '/common/native.js';
import dom from './app-aside.html!html';


const nameComponent = 'app-aside';


export default class AppAside extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}