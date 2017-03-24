import {EventEmitter} from "./js/Common/eventEmitter";
import {Cookie} from "./js/Common/cookie";
import Router from './js/View/router';

// import {ModelController} from './js/modelController';
// import {ViewController} from './js/viewController';


export class AppController {

  static init(settings) {
    debugger;
    this.settings = JSON.parse(settings);
    this.start();
  }

  static start() {
  	let observe = new EventEmitter();
    observe.addListener('changeModelUsers', (data) => this.onChangeModelUsers(data));
    observe.addListener('changeModelCompanies', (data) => this.onChangeModelCompanies(data));

    Router.start();

    // this.model = new ModelController(observe);
    // this.view = new ViewController(this.model);
    // this.model.getUsers();
    // this.model.getCompanies();
  }

  static onChangeModelUsers(user) {
    this.view.createRowForUsers(user);
    Cookie.setCookie(this.model.cookieForUsers, user);
  }

  static onChangeModelCompanies(data) {
    console.log(data);
  }

  static _parsingSettings(path) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onreadystatechange = (data) => {
      debugger
    };
    xhr.send();
  }

}
