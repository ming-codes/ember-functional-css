
let Writer = require('broccoli-caching-writer');
let temp = require('quick-temp')
let link = require('symlink-or-copy').sync;
let { WatchedDir } = require('broccoli-source');

let fs = require('fs-extra');
let path = require('path');

let inputTree = 'tmp/sass-input';

function CodeGenWriter() {
  Writer.call(this, [
    this.codePath = 'tmp/sass-mixin' // TODO cleanup
    //new WatchedDir(temp.makeOrReuse(this, 'codePath', 'sass-mixin')) how come this dont work?
  ]);
}

CodeGenWriter.prototype = Object.create(Writer.prototype);
CodeGenWriter.prototype.constructor = CodeGenWriter;

module.exports = class SassMixinPlugin extends CodeGenWriter {
  writeModule(module, classes) {
    let content = classes.map(cls => `@include ${cls};`).join('\n');
    let target = path.join(this.codePath, module.replace('dummy/', 'app/styles/').replace(/.hbs$/, '.scss'));

    fs.outputFileSync(target, content);
  }

  build() {
    let files = this.listFiles()
      .map(file => file.replace(this.inputPaths[0], '').replace('/app/styles/', ''))
      .map(file => `@import "${file}"`);

    fs.ensureDirSync(path.join(this.outputPath, 'app/styles'));

    link(
      path.join(this.codePath, 'app/styles/templates'),
      path.join(this.outputPath, 'app/styles/templates')
    );

    fs.outputFileSync(path.join(this.outputPath, 'app/styles/functional.scss'), files.join('\n'));
  }
}
