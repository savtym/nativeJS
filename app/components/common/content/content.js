/*
*   content.js
*/

import Native from '../../../js/Common/native';
import myText from './content.html!text';

const nameComponent = 'content';


export default class Content extends Native {
  constructor() {
    super(nameComponent);
    console.log(myText);
  }
}