import {SpacebarsCompiler} from 'meteor/spacebars-compiler';
import {Blaze} from 'meteor/blaze';

class ssrService
{
    render(templateName, data)
    {
        const renderFunc = (data) ? Blaze.toHTMLWithData : Blaze.toHTML;
        const template = Blaze.Template[templateName];

        if(!template)
        {
            throw new Error(`Template ${templateName} not found`);
        }
        else
        {
            return renderFunc(template, data);
        }
    }

    compileTemplate(name, content)
    {
        const renderFunction = eval(`(function(view)
    {
      return ${SpacebarsCompiler.compile(content)}();
    })`);

        const template = new Blaze.Template(name, function()
        {
            return renderFunction(this);
        });

        Blaze.Template[name] = template;

        return template;
    }
}

export const SSR = new ssrService();
