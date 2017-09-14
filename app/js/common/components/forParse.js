
class ForParse {

  constructor(cls, head, body) {
    const hash = Virtual.hashCode(cls.name+head).toString();

    head = head.replace(/this.([\w]*)/, (_, match) => {
      this._prop = match;
      return `map.${match}`
    });

    const tmp = `\$\{[''].map(()=>\{let str='';${head}\{str+=\`${body}\`\};return str;\})\}`;
    const hashTmp = Virtual.hashCode(tmp).toString();

    this._type = typeof(cls[this.prop]);
    this._changeTmp = tmp;
    this._cls = cls;
    this._hash = hash;
    this._hashTmp = hashTmp;
    this._tmp = new Function('map', `return \`${tmp}\``);
  }

  observe(changes) {
    for (let change of changes) {
      this[change.type+'Data'](change);
    }
  }

  addData(data) {
    const tmp = document.createElement('template');
    tmp.innerHTML = this._tmp.call(this.cls, { [this.prop]:[this.cls[this.prop][data.name]] });

    const methods = Virtual.parseMethods(tmp.content, this.cls);
    this.methods = this.methods.concat(methods);

    Virtual.eventListener(methods);
    this.parent.append(tmp.content);
  }

  updateData(data) {
    // debugger
    // if (data.)
  }

  deleteData(data) {

  }






  get tmp() {
    this._cloneTmp = this._tmp.call(this.cls, this.cls);
    return this._cloneTmp;
  }

  get type() { return this._type; }
  get prop() { return this._prop; }
  get cls() { return this._cls; }
  get hash() { return this._hash; }
  get hashTmp() { return this._hashTmp; }
  static get regex() { return '\\$\\{([ \\t]*[for]+\\s.+)\\}([^]*)\\$\\{[ \\t]*endfor[ \\t]*\\}'; }
}