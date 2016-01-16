requirejs.config({
urlArgs: "v=" + (new Date()).getTime(),
baseUrl: 'scripts',
shim: {
  'jquery': {
    exports: 'jQuery',
  },
  'history': {
    deps: ['avalon']
  },
  'tabs': {
    deps: ['jquery']
  },
  'bootstrap': {
    deps: ['jquery']
  }
},
paths: {
  jquery: ['http://cdn.staticfile.org/jquery/2.1.4/jquery.min', 'jquery-2.1.4/jquery.min'],
  bootstrap: "bootstrap-3.3.5/js/bootstrap.min",
  tabs: "js/bootstrap-addtabs",
  avalon: 'avalon/avalon'
},
waitSeconds: 15
});
require(['js/main', 'js/event'])
