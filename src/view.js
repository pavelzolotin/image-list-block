import '../assets/flickity/flickity.pkgd.js';

// const $carousel = $('.wp-block-block-test-image-list__slider').flickity({
//     cellAlign: 'left',
// 	contain: true,
// 	autoPlay: true,
// 	draggable: false,
// 	wrapAround: true,
//   });

//   const isFlickity = true;

// $('.toggleImage').on( 'click', function() {
//   if ( isFlickity ) {

//     $carousel.flickity('destroy');
//   } else {

//     $carousel.flickity();
//   }
//   isFlickity = !isFlickity;
// });


jQuery( '.wp-block-block-test-image-list__slider' ).flickity( {
	cellAlign: 'left',
	contain: true,
	autoPlay: true,
	draggable: false,
	wrapAround: true,
    pauseAutoPlayOnHover: false,
} );