![coverage-shield-badge-1](https://img.shields.io/badge/coverage-95.92%25-brightgreen.svg)

# Review a Thing (tm)

[Check it out live!](http://review-a-thing.smutnyleszek.com/)

Features:

- ES6 (with Babel)
- Angular 1.6
- Karma tests
- MADCSS
- Responsive design
- Linters

Requirements:

1. [Jekyll](http://jekyllrb.com/)
2. [Node](https://nodejs.org)

## Building

To preview the project, you need to do three things:

1. `npm install`
2. `npm run serve`
3. open [127.0.0.1:4000](http://127.0.0.1:4000/) in the browser

## Development

What you want is to basically have two terminals:

1. `npm run serve` -- this is providing the [127.0.0.1:4000](http://127.0.0.1:4000/) "server" and watching changes on Jekyll
2. `npm run watch` -- this is watching all source files and producing dist ones

## TODO

- a module for reading location search parameters
- a "state module" for keeping user input data and steps unlockage
- tabbed content module
- steps navigation module (next button)
- product title module
- review form module (text inputs, text area, stars radios, error message)
- input validator module (input value vs rules)
- social form module (checkboxes)
- preview-publish module (user data display, publish button, success message)
