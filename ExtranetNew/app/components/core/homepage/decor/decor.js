
import Native from '/common/native.js';
import dom from './decor.html!html';


const nameComponent = 'decor';


export default class Decor extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}