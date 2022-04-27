import '../assets/flickity/flickity.pkgd.js';

( function ( $ ) {
	$( '.wp-block-block-test-image-list__slider' ).flickity( {
		cellAlign: 'left',
		contain: true,
		autoPlay: true,
		draggable: true,
		wrapAround: true,
		pauseAutoPlayOnHover: false,
	} );
} )( jQuery );
