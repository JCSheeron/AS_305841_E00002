// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.I2Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var I2Type = (function() {
  function I2Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  I2Type.prototype._read = function() {
    this.i2Type = this._io.readS2le();
  }

  return I2Type;
})();
return I2Type;
}));
