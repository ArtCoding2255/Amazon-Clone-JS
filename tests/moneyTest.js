import { formatCurrency } from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');

//Basic test case
console.log('convert cents into dollars');
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

//Edge test case 1
console.log('works with 0');
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

//Edge test case 2
console.log('round up to the nearest cent');

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}
