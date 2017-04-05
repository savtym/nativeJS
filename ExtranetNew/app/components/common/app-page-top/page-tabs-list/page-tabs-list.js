
import Native from '/common/native.js';
import dom from './page-tabs-list.html!html';


const nameComponent = 'page-tabs-list';


export default class PageTabsList extends Native {

  constructor(obj) {
    super(dom, obj);
  }

  static get nameComponent() {
    return nameComponent;
  }
}