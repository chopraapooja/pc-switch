import Uri from 'jsuri';

let rhcBeckendHostname = new Uri('');

// Add any new services consuming rhcBeckend to below arrays
const prodHostNames = ['connect.redhat.com', 'prod.foo.redhat.com'];
const qaHostNames = ['qa-connect.redhat.com', 'qa.foo.redhat.com'];
const fteHostNames = ['fte-connect.redhat.com', 'fte.foo.redhat.com'];
const ciHostNames = ['ci-connect.redhat.com', 'ci.foo.redhat.com'];
const stageHostNames = ['stage-connect.redhat.com', 'stage.foo.redhat.com'];
const localHostNames = ['localhost', 'local.foo.redhat.com']

if (typeof window !== 'undefined' && window) {
  if (prodHostNames.indexOf(window.location.hostname) !== -1) {
    rhcBeckendHostname = new Uri('https://rhc-publishing-svc.ext.paas.redhat.com');
  }
  else if (qaHostNames.indexOf(window.location.hostname) !== -1) {
    rhcBeckendHostname = new Uri('https://rhc-publishing-svc.ext.paas.qa.redhat.com');
  }
  else if (fteHostNames.indexOf(window.location.hostname) !== -1) {
    rhcBeckendHostname = new Uri('https://rhc-publishing-svc.ext.paas.qa.redhat.com');
  }
  else if (ciHostNames.indexOf(window.location.hostname) !== -1) {
    rhcBeckendHostname = new Uri('https://rhc-publishing-svc.ext.paas.ci.redhat.com')
  }
  else if (stageHostNames.indexOf(window.location.hostname) !== -1) {
    rhcBeckendHostname = new Uri('https://rhc-publishing-svc.ext.paas.stage.redhat.com');
  }
  else if (localHostNames.indexOf(window.location.hostname) !== -1) {
    rhcBeckendHostname = new Uri('https://localhost:8443');
  }
} else {
  throw new Error('Could not determine hostname');
}

export class Env {
  public static rhcBeckendHostname = rhcBeckendHostname;
}
