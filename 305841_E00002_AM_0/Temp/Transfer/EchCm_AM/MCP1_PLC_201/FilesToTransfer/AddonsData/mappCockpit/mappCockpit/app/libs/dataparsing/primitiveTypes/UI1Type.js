// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../kaitai-struct/KaitaiStream'));
  } else {
    root.UI1Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var UI1Type = (function() {
  function UI1Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  UI1Type.prototype._read = function() {
    this.ui1Type = this._io.readU1();
  }

  return UI1Type;
})();
return UI1Type;
}));
