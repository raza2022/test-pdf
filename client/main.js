import { Template } from 'meteor/templating';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {

});

Template.hello.helpers({

});

Template.hello.events({
  'click button'(event, instance) {
    Meteor.call('generatePDF', (error, pdf) => {
      console.log(error)
      console.log(pdf)
      let base64 = btoa(String.fromCharCode.apply(null,new Uint8Array(pdf)))
      forceDownload(base64, 'test.pdf')
    })
  },
});


function forceDownload(pdf_url, pdf_name) {
  let link = document.createElement('a');
  link.href = `data:image/png;base64,${pdf_url}`;
  link.download = pdf_name;
  link.dispatchEvent(new MouseEvent('click'));
}
