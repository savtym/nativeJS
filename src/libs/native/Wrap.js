
import Native from './Native';
import config from './config';

export class Wrap {
	constructor(html, cls) {
		this._html = html;
		this.cls = cls;
	}

	html(self) {
		if (this.tmp) {
			return this.tmp;
		}
		const tmp = document.createElement('template');
		tmp.innerHTML = new Function('', `return \`${this._html}\``).call(self);
		this.methods = Wrap.parseMethods(tmp.content, self);
		Wrap.eventListener(this.methods);
		this.tmp = tmp;
		// console.log(methods)
		return this.tmp.content;
	}


	init() {

	}

	render(key) {

		if (!this.properties[key]) return;

		for (let [, parse] of this.properties[key].tmp) {
			Virtual.eventListener(parse.methods, false);
			parse.parent.innerHTML = parse.tmp;
			Virtual.eventListener(parse.methods);
		}
	}


	destructor() {
		Virtual.eventListener(this.methods, false);
	}

	/*
			event listener
	*/

	static eventListener(methods, isAddEvent = true) {
		const funcListener = (isAddEvent) ? 'addEventListener' : 'removeEventListener';
		for (let event of methods) {
			for (let [key, obj] of event) {
				console.log(obj, obj.func, key)
				obj.dom[funcListener](key, obj.func, false);
			}
		}
	}


	static parseMethods(el, cls) {

		const result = [];

		el.querySelectorAll('*').forEach(function(dom) {

			for (let attr of dom.attributes) {

				if (attr.name.startsWith(config.listener)) {

					// const args = attr.value.split(',').map(str => str.trim());
					let funcName = attr.value.replace('this.', '');
					let func;

					if (cls && cls[funcName]) {
						func = (e) => {
							cls[funcName].call(cls, e);
						}
					} else {
						func = new Function('Native', attr.value).bind(Native);
					}

					result.push(new Map([[attr.name.replace(config.listener, ''), { func: func, dom: dom }]]));
					break;
				}

			}

		});

		return result;
	}
}