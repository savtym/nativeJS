
import Native from '/common/native.js';
import dom from './breadcrumbs.html!html';


const nameComponent = 'breadcrumbs';


export default class Breadcrumbs extends Native {

  constructor(obj) {
    super(dom, obj);
  }

  static get nameComponent() {
    return nameComponent;
  }
}