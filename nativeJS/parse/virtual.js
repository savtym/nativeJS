
export class Virtual {

	constructor(el, className = '') {
		this.el = el;
		this.tmp = el.innerHTML;
		this.class = className;
		this.methods = Virtual.parseMethods(el);
	}

	destructor() {
		Virtual.eventListener(this.el, this.methods, false);
	}


	/*
			event listener
	*/

	static eventListener(el, methods, isAddEvent = true) {
		const funcListener = (isAddEvent) ? 'addEventListener' : 'removeEventListener';
		for (let [event, method] of methods) {
			el[funcListener](event, method);
		}
	}


	/*
			parse methods
	*/

	static parseMethods(el) {
		let resultMethods = new Map();

		for (let attr of el.attributes) {
			if (attr.name.startsWith(Var.listener)) {
				let func = attr.value;
				if (typeof attr.value === 'string') {
					func = new Function(attr.value);
				}
				resultMethods.set(attr.name.replace(Var.listener, ''), func);
			}
		}

		return resultMethods;
	}

}