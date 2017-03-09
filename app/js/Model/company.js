//
// company.js
//

import BaseEntity from "./baseEntity";

export default class Company extends BaseEntity {
  constructor(id, name, email, usersId, createdAt, catchPhrase, bs) {
  	super(email, name, id);
  	this.usersId = usersId;
  	this.createdAt = createdAt;
  	this.catchPhrase = catchPhrase;
  	this.bs = bs;

  }
}