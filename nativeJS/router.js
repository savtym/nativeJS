
let currentLink = '';

export class Router {

  static init() {

    this.urls = Var.urls;

    const url = this.urls[window.location.pathname];

    if (url && url.component) {
    	Native.request({
    		url: url.component,
        processData: false,
        success: (response) => {
          Parse.init(response);
        }
			});
    } else {
    	Parse.init();
    }

    this.routing(url, true);

    // window.onpopstate = (obj) => {
			// Parse.setStateHistoryComponents();
			// if (obj && obj.state) {
			// 	Parse.setComponent(obj.state.component);
			// } else {
			// 	Parse.setComponent('', true);
			// }
			// this.routing(document.location.pathname, true);
			// Observer.emit(Var.documentIsReady);
    // };

  }

  static routing(url, isHistoryBack = false) {

    if (url !== currentLink) {

			currentLink = url;
			const curURL = this.urls[url];
			if (curURL) {
				document.title = curURL.title;
				console.log(curURL);
			} else {
				console.log('/404');
			}

			if (!isHistoryBack) {
				history.pushState({ url: url, component: Parse.mainContent.innerHTML }, '', url);
			}

    }
  }


	/*
	 *   parse Router link for dynamically component
	 */

	static routerLink(componentDom) {
		componentDom.querySelectorAll(`[${ Var.routerAttr }]`).forEach((component) => {
			component.onclick = function(e) {
				e.preventDefault();
				Router.getComponentByRoute(this.getAttribute('href'));
			};
		});
	}

	/*
	 *   get component by route
	 */

  static getComponentByRoute(name, url) {
    if (url.startsWith('/')) {

    	if (Parse.cache[url]) {
        Parse.setComponent(name, Parse.cache[url]);
			} else {
        Native.request({
          url: url,
          processData: false,
          success: (component) => {
            Parse.setComponent(name, url, component);
            Router.routing(url);
          }
        });
			}

    }
  }

}
