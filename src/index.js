import Native from './libs/native/Native';

import index from './index.html';
import Homepage from './components/core/homepage/homepage';

class App extends HTMLElement {

	render() {
		return {
			'app-homepage' : Homepage
		}
	}
}

Native.render(index, 'app-main', App);
