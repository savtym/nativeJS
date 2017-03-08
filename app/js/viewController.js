import {BaseEntity} from './Model/baseEntity.js'
import {User} from './Model/user.js'
import {Company} from './Model/company.js'
import {AppController} from './modelController.js';


const domUsers = document.getElementsByClassName('users');
const domCompanies = document.getElementsByClassName('companies');

export class ViewController {
  constructor(model) {
  	this.model = model;

  }

  createRowForUsers(user) {
  	const table = domUsers[0].getElementsByTagName('tbody');
  	const tr = document.createElement('tr');
  	for (let value in user) {
			const td = document.createElement('td');
  		if (value !== 'id') {
  			if (value === 'address') {
  				const tbl = document.createElement('table');
  				const tbdy = document.createElement('tbody');
		  		const address = user[value];
			  	for (let valueAddr in address) {
		  			const trAddr = document.createElement('tr');
		  			let tdAddr = document.createElement('td');
		  			tdAddr.innerHTML = `${valueAddr}:`;
	  				trAddr.appendChild(tdAddr);
		  			tdAddr = document.createElement('td');
		  			tdAddr.innerHTML = address[valueAddr];
	  				trAddr.appendChild(tdAddr);
    				tbdy.appendChild(trAddr);
		  		}
    			tbl.appendChild(tbdy);
	  			td.appendChild(tbl);
  			} else {
	  			td.innerHTML = user[value];
  			}
  			tr.appendChild(td);
  		} else {
  			td.innerHTML = this.getLengthRow(domUsers[0]);
  			tr.appendChild(td);
  		} 
  	}
		table[0].appendChild(tr);
  }

  getLengthRow(dom) {
  	return (dom.getElementsByTagName('tbody')[0].children.length + 1);
  }
}