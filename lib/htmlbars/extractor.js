const preprocess = require('./preprocessor');

function extractor(ast, syntax) {
  let classes = [];

  syntax.traverse(ast, {
    ElementNode(node) {
      node.attributes
        .filter(attr => attr.name === 'class')
        .forEach(attr => {
          // traverse for StringLiteral
          classes = classes.concat(attr.value.chars.split(/\s+/));
        });
    },

    BlockStatement(node) {
      classes = classes.concat(
        node.hash.pairs
          .filter(pair => pair.key === 'class')
          .map(pair => pair.value.value)
      );
    }
  });

  return classes;
}

module.exports = function extract(string) {
  let classes = [];

  preprocess(string, {
    plugins: {
      ast: [
        function Plugin() {
          return {
            transform(ast) {
              classes = extractor(ast, this.syntax);
            }
          };
        }
      ]
    }
  });

  return classes;
}
