(function(){
  const Messager = {
    OK: 'OK_00',
    ERROR: 'ERROR_00',
    WARNING: 'WARNING_00',
  };

  // ok code here
  Messager.__proto__.ok_code = [
    'Created Token.',
  ]

  // error code here
  Messager.__proto__.error_code = [
    'No Public Key in Request Header.',
  ];

  // warning code here
  Messager.__proto__.warning_code = [
    'Generating Token...',
  ];

  module.exports = {
    ok: ok_code.map((e, i) => `${Messager.OK + i}: ${e}`),
    error: error_code.map((e, i) => `${Messager.ERROR + i}: ${e}`),
    warning: warning_code.map((e, i) => `${Messager.WARNING + i}: ${e}`)
  }
})();
