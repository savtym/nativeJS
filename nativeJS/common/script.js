
const scriptIncludes = [];

export class Script {

    static get scriptIncludes() { return scriptIncludes };


    static hasAttr(component) {
        // if tag have a app-script
        component.querySelectorAll(`script[type="${ Var.scriptStandard }"]`).forEach(function(script) {
            if (script.getAttribute('src')) {
              scriptIncludes.push(script.getAttribute('src'));
            } else {
              try {
                new Function('Native', script.innerHTML).call(Native, Native);
              } catch (e) {
                console.error(`\n${ script.outerHTML }\n\n`, e);
              }
            }
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
