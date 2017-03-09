//
// baseEntity.js
//

export default class BaseEntity {
  constructor(email = 'default@gmail.com', name = 'Default', id = 0) {
  	this.id = id;
  	this.name = name;
  	this.email = email;
  }

  get name() {
  	return this._name
  }

  get email() {
  	return this._email;
  }

  set name(name) {
  	const regex = /^[a-zA-Z\-\. ]{6,30}$/;
  	let result = false;
    if (regex.test(name)) {
    	this._name = name;
      result = true;
    }
    return result;
  }

  set email(email) {
  	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	let result = false;
    if (regex.test(email)) {
    	this._email = email;
      result = true;
    }
    return result;
  }

  // get id() {
  // 	return this._id;
  // }

  // set id(id) {
  // 	if (id === 0) {
  // 		this._id = id;
  // 	}
  // }
}