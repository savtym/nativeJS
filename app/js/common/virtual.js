
const html = (function(){
  const cache = {};
  const regParse = new RegExp(`${ForParse.regex}|${AttrParse.regex}|${PropParse.regex}`, 'g');

  function generateTemplate(template){
    let fn = cache[template];

    if (!fn) {
      // Replace ${expressions} (etc) with ${map.expressions}. //
      const sanitized = template
        .replace(regParse, (all, head, body, attrName, attr,  prop) => {

          let parse;

          if (prop) {
            parse = new PropParse(this.cls, prop);
          } else if (attrName && attr) {
            parse = new AttrParse(this.cls, all, attrName, attr);
          } else if (head && body) {
            parse = new ForParse(this.cls, head, body);
          }

          if (!this.properties[parse.prop]) {
            this.properties[parse.prop] = {
              tmp: new Map()
            };
          }

          this.properties[parse.prop].hash = [parse.hash];
          this.properties[parse.prop].tmp.set(parse.hashTmp, parse);

          return `<property n-hash="${parse.hash}:${parse.hashTmp}"></property>`;
        });

      fn = new Function('', `return \`${sanitized}\``);

      cache[template] = fn;
      
    }
    return fn;
  }

  return generateTemplate;
})();


class Virtual {

	constructor(tmp, cls) {
		this.tmp = tmp;
		this.cls = cls;
	}


	init(parent, isClass) {

    this.parent = parent;

		if (isClass) {

		  this.properties = {};

      this.cls = new this.cls(Native);
      this.tmp = html.call(this, this.tmp);

      const obj = {};
      const args = Object.getOwnPropertyNames(this.cls);

      for (let key of args) {
        obj[key] = this.cls[key];

        if (!this.properties[key]) continue;

        if (typeof(this.cls[key]) === 'object') {

          const func = (Array.isArray(this.cls[key])) ? Array : Object;
          // const func = this.cls[key];
          //
          // if (Array.isArray(this.cls[key])) {
          //   func.push = (e) => {
          //     debugger;
          //   };
          // }

          func.observe(this.cls[key], (changes) => {
            console.log(changes);
            for (let [, parse] of this.properties[key].tmp) {
              parse.observe(changes);
            }
          });

        }

        const prop = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.cls), key);

        Object.defineProperty(this.cls, key, {
          enumerable: true,
          configurable: true,
          get: () => {
            if (prop && prop.get) {
              return prop.get.call(this.cls);
            }
            return obj[key];
          },
          set: (val) => {
            if (prop && prop.set) {
              prop.set.call(this.cls, val);
            } else if (prop && prop.get) {
              console.error("don't writable", key);
            }

            obj[key] = (prop && prop.get) ? prop.get.call(this.cls) : val;

            this.cls.render(key);
          }
        });




      }

      this.cls.render = this.render.bind(this);

      const template = document.createElement('template');
      template.innerHTML = this.tmp.call(this.cls);

      this.methods = Virtual.parseMethods(template.content, this.cls);

      for (let prop in this.properties) {

        template.content.querySelectorAll(`property[n-hash^="${ this.properties[prop].hash }:"]`).forEach((dom) => {
          const hashTmp = dom.getAttribute('n-hash').replace(this.properties[prop].hash+':', '');

          const parent = dom.parentElement;
          const parse = this.properties[prop].tmp.get(hashTmp);
          parse.parent = parent;

          const propTmp = document.createElement('template');
          propTmp.innerHTML = parse.tmp;

          parse.methods = Virtual.parseMethods(propTmp.content, this.cls);
          parent.replaceChild(propTmp.content, dom);
        });
      }

      this.parent.appendChild(template.content);
      Virtual.eventListener(this.methods);

      for (let key in this.properties) {
        for (let [, parse] of this.properties[key].tmp) {
          Virtual.eventListener(parse.methods);
        }
      }

		} else if (this.cls) {
      this.parent.innerHTML = this.tmp;
			new this.cls(Native);
		} else {
      this.parent.innerHTML = this.tmp;
		}

	}


	render(key) {

	  if (!this.properties[key]) return;

    for (let [, parse] of this.properties[key].tmp) {
      Virtual.eventListener(parse.methods, false);
      parse.parent.innerHTML = parse.tmp;
      Virtual.eventListener(parse.methods);
    }
  }


  destructor() {
    Virtual.eventListener(this.methods, false);
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


	/*
			parse methods
	*/

	static parseMethods(el, cls) {

		const result = [];

		el.querySelectorAll('*').forEach(function(dom) {

    	for (let attr of dom.attributes) {

    		if (attr.name.startsWith(Var.listener)) {

					const args = attr.value.split(',').map(str => str.trim());
					let funcName = args.shift();
          let func;

					if (cls && cls[funcName]) {
						func = (e) => {
						  cls[funcName].call(cls, e, ...args);
            }
					} else {
						func = new Function('Native', attr.value).bind(Native);
					}

					result.push(new Map([[attr.name.replace(Var.listener, ''), { func: func, dom: dom }]]));
    			break;
    		}

    	}

    });

		return result;
	}


	static hashCode(str) {
    let hash = 0;
    str = (typeof str === 'string') ? str : str.toString();

    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

}