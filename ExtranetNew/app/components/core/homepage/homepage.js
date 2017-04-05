
import Native from '/common/native.js';
import dom from './homepage.html!html';


const nameComponent = 'homepage';


export default class Homepage extends Native {

  constructor() {
    super(dom);
    this.request('/native.json');


    this.appPageTop = JSON.stringify({
      title: 'Общее описание объекта',
      classButton: '',
      breadcrumbs: {
        steps: [
          {
            classNameStep: 'moderated',
            classNameImg: 'travel-icon-1379',
            textNumber: 'Шаг 1',
            textName: 'Номера'
          },
          {
            classNameStep: 'ready active',
            classNameImg: 'breadcrumb-bed-icon',
            textNumber: 'Шаг 2',
            textName: 'Номера номера'
          }
        ]
      },
      tabsList: {
        list: [
          {
            id: 'mutual',
            text: 'Общее',
            active: true
          },
          {
            id: 'contacts',
            text: 'Контакты'
          },
          {
            id: 'conditions',
            text: 'Условия'
          },
          {
            id: 'services',
            text: 'Удобства и услуги'
          },
          {
            id: 'decor',
            text: 'Оформление объекта'
          }
        ]
      }
    });

  }

  static get nameComponent() {
    return nameComponent;
  }
}