//
// variables.js
//


// common
const router = 'n-href';
const listener = 'n-on:';
const className = 'n-class';
const nameMainContent = 'app-main';
const dynamicallyScript = 'app-script';


// JSON
const JSONIdData = 'data-id';
const JSONTable = 'tableid_';
const JSONList = 'list';
const JSONTitle = 'title';
const JSONSet = 'set';
const JSONEnum = 'enum';
const JSONType = 'type';
const JSONDefault = 'default';


// Observer
const responseToRequest = 'responseToRequest';
const documentIsReady = 'documentIsReady';
const reChangeDomDynamically = 'reChangeDomDynamically';


// Errors (throw message)
const errMethods = 'n-method has problem';


// Urls

const urls = {
  '/': {
    title: 'native',
    component: '/components/dynamic.html'
  }
};


// code status server

const codeStatusServer = {
  '401' : {
    url: '/customer/login-user/'
  },

};



export class Var {

  /*
  *  Common
  */

  static get router() { return router; }
  static get listener() { return listener; }
  static get className() { return className; }
  static get methodsOfClass() { return methodsOfClass; }
  static get nameMainContent() { return nameMainContent; }
  static get dynamicallyScript() { return dynamicallyScript; }


  /*
  * JSON
  */

  static get JSONIdData() { return paramsJSONIdData; }
  static get JSONTable() { return paramsJSONTable; }
  static get paramsJSONList() { return paramsJSONList; }
  static get paramsJSONTitle() { return paramsJSONTitle; }
  static get paramsJSONSet() { return paramsJSONSet; }
  static get paramsJSONEnum() { return paramsJSONEnum; }
  static get paramsJSONType() { return paramsJSONType; }
  static get paramsJSONDefault() { return paramsJSONDefault; }


  /*
  * Observer
  */

  static get responseToRequest() { return responseToRequest; }
  static get documentIsReady() { return documentIsReady; }
  static get reChangeDomDynamically() { return reChangeDomDynamically; }


  /*
    Urls
  */

  static get urls() { return urls };


  /*
      codeStatusServer
  */

  static get codeStatusServer() { return codeStatusServer };
  
}