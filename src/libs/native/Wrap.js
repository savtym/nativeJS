
import Native from './Native';
import config from './config';

export class Wrap {
	constructor(html,cls) {
		this._html = html;
		this._cls = cls;
	}

	html(self) {
		self.innerHTML = '';
		const props = Wrap.getProps(self, this._cls);

		const tmp = self.attachShadow({mode: (self.shadowRoot) ? self.shadowRoot : 'closed'});
		tmp.innerHTML = new Function('', `return \`${this._html}\``).call(self);
		this.methods = Wrap.parseMethods(tmp, self, this._cls);
		Wrap.eventListener(this.methods);

		this.tmp = tmp;
		this.parent = self;

		return this.tmp;
	}


	init() {

	}

	render() {
		Wrap.eventListener(this.methods, false);
		this.tmp.innerHTML = new Function('', `return \`${this._html}\``).call(this.parent);
		this.methods = Wrap.parseMethods(this.tmp, this.parent, this._cls);
		Wrap.eventListener(this.methods);
	}


	destructor() {
		Virtual.eventListener(this.methods, false);
	}


	/*
			get Attributes => props
	*/

	static getProps(dom, constructorCls) {
		for (let attr of dom.attributes) {
			const staticName = attr.value.replace(constructorCls.name+'.', '');
			let funcName = attr.value.replace('this.', '');

			if (dom[funcName]) {

			} else if (constructorCls[staticName]){

			}
		}
	}

	/*
			event listener
	*/

	static eventListener(methods, isAddEvent = true) {
		const funcListener = (isAddEvent) ? 'addEventListener' : 'removeEventListener';
		for (let event of methods) {
			for (let [key, obj] of event) {
				obj.dom[funcListener](key, obj.func, false);
			}
		}
	}


	static parseMethods(el, cls, constructorCls) {

		const result = [];

		el.querySelectorAll('*').forEach(function(dom) {

			for (let attr of dom.attributes) {

				if (attr.name.startsWith(config.listener)) {

					const staticName = attr.value.replace(constructorCls.name+'.', '');
					let funcName = attr.value.replace('this.', '');
					let func;

					if (cls && (cls[funcName] || constructorCls[staticName])) {
						let funcRun;
						let self;
						if (cls[funcName]) {
							self = cls;
							funcRun = cls[funcName];
						} else {
							funcRun = constructorCls[staticName];
						}
						func = (e) => {
							funcRun.call(self, e);
						}
					} else {
						console.error("Didn't find a func: ", funcName);
					}

					result.push(new Map([[attr.name.replace(config.listener, ''), { func, dom }]]));
					break;
				}

			}

		});

		return result;
	}
}