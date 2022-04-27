import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { gallery, id } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			{ gallery && gallery.length > 0 && (
				<div className="wp-block-block-test-image-list__slider">
					{ gallery.map( ( obj, index ) => (
						<img
							data-id={ obj.id }
							src={ obj.url }
							alt={ obj.alt }
							key={ index }
							className={ id ? `wp-image-${ id }` : null }
						/>
					) ) }
				</div>
			) }
		</div>
	);
}
