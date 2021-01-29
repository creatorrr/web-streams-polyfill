const fs = require('fs');
const readline = require('readline');

//const bundle = '../../dist/polyfill.js';
// `class`-syntax transpiled code fails "should be a method" tests
//const bundle = '../../dist/polyfill-ie11.min.js';
const bundle = '../../dist/polyfill.min.js';

const bundled = [
  'ReadableStream',
  'WritableStream',
  'TransformStream',
  'ByteLengthQueuingStrategy',
  'CountQueuingStrategy',
];
const matcher = RegExp(`^const (?:{ )?(${bundled.join('|')})(?: })? = require`);

readline.createInterface({
  input: fs.createReadStream('run-web-platform-tests.js'),
  output: fs.createWriteStream('run-web-platform-tests-on-bundle.js'),
  terminal: false,
}).on('line', function (line) {
  const m = line.match(matcher);
  const out = m ? `const { ${m[1]} } = require('${bundle}');` : line;
  this.output.write(`${out}\n`);
});
