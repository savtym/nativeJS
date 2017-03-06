import {User} from './Model/user.js';
import {Company} from './Model/company.js';
import {BaseEntity} from "./Model/baseEntity.js";

const GET_USERS_API = 'http://www.mocky.io/v2/58aaea261000003f114b637d';

export class ModelController {
  constructor() {
    this.users = [];
    this.companies = [];
  }

  getUsers() {
    this.users = this.jsonpGet(GET_USERS_API, this.users, function(data) {
      let users = [];
      data.forEach(function(user) {
        users.push(new User(
          user.id,
          user.name,
          user.email,
          user.userName,
          user.address,
          user.phone,
          user.website,
          user.company
        ));
      });
      return users;
    });
  }

  jsonpGet(url, object, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      object = callback(data);
      debugger;
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }


}
