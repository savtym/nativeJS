
import Native from '/common/native.js';
import dom from './template.html!html';


const nameComponent = 'template';


export default class Template extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}