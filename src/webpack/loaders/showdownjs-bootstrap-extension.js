"use strict";

const showdown = require('showdown'),
    cheerio = require('../js/cheerio'),
    BootstrapExtension = function () {
        String.prototype.reverse = function () {
            return this.split('').reverse().join('');
        }

        const TextMutedExtension = {
                type: 'lang',
                filter: function (text, converter) {
                    const doubleParenRegex = /\(\(((?:.|\r?\n)+?(?=\)\)))\)\)/g;

                    return text.replace(doubleParenRegex, function(match, contents){
                        const $ = cheerio.load(converter.makeHtml(contents));
                        let $paras = $('p');
                        let tag = 'div';
                        if ($paras.length === 1) {
                            tag = 'span';
                            contents = $paras.html();
                        } else {
                            contents = converter.makeHtml(contents);
                        }

                        return `<${tag} class="text-muted">${contents}</${tag}>`;
                    });
                }
            },
            AlertExtension = {
                type: 'lang',
                filter: function (text, converter) {
                    const styles = [
                        'primary',
                        'secondary',
                        'success',
                        'danger',
                        'warning',
                        'info',
                        'light',
                        'dark',
                    ].join('|').reverse();

                    const alertRegex = new RegExp(`!!(?!\\\\)((?:.|\n\r?)+?)\\](${styles})\\[?!!(?!\\\\)`, 'g'),
                        escapedExclamationPoint = /\\!/g;

                    return text.reverse().replace(alertRegex, function (match, contents, style) {
                        style = (style || 'light').reverse();
                        contents = contents.reverse().replace(escapedExclamationPoint, '!');
                        const $ = cheerio.load(converter.makeHtml(contents));
                        let $paras = $('p');
                        if ($paras.length === 1) {
                            contents = $paras.html();
                        } else {
                            contents = $paras.parent().html();
                        }

                        return `<div class="alert alert-${style}">${contents}</div>`.reverse();
                    }).reverse();
                }
            }

        return [TextMutedExtension, AlertExtension];
    };

module.exports = BootstrapExtension;