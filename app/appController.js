import {EventEmitter} from "Common/eventEmitter";
import {Cookie} from "Common/cookie";

import {ModelController} from 'modelController.js';
import {ViewController} from './viewController.js';

import Component from './View/parse';

export class AppController {
  static start() {
  	let observe = new EventEmitter();
    observe.addListener('changeModelUsers', (data) => this.onChangeModelUsers(data));
    observe.addListener('changeModelCompanies', (data) => this.onChangeModelCompanies(data));

    let component = new Component(document);
    component.pars();

  	this.model = new ModelController(observe);
  	this.view = new ViewController(this.model);
    this.model.getUsers();
    this.model.getCompanies();
  }

  static onChangeModelUsers(user) {
    this.view.createRowForUsers(user);
    Cookie.setCookie(this.model.cookieForUsers, user);
  }

  static onChangeModelCompanies(data) {
    console.log(data);
  }


}
