//
// native.js
//

import Observer from './observer.js';
import Variables from './variables.js';


const utilities = {
  // "#for" : this._forParse,
};

const tabulation = [
  '\t',
  '\n',
  '\r',
  ' '
];


export default class Native {

  constructor(dom, obj) {

    this.dom = dom;
    this.requestOn = false;

    for (let key in obj) {
      this[key] = obj[key];
    }

  }

  getHTML() {
    let temp = document.createElement('template');
    if (temp.content) {
      // for (let i = 0; i < this.dom.length - 2; i++) {
      //   if (this.dom[i] === '#') {
      //     let buf = this.dom[i];
      //     for (let j = i + 1; j < this.dom.length - 2; j++) {
      //       buf += this.dom[j];
            
      //       //call func for lexer/syntax analyze

      //       if (utilities[buf])
      //         debugger;
      //     }
      //   }
      // }

      temp.innerHTML = eval('`' + this.dom + '`');

      /*
       * Call func after parse Dom
      */

      if (this.functions) {
        this.functions.map( (func) => {
          func.call(this, temp.content);
        });
      }

    }
    return temp.content;
  }

  /*
   *  Call name func after parse Dom
  */

  callFuncAfterParseDom(...functions) {
    this.functions = functions;
  }


  /*
   *  Func for render HTML
  */

  _reChangedDomHTML() {
    Observer.emit(Variables.responseToRequest, this);
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

  /* 
   *  get and post request 
  */

  request(url, params, method = 'GET') {
    const XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    const xhr = new XHR();
    xhr.open(method, url, true);
    xhr.send(params);

    this.requestOn = true;

    xhr.onload = (response) => {
      this.response = JSON.parse(response.currentTarget.responseText);
      this._reChangedDomHTML();
    };

    xhr.onerror = function () {
      console.log(`Error API to url ${ url } : ${ this }`);
    };
  }

  requestJSONP(url, callback) {
    let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
    let script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }



  _utilitiesHTML(templateData) {

  }

  _getAllElementsWithAttribute(attribute) {

  }

}
