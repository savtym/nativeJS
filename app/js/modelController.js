import {User} from './Model/user.js';
import {Company} from './Model/company.js';
import {BaseEntity} from "./Model/baseEntity.js";

const GET_USERS_API = 'http://www.mocky.io/v2/58aaea261000003f114b637d';
const GET_COMPANIES_API = 'http://www.mocky.io/v2/58aaf32410000050114b63a6';

export class ModelController {
  constructor(observe) {
    this.users = [];
    this.companies = [];
    this.observe = observe;
  }

  getUsers() {
    this._jsonpGet(GET_USERS_API, this, function(data, self) {
      data.forEach((user) => {
        self.users.push(new User(
          user.id,
          user.name,
          user.email,
          user.username,
          user.address,
          user.phone,
          user.website,
          user.companyId || user.company || 0
        ));
        self.observe.emit('changeModelUsers', self.users[self.users.length - 1]);
      });
    });
  }

  getCompanies() {
    this._jsonpGet(GET_COMPANIES_API, this, function(data, self) {
      data.forEach((company) => {
        self.companies.push(new Company(
          company.id,
          company.name,
          company.email,
          company.usersId,
          company.createdAt,
          company.catchPhrase,
          company.bs
        ));
        self.observe.emit('changeModelCompanies', self.companies[self.companies.length - 1]);
      });
    });
  }

  _jsonpGet(url, self, callback) {
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
