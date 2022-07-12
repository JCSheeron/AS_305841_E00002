// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../dataparsing/kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../../dataparsing/kaitai-struct/KaitaiStream'));
  } else {
    root.T5Time = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
var T5Time = (function() {
  function T5Time(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  T5Time.prototype._read = function() {
    this.date = new Array(2);
    for (var i = 0; i < 2; i++) {
      this.date[i] = this._io.readU1();
    }
    this.time = new Array(3);
    for (var i = 0; i < 3; i++) {
      this.time[i] = this._io.readU1();
    }
  }
  Object.defineProperty(T5Time.prototype, 'month', {
    get: function() {
      if (this._m_month !== undefined)
        return this._m_month;
      this._m_month = ((KaitaiStream.mod(this.date[0], 2) << 3) + (this.date[1] >>> 5));
      return this._m_month;
    }
  });
  Object.defineProperty(T5Time.prototype, 'hundredSec', {
    get: function() {
      if (this._m_hundredSec !== undefined)
        return this._m_hundredSec;
      this._m_hundredSec = (this.time[2] & 127);
      return this._m_hundredSec;
    }
  });
  Object.defineProperty(T5Time.prototype, 'min', {
    get: function() {
      if (this._m_min !== undefined)
        return this._m_min;
      this._m_min = (((this.time[0] & 7) << 3) + (this.time[1] >>> 5));
      return this._m_min;
    }
  });
  Object.defineProperty(T5Time.prototype, 'year', {
    get: function() {
      if (this._m_year !== undefined)
        return this._m_year;
      this._m_year = ((this.date[0] >>> 1) < 90 ? ((this.date[0] >>> 1) + 2000) : ((this.date[0] >>> 1) + 1900));
      return this._m_year;
    }
  });
  Object.defineProperty(T5Time.prototype, 'day', {
    get: function() {
      if (this._m_day !== undefined)
        return this._m_day;
      this._m_day = (this.date[1] & 31);
      return this._m_day;
    }
  });
  Object.defineProperty(T5Time.prototype, 'hour', {
    get: function() {
      if (this._m_hour !== undefined)
        return this._m_hour;
      this._m_hour = (this.time[0] >>> 3);
      return this._m_hour;
    }
  });
  Object.defineProperty(T5Time.prototype, 'sec', {
    get: function() {
      if (this._m_sec !== undefined)
        return this._m_sec;
      this._m_sec = (((this.time[1] & 31) << 1) + (this.time[2] >>> 7));
      return this._m_sec;
    }
  });

  return T5Time;
})();
return T5Time;
}));
