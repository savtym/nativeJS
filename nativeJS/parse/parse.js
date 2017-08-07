let conuterRequestAPI = 0;
let stateHistoryComponents = [];
let firstComponent;

let dataAfterForm;

const virtuals = [];

export class Parse {

    static init(component) {
        this.page = document.body;
        this.mainContent = this.page.getElementsByTagName(Var.nameMainContent)[0];

        if (!this.mainContent) {
            throw `not found <${ Var.nameMainContent }>`;
        }
        // firstComponent = this.mainContent.innerHTML;

        if (component) {
            conuterRequestAPI = 0;
            this.mainContent.innerHTML = component;
        }

        this.parsComponents(this.page);
        this._documentIsReady(this.page);
    }



    // static setStateHistoryComponents() {
    //     stateHistoryComponents.push(this.mainContent.innerHTML);
    // }

    // static setMainContent(index = 0) {
    //     if (index < stateHistoryComponents.length) {
    //         this.mainContent.innerHTML = stateHistoryComponents[index];
    //     } else {
    //         console.log(`don't find component in stateHistory`);
    //     }
    // }

    static setComponent(component, isFirst = false) {
        if (isFirst) {
            this.mainContent.innerHTML = firstComponent;
        } else {
            this.mainContent.innerHTML = component;
        }
    }


    static parsComponents(componentDom) {

        // if tag have a link to router
        Router.routerLink(componentDom);

        // for form TODO: need refactoring
        componentDom.querySelectorAll('form').forEach((component) => {
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

        Script.hasAttr(componentDom);

        // n-class
        this.getNClass(componentDom);

    }


    /*
        get n-class
    */

    static getNClass(componentDom) {
        componentDom.querySelectorAll(`[${ Var.className }]`).forEach((component) => {
            const className = component.getAttribute(Var.className);
            virtuals.push(new Virtual(component, className));
        });
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





   

    static _documentIsReady(component) {
        if (conuterRequestAPI === 0) {
            Observer.emit(Var.documentIsReady, component);
            Script.importScript(component);

            for (let virtual of virtuals) {
                Virtual.eventListener(virtual.el, virtual.methods);
            }
        }
    }


}