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
	const { gallery, id, displayImageList } = attributes;
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
										key={ index }
										className={
											id ? `wp-image-${ id } list` : null
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
					<MediaPlaceholder
						icon="format-gallery"
						labels={ {
							title: 'Image Gallery',
							instructions: 'Add image gallery to your page.',
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
											key={ index }
											className={
												id ? `wp-image-${ id }` : null
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
