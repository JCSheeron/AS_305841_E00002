// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.BrModSDM = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var BrModSDM = (function() {
  function BrModSDM(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  BrModSDM.prototype._read = function() {
    this.dummy1 = this._io.readBytes(2);
    this.mModType = this._io.readBytes(1);
    if (!((KaitaiStream.byteArrayCompare(this.mModType, [70]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([70], this.mModType, this._io, "/seq/1");
    }
    this.dummy2 = this._io.readBytes(10);
    this.mNSection = this._io.readBytes(1);
    if (!((KaitaiStream.byteArrayCompare(this.mNSection, [6]) == 0))) {
      throw new KaitaiStream.ValidationNotEqualError([6], this.mNSection, this._io, "/seq/3");
    }
    this.dummy3 = this._io.readBytes(26);
    this.secOffsets = new SecOffsetsType(this._io, this, this._root);
  }

  var SecOffsetsType = BrModSDM.SecOffsetsType = (function() {
    function SecOffsetsType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SecOffsetsType.prototype._read = function() {
      this.arr = new Array(5);
      for (var i = 0; i < 5; i++) {
        this.arr[i] = this._io.readU4be();
      }
    }

    return SecOffsetsType;
  })();
  Object.defineProperty(BrModSDM.prototype, 'mTrcBinDat01', {
    get: function() {
      if (this._m_mTrcBinDat01 !== undefined)
        return this._m_mTrcBinDat01;
      var _pos = this._io.pos;
      this._io.seek(this._root.secOffsets.arr[0]);
      this._m_mTrcBinDat01 = this._io.readBytes((this._root.secOffsets.arr[1] - this._root.secOffsets.arr[0]));
      this._io.seek(_pos);
      return this._m_mTrcBinDat01;
    }
  });
  Object.defineProperty(BrModSDM.prototype, 'mappMotionArConfig', {
    get: function() {
      if (this._m_mappMotionArConfig !== undefined)
        return this._m_mappMotionArConfig;
      var _pos = this._io.pos;
      this._io.seek(this._root.secOffsets.arr[1]);
      this._m_mappMotionArConfig = KaitaiStream.bytesToStr(this._io.readBytes((this._root.secOffsets.arr[2] - this._root.secOffsets.arr[1])), "UTF-8");
      this._io.seek(_pos);
      return this._m_mappMotionArConfig;
    }
  });
  Object.defineProperty(BrModSDM.prototype, 'acoposParIDs', {
    get: function() {
      if (this._m_acoposParIDs !== undefined)
        return this._m_acoposParIDs;
      var _pos = this._io.pos;
      this._io.seek(this._root.secOffsets.arr[2]);
      this._m_acoposParIDs = KaitaiStream.bytesToStr(this._io.readBytes((this._root.secOffsets.arr[3] - this._root.secOffsets.arr[2])), "UTF-8");
      this._io.seek(_pos);
      return this._m_acoposParIDs;
    }
  });
  Object.defineProperty(BrModSDM.prototype, 'acoposErrInfTypes', {
    get: function() {
      if (this._m_acoposErrInfTypes !== undefined)
        return this._m_acoposErrInfTypes;
      var _pos = this._io.pos;
      this._io.seek(this._root.secOffsets.arr[3]);
      this._m_acoposErrInfTypes = KaitaiStream.bytesToStr(this._io.readBytes((this._root.secOffsets.arr[4] - this._root.secOffsets.arr[3])), "UTF-8");
      this._io.seek(_pos);
      return this._m_acoposErrInfTypes;
    }
  });

  return BrModSDM;
})();
return BrModSDM;
}));
