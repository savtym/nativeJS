import {User} from './Model/user.js';
import {Company} from './Model/company.js';
import {BaseEntity} from './Model/baseEntity.js';
import {ModelController} from './modelController.js';
import {ViewController} from './viewController.js';

export class AppController {
  static start() {
  	let model = new ModelController();
  	let view = new ViewController(model);
  	console.log(model.getUsers());
    console.log('test');
  }


}
