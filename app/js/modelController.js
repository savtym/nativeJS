import User from './Model/user';
import Company from './Model/company';
import BaseEntity from "./Model/baseEntity";

import {Cookie} from "./Common/cookie";

const GET_USERS_API = 'http://www.mocky.io/v2/58aaea261000003f114b637d';
const GET_COMPANIES_API = 'http://www.mocky.io/v2/58aaf32410000050114b63a6';
const COOKIE_USERS = 'users';
const COOKIE_COMPANIES = 'companies';

export class ModelController {
  constructor(observe) {
    this.users = [];
    this.companies = [];
    this.observe = observe;
  }

  getUsers() {
    let data = Cookie.getCookies(COOKIE_USERS);
    if (data.length === 0) {
      this._jsonpGet(GET_USERS_API, this, COOKIE_USERS, addUsers);
    } else {
      addUsers(data, this);
    }

    function addUsers(data, self) {
      data.forEach((user) => {
        self.users.push(new User(
          user.id,
          user.name || user._name,
          user.email || user._email,
          user.username || user._userName,
          user.address,
          user.phone || user._phone,
          user.website || user._website,
          user.companyId || user.company || 0
        ));
        self.observe.emit('changeModelUsers', self.users[self.users.length - 1]);
      });
    }

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

  _jsonpGet(url, self, cookieName, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data, self);
      Cookie.setCookie(cookieName);
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }


}
