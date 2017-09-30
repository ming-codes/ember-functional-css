const vm = require('vm');
const path = require('path');

const fs = require('fs');

const templateCompilerPath = path.join(path.dirname(require.resolve('ember-source')), '/dist/ember-template-compiler.js');

const Ember = {};

vm.runInNewContext(fs.readFileSync(templateCompilerPath), {
  Ember
});

module.exports = Ember.__loader.require('@glimmer/syntax').preprocess;
