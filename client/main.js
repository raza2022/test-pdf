import { Template } from 'meteor/templating';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  Session.set('loading', false);
});

Template.hello.helpers({
  loading() {
    return Session.get('loading');
  },

});

Template.hello.events({
  'click .simple-pdf'(event, instance) {
    Session.set('loading', true);
    Meteor.call('puppeteerPDF', processResult);
  },
  'click .static-template-pdf'(event, instance) {
    Session.set('loading', true);
    Meteor.call('templateStaticPDF', processResult);
  },

  'click .dynamic-template-pdf'(event, instance) {
    Session.set('loading', true);
    Meteor.call('templateDynamicPDF', processResult);
  },
});


function processResult(error, result) {
  Session.set('loading', false);
  if(error) {
    alert("Something went wrong. If this problem persists, please contact customer support.")
  } else {
    let base64 = btoa(String.fromCharCode.apply(null,new Uint8Array(result)))
    forceDownload(base64, 'test.pdf')
  }
}


// force download for testing only (ignore it)
function forceDownload(pdf_url, pdf_name) {
  let link = document.createElement('a');
  link.href = `data:image/png;base64,${pdf_url}`;
  link.download = pdf_name;
  link.dispatchEvent(new MouseEvent('click'));
}
