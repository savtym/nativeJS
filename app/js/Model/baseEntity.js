//
// baseEntity.js
//

export class BaseEntity {
  constructor(email = 'default@gmail.com', name = 'Default', id = 0) {
  	this.id = id;
  	this.name = name;
  	this.email = email;
  }

  get name() {
  	return this._name
  }

  set name(name) {
  	const regex = /^[a-zA-Z ]{2,30}$/;
  	let result = false;
    if (regex.test(name)) {
    	this._name = name;
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