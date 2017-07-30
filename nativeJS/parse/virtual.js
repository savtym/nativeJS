
export class Virtual {

	constructor(el, className = '', methods = '', ) {
		this.el = el;
		this.tmp = el.innerHTML;
		this.class = className;
		this.methods = this.parseMethods(methods);
		this.eventListener(this.el, this.methods);
	}


	destructor() {
		this.eventListener(this.el, this.methods, false);
	}

	/*
			event listener
	*/

	static eventListener(el, methods, isAddEvent = true) {
		const funcListener = (isAddEvent) ? 'addEventListener' : 'removeEventListener';
		for (let [method, events] of this.methods) {
			for (let event of events) {
				this.el[funcListener](event, method);
			}
		}
	}


	/*
			parse methods
	*/

	static parseMethods(methods) {
		let resultMethods = new Map();

		for (let event of methods.split(';')) {
			for (let connect of event.split(',')) {

				if (connect.length !== 2) {
					throw 'error methods and event';
				}

				for (let method of connect[0]) {
					resultMethods.set(method, []);
					for (let listener of connect[1]) {
						resultMethods.get(method).push(listener);
					}
				}

			}
		}

		return resultMethods;
	}

}