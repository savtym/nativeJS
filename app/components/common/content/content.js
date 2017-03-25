/*
*   content.js
*/

import Native from '../../../js/Common/native';
import dom from './content.html!html';

const nameComponent = 'content';


export default class Content extends Native {

  constructor() {
    super(nameComponent, dom);
    this.name = 'fdsf';
    this.dogs = [
      { name: 'Snickers', age: 2 },
      { name: 'Hugo', age: 8 },
      { name: 'Sunny', age: 1 }
    ];
  }

  static get nameComponent() {
    return nameComponent;
  }
}