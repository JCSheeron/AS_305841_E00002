// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.UI4Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var UI4Type = (function() {
  function UI4Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  UI4Type.prototype._read = function() {
    this.ui4Type = this._io.readU4le();
  }

  return UI4Type;
})();
return UI4Type;
}));
