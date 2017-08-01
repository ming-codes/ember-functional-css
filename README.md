# ember-functional-css

Experimental addon that extracts class names from template and compile them
as SCSS mixin includes.

Example.

```hbs
<div class="ui-button(primary,small)"></div>
```

Will emit SCSS stylesheet

```scss
@include ui-button(primary,small);
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-functional-css`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
