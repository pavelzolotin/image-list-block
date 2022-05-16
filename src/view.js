import Flickity from 'flickity';

const imageSlider = document.querySelectorAll(
	'.wp-block-block-test-image-list__slider'
);

imageSlider.forEach( function ( el ) {
	new Flickity( el, {
		cellAlign: 'center',
		contain: false,
		autoPlay: true,
		draggable: true,
		wrapAround: true,
		pauseAutoPlayOnHover: false,
	} );
} );
