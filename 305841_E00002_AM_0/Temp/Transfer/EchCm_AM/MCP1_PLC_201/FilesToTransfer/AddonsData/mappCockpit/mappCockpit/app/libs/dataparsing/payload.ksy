meta:
  id: payload
  endian: le
  
seq:
  - id: par_id
    type: u2 
  
  - id: par_data
    size: 8
    type: empty_type
instances:
  payload:
    io: par_data._io
    pos: 0
    size: 8
  par_cmd:
    io: par_data._io
    pos: 6
    type: u1
  par_cnt:
    io: par_data._io
    pos: 7
    type: u1

types:
  empty_type:
    seq:
      - id: dummy
        type: u1  