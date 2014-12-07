
### mediacenter.js
a html/css/js based media center
The backend is based on Node.JS with ExpressJS and JADE templates. The MVC structure allows developers to add an 'app' or 'plugin' to MCJS with ease.
https://github.com/jansmolders86/mediacenterjs


### assistant
https://github.com/29decibel/assistant
跪了，用 clojure 写的~ 

Clojure is a dialect of Lisp, and shares with Lisp the code-as-data philosophy and a powerful macro system.

simple, extensible and powerful one stop personal assistant
Assistant is more like a hubot with rich HTML interface(Om component), or like a Siri on your desktop. It consists of multiple dispatchers(processors) and cards. Dispatcher(processor) process the text commands, then put the result into the result channel.

```clojure

(ns assistant.services.github
  (:require-macros [cljs.core.async.macros :refer [go]])
  (:require [assistant.common :as common]
            [assistant.utils :as ass-utils]
            [assistant.core :refer [register-card register-dispatcher register-css]]
            [cljs-http.client :as http]
            [cljs.core.async :refer [<! >! chan]]
            [hickory.core :as hk]
            [hickory.render :as hk-render]
            [hickory.select :as s]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true]))


(defn printcol [col]
  (doall (map print col)))


(defn- get-projects [body]
  (let [hk-tree (-> body hk/parse hk/as-hickory)
        projects (-> (s/select (s/child
                              (s/and (s/tag :li) (s/class :repo-list-item)))
                            hk-tree))]
    projects))


(defn- p-link [content]
  (let [link (-> (s/select (s/child (s/class :repo-list-name) (s/tag :a)) content) first)]
    link))

(defn- p-desc [content]
  (let [desc (-> (s/select (s/child (s/class :repo-list-description)) content) first)]
    desc))

(defn- p-meta [content]
  (let [desc (-> (s/select (s/child (s/class :repo-list-meta)) content) first)]
    desc))

(defn github-dispatcher [result-chan text]
  (go (let [url (str "https://github.com/trending?l=" text)
            response (<! (http/get url {:with-credentials? false}))
            body (:body response)
            projects (get-projects body)
            infos (map #(hash-map :url (str "http://github.com" (-> % p-link :attrs :href))
                                  :title (-> % p-link :content ass-utils/get-text)
                                  :desc (-> % p-desc :content ass-utils/get-text)
                                  :desc2 (-> % p-meta :content ass-utils/get-text)
                                  ) projects)]
          (>! result-chan {:type :link-list-card :content infos :input text}))))

(defn- remove-redundent-text
  [text]
  (.replace text "• Built by" ""))

(register-dispatcher :gh github-dispatcher "gh [language] -- show trending repositories in Github of [language] or all")

```

### remonit
remote monitoring from any device
which lets you run simple scripts to monitor your computer or servers. gathered stats are shown in nice web dashboards that zoom with display size
meteor - 开发的 - http://zef.io/remonit/


### gulp-app
show current path(finder) folder gulp task at tray menu list
https://github.com/sindresorhus/gulp-app

```js

app.ready ->
    tray new, setIcon,
    updateTrayMenu()
    updateTray()

// 外部辅助方法
// runTask
// getGulpTasks
function updateTrayMenu(name, tasks, status) {
    var menu = new Menu();
    menu.append(new MenuItem({
        label: name,
        enabled: false
    }));

    menu.append(new MenuItem({
        label: name,
        enabled: false
    }));
}

function updateTray() {
    currentPath(function (err, dirPath) {
        setTimeout(updateTray, TRAY_UPDATE_INTERVAL); // 轮询去更新~
        process.chdir(dirPath);
        var pkgPath = findupSync('package.json');
        if (pkgPath) {
            pkg = require(pkgPath);
        } else {
            console.log('Couldn\'t find package.json.');
            return;
        }

        getGulpTasks(function (err, tasks) {
            // Only update the TrayMenu if the path changed
            if (foundForPath !== dirPath) {
                foundForPath = dirPath;
                updateTrayMenu(name, tasks);
            }
        });
    });
}

// getGulpTasks:
execFile(gulpPath, ['--tasks-simple'], function(err, stdout) {
    if(err) return cb(err);
    var tasks = stdout.trim().split('\n');
    tasks = _.pull(tasks, 'default');
    tasks.unshift('default');
    cb(null, tasks);
});
```

