// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.STR6Type = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var STR6Type = (function() {
  function STR6Type(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  STR6Type.prototype._read = function() {
    this.str6Type = KaitaiStream.bytesToStr(KaitaiStream.bytesTerminate(this._io.readBytes(6), 0, false), "UTF-8");
  }

  return STR6Type;
})();
return STR6Type;
}));
