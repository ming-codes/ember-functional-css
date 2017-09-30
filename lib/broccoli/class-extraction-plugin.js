
const Filter = require('broccoli-persistent-filter');
const extract = require('../htmlbars/extractor');

export default class ClassExtractionPlugin extends Filter {
  extensions = [ 'hbs' ];

  targetExtension = 'scss';

  processString(string) {
    return extract(string).map(cls => `@include ${cls};`).join('\n');
  }
}
