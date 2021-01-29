const browsers = [
  'Last 2 Chrome versions',
  'Last 2 Firefox versions',
  'Last 2 Safari versions',
  'Last 2 Edge versions',
];
if (process.argv.includes('ie11')) {
  // IE11 transpile removes class syntax. it fails "should be a method" tests
  browsers.push('ie 11');
}

require('browserify')('index.es6.js', {
  debug: true,
  standalone: 'default',
}).transform('uglifyify', {
  global: true,
  keep_fnames: true, // tests also check the reserved function `name`s
  mangle: {
    reserved: ['ByteLengthQueuingStrategy', 'CountQueuingStrategy'],
  },
}).transform('babelify', {
  presets: [
    ['env', {targets: {browsers}}],
  ],
  plugins: [
    'babel-plugin-unassert',
  ],
}).bundle().pipe(process.stdout);
