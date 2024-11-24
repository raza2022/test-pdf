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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const buffer = await page.pdf({ format: "A4", printBackground: true });
    const base64 = await new Buffer.from(buffer)

    await browser.close();
    return base64
}
