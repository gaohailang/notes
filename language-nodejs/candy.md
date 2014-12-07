

```js
// app.js
var server = require('express-scaffold');
var configs = require('./configs.json');
var models = require('./models/index');
var ctrlers = require('./ctrlers/index');
var routes = require('./routes/index');

// init a new server running on default port 3000
new server(configs)
    .models(models)
    .ctrlers(ctrlers)
    .routes(routes)
    .run();

// models/index
var models = {};
models.user = require('./user');
models.board = require('./board');
models.thread = require('./thread');
models.media = require('./media');
models.config = require('./config');

// define modles
module.exports = function(db, Schema) {
  var schemas = {};
  Object.keys(models).forEach(function(model){
    schemas[model] = db.model(model, models[model](Schema));
  });
  return schemas;
}

// board.js
module.exports = function(Schema) {
  return new Schema({
    name: String,
    desc: String,
    banner: String,
    created: {
      type: Date,
      default: Date.now
    },
    url: {
      type: String,
      unique: true
    },
    threads: [{
      type: Schema.Types.ObjectId,
      ref: 'thread'
    }],
    bz: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  });
}

// define routes


module.exports = function(app, models, ctrlers, middlewares, express) {

  var theme = new Theme(home, locals, app.locals.site.theme || 'flat');
  var routes = initRoutes({
    theme: theme,
    express: express,
    ctrlers: ctrlers,
    locals: app.locals, // ?
    middlewares: middlewares
  });

  // Middlewares
  app.use('*', installer(app, models.config, rewriteConfigs));
  app.use('*', middlewares.passport.sign());
  app.use('*', theme.local('user'));

  // home
  app.use('/', routes.home);
  // signin && signout
  app.use('/sign', routes.sign);
  // board
  app.use('/board', routes.board);
  // other: thread, media, member, admin

  // return single route
  function initRoutes(deps) {
    var routes = {};
    Object.keys(routers).forEach(function(route) {
      routes[route] = routers[route](deps);
    });
    return routes;
  }
}

var modules = []; // or scan dir



```

