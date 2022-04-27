//internal imports
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
	MediaPlaceholder,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Spinner,
	PanelBody,
	ToolbarButton,
	ToggleControl,
	Button,
	withNotices,
} from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import './editor.scss';

//external imports
import Flickity from 'react-flickity-component';

function Edit( { attributes, setAttributes, noticeOperations, noticeUI } ) {
	const { gallery, ids, displayImageList } = attributes;

	const onSelectImage = ( media ) => {
		if ( ! media ) {
			setAttributes( { gallery: [], ids: [] } );
			return;
		}

		setAttributes( {
			gallery: media.map( ( image ) => ( {
				id: image.id,
				url: image.url,
				alt: image.alt,
			} ) ),
			ids: media.map( ( image ) => image.id ),
		} );
	};

	const removeImage = () => {
		setAttributes( {
			gallery: [],
			ids: [],
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
			<InspectorControls>
				{ gallery && gallery.length > 0 && (
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
				) }
			</InspectorControls>
			{ gallery && gallery.length > 0 && (
				<BlockControls group="inline">
					<>
						<MediaUploadCheck>
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
						</MediaUploadCheck>
						<ToolbarButton onClick={ removeImage }>
							{ __( 'Remove Gallery', 'image-list' ) }
						</ToolbarButton>
					</>
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				{ gallery && gallery.length ? (
					<>
						{ displayImageList && (
							<>
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
							</>
						) }

						{ ! displayImageList && (
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
				) : (
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
			</div>
		</>
	);
}

export default withNotices( Edit );
