/*
*   homepage.js
*/

import Native from '../../../js/Common/native';
import dom from './homepage.html!html';


const nameComponent = 'content';


export default class Homepage extends Native {

  constructor() {
    super(nameComponent, dom);

    this.title = 'This is homepage';

    console.log(this.getHTML());
  }

  static get nameComponent() {
    return nameComponent;
  }
}