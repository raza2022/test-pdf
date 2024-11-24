import { Meteor } from 'meteor/meteor';
import puppeteer from 'puppeteer';
Meteor.startup(() => {
  // code to run on server at startup
    (async () => {

    })();
});

Meteor.methods({
    generatePDF: async () => {
        const A = "invoice";
        const htmlContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  </head>
  <body>
  <h2>Approve Page ,${A}</h2>
  </body>
  </html>
  `;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);

        const buffer = await page.pdf({ format: "A4", printBackground: true });
        const base64 = await new Buffer.from(buffer)

        await browser.close();
        return base64
    }
})




