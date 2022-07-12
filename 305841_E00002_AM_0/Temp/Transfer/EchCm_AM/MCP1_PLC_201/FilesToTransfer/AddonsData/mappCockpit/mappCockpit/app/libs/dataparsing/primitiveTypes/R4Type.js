// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.R4Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var R4Type = (function() {
  function R4Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  R4Type.prototype._read = function() {
    this.r4Type = this._io.readF4le();
  }

  return R4Type;
})();
return R4Type;
}));
