import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { gallery } = attributes;

	return (
		<div { ...useBlockProps.save() }>
        <div className="wp-block-block-test-image-list__slider">
			{ gallery &&
				gallery.map( ( obj, index ) => (
					<img
						data-id={ obj.id }
						src={ obj.url }
						alt={ obj.alt }
						key={ index }
					/>
				) ) }
                </div>
		</div>
	);
}
