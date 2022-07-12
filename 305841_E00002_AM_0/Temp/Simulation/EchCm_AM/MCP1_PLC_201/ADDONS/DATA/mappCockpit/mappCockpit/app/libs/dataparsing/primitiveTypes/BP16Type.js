// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.BP16Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var BP16Type = (function() {
  function BP16Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  BP16Type.prototype._read = function() {
    this.bp16 = new Array(2);
    for (var i = 0; i < 2; i++) {
      this.bp16[i] = this._io.readU1();
    }
  }

  return BP16Type;
})();
return BP16Type;
}));
