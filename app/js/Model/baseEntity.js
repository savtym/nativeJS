//
// baseEntity.js
//

let CallbackRegistry = {};

export class BaseEntity {
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

  scriptRequest(url, onSuccess, onError) {

	  var scriptOk = false
	  var callbackName = 'cb' + String(Math.random()).slice(-6);
	  url += ~url.indexOf('?') ? '&' : '?';
	  url += 'callback=CallbackRegistry.' + callbackName;
	  CallbackRegistry[callbackName] = function(data) {
	    scriptOk = true;
	    delete CallbackRegistry[callbackName];
	    onSuccess(data);
	  };

	  function checkCallback() {
	    if (scriptOk) return; // сработал обработчик?
	    delete CallbackRegistry[callbackName];
	    onError(url); // нет - вызвать onError
	  }

	  var script = document.createElement('script');

	  script.onreadystatechange = function() {
	    if (this.readyState == 'complete' || this.readyState == 'loaded') {
	      this.onreadystatechange = null;
	      setTimeout(checkCallback, 0);
	    }
	  }
	  script.onload = script.onerror = checkCallback;
	  script.src = url;

	  document.body.appendChild(script);
	}
	
	ok(data) {
	  alert( "Загружен пользователь " + data );
	}

	fail(url) {
	  alert( 'Ошибка при запросе ' + url );
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