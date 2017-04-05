import Parse from '/parse.js';



import {
  App,
  Homepage,
    Rooms

} from './components/index.js';


const urls = {
  '/'            : { title: 'Homepage', component: Homepage },
    '/rooms'      : { title: 'Rooms', component: Homepage }
  // '/content'  : { title: 'content', component: AppHeader },
  // 'undefined' : { title: '404', component: '' }
};

const parse = new Parse(document, App);

export default class Routing {
  constructor() {
  }

  static get parse() {
    return parse;
  }


  static start() {
    this.routing(window.location.pathname);
    window.onpopstate = (url) => {
      this.routing(document.location.pathname);
    };
  }

  static routing(url) {
    (urls[url]) ? this.parse.parsing(urls[url].component) : console.log(urls[url]);
    window.history.pushState(console.log(url), '', url);
    document.title = urls[url].title;

  }



}
