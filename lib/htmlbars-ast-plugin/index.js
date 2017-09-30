
module.exports = function(getTree) {
  function ComponentTransform(options) {
    this.options = options;
    this.syntax = null;
  }

  ComponentTransform.prototype.transform = function(ast) {
    let syntax= this.syntax;
    let builders = syntax.builders;

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

    // ok...now I have the class string..what do I do with it?
    // ast plugin does not know about tree
    // template compiler inputs string and output another string

    console.log('getTree', this.options.moduleName, classes);
    getTree().writeModule(this.options.moduleName, classes);


    return ast;
  };

  return ComponentTransform;
}
