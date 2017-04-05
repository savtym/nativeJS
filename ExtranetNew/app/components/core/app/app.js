
import Native from '/common/native.js';
import dom from './app.html!html';


const nameComponent = 'app';


export default class App extends Native {

  constructor() {
    super(dom);

    this.title = JSON.stringify({
      books: ['book1', 'book2'],
      autors: ['Mike', 'Jhon']
    });



  }

  static get nameComponent() {
    return nameComponent;
  }
}