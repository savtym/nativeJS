
import Native from '/common/native.js';
import dom from './services-accordion.html!html';


const nameComponent = 'services-accordion';


export default class ServicesAccordion extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}