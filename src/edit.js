/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element'
import axios from 'axios';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, className, setAttributes } ) {
	const searchLyrics = (e) => {
		e.preventDefault();
		console.log('BAND',  attributes.band);
		console.log('SONG',  attributes.song);
	};
	return (
		<>
			<form onSubmit={searchLyrics}>
				<TextControl
				className='band_name'
				label={ __( 'Name', 'create-block-metal-lyrics-block' ) }
				value={ attributes.band }
				onChange={ ( val ) => setAttributes( { band: val } ) }
				/>
				<TextControl
				className='song_name'
				label={ __( 'Song', 'create-block-metal-lyrics-block' ) }
				value={ attributes.song }
				onChange={ ( val ) => setAttributes( { song: val } ) }
				/>
				<input type="submit" value="Submit" />
			</form>
			<div>
				<div className="band_info">
					<h2>The Band</h2>
					<div>Band Info</div>
				</div>
				<div className="song_lyrics">
					<h2>The Lyrics</h2>
					<div>Song Lyrics</div>
				</div>
			</div>
		</>
	);
}
