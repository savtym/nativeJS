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
  	return this._phone;
  }

  set userName(userName) {
  	debugger
  	const regex = /^[a-zA-Z\-]+$/;
  	let result = false;
    if (regex.test(userName)) {
    	this._userName = userName;
      result = true;
    }
    return result;
  }

  set phone(phone) {
  	const regex = /^[0-9\-\x ]+$/;
  	let result = false;
    if (regex.test(phone)) {
    	this._phone = phone;
      result = true;
    }
    return result;
  }

  set website(website) {
  	const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/;
  	let result = false;
    if (regex.test(website)) {
    	this._website = website;
      result = true;
    }
    return result;
  }

}