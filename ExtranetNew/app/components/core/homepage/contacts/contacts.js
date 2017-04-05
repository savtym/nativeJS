
import Native from '/common/native.js';
import dom from './contacts.html!html';


const nameComponent = 'contacts';


export default class Contacts extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}