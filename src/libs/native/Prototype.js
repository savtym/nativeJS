import Native from './Native';
import cache from './Cache';

class Prototype {

	static init(cls) {
		const connectedCallback = cls.prototype.connectedCallback;
		const disconnectedCallback = cls.prototype.disconnectedCallback;


		cls.prototype.connectedCallback = function() {
			!this.connectedWillCallback || this.connectedWillCallback();
			const shadow = cache[this.tagName].html(this);
			Prototype._children(this, shadow);
			!connectedCallback || connectedCallback.call(this);
		};

		cls.prototype.disconnectedCallback = function() {
			!disconnectedCallback || disconnectedCallback.call(this);
		};

		cls.prototype.setState = Prototype.setState;

	}

	static setState(obj) {
		setTimeout((obj) => {
			for (let key in obj) {
				this.state[key] = obj[key];
			}
			cache[this.tagName].render();
		},0, obj)
	}

	static _children(parent, dom) {
		const components = (parent.render) ? parent.render() : {};
		for (let name in components) {
			dom.querySelectorAll(name).forEach(() => {
				Native.render(components[name].html, name, components[name].class);
			});
		}
	}
}

export {Prototype};