// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.I1Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var I1Type = (function() {
  function I1Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  I1Type.prototype._read = function() {
    this.i1Type = this._io.readS1();
  }

  return I1Type;
})();
return I1Type;
}));
