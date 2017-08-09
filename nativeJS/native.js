//
// native.js
//

let bufData;

export class Native {


  /*
      initialization framework
  */

  static init() {
    Router.init();
  }


  /*
  *   register component
  */

  static component(name = '', url = '') {
      if (typeof url === 'string' && url.startsWith('/')) {
        Router.getComponentByRoute(name, url);
      } else {
      console.error(`Invalid name component: ${ name }`);
    }
  }


  /*
  *   get HTML bu template string
  */

  static getHTMLDom(component, data, parent, isRemove = false) {
    let temp = document.createElement('template');
    let result;

    if (temp.content && this.isElement(component)) {

      try {
        temp.innerHTML = eval('`' + component.innerHTML + '`');
      } catch (e) {
        debugger;
        console.log('%c error in Native.getHTMLDom()! ', 'color: #F44336');
        console.error(component, '\n', data, '\n', e);
      }

      if (this.isElement(parent)) {
        parent.appendChild(temp.content);
        result = parent.lastElementChild;
      } else {
        component.parentElement.appendChild(temp.content);
        result = component.parentElement.lastElementChild;
      }

      if (isRemove) {
        component.parentNode.removeChild(component);
      }

    } else {
      console.error(`It's not dom component: ${ component }`);
    }
    return result;
  }


  /*
  *   go to new component
  */

  static goToLink(url) {
    if (typeof url === 'string') {
      Parse.getComponentByRoute(url);
    } else {
      console.error('Url is don`t string: ', url);
    }
  }


  /*
  *   add parse to Dynamic Component
  */

  static reChangeDomDynamically(component) {
    if (this.isElement(component)) {
      Parse.parsComponents(component);
    } else {
      console.error(`This component is not dom: `, component);
    }
  }


  /*
  *   current Id dynamically page
  */

  static get getIdCurrentPage() {
    return Parse.idCurrentPage;
  }


  /*
   *  get and post request with callback
   *
   *  beforeSend, complete, error, success, onprogress
   *
   */

  static request({
    contentType = 'multipart/form-data',
    method = 'GET',
    processData = true,
    url = null,
    data = null,
    beforeSend = null,
    complete = null,
    error = null,
    success = null,
    onprogress = null } = { url }) {

    let body = ['\r\n'];

    const XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    const xhr = new XHR();

    if (data) {
      method = 'POST';
    }

    if (typeof onprogress === 'function') {
      xhr.onprogress = onprogress;
    }

    xhr.open(method, url, true);

    if (data) {
      let boundary = String(Math.random()).slice(2);
      const boundaryMiddle = '--' + boundary + '\r\n';
      const boundaryLast = '--' + boundary + '--\r\n';

      for (let key in data) {
        body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + data[key] + '\r\n');
      }

      body = body.join(boundaryMiddle) + boundaryLast;
      xhr.setRequestHeader('Content-Type', `${ contentType }; boundary=` + boundary);
    }

    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    if (typeof beforeSend === 'function') {
      beforeSend();
    }

    xhr.send(body);

    xhr.onload = (response) => {

      const codeStatus = response.currentTarget.status;
      let responseText = response.currentTarget.responseText;

      if (processData) {
        try {
          responseText = JSON.parse(responseText);
        } catch(e) {
          console.error(e, responseText);
        }
      }

      if (Var.codeStatusServer[codeStatus]) {
        Observer.emit(`Server: ${ codeStatus }`, response, responseText, url, success);
        return;
      }

      if (typeof success === 'function') {
        success(responseText, url);
      }

      if (typeof complete === 'function') {
        complete();
      }
    };

    xhr.onerror = function (e) {
      if (typeof error === 'function') {
        error(e, url);
      } else {
        console.error(`Error ${ e.target.status } occurred while receiving the document.`);
      }
    };

  }


  /*
  *   Set Value Data By Attribute to Dom
  */

  static setValueDataByAttr(data = {}) {

    ParseJSON.parseDataGet(data['fields'], ParseJSON.setAttrToComponent.bind(ParseJSON));

    let obj = data['form'];
    const element = document.getElementById(obj['id']);

    if (this.isElement(element)) {
      for (let key in obj) {
        element.setAttribute(key, obj[key]);
      }
    }

    obj = data['data'];
    for (let key in obj) {
      ParseJSON.parseDataGet(obj[key], ParseJSON.insertValueToComponent.bind(ParseJSON), '', true);
    }

  }



  /*
   *  returns true if it is a DOM element
  */

  static isElement(obj) {
    return (
      typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
        obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName==="string"
    );
  }


  /*
  *   Find first ancestor by class
  */

  static findAncestorByClass(element, className) {
    if (this.isElement(element) && typeof className === 'string') {
      while (!element.classList.contains(className) && (element = element.parentElement));
    }
    return element;
  }


  /*
   *   set default data for Fields
   */

  static setDefaultFields(component, fields, str = '', isOnlyClass = false) {
    if (this.isElement(component) && fields) {
      ParseJSON.setValue(component, fields, ParseJSON.setAttrToComponent.bind(ParseJSON), (typeof str === 'string') ? str : str.toString(), true, isOnlyClass);
    }
  }


  /*
  *     set form attributes
  */

  static setForm(componentName, attr) {
    const component = document.getElementById(componentName);
    if (component) {
      delete attr.id;
      for (let key in attr) {
        component.setAttribute(key, attr[key]);
      }
    }
  }


  /*
   *   insert data for data
   */

  static insertData(component, data, str = '', isOnlyClass = false) {
    if (this.isElement(component) && data) {
      ParseJSON.setValue(component, data, ParseJSON.insertValueToComponent.bind(ParseJSON), (typeof str === 'string') ? str : str.toString(), false, isOnlyClass);
    }
  }
  
  
  /*
  *     get data after submit form 
  */
  
  static getDataAfterForm() {
    return Parse.getDataAfterForm;
  }


  /*
  *     custom handler
  */

  static customHadlerAfterForm(func) {
    Parse.customHadlerAfterForm(func);
  }


  /*
  *     buf variables
  */

  static bufVariables(data) {
    if (data) {
      bufData = data;
    } else {
      return bufData;
    }
  }


  /*
   *   get data to component
   */

  static getDataAttrToComponent(component) {
    let result = {};
    if (this.isElement(component)) {
      for (let attr in component.attributes) {
        result.attr = component.getAttribute(attr);
      }
    }
    return result;
  }


  /*
  *   set data to component
  */


  static setDataAttrToComponent(component, data = {}) {
    if (this.isElement(component) && data.length !== 0) {
      for (let attr in data) {
        component.setAttribute(`data-${ attr }`, data[attr]);
      }
    }
  }


}
