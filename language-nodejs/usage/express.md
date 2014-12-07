

### Example


#### Search Redis

```js
var redis = require('redis');
var db = redis.createClient();

// populate search

db.sadd('ferret', 'tobi');
db.sadd('ferret', 'loki');
db.sadd('ferret', 'jane');
db.sadd('cat', 'manny');
db.sadd('cat', 'luna');


app.get('/search/:query?', function(req, res){
  var query = req.params.query;
  db.smembers(query, function(err, vals){
    if (err) return res.send(500);
    res.send(vals);
  });
});

```

#### vhost

```js
// 本质上根据 req.headers.host 来切换~~ 
```

#### Web Service

```js
var repos = [
    { name: 'express', url: 'http://github.com/strongloop/express' }
  , { name: 'stylus', url: 'http://github.com/learnboost/stylus' }
];
var users = [
    { name: 'tobi' }
];

var userRepos = {
    tobi: [repos[0], repos[1]];
};


// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

// if we wanted to supply more than JSON, we could
// use something similar to the content-negotiation
// example.

// here we validate the API key,
// by mounting this middleware to /api
// meaning only paths prefixed with "/api"
// will cause this middleware to be invoked

app.use('/api', function(req, res, next){
  var key = req.query['api-key'];

  // key isn't present
  if (!key) return next(error(400, 'api key required'));

  // key is invalid
  if (!~apiKeys.indexOf(key)) return next(error(401, 'invalid api key'));

  // all good, store req.key for route access
  req.key = key;
  next();
});


// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use(function(err, req, res, next){
  // whatever you want here, feel free to populate
  // properties on `err` to treat it differently in here.
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function(req, res){
  res.status(404);
  res.send({ error: "Lame, can't find that" });
});


```




#### Route-Separation

```js
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // auto parse url query string
app.use(express.static(__dirname + '/public'));

var site = require('./site');
var post = require('./post');
var user = require('./user');
// General
app.get('/', site.index);

// User
app.get('/users', user.list);
app.all('/user/:id/:op?', user.load);
app.get('/user/:id', user.view);
app.get('/user/:id/view', user.view);
app.get('/user/:id/edit', user.edit);
app.put('/user/:id/edit', user.update);

// Posts
app.get('/posts', post.list);
// E.g.
var posts = [{title: 'Foo', body: 'some foo bar'}];
exports.list = function(req, res) {
  res.render('posts', {title: 'Posts', posts: posts});
};
```

#### resource

```js
app.resource = function(path, obj) {
  this.get(path, obj.inex);
  this.get(path+'/:a..:b.:format?', function(req, res) {
    var a = parseInt(req.params.a, 10);
    var b = parseInt(req.params.b, 10);
    var format = req.params.format || '';
    obj.range(req, res, a, b, format);
  });
  this.get(path+'/:id', obj.show);
  this.delete(path+'/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    obj.destroy(req, res, id);
  });
};

var User = {
  index: function(req, res) {
    res.send(users[req.params.id] || {error: 'Cant find User'});
  },
  destroy: function() {}
};

app.resource('/users', User);
```


#### multipart

```js
var express = require('../..');
var multiparty = require('multiparty');
var format = require('util').format;

var app = module.exports = express();

app.get('/', function(req, res){
  res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>Title: <input type="text" name="title" /></p>'
    + '<p>Image: <input type="file" name="image" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});

app.post('/', function(req, res, next){
  // create a form to begin parsing
  var form = new multiparty.Form();
  var image;
  var title;

  form.on('error', next);
  form.on('close', function(){
    res.send(format('\nuploaded %s (%d Kb) as %s'
      , image.filename
      , image.size / 1024 | 0
      , title));
  });

  // listen on field event for title
  form.on('field', function(name, val){
    if (name !== 'title') return;
    title = val;
  });

  // listen on part event for image file
  form.on('part', function(part){
    if (!part.filename) return;
    if (part.name !== 'image') return part.resume();
    image = {};
    image.filename = part.filename;
    image.size = 0;
    part.on('data', function(buf){
      image.size += buf.length;
    });
  });


  // parse the form
  form.parse(req);
});

```



