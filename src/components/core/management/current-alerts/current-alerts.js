import {Native} from 'native';

export class CurrentAlerts {

  constructor() {
    console.log('Management create!');
    this.counter = '10';

    this.obj = {};
    this.map = new Map();


    this.table = [{
      event: {
        title: 'Signaling channels',
        description: 'Limit reached'
      },
      state: 'Enabled',
      notify: 'SMS',
      fired: 3,
      receivers: 1
    },{
      event: {
        title: 'Signaling channels',
        description: 'Limit reached'
      },
      state: 'Enabled',
      notify: 'SMS',
      fired: 3,
      receivers: 2
    },{
      event: {
        title: 'Signaling channels',
        description: 'Limit reached'
      },
      state: 'Enabled',
      notify: 'SMS',
      fired: 3,
      receivers: 3
    }];


  }

  create() {
    this.table.push({
      event: {
        title: 'New name',
        description: 'desc'
      },
      state: 'Disabled',
      notify: 'Email',
      fired: 0,
      receivers: 0
    });
  }


  func() {
    this.obj.name = 'dsfs';
    this.counter++;
    this.map.set('counter', this.counter);

    // this.table[0] = [];
    // this.table[1] = [];
    this.table.push(0);

    console.log('1');
  }

  allChecked(e) {
    const isChecked = e.target.checked;
    for (let row of this.table) {
      row.isChecked = isChecked;
    }

    this.render('table');
  }

  checkedRow(e, index) {
    this.table[index].isChecked = e.target.checked;
    this.render('table');
  }
}
