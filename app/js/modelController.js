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
    this.jsonpGet(GET_USERS_API, this, function(data, self) {
      data.forEach((user) => {
        self.users.push(new User(
          user.id,
          user.name,
          user.email,
          user.username,
          user.address,
          user.phone,
          user.website,
          user.company
        ));
      });
      console.log(self);
    });
  }

  jsonpGet(url, self, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data, self);
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }


}
