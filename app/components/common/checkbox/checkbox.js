/*
*   checkbox.js
*/

import Native from '../../../js/Common/native';
import dom from './checkbox.html!html';

const nameComponent = 'checkbox';


export default class Checkbox extends Native {

  constructor() {
    super(nameComponent, dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}