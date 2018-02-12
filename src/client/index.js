import './sass/main.scss';
import initNav from './js/nav';
import initResume from './js/resume';

$(() => {
    $('[data-toggle="tooltip"]').tooltip();
    initNav();
    initResume();
});

// if (HOT_RELOAD) {
//     require('../webpack/index.ejs');
//     require('../webpack/js/resume.js');
//     require('../webpack/js/nav.js');
//     require('../../resume.md');
// }