// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.Payload = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var Payload = (function() {
  function Payload(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Payload.prototype._read = function() {
    this.parId = this._io.readU2le();
    this._raw_parData = this._io.readBytes(8);
    var _io__raw_parData = new KaitaiStream(this._raw_parData);
    this.parData = new EmptyType(_io__raw_parData, this, this._root);
  }

  var EmptyType = Payload.EmptyType = (function() {
    function EmptyType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EmptyType.prototype._read = function() {
      this.dummy = this._io.readU1();
    }

    return EmptyType;
  })();
  Object.defineProperty(Payload.prototype, 'payload', {
    get: function() {
      if (this._m_payload !== undefined)
        return this._m_payload;
      var io = this.parData._io;
      var _pos = io.pos;
      io.seek(0);
      this._m_payload = io.readBytes(8);
      io.seek(_pos);
      return this._m_payload;
    }
  });
  Object.defineProperty(Payload.prototype, 'parCmd', {
    get: function() {
      if (this._m_parCmd !== undefined)
        return this._m_parCmd;
      var io = this.parData._io;
      var _pos = io.pos;
      io.seek(6);
      this._m_parCmd = io.readU1();
      io.seek(_pos);
      return this._m_parCmd;
    }
  });
  Object.defineProperty(Payload.prototype, 'parCnt', {
    get: function() {
      if (this._m_parCnt !== undefined)
        return this._m_parCnt;
      var io = this.parData._io;
      var _pos = io.pos;
      io.seek(7);
      this._m_parCnt = io.readU1();
      io.seek(_pos);
      return this._m_parCnt;
    }
  });

  return Payload;
})();
return Payload;
}));
