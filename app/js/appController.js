import User from './Model/user';
import Company from './Model/company';
import BaseEntity from './Model/baseEntity';

import {EventEmitter} from "./Common/eventEmitter";
import {Cookie} from "./Common/cookie";

import {ModelController} from './modelController.js';
import {ViewController} from './viewController.js';

export class AppController {
  static start() {
  	let observe = new EventEmitter();
    observe.addListener('changeModelUsers', (data) => this.onChangeModelUsers(data));
    observe.addListener('changeModelCompanies', (data) => this.onChangeModelCompanies(data));

  	this.model = new ModelController(observe);
  	this.view = new ViewController(this.model);
    this.model.getUsers();
    this.model.getCompanies();
  }

  static onChangeModelUsers(user) {
    this.view.createRowForUsers(user);
  }

  static onChangeModelCompanies(data) {
    // console.log(data);
  }


}
