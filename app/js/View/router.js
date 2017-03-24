import Parse from './parse';

export default class Routing {
  constructor() {

    this.addEventListener('click', () => {
      console.log('CLICK');
      this.handleClick();  // `this` not shadowed
    });
  }


  static start() {
    let parse = new Parse(document);
    parse.pars();
    this.routing(window.location.pathname);
  }

  static routing(url) {
    switch (url) {
      case '/' :
        console.log(url);
        break;
      case '/content' :
        console.log(url);
        break;
      default :
        console.log('404');

        break;
    }
    window.history.pushState("object or string", url, url);

  }


  static _checkComponent() {

  }


}
