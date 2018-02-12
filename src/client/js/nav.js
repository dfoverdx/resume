import { setImmediate } from "timers";

const ScrollSpyOffset = 12;
const isiOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
const HeightOfCollapsedNav = 61;
const CollapseTransitionTime = 350; // 350ms == $transition-collapse

const $bodyHtml = $('body, html');
const $body = $('body');
const $navWrapper = $('#nav-wrapper');
const $nav = $('#nav-items');

let bodyScrollTop = null;

function setScrollOnToggle() {
    let $tog = $('.navbar-toggler');

    $tog.on('click', (e, clickedNavItem) => {
        if ($body.is('.noscroll') && !clickedNavItem && bodyScrollTop !== null) {
            $bodyHtml.animate({
                scrollTop: bodyScrollTop
            }, CollapseTransitionTime);
            bodyScrollTop = null;
        } else if (window.pageYOffset < $navWrapper.offset().top) {
            bodyScrollTop = window.pageYOffset;
            $bodyHtml.animate({
                scrollTop: $navWrapper.offset().top + 1
            }, CollapseTransitionTime);
        } else if (clickedNavItem) {
            bodyScrollTop = null;

            // hacky workaround for repositioning scroll when TOC link is clicked
            if (isiOS) {
                setTimeout(() => $bodyHtml.animate({
                    scrollTop: window.pageYOffset - document.documentElement.clientHeight + HeightOfCollapsedNav
                }, CollapseTransitionTime));
            }
        }

        $body.toggleClass('noscroll');

        setTimeout(scrollNav);
    });

    $nav.on('click', 'a.nav-link', () => {
        if ($tog.is(':visible')) {
            $tog.trigger('click', [true]);
        }
    });
}

function enableScrollSpy(enable = true) {
    if (enable) {
        $body.scrollspy({ target: '#nav-items', offset: ScrollSpyOffset });    
    } else {
        $body.scrollspy('dispose');
    }
}

function scrollNav() {
    let $n = $('#nav-div'),
        $firstActive = $nav.find('.active').first(),
        $activeCard = $($firstActive.attr('href') + 'Carousel').find('.active');

    $n.find(`[href="#${$activeCard.attr('id')}"]`).addClass('active').siblings('.active').removeClass('active');
}

function slideCarousel(e) {
    let $this = $(this),
        toSlide = parseInt($this.attr('data-slide-to')),
        $carousel = $(`${$this.attr('data-carousel-id')}`),
        currentSlideIndex = $carousel.find('.carousel-inner .active').index();

    setImmediate(() => {
        $carousel.parent().prevUntil('h1').addBack().prev('h1')[0].scrollIntoView();

        $nav.find('.active').removeClass('active');
        $this.addClass('active').parent().prev().addClass('active');

        setImmediate(() => {
            $carousel.carousel(toSlide);
        });
    })
}

function initNav() {
    setScrollOnToggle();
    enableScrollSpy();
    $(window).on('activate.bs.scrollspy', scrollNav);

    $nav.find('[data-carousel-id]').click(slideCarousel);
}

export default initNav;