### big-view

```js
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var pets = [];
var n = 1000;
while (n--) {
    pets.push({
        name: 'Jane',
        age: 6,
        species: 'ferret'
    });
}

app.use(logger('dev'));

app.get('/', function(req, res) {
    res.render('pets', {
        pets: pets
    });
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
```


#### CORS

```js
var logger = require('morgan');
var app = express();
var api = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

api.use(logger('dev'));
api.use(bodyParser.json());

api.all('*', function(req, res, next) {
    if(!req.get('Origin')) return;
    // use "*" here to accept any origin
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // or set it by origin header
    res.set('Access-Control-Allow-Methods', 'PUT');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // res.set('Access-Control-Allow-Max-Age', 3600);
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});

app.listen(3000);
api.listen(3001);
```

### req object api

```js

req.param(name, [defaultVal])
// return the value of param name when present
// lookup order: req.params, req.body, req.query

req.get(field)
// get the case-insensitive request header field.

```


### 比较陌生的点： app

```js
// app.param: Map logic to route parameters.
// to restrict parameters to a given regular expression
// or parse, capture them

app.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});

app.param('range', /^(\w+)\.\.(\w+)?$/);

app.get('/range/:range', function(req, res){
  var range = req.params.range;
  res.send('from ' + range[1] + ' to ' + range[2]);
});


app.param('user', function(req, res, next, id){
  User.find(id, function(err, user){
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});


// app.locals: app local variables provided to all templates useful for providing helper functions and app-level data

app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.set('title', 'My App');
// use settings.title in a view



// app.route(path)
// Returns an instance of a single route which can then be used to handle HTTP verbs with optional middleware. Using app.route() is a recommended approach to avoiding duplicate route naming and thus typo errors.
app.route('/events')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
})
.get(function(req, res, next) {
  res.json(...);
})
.post(function(req, res, next) {
  // maybe add a new event...
})

// app.path()
// Returns the canonical path of the app.

var app = express()
  , blog = express()
  , blogAdmin = express();

app.use('/blog', blog);
blog.use('/admin', blogAdmin);

console.log(app.path()); // ''
console.log(blog.path()); // '/blog'
console.log(blogAdmin.path()); // '/blog/admin'

```

## use 和 all 的区别？

app.all(*) actually loops through all HTTP methods (from the 'methods' npm package) and does a app.\<method\>('*', function (req, res, next) {..}) for each HTTP method. 

There is big difference between the use of these two examples. Function registered with app.use is general middleware function and is called appropriate to its position on middleware stack, typically inside app.configure function. This type of middleware is usually placed before app.route with the exception of error handling functions.

On the other hand app.all is routing function (not usually called middleware) which covers all HTTP methods and is called only and only inside app.route. If any of your previous router function matches the '/some/path' and did not call next callback, app.all will not be executed, so app.all functions are usually on the beginning of your routing block.

There is also third type of middleware, used in your routing functions, eg.

`app.get('/some/path', middleware1, middleware2, function(req, res, next) {});`, which is typicaly used for limiting access or perform general tasks related to '/some/path' route.

For practical application you can use both functions, but be care of different behaviour when using app.use with '/some/path'. Unlike app.get app.use strips '/some/path' from the route before invoking anonymous function.

// 处理特殊的例子，static, favicon 等， 一般中间件是要 next()的，只是装饰 req, resp 等
// 位置执行先后不一样： use 一般在 app.configure 中，， 通常在 app.route 之前执行，并且有(error handling functions..)
// 第三种类似的 middleware，很酷， app.get('/some/path', needLogin, checkRole, fn), 执行特定于 path 的一些逻辑

