import $ from './cheerio.js';

function htmlToElements(html) {
    return $('<div>').html(html).contents();
}

function elementsToHtml($els) {
    return $('<div>').append($els).html();
}

export {
    htmlToElements,
    elementsToHtml,
};