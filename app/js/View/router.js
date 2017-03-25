import Parse from './parse';



import { 
  Content,
  Homepage
} from '../../components/index.js';


const urls = {
  '/'         : Homepage,
  '/content'  : Content,
  'undefined' : '404'
};

export default class Routing {
  constructor() {

    this.addEventListener('click', () => {
      console.log('CLICK');
      this.handleClick();  // `this` not shadowed
    });
  }


  static start() {
    this.parse = new Parse(document);
    this.routing(window.location.pathname);
  }

  static routing(url) {
    (urls[url]) ? this.parse.parsing(urls[url]) : console.log(urls[url]);;
    window.history.pushState("object or string", url, url);

  }


  static _checkComponent() {

  }


}
