import { Meteor } from 'meteor/meteor';
import puppeteer from 'puppeteer';
import { SSR } from "./ssr";

Meteor.startup(() => {
    // code to run on server at startup
});

Meteor.methods({
    puppeteerPDF: async () => {
        let htmlContent;
        try {
            htmlContent = await Assets.getTextAsync('test-pdf.html');
            return await generatePDF(htmlContent)
        } catch (error) {
            if (error) {
                throw error
            }
        }
    },

    templateStaticPDF: async () => {
        let htmlContent;
        try {
            SSR.compileTemplate('emailText', await Assets.getTextAsync('hello-static.html'));
            htmlContent = SSR.render( 'emailText')
            return await generatePDF(htmlContent)
        }
        catch (error) {
            if (error) {
                throw error
            }
        }
    },

    templateDynamicPDF: async () => {
        let htmlContent;
        try{
            SSR.compileTemplate('emailText', await Assets.getTextAsync('hello-dynamic.html'));
            htmlContent = SSR.render( 'emailText', {userName: 'Meteor Noob'})
            return await generatePDF(htmlContent)
        } catch (error) {
            throw error
        }
    }
})

// Generate PDF using puppeteer
// @param (html_string)
async function generatePDF(htmlContent) {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
    let base64 = btoa(String.fromCharCode.apply(null,new Uint8Array(pdfBuffer)))
    return base64
}
