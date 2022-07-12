// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.BYTES6Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var BYTES6Type = (function() {
  function BYTES6Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  BYTES6Type.prototype._read = function() {
    this.bytes6 = new Array(6);
    for (var i = 0; i < 6; i++) {
      this.bytes6[i] = this._io.readU1();
    }
  }

  return BYTES6Type;
})();
return BYTES6Type;
}));
