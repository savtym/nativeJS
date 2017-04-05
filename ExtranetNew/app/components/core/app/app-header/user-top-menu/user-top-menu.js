
import Native from '/common/native.js';
import dom from './user-top-menu.html!html';


const nameComponent = 'topline';


export default class UserTopMenu extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}