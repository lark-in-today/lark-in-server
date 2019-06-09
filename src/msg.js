const OK = 'OK_00';
const ERROR = 'ERROR_00';
const WARNING = 'WARNING_00';

const ok_code = [
  'Created Token',
];

// error code here
const error_code = [
  'Get Token Storage Failed',
];

// warning code here
const warning_code = [
  'Generating Token...',
];

const ok = ok_code.map((e, i) => `${OK + i}: ${e}`);
const error = error_code.map((e, i) => `${ERROR + i}: ${e}`);
const warning = warning_code.map((e, i) => `${WARNING + i}: ${e}`);

module.exports = {
  ok,
  error,
  warning
}
