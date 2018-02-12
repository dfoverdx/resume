import Md from '../../../resume.md';
import Nav from '../templates/nav.ejs';
import NavLink from '../templates/nav-link.ejs';
import Cheerio from 'cheerio';

const $ = Cheerio.load(Md);

function buildLinkTree(index, el) {
    let $el = $(el);
    if (!$el.html().trim()) {
        return null;
    }

    let navLink = {
            targetId: $el.attr('id'),
            html: $el.clone().contents(),
            children: null,
            linkClasses: '',
            carouselId: null,
            slideTo: null,
        };

    if ($el.is('h1')) {
        navLink.children = $el.nextUntil('h1', 'h2').map(buildLinkTree).toArray();
        if (!navLink.children.length) {
            navLink.children = null;
        } else {
            navLink.children.forEach((child, i) => {
                child.carouselId = $el.attr('id');
                child.slideTo = i;
            });
        }
    }

    return navLink;
}

const navLinks = $('h1').map(buildLinkTree).toArray().map(v => NavLink(v)).join('');

export default Nav({ navItems: navLinks });