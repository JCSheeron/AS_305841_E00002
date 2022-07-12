// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.I4Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var I4Type = (function() {
  function I4Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  I4Type.prototype._read = function() {
    this.i4Type = this._io.readS4le();
  }

  return I4Type;
})();
return I4Type;
}));
