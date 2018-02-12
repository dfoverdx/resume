import Resume from '../templates/resume.ejs';
import ResumeCard from '../templates/resume-card.ejs';
import ResumeCarousel from '../templates/resume-carousel.ejs';
import Md from '../../../resume.md';
import $ from './cheerio';
import showdown from 'showdown';
import NamedEmailExtension from '../loaders/showdownjs-email-extension';
import { htmlToElements, elementsToHtml } from './utilities';

showdown.extension('namedEmail', NamedEmailExtension);
const converter = new showdown.Converter({ tables: true, extensions: ['namedEmail'] });

function parseContentsMarkdown($els) {
    function applyMarkdownToDivContent() {
        let $this = $(this),
            convertedInnerHtml = converter.makeHtml($this.html()),
            $convertedEls = $(convertedInnerHtml);

        $convertedEls.find('div').each(applyMarkdownToDivContent);
        $this.empty().append($convertedEls);
    }

    $els.filter('div').each(applyMarkdownToDivContent);
    return elementsToHtml($els);
}

function generateResumeContents() {
    let $resume = $('<div>');
    let $md = $('<div>').append(Md);
    
    $md.find('h1').each((i, v) => {
        let $this = $(v);

        $resume.append($this.clone());
        $resume.append($this.nextUntil('h1, h2'));
        let $cards = $('<div>');
        
        $this.nextUntil('h1', 'h2').each((i, v) => { 
            let $this = $(v),
                cardData = {
                    id: $this.attr('id'),
                    title: $this.clone().removeAttr('id'),
                    contents: parseContentsMarkdown($this.nextUntil('h1, h2')),
                },
                card = ResumeCard(cardData);

            $cards.append(htmlToElements(card));
        });

        if ($cards.children().length) {
            $cards.children().first().addClass('active');
            let carousel = ResumeCarousel({ id: $this.attr('id'), cards: $cards.html() });
            $resume.append(htmlToElements(carousel));
        }
    });

    $resume.find('p:empty').remove();
    return $resume.contents();
}

export default Resume({ resume: generateResumeContents() });