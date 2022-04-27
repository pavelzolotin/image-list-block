//internal imports
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	MediaUpload,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Spinner,
	PanelBody,
	ToolbarButton,
	ToggleControl,
	Button,
} from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import './editor.scss';

//external imports
import Flickity from 'react-flickity-component';

export default function Edit( {
	attributes,
	setAttributes,
	noticeOperations,
	noticeUI,
} ) {
	const { gallery, displayImageList } = attributes;
	const ids =
		gallery && gallery.length > 0 && gallery.map( ( obj ) => obj.id );

	const onSelectImage = ( media ) => {
		const images = [];
		media.forEach( ( obj ) => {
			images.push( {
				url: obj.url,
				id: obj.id,
				alt: obj.alt,
			} );
		} );

		setAttributes( {
			gallery: images,
		} );
	};

	const removeImage = () => {
		setAttributes( {
			gallery: undefined,
		} );
	};

	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const flickityOptions = {
		cellAlign: 'center',
		draggable: true,
		contain: true,
		wrapAround: true,
	};

	return (
		<>
			{ gallery && (
				<InspectorControls>
					<PanelBody title={ __( 'Image Settings', 'image-list' ) }>
						<ToggleControl
							label="Change images view"
							className="toggleImage"
							help={
								displayImageList
									? 'Show all image list.'
									: 'Show as slider.'
							}
							onChange={ ( boolean ) => {
								setAttributes( { displayImageList: boolean } );
							} }
							checked={ displayImageList }
						/>
					</PanelBody>
				</InspectorControls>
			) }
			{ gallery && gallery.length > 0 && (
				<BlockControls group="inline">
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes={ [ 'image' ] }
						value={ ids }
						gallery
						multiple
						render={ ( { open } ) => (
							<Button onClick={ open }>
								{ __( 'Edit Gallery', 'image-list' ) }
							</Button>
						) }
					/>
					<ToolbarButton onClick={ removeImage }>
						{ __( 'Remove Gallery', 'image-list' ) }
					</ToolbarButton>
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				{ displayImageList && (
					<>
						{ gallery &&
							gallery.length > 0 &&
							gallery.map( ( obj, index ) => (
								<>
									<img
										src={ obj.url }
										alt={ obj.alt }
										id={ obj.id }
										key={ index }
										className={
											obj.id
												? `wp-image-${ obj.id }`
												: null
										}
									/>
									{ isBlobURL( obj.url ) && <Spinner /> }
								</>
							) ) }
					</>
				) }

				{ ( ! gallery ||
					( gallery &&
						( gallery.length === undefined ||
							gallery.length === 0 ) ) ) && (
					// eslint-disable-next-line react/jsx-indent
					<MediaPlaceholder
						icon="format-gallery"
						labels={ {
							title: __( 'Image Gallery', 'image-list' ),
							instructions: __(
								'Add image gallery on your page.',
								'image-list'
							),
						} }
						onSelect={ onSelectImage }
						onError={ onUploadError }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						notices={ noticeUI }
						gallery
						multiple
					/>
				) }
				{ ! displayImageList && (
					<>
						{ gallery && gallery.length > 0 && (
							<Flickity
								className={
									'wp-block-block-test-image-list__slider'
								}
								options={ flickityOptions }
							>
								{ gallery.map( ( obj, index ) => (
									<>
										<img
											src={ obj.url }
											alt={ obj.alt }
											id={ obj.id }
											key={ index }
											className={
												obj.id
													? `wp-image-${ obj.id }`
													: null
											}
										/>
										{ isBlobURL( obj.url ) && <Spinner /> }
									</>
								) ) }
							</Flickity>
						) }
					</>
				) }
			</div>
		</>
	);
}
