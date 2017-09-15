
class PropParse {

  constructor(cls, str) {
    const prop = str.trim();
    const hash = Virtual.hashCode(cls.name+prop).toString();
    const tmp = `\$\{${ prop }\}`;
    const hashTmp = Virtual.hashCode(tmp).toString();

    this._changeTmp = tmp;
    this._prop = prop;
    this._cls = cls;
    this._hash = hash;
    this._hashTmp = hashTmp;
    this._tmp = new Function('',`return \`<property n-hash='${hash}:${hashTmp}'>${tmp}</property>\``);
  }

  changeTmp(dom) {
    dom.innerHTML = new Function('', `return \`${this._changeTmp}\``).call(this.cls);
  }



  addData(data) {

  }

  updateData(data) {

  }

  deleteData(data) {

  }



  get prop() { return this._prop };
  get cls() { return this._cls };
  get tmp() { return this._tmp.call(this.cls, this.cls) }
  get hash() { return this._hash; }
  get hashTmp() { return this._hashTmp; }

  static get regex() { return '\\>*\\$\\{([^\\}]*)\\}'; }
}