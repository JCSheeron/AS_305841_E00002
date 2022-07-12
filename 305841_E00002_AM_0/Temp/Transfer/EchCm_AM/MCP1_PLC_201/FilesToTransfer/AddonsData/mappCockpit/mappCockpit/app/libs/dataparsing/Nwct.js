// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../dataparsing/kaitai-struct/KaitaiStream', './Payload'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('../dataparsing/kaitai-struct/KaitaiStream'), require('./Payload'));
  } else {
    root.Nwct = factory(root.KaitaiStream, root.Payload);
  }
}(this, function (KaitaiStream, Payload) {
var Nwct = (function() {
  function Nwct(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Nwct.prototype._read = function() {
    this.moduleHeader = new ModuleHeaderType(this._io, this, this._root);
    this.configHeader = new ConfigHeaderType(this._io, this, this._root);
    this.configRecords = new Array(this.configHeader.nrConfigRecords);
    for (var i = 0; i < this.configHeader.nrConfigRecords; i++) {
      this.configRecords[i] = new ConfigRecordType(this._io, this, this._root);
    }
    this.dataHeader = new DataHeaderType(this._io, this, this._root);
    this.dataRecords = new Array((this.dataHeader.overflow == 1 ? this.dataHeader.nrDataRecords : this.dataHeader.indexOfRecordToBeWritten));
    for (var i = 0; i < (this.dataHeader.overflow == 1 ? this.dataHeader.nrDataRecords : this.dataHeader.indexOfRecordToBeWritten); i++) {
      this.dataRecords[i] = new DataRecordType(this._io, this, this._root, i);
    }
  }

  var ModuleHeaderType = Nwct.ModuleHeaderType = (function() {
    function ModuleHeaderType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ModuleHeaderType.prototype._read = function() {
      this.typeOfNctData = this._io.readBytes(12);
      if (!((KaitaiStream.byteArrayCompare(this.typeOfNctData, [77, 84, 114, 99, 66, 105, 110, 68, 97, 116, 48, 49]) == 0))) {
        throw new KaitaiStream.ValidationNotEqualError([77, 84, 114, 99, 66, 105, 110, 68, 97, 116, 48, 49], this.typeOfNctData, this._io, "/types/module_header_type/seq/0");
      }
      this.dummy1 = this._io.readBytes(4);
      this.operationSystem = this._io.readU2le();
      this.headerLength = this._io.readU2le();
      this.brModuleVersion = this._io.readU2le();
      this.traceType = this._io.readU2le();
      this.nrBinaryBlocks = this._io.readU2le();
      this.dummy2 = this._io.readBytes(2);
      this.dummy3 = this._io.readBytes(20);
    }

    /**
     * Trace Type 1:    Network Trace   2: Parameter Trace 
     */

    return ModuleHeaderType;
  })();

  var DataRecordType = Nwct.DataRecordType = (function() {
    function DataRecordType(_io, _parent, _root, i) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;
      this.i = i;

      this._read();
    }
    DataRecordType.prototype._read = function() {
      this.timeInTicks = this._io.readU4le();
      this.configRecordId = this._io.readU4le();
      this.acoposParameterData = new Payload(this._io, this, null);
      this.ncObjectType = this._io.readU1();
      this.channelIndex = this._io.readU1();
    }
    Object.defineProperty(DataRecordType.prototype, 'timeInSeconds', {
      get: function() {
        if (this._m_timeInSeconds !== undefined)
          return this._m_timeInSeconds;
        this._m_timeInSeconds = (this.timeInTicks * this._root.configHeader.timeFactor);
        return this._m_timeInSeconds;
      }
    });
    Object.defineProperty(DataRecordType.prototype, 'index', {
      get: function() {
        if (this._m_index !== undefined)
          return this._m_index;
        this._m_index = (this._root.dataHeader.overflow == 0 ? (this.i + 1) : (this.i < this._root.dataHeader.startIndexRingBuffer ? (this.i + 1) : (this.i >= this._root.dataHeader.indexOfRecordToBeWritten ? (((this._root.dataHeader.startIndexRingBuffer + this.i) + 1) - this._root.dataHeader.indexOfRecordToBeWritten) : (((this.i + 1) + this._root.dataHeader.nrDataRecords) - this._root.dataHeader.indexOfRecordToBeWritten))));
        return this._m_index;
      }
    });
    Object.defineProperty(DataRecordType.prototype, 'isGeneralInfo', {
      get: function() {
        if (this._m_isGeneralInfo !== undefined)
          return this._m_isGeneralInfo;
        this._m_isGeneralInfo = (this.i < this._root.dataHeader.startIndexRingBuffer ? true : false);
        return this._m_isGeneralInfo;
      }
    });
    Object.defineProperty(DataRecordType.prototype, 'channelIndexOneBased', {
      get: function() {
        if (this._m_channelIndexOneBased !== undefined)
          return this._m_channelIndexOneBased;
        this._m_channelIndexOneBased = (this.channelIndex + 1);
        return this._m_channelIndexOneBased;
      }
    });

    return DataRecordType;
  })();

  var ConfigHeaderType = Nwct.ConfigHeaderType = (function() {
    function ConfigHeaderType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ConfigHeaderType.prototype._read = function() {
      this.dummy1 = this._io.readBytes(8);
      this.timeFactor = this._io.readF4le();
      this.dummy2 = this._io.readBytes(4);
      this.nrConfigRecords = this._io.readU4le();
      this.dummy3 = this._io.readBytes(4);
    }

    /**
     * Factor for calculation of time for each data record: time[sec] = time[ticks] * factor
     */

    return ConfigHeaderType;
  })();

  var DataHeaderType = Nwct.DataHeaderType = (function() {
    function DataHeaderType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    DataHeaderType.prototype._read = function() {
      this.dummy1 = this._io.readBytes(8);
      this.statusFlags = this._io.readU1();
      this.dummy2 = this._io.readBytes(7);
      this.indexOfRecordToBeWritten = this._io.readU4le();
      this.nrDataRecords = this._io.readU4le();
      this.startIndexRingBuffer = this._io.readU4le();
    }
    Object.defineProperty(DataHeaderType.prototype, 'overflow', {
      get: function() {
        if (this._m_overflow !== undefined)
          return this._m_overflow;
        this._m_overflow = ((this.statusFlags & 2) >>> 1);
        return this._m_overflow;
      }
    });

    return DataHeaderType;
  })();

  var ConfigRecordType = Nwct.ConfigRecordType = (function() {
    function ConfigRecordType(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ConfigRecordType.prototype._read = function() {
      this.configurationRecordId = this._io.readU4le();
      this.dummy1 = this._io.readBytes(2);
      this.networkType = this._io.readU1();
      this.networkInterfaceIndex = this._io.readU1();
      this.nodeNumberOfDrive = this._io.readU2le();
      this.datagramType = this._io.readU1();
      this.datagramEncodingId = this._io.readU1();
    }

    return ConfigRecordType;
  })();

  return Nwct;
})();
return Nwct;
}));
