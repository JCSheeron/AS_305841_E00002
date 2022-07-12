meta:
  id: t5_time
  endian: le
  file-extension: bin
  
seq:
  - id: date
    type: u1
    repeat: expr
    repeat-expr: 2
  - id: time
    type: u1
    repeat: expr
    repeat-expr: 3
    
instances:
  year:
    value: "(date[0] >> 1) < 90 ? (date[0] >> 1) + 2000 : (date[0] >> 1) + 1900"
  month:
    value: "((date[0]%2)<<3) + (date[1]>>5)"
  day:
    value: "date[1]&0b00011111"
  hour:
    value: "time[0]>>3"
  min:
    value: "((time[0]&0x07)<<3) + (time[1]>>5)"
  sec:
    value: "((time[1]&0x1F)<<1) + (time[2]>>7)"
  hundred_sec:
    value: "time[2]&0x7F"