import {User} from './Model/user.js';
import {Company} from './Model/company.js';

import {BaseEntity} from "./Model/baseEntity.js";
const GET_USERS_API = 'http://www.mocky.io/v2/58aaea261000003f114b637d';

export class AppController {
  constructor() {
  	this.users = [];
  	this.companies = [];
  }

  getUsers() {
    return true;
  }

}
