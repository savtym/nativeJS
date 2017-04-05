
import Native from '/common/native.js';
import dom from './rooms.html!html';


const nameComponent = 'rooms';


export default class Rooms extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}