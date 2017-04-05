
import Native from '/common/native.js';
import dom from './app-radio.html!html';


const nameComponent = 'app-radio';


export default class AppRadio extends Native {

    constructor(obj) {
        super(dom, obj);
    }

    static get nameComponent() {
        return nameComponent;
    }
}