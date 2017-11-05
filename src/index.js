import Native from './libs/native/Native';

import homepage from './components/core/homepage/homepage.html';

class App extends HTMLElement {
	constructor() {
		super();
		this.counter = 10
		// this.attachShadow({mode: 'open'});
	}

	connectedWillCallback() {
		console.log('connectedWillCallback');
	}

	connectedCallback() {
		console.log('connectedCallback');
	}

	disconnectedCallback() {
		console.log('disconnectedCallback');
	}

	attributeChangedCallback(name, prevValue, newValue, namespace) {
		console.log(`attributeChangedCallback(${name}, ${prevValue}, ${newValue}, ${namespace})`);
	}

	adoptedCallback(oldDocument, newDocument) {
		console.log(`adoptedCallback(${oldDocument}, ${newDocument})`)
	}

	func() {
		console.log("qwertyuiop")
	}

}

Native.render(homepage, 'app-main', App);
