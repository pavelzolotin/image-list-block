import '../assets/flickity/flickity.pkgd.js';

(function($) {
$( '.wp-block-block-test-image-list__slider' ).flickity( {
    cellAlign: 'left',
	contain: true,
	autoPlay: true,
	draggable: false,
	wrapAround: true,
    pauseAutoPlayOnHover: false,
} );
})(jQuery)