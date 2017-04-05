
import Native from '/common/native.js';
import dom from './app-page-top.html!html';


const nameComponent = 'app-page-top';


export default class AppPageTop extends Native {

  constructor(obj) {
    super(dom, obj);
    this.breadcrumbs = JSON.stringify(this.breadcrumbs);
    this.tabsList = JSON.stringify(this.tabsList);
  }

  static get nameComponent() {
    return nameComponent;
  }

}