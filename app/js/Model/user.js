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

  get phone() {
  	return this._phone;
  }

  get website() {
  	return this._website;
  }

  set userName(userName) {
  	const regex = /^[a-zA-Z\_.-]+$/;
  	let result = false;
    if (regex.test(userName)) {
    	this._userName = userName;
      result = true;
    }
    return result;
  }

  set phone(phone) {
  	const regex = /^[0-9\-\x(). ]+$/;
  	let result = false;
    if (regex.test(phone)) {
    	this._phone = phone;
      result = true;
    }
    return result;
  }

  set website(website) {
  	const regex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  	let result = false;
    if (regex.test(website)) {
    	this._website = website;
      result = true;
    }
    return result;
  }

}