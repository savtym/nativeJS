import Content from './content/app-content';
import Counter from './counter/app-counter';
import homepage from './homepage.html';

class Homepage extends HTMLElement {

	constructor() {
		super();
		this.data = [];

		// const start = Date.now();
		// let str = '';
		for (let i =0;i< 30000; i++) {
			this.data.push(i)
			// str += `qwertyjhsdfghdhj ${this.data} dsgd`;
		}
		// const end = performance.now() - start;
		// console.log(end);



		this.state = {
			counter: 0
		}
	}

	handleHover(e) {
		// console.log(++this.counter);
		// console.log(this.childrenComponents);
		// this.setState({counter: e.target.dataset.index});
		const k = this.childrenComponents.filter((a) => a.tagName === 'APP-COUNTER');
		k[0].setState({ counter: e.target.dataset.index });
	}


	render() {
		return {
			'app-content' : Content,
			'app-counter': Counter
		}
	}
}

export default {
	html: homepage,
	class: Homepage
};