import { __ } from '@wordpress/i18n';
import './view';
import Flickity from 'react-flickity-component';
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

export default function Edit( { attributes, setAttributes } ) {
	const { gallery } = attributes;
	const ids = gallery && gallery.map( ( obj ) => obj.id );

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

	return (
		<>
			{ gallery && (
				<InspectorControls>
					<PanelBody title={ __( 'Image Settings', 'image-list' ) }>
						<ToggleControl
							label="Change images view"
							className="toggleImage"
						/>
					</PanelBody>
				</InspectorControls>
			) }
			{ gallery && (
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
				{ ! gallery && (
					<MediaPlaceholder
						icon="format-gallery"
						onSelect={ onSelectImage }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						gallery
						multiple
					/>
				) }
				{ gallery && (
					<Flickity className={ 'wp-block-block-test-image-list__slider' }
                    >
						{ gallery.map( ( obj, index ) => (
							<>
								<img
									src={ obj.url }
									alt={ obj.alt }
									key={ index }
								/>
								{ isBlobURL( obj.url ) && <Spinner /> }
							</>
						) ) }
					</Flickity>
				) }
			</div>
		</>
	);
}
