//
// native.js
//

export default class Native {

  constructor(nameComponent, dom) {
    this.nameComponent = nameComponent;
    this.dom = dom;
  }

  getHTML() {
    let temp = document.createElement('template');
    if (temp.content) {
      temp.innerHTML = eval('`' + this.dom + '`');
    }
    return temp.content;
  }

  _saferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
      let arg = String(arguments[i]);

      s += arg.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      s += templateData[i];
    }
    return s;
  }

  _utilitiesHTML(templateData) {

  }

  _getAllElementsWithAttribute(attribute) {

  }

}
