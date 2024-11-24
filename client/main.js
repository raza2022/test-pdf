import { Template } from 'meteor/templating';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {

});

Template.hello.helpers({

});

Template.hello.events({
  'click .simple-pdf'(event, instance) {
    Meteor.call('puppeteerPDF', (error, pdf) => {
      if(error) {
        alert("Something went wrong. If this problem persists, please contact customer support.")
      } else {
        let base64 = btoa(String.fromCharCode.apply(null,new Uint8Array(pdf)))
        forceDownload(base64, 'test.pdf')
      }
    })
  },
  'click .static-template-pdf'(event, instance) {
    Meteor.call('templateStaticPDF', (error, pdf) => {
      if(error) {
        alert("Something went wrong. If this problem persists, please contact customer support.")
      } else {
        let base64 = btoa(String.fromCharCode.apply(null,new Uint8Array(pdf)))
        forceDownload(base64, 'test.pdf')
      }
    })
  },

  'click .dynamic-template-pdf'(event, instance) {
    Meteor.call('templateDynamicPDF', (error, pdf) => {
      if(error) {
        alert("Something went wrong. If this problem persists, please contact customer support.")
      } else {
        let base64 = btoa(String.fromCharCode.apply(null,new Uint8Array(pdf)))
        forceDownload(base64, 'test.pdf')
      }
    })
  },
});


function forceDownload(pdf_url, pdf_name) {
  let link = document.createElement('a');
  link.href = `data:image/png;base64,${pdf_url}`;
  link.download = pdf_name;
  link.dispatchEvent(new MouseEvent('click'));
}
