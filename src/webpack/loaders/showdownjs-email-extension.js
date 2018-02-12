"use strict";

const showdown = require('showdown'),
    EmailExtension = function () {
        const NameEmailExtension = {
            type: 'lang',
            filter: function (text, converter, options) {
                // <"My Name" [my@email.addr]>
                // The email address portion of the regex is incomplete according to the email address spec, but is the same
                //   one used by Showdown itself in showdown/src/subParsers/autoLinks.js
                const emailRegex = /<(?:mailto:)?"([^">]+)"\s*\[([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)\]>/gi;

                const dummyGlobals = {
                    converter: converter,
                };

                options = Object.assign({
                        namedEmailIncludeNameInTag: true,
                        namedEmailDoubleEncodeEmailAddress: false,
                    }, options);

                text = text.replace(emailRegex, function(match, name, email) {
                    let href = 'mailto:',
                        mail = showdown.subParser('unescapeSpecialChars')(email, options, dummyGlobals);
                    
                        if (options.encodeEmails) {
                            // if (options.namedEmailDoubleEncodeEmailAddress) {
                            //     name = showdown.helper.encodeEmailAddress(name);
                            //     mail = showdown.helper.encodeEmailAddress(mail);
                            // }

                            href = showdown.helper.encodeEmailAddress(`${href}"${name}" <${mail}>`);
                            name = showdown.helper.encodeEmailAddress(name);
                            mail = showdown.helper.encodeEmailAddress(mail);
                        } else {
                            href = `${href}&quot;${name}&quot; <${mail}>`;
                        }

                        if (options.namedEmailIncludeNameInTag) {
                            return `<a href="${href}">${name} &lt;${mail}&gt;</a>`;                        
                        } else {
                            return `<a href="${href}">${mail}</a>`;
                        }
                });

                return text;
            }
        }

        return [NameEmailExtension];
    };

module.exports = EmailExtension;