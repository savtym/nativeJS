
class AttrParse {

  constructor(cls, tag, name, attr) {
    const prop = attr.trim();
    const hash = Virtual.hashCode(cls.name+prop).toString();
    const hashTmp = Virtual.hashCode(new Date.toString()).toString();

    const tmp = `${tag.replace(/\$\{([^\}]*)\}/g, (_, str) => `\$\{${ str }\}`)} n-hash='${hash}:${hashTmp}'`;

    this._prop = prop;
    this._cls = cls;
    this._name = name;
    this._hash = hash;
    this._hashTmp = hashTmp;
    this._tmp = tmp;
    this._oldVal = cls[name];
  }

  changeTmp(dom) {
    const curAttr = this.getAttribute(this._name);
    dom.setAttribute(this._name, curAttr.replace(this._oldVal, this.cls[this.prop]));
    this._oldVal = this.cls[this.prop];
  }





  addData(data) {

  }

  updateData(data) {

  }

  deleteData(data) {

  }



  get prop() { return this._prop };
  get cls() { return this._cls };
  get tmp() { return this._tmp; }
  get hash() { return this._hash; }
  get hashTmp() { return this._hashTmp; }
  static get regex() { return '\\<[^\\>\\<]+[\\s]+([\\w]+)=[\\"\']{1}[^\\"\']*\\$\\{([^\\}]*)\\}[^\\>]+'; }
}