// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.R8Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var R8Type = (function() {
  function R8Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  R8Type.prototype._read = function() {
    this.r8Type = this._io.readF8le();
  }

  return R8Type;
})();
return R8Type;
}));
