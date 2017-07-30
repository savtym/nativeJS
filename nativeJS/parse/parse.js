let conuterRequestAPI = 0;
let scriptIncludes = [];
let stateHistoryComponents = [];
let firstComponent;

let dataAfterForm;

export class Parse {

    static init(page = document.body) {
        this.page = page;
        this.mainContent = page.getElementsByTagName(Variables.nameMainContent)[0];
        firstComponent = this.mainContent.innerHTML;
        this.parsComponents(this.page);
        this._documentIsReady(this.page);
    }



    static setStateHistoryComponents() {
        stateHistoryComponents.push(this.mainContent.innerHTML);
    }

    static setMainContent(index = 0) {
        if (index < stateHistoryComponents.length) {
            this.mainContent.innerHTML = stateHistoryComponents[index];
        } else {
            console.log(`don't find component in stateHistory`);
        }
    }

    static setComponent(component, isFirst = false) {
        if (isFirst) {
            this.mainContent.innerHTML = firstComponent;
        } else {
            this.mainContent.innerHTML = component;
        }
    }


    static parsComponents(componentDom) {

        // if tag have a link to router
        this._routerLink(componentDom);

        // for form TODO: need refactoring
        componentDom.querySelectorAll(`${ Variables.nameForm }`).forEach((component) => {
            const self = this;
            component.onsubmit = function() {

                saveForm(this, (data, form) => {
                    let result = true;
                    dataAfterForm = data;

                    if (customHadlerAfterForm) {
                        result = customHadlerAfterForm(data, form);
                    }

                    if (result) {
                        const url = form.getAttribute(Variables.routerHref);

                        if (url) {
                            Native.request(url, (component) => {
                                self._changeComponentDom(component);
                                Router.routing(url);
                            });
                        }
                    }

                }, () => { alert('Произошла ошибка, повторите попытку') });

                return false;
            };
        });

        // if tag have a app-script
        componentDom.querySelectorAll(Variables.dynamicallyScript).forEach((scriptComponent) => {
            scriptIncludes.push(scriptComponent.getAttribute('src'));
        });


        // if tag have a link to API GET request
        this._APIGetRequest(componentDom);

        // if tag have a link to API POST request
        this._APIPostRequest(componentDom);

    }

    /*
     *   get component by route
     */

    static getComponentByRoute(url) {

        if (url.startsWith('/')) {
            Native.request(url, (component) => {
                this._changeComponentDom(component);
                Router.routing(url);
            });
        }
    }



    /*
     *    change Component dynamically
     */

    static _changeComponentDom(component) {
        conuterRequestAPI = 0;
        this.mainContent.innerHTML = component;
        // stateHistoryComponents.push(this.mainContent.innerHTML);
        this.parsComponents(this.mainContent);
        this._documentIsReady(this.mainContent);
    };


    /*
     *   parse Router link for dynamically component
     */

    static _routerLink(componentDom) {
        componentDom.querySelectorAll(`[${ Variables.routerAttr }]`).forEach((component) => {
            const self = this;
            component.onclick = function() {

                if (this.hasAttribute(Variables.paramsJSONId)) {
                    idCurrentPage = this.getAttribute(Variables.paramsJSONId);
                }

                self.getComponentByRoute(this.getAttribute(Variables.routerHref));

                return false;
            };
        });
    }


    /*
     *   parse API get request by tag 'data-api-get'
     */

    static _APIGetRequest(componentDom) {
        componentDom.querySelectorAll(`[${ Variables.routerAPIGET }]`).forEach((component) => {

            ++conuterRequestAPI;

            let src = component.getAttribute(Variables.routerAPIGET);

            if (idCurrentPage) {
                src += '?id=' + idCurrentPage;
            }

            Native.request(src, (response) => {
                Native.setValueDataByAttr(Native.jsonParse(response));
                --conuterRequestAPI;
                this._documentIsReady(component);
            });

            component.removeAttribute(Variables.routerAPIGET);

        });
    }



    /*
     *   parse API post request by tag 'data-api-post'
     */

    static _APIPostRequest(componentDom) {
        componentDom.querySelectorAll(`[${ Variables.routerAPIPOST }]`).forEach((component) => {

            ++conuterRequestAPI;

            let data = {};

            if (idCurrentPage) {
                data.id = idCurrentPage
            }

            Native.request(component.getAttribute(Variables.routerAPIPOST), (response) => {
                Native.setValueDataByAttr(Native.jsonParse(response));
                --conuterRequestAPI;
                this._documentIsReady(component);
            }, data);

            component.removeAttribute(Variables.routerAPIPOST);

        });
    }


    /*
     *   import script dynamically
     */

    static _importScript(component) {
        let scriptsComponent = [];

        component.querySelectorAll(Variables.dynamicallyScript).forEach((dom) => {
            scriptsComponent.push(dom.getAttribute('src'));
        });

        for (let script of scriptIncludes) {
            const normalized = System.normalizeSync(script);
            if (System.has(normalized) && scriptsComponent.includes(script)) {
                System.delete(normalized);
            }
            System.import(script);
        }
    }

    static _documentIsReady(component) {
        if (conuterRequestAPI === 0) {
            Observer.emit(Variables.documentIsReady, component);
            this._importScript(component);
        }
    }


}