import Native from './libs/native/Native';

import homepage from './components/core/homepage/homepage.html';

class App extends HTMLElement {
	constructor() {
		super();
		// this.attachShadow({mode: 'open'});
		this.render = homepage;
	}

	connectedCallback() {
		console.log("2132")
		console.log(this.innerHTML)
	}
}

Native.render(App, 'app-main');
