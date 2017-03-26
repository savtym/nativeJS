import Parse from './parse';



import { 
  Content,
  Homepage
} from '../../components/index.js';


const urls = {
  '/'         : { title: 'Homepage', component: Homepage },
  '/content'  : { title: 'content', component: Content  },
  'undefined' : { title: '404', component: '' }
};

export default class Routing {
  constructor() {
  }


  static start() {
    this.parse = new Parse(document);
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


  static _checkComponent() {

  }


}
