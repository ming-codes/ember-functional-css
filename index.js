/* eslint-env node */
'use strict';

let MergeTrees = require('broccoli-merge-trees');
let WriteSass = require('./lib/broccoli/sass-mixin');
let stew = require('broccoli-stew');

module.exports = {
  name: 'ember-functional-css',

  preprocessTree(type, tree) {
    if (type === 'css') {
      // we actually can add to parent addon via addon-tree-output
      return stew.log(tree, { label: 'pree css' });
    }
    return tree;
  },

  //treeForStyles() {
  //  let tree = this._super(...arguments);

  //  this.classTrees = {
  //    self: new WriteSass(),
  //    parent: new WriteSass()
  //  };

  //  return stew.log(new MergeTrees([].concat(tree || [], this.classTrees.self, this.classTrees.parent), { overwrite: true }));
  //},

  //setupPreprocessorRegistry(type, registry) {
  //  registry.add('css', {
  //    name: 'class-mixin-extractor',

  //    toTree(tree) {
  //      return stew.log(tree);
  //    }
  //  });
  //}
};
