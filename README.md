# Supmin' New

Finally! Able to cross off [React](https://facebook.github.io/react/) from my ever-growing list of things to learn. I do enjoy the way that they've tried to remove complexities with each component having its own state. It almost feels like a mix between a web component/MVC library.

Sumpin' new is meant to be a fun 'venue exploring' app, since that's kinda my thing. You may notice it's a bit like another popular app, but for local venues.

Checkout the [demo](http://sumpinnew.dev.derrickshowers.com), and perhaps a future [blog post](http://blog.derrickshowers.com).

## Project Notes

### Grunt Tasks

* `grunt dev`: takes care of starting a node server and compiling scss.
* `grunt deploy`: deploys latest changes to dev server

### JSX

Not currently part of grunt. To compile JSX to JS, run `jsx --watch jsx/ js/` from the `app` directory.

### TODO

[ ] Find a JSX compiler for grunt and impliment into `grunt dev`
