import Variables from '/common/variables.js';
import Router from '/router.js';
import Observed from '/common/observer.js';

// import {ModelController} from './js/modelController';
// import {ViewController} from './js/viewController';

export class AppController {

  // static init(settings) {
  //   this.settings = JSON.parse(settings);
  //   this.start();
  // }

  static start() {
    Observed.addListener(Variables.responseToRequest, (component) => this.responseToRequest(component));
    Observed.addListener(Variables.responseToRequest, (component) => this.documentIsReady(component));

    Router.start();

    $(window).resize(() => this.changeMinHeightForContent());


  }


  static responseToRequest(component) {
    // debugger;
    Router.parse.changeDomComponent(component);
  }

  static documentIsReady() {
    // need for style for bootstrap
    $('.styler-component').styler();

    this.changeMinHeightForContent();
  }


  /*
   *  change min-height for content
  */

  static changeMinHeightForContent() {
    $('.content-block-wrapper').css({
      maxHeight: ($(window).height() - $('.c-app-page-top').height() - 110) + 'px'
    });
  }

}
