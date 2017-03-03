//
// company.js
//

import {BaseEntity} from "./baseEntity.js";

export class Company extends BaseEntity {
  constructor(id, name, email) {
  	super(email, name, id);
  }
}