```js

'use strict';
var path = require('path');
var spawn = require('child_process').spawn;
var findupSync = require('findup-sync');
var currentPath = require('current-path');
var displayNotification = require('display-notification');
var getGulpTasks = require('./get-gulp-tasks');

var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var MenuItem = require('menu-item');

var tray;
var DEBUG = true;
var TRAY_UPDATE_INTERVAL = 1000;

require('crash-reporter').start();

app.dock.hide();

// fix the $PATH on OS X
// OS X doesn't read .bashrc/.zshrc for GUI apps
if (process.platform === 'darwin') {
    process.env.PATH += ':/usr/local/bin';
    process.env.PATH += ':' + process.env.HOME + '/.nodebrew/current/bin';
}

function runTask(taskName) {
    var gulpPath = path.join(__dirname, 'node_modules', 'gulp', 'bin', 'gulp.js');
    var cp = spawn(gulpPath, [taskName, '--no-color']);

    cp.stdout.setEncoding('utf8');
    cp.stdout.on('data', function (data) {
        console.log(data);
    });

    // TODO: show progress in menubar menu
    //tray.menu = createTrayMenu(name, [], 'progress here');

    cp.stderr.setEncoding('utf8');
    cp.stderr.on('data', function (data) {
        console.error(data);
        displayNotification({text: '[error] ' + data});
    });

    cp.on('exit', function (code) {
        if (code === 0) {
            displayNotification({
                title: 'gulp',
                subtitle: 'Finished running tasks'
            });
        } else {
            console.error('Exited with error code ' + code);

            displayNotification({
                title: 'gulp',
                subtitle: 'Exited with error code ' + code,
                sound: 'Basso'
            });
        }
    });
}

function createTrayMenu(name, tasks, status) {
    var menu = new Menu();

    menu.append(new MenuItem({
        label: name,
        enabled: false
    }));

    if (status) {
        menu.append(new MenuItem({type: 'separator'}));
        menu.append(new MenuItem({
            label: status,
            enabled: false
        }));
    }

    if (tasks && tasks.length > 0) {
        menu.append(new MenuItem({type: 'separator'}));

        tasks.forEach(function (el) {
            menu.append(new MenuItem({
                label: el,
                click: function () {
                    runTask(el);
                }
            }));
        });
    }

    menu.append(new MenuItem({type: 'separator'}));
    menu.append(new MenuItem({
        label: 'Quit',
        click: app.quit
    }));

    tray.setContextMenu(menu);

    return menu;
}

var foundForPath = null;

function updateTrayMenu() {
    createTrayMenu.apply(null, arguments);
}

function updateTray() {
    currentPath(function (err, dirPath) {
        setTimeout(updateTray, TRAY_UPDATE_INTERVAL);

        process.chdir(dirPath);

        var pkg;
        var pkgPath = findupSync('package.json');

        if (pkgPath) {
            pkg = require(pkgPath);
        } else {
            console.log('Couldn\'t find package.json.');
            return;
        }

        var name = pkg.name || path.basename(dirPath, path.extname(dirPath));

        getGulpTasks(function (err, tasks) {
            if (err) {
                console.log(err);
                return;
            }

            // Only update the TrayMenu if the path changed
            if (foundForPath !== dirPath) {
                foundForPath = dirPath;
                updateTrayMenu(name, tasks);
            }
        });
    });
}

app.on('ready', function () {
    tray = new Tray(path.join(__dirname, '/menubar-icon.png'));
    tray.setPressedImage(path.join(__dirname, 'menubar-icon-alt.png'));

    updateTrayMenu('No gulpfile found');
    updateTray();

    if (DEBUG) {
        //gui.Window.get().showDevTools();
    }
});

```