export function shorten_address(long_address){
  let city=long_address.match(/省(.*市)/)[1]//提取省后面的xx市
  let short_address=long_address.match(/区(.*)/)[1] //提取区后面的所有字符
  return {city:city,short_address:short_address}
}

