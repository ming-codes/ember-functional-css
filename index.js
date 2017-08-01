/* eslint-env node */
'use strict';

let MergeTrees = require('broccoli-merge-trees');
let WriteSass = require('./lib/broccoli/sass-mixin');
let stew = require('broccoli-stew');

module.exports = {
  name: 'ember-functional-css',

  treeForStyles() {
    let tree = this._super(...arguments);

    this.classTrees = {
      self: new WriteSass(),
      parent: new WriteSass()
    };

    return stew.log(new MergeTrees([].concat(tree || [], this.classTrees.self, this.classTrees.parent), { overwrite: true }));
  },

  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'class-mixin-extractor',
      plugin: require('./lib/htmlbars-ast-plugin')(() => {
        return this.classTrees[type];
      }),
      baseDir() {
        return __dirname;
      }
    });
  }
};
