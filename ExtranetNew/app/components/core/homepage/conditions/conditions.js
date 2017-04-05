
import Native from '/common/native.js';
import dom from './conditions.html!html';


const nameComponent = 'conditions';


export default class Conditions extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }

}