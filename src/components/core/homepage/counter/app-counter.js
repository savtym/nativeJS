
import html from './app-counter.html';

class Counter extends HTMLElement {

	constructor() {
		super();
		this.state = {
			counter: 0
		}
	}

}

export default {
	html,
	class: Counter
}