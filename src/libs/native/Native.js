import {Wrap} from './Wrap';

class Native {


	static render(cls, name) {
		if (name) {

			// func = (e) => {
			// 	cls.connectedCallback.call(cls, e, ...args);
			// }

			const connectedCallback = cls.prototype.connectedCallback;

			cls.prototype.connectedCallback = function() {
				this.innerHTML = this.render;
				connectedCallback.call(this);
			};

			customElements.define(name, cls);

			// debugger

			cls = new cls();

			// document.registerElement(name, cls);
			// var md = new cls();
			// md.setAttribute('test', 'nope');
			// md.setAttribute('country', 'UK');
		}
	}
}



export default Native;