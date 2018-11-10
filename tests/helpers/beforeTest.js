const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const fetch = require('node-fetch');
const { Headers, Request, Response } = require('node-fetch');

global.React = require('react'); // Global React object
global.$ = require('jquery'); // Global Jquery object
global.Uri = require('jsuri'); // Global Uri object
global.fetch = require('node-fetch');
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }
}

global.localStorage = new LocalStorageMock();
global.sessionStorage = new LocalStorageMock();

Enzyme.configure({
  adapter: new Adapter()
});
