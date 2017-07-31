
const scriptIncludes = [];

export class Script {

    static get scriptIncludes() { return scriptIncludes };


    static hasAttr(component) {
        // if tag have a app-script
        component.querySelectorAll(Var.dynamicallyScript).forEach((scriptComponent) => {
            scriptIncludes.push(scriptComponent.getAttribute('src'));
        });
    }



     /*
     *   import script dynamically
     */

    static importScript(component) {
        let scriptsComponent = [];

        component.querySelectorAll(Var.dynamicallyScript).forEach((dom) => {
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
}
