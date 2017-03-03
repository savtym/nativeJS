//
// user.js
//

import {BaseEntity} from "./baseEntity.js";

export class User extends BaseEntity {
  constructor(id, name, email, userName, address, phone, website, company) {
  	super(email, name, id);
  	this.userName = userName;
  	this.address = address;
  	this.phone = phone;
  	this.website = website;
  	this.company = company;
  }

  get userName() {
  	return this._userName;
  }

  get email() {
  	return this._email;
  }

  set userName(userName) {
  	const regex = /^[a-zA-Z\-]+$/;
  	let result = false;
    if (regex.test(userName)) {
    	this._userName = userName;
      result = true;
    }
    return result;
  }

  set email(email) {
  	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	let result = false;
    if (regex.test(userName)) {
    	this._userName = userName;
      result = true;
    }
    return result;
  }

}