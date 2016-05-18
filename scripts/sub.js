/* 登录页配置 */
requirejs.config({
  urlArgs: 'v=' + (new Date()).getTime(),
  baseUrl: 'scripts',
  shim: {
    'jquery': {
      exports: 'jQuery',
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'avalon': {
      deps: ['bootstrap']
    },
    'login': {
      deps: ['avalon', 'js/config']
    }
  },
  paths: {
    jquery: ['http://cdn.staticfile.org/jquery/2.1.4/jquery.min', 'jquery-2.1.4/jquery.min'],
    bootstrap: "bootstrap-3.3.5/js/bootstrap.min",
    avalon: 'avalon/avalon',
    login: 'js/login',
  },
});

require(['jquery', 'bootstrap', 'avalon', "login"]);
