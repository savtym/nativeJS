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
    const addUsers = (data) => {
      data.forEach((user) => {
        const newUser = new User(
          user.id,
          user.name || user._name,
          user.email || user._email,
          user.username || user._userName,
          user.address,
          user.phone || user._phone,
          user.website || user._website,
          user.companyId || user.company || 0
        );
        this.users.push(newUser);
        this.observe.emit('changeModelUsers', newUser);
      });
    }

    const data = Cookie.getCookies(COOKIE_USERS);

    if (data.length) {
      addUsers(data, this);
    } else {
      this._jsonpGet(GET_USERS_API, addUsers);
    }
  }

  getCompanies() {
    const addCompanies = (data) => {
      data.forEach((company) => {
        const newCompany = new Company(
          company.id,
          company.name,
          company.email,
          company.usersId,
          company.createdAt,
          company.catchPhrase,
          company.bs
        );
        this.companies.push(newCompany);
        this.observe.emit('changeModelCompanies', newCompany);
      });
    }

    this._jsonpGet(GET_COMPANIES_API, addCompanies);
  }

  static get cookieForUsers() {
    return COOKIE_USERS;
  }

  static get cookieForCompanies() {
    return COOKIE_COMPANIES;
  }

  _jsonpGet(url, callback) {
    let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
    let script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }


}
