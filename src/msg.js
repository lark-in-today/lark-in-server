// TODO: serialize
(function(){
  const MSG = [
    /* Token Code - 00 */
    [[
      [201, 'Created Token.'],
    ], [
      [401, 'No Public Key in Request Header.'],
    ], [
      [202, 'Generated Token.'],
    ]],
    /* Art Code - 01 */
    [[
      [202, 'Created Art.'],
    ],[
      [406, 'Art without title'],
      [406, 'Art without content'],
      [406, 'Art without summary'],
    ],[
      [202, '...'],
    ]],
  ]

  module.exports = MSG.map((e, i) => {
    let cate = '';
    if (('' + i).length < 2) {
      for (let l =0; l < (2 - ('' + i).length); l++) { cate += '0' }
    }
    cate += i;
    return e.map((m, p) => {
      return m.map((n, q) => {
	let _prefix = 'OK';
	if (p === 1) {
	  _prefix = 'ERROR'
	} else if (p === 2) {
	  _prefix = 'WARNING'
	}
	
	n[1] = `${_prefix}_${cate + q}: ` + n[1];
	return n;
      })
    });
  });
})();
