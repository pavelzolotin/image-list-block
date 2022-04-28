//import '../assets/flickity/flickity.pkgd.js';
import Flickity from 'flickity';

const imageSlider = document.querySelectorAll(
	'.wp-block-block-test-image-list__slider'
);

imageSlider.forEach( function ( el ) {
	new Flickity( el, {
		// options
		cellAlign: 'center',
		contain: false,
		autoPlay: true,
		draggable: true,
		wrapAround: true,
		pauseAutoPlayOnHover: false,
	} );
} );

// ( function ( $ ) {
// 	$( '.wp-block-block-test-image-list__slider' ).flickity( {
// 		cellAlign: 'left',
// 		contain: true,
// 		autoPlay: true,
// 		draggable: true,
// 		wrapAround: true,
// 		pauseAutoPlayOnHover: false,
// 	} );
// 	// eslint-disable-next-line no-undef
// } )( jQuery );

// new Flickity( '.wp-block-block-test-image-list__slider', {
// 	cellAlign: 'left',
// 	contain: true,
// 	autoPlay: true,
// 	draggable: true,
// 	wrapAround: true,
// 	pauseAutoPlayOnHover: false,
// } );
