import {Wrap} from './Wrap';
import {Prototype} from './Prototype';
import cache from './Cache';

class Native {


	static render(html, name, cls, parent) {
		if (html && name && cls) {
			if (!cache[name.toUpperCase()]) {
				Prototype.init(cls);
				cache[name.toUpperCase()] = new Wrap(html, cls);
				customElements.define(name, cls);
			} else {
				const k = customElements.get(name);
				new k();
			}

		}
	}
}



export default Native;