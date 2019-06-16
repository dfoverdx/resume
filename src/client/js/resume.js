import { setImmediate } from "timers";

function setCarouselHeights() {
    let $carousels = $('.carousel');
    $carousels.addClass('all-visible').each(function () {
        let $this = $(this),
            $carouselItems = $this.find('.carousel-item');

        setImmediate(() => {
            let maxHeight = Math.max(...($carouselItems.map((i, e) => $(e).height()).toArray()));
            $carouselItems.height(maxHeight);
            $this.removeClass('all-visible');
        });
    });
}

function initCarousels() {
    let $nav = $('#nav-items');

    $('.carousel').on('slide.bs.carousel, slid.bs.carousel', function (e) {
        let id = $(this).parent().prevUntil('h1').addBack().prev('h1').attr('id'),
            $navHeader = $nav.find(`[href='#${id}']`);

        if ($navHeader.is('.active')) {
            let itemId = $(this).find('.carousel-item')[e.to].id,
                $cardNavs = $navHeader.next();
            $cardNavs.find('.active').removeClass('active');
            $cardNavs.find(`[href='#${itemId}']`).addClass('active');
        }
    });

    if (window.location.hash) {
        let $hash = $(window.location.hash);
        if ($hash.is('.carousel-item')) {
            setImmediate(() => {
                $hash.siblings().removeClass('active').end().addClass('active').closest('.carousel')
                    .parent().prevUntil('h1').addBack().prev('h1')[0].scrollIntoView();
            });
        }
    }
}

function initResume() {
    // remove text between icons and text
    $('.jumbotron .header-links').find('i, svg').parent().contents().filter((_, node) => node.nodeType === 3).remove();
    
    setCarouselHeights();
    $(window).resize(setCarouselHeights);
    initCarousels();
}

export default initResume;