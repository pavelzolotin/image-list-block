import { registerBlockType } from '@wordpress/blocks';
import './view';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType( 'block-test/image-list', {
	edit: Edit,
	save,
} );
