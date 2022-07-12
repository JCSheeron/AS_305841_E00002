// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.BP32Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var BP32Type = (function() {
  function BP32Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  BP32Type.prototype._read = function() {
    this.bp32 = new Array(4);
    for (var i = 0; i < 4; i++) {
      this.bp32[i] = this._io.readU1();
    }
  }

  return BP32Type;
})();
return BP32Type;
}));
