meta:
  id: nwct
  endian: le
  file-extension: bin
  imports:
    - payload 

seq:
  - id: module_header
    type: module_header_type
  - id: config_header
    type: config_header_type
  - id: config_records 
    type: config_record_type
    repeat: expr
    repeat-expr: config_header.nr_config_records
  - id: data_header
    type: data_header_type
  - id: data_records
    type: data_record_type(_index)
    repeat: expr
    repeat-expr: "data_header.overflow == 1 ? data_header.nr_data_records : data_header. index_of_record_to_be_written"

    
types:
  module_header_type:
    seq:
    - id: type_of_nct_data
      contents: [MTrcBinDat01]
    - id: dummy_1
      size: 4
    - id: operation_system
      type: u2
    - id: header_length
      type: u2
    - id: br_module_version
      type: u2
    - id: trace_type
      type: u2
      doc: "Trace Type 1:    Network Trace   2: Parameter Trace "
    - id: nr_binary_blocks
      type: u2
    - id: dummy_2
      size: 2
    - id: dummy_3
      size: 20
    
  config_header_type:
    seq:
    - id: dummy_1
      size: 8
    - id: time_factor
      type: f4
      doc: "Factor for calculation of time for each data record: time[sec] = time[ticks] * factor"
    - id: dummy_2
      size: 4
    - id: nr_config_records
      type: u4
    - id: dummy_3
      size: 4
      
  config_record_type:
    seq:
    - id: configuration_record_id
      type: u4
    - id: dummy_1
      size: 2
    - id: network_type
      type: u1
    - id: network_interface_index
      type: u1
    - id: node_number_of_drive
      type: u2
    - id: datagram_type
      type: u1
    - id: datagram_encoding_id
      type: u1
        
  data_header_type:
    seq:
    - id: dummy_1
      size: 8
    - id: status_flags
      type: u1
    - id: dummy_2
      size: 7
    - id: index_of_record_to_be_written
      type: u4
    - id: nr_data_records
      type: u4
    - id: start_index_ring_buffer
      type: u4
      
    instances:
      overflow:
        value: (status_flags & 0b00000010) >> 1
      
  data_record_type:
    params:
      - id: i               # => receive `_index` as `i` here
        type: s4
    seq:
    - id: time_in_ticks
      type: u4
    - id: config_record_id
      type: u4
    - id: acopos_parameter_data
      type: payload
    - id: nc_object_type
      type: u1
    - id: channel_index
      type: u1
    
    instances:
      time_in_seconds:
        value: time_in_ticks * _root.config_header.time_factor
      index:
        value: "_root.data_header.overflow == 0  ? i + 1 : i < _root.data_header.start_index_ring_buffer ? i + 1 : i >= _root.data_header.index_of_record_to_be_written ? _root.data_header.start_index_ring_buffer + i +1 - _root.data_header.index_of_record_to_be_written : i + 1 + _root.data_header.nr_data_records - _root.data_header.index_of_record_to_be_written"
      is_general_info:
        value: "i < _root.data_header.start_index_ring_buffer ?  true : false"
      channel_index_one_based:
        value: channel_index + 1

  