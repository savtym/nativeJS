import {User} from './Model/user.js';
import {Company} from './Model/company.js';
import {BaseEntity} from './Model/baseEntity.js';
import {ModelController} from './modelController.js';
import {ViewController} from './viewController.js';
import {EventEmitter} from "./Model/eventEmitter.js";

export class AppController {
  static start() {
  	let observe = new EventEmitter();
    observe.addListener('changeModelUsers', (data) => this.onChangeModelUsers(data));
    observe.addListener('changeModelCompanies', (data) => this.onChangeModelCompanies(data));

  	this.model = new ModelController(observe);
  	this.view = new ViewController(this.model);
    this.model.getUsers();
    this.model.getCompanies();
    console.log('test');

  }

  static onChangeModelUsers(user) {
    this.view.createRowForUsers(user);
  }

  static onChangeModelCompanies(data) {
    console.log(data);
  }


}
