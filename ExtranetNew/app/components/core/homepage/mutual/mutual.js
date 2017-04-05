
import Native from '/common/native.js';
import dom from './mutual.html!html';


const nameComponent = 'mutual';


export default class Mutual extends Native {

  constructor() {
    super(dom);

    this.select = JSON.stringify({
      id: 'uniqueName',
      name: 'select',
      options: [
        'Тип объекта',
        'Отель',
        'value1sdfsd',
        'value2'
      ],
    });

    this.radio = JSON.stringify({
      inputs: [
        {
          id: 1,
          name: 'name',
          value: 'value',
          text: 'Да'
        },
        {
          id: 2,
          name: 'name',
          value: 'value',
          text: 'Нет'
        }
      ]
    });

  }

  static get nameComponent() {
    return nameComponent;
  }
}