meta:
  id: br_mod_s_d_m
  endian: le
  file-extension: bin
  
seq:
  - id: dummy_1
    size: 2
  - id: m_mod_type
    contents: [0x46]
  - id: dummy_2
    size: 10
  - id: m_n_section
    contents: [0x06]
  - id: dummy_3
    size: 26
  - id: sec_offsets
    type: sec_offsets_type
    
instances:
  m_trc_bin_dat01:
    pos: _root.sec_offsets.arr[0]
    size: _root.sec_offsets.arr[1] - _root.sec_offsets.arr[0]
  mapp_motion_ar_config:
    pos: _root.sec_offsets.arr[1]
    type: str
    encoding: UTF-8
    size: _root.sec_offsets.arr[2] - _root.sec_offsets.arr[1]
  acopos_par_i_ds:
    pos: _root.sec_offsets.arr[2]
    type: str
    encoding: UTF-8
    size: _root.sec_offsets.arr[3] - _root.sec_offsets.arr[2]
  acopos_err_inf_types:
    pos: _root.sec_offsets.arr[3]
    type: str
    encoding: UTF-8
    size: _root.sec_offsets.arr[4] - _root.sec_offsets.arr[3]
    
types:
  sec_offsets_type:
    seq:
      - id: arr
        type: u4be
        repeat: expr
        repeat-expr: 5
