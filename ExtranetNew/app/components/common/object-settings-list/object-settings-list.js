
import Native from '/common/native.js';
import dom from './object-settings-list.html!html';


const nameComponent = 'object-settings-list';


export default class ObjectSettingsList extends Native {

  constructor() {
    super(dom);
  }

  static get nameComponent() {
    return nameComponent;
  }
}