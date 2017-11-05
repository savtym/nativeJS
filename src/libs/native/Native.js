import {Wrap} from './Wrap';

const cache = {};

class Native {


	static render(html, name, cls) {
		if (html && name) {

			// func = (e) => {
			// 	cls.connectedCallback.call(cls, e, ...args);
			// }

			const connectedCallback = cls.prototype.connectedCallback;

			cache.name = new Wrap(html, cls);
			const tmp = new Function('', `return \`${html}\``);

			cls.prototype.connectedCallback = function() {
				this.connectedWillCallback();
				this.innerHTML = '';
				this.appendChild(cache.name.html(this));
				connectedCallback.call(this);
			};

			customElements.define(name, cls);

			// debugger

			// cls = new cls();

			// document.registerElement(name, cls);
			// var md = new cls();
			// md.setAttribute('test', 'nope');
			// md.setAttribute('country', 'UK');
		}
	}
}



export default Native;