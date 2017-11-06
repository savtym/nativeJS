import Content from './content/app-content';
import homepage from './homepage.html';

class Homepage extends HTMLElement {

	constructor() {
		super();
		this.data = [];

		for (let i =0;i< 3; i++) {
			this.data.push(i)
		}

		this.state = {
			counter: 0
		}
	}

	handleHover(e) {
		// console.log(++this.counter);
		this.setState({counter: e.target.dataset.index});
		console.log(this.state)
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

	render() {
		return {
			'app-content' : Content
		}
	}
}

export default {
	html: homepage,
	class: Homepage
};