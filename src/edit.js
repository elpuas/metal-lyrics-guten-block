/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element'
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
export default function Edit( { attributes, setAttributes } ) {
	const [search, saveSearch] = useState({
		band: '',
		song: '',
	});

	const [searchLyric, saveLyric] = useState({});
	const [error, saveError] = useState(false);
	const { band, song } = search;
	const [genre, setGenre] = useState('Metal');


	// Function for each input for read it's value.
	const updateState = (e) => {
		// Since this is an object we get a copy of `search`
		// and with e.target.name add the new content.
		saveSearch({
			...search,
			[e.target.name]: e.target.value,
		});
	};

	// Query the API
	const searchLyrics = (e) => {
		e.preventDefault();
		// Validate if string is empty.
		// we need the two fields for the APIs to work correctly
		if ('' === band.trim() || '' === song.trim()) {
			saveError(true);
			return;
		}
		saveError(false);
		// Send to Edit
		saveLyric(search);
	};

	useEffect(() => {
		// Return early and often.
		if (Object.keys(searchLyric).length === 0) return;

		// Create a Async/Await function to fetch API
		const searchApiLyric = async () => {
			const { band, song } = searchLyric;
			const url = `https://api.lyrics.ovh/v1/${band}/${song}`;
			const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${band}`;

			const [lyric, info] = await Promise.all([axios(url), axios(url2)]);

			setAttributes({ songLyrics: lyric.data.lyrics});
			setAttributes({ bandInfo: info.data.artists[0].strBiographyEN});
			setAttributes({bandPic: info.data.artists[0].strArtistThumb});
			setGenre(info.data.artists[0].strStyle);
		};
		// Invoke the function
		searchApiLyric();
	}, [searchLyric]); // Check any change on state

	return (
		<>
			<div>
				{error ? 'error' : null}
				<form onSubmit={searchLyrics}>
					<input className="components-text-control__input" type="text" name="band" value={band} onChange={updateState} placeholder="Band" />
					<input className="components-text-control__input" type="text" name="song" value={song} onChange={updateState} placeholder="Song" />
					<input type="submit" value="Submit" />
				</form>
			</div>
			<div className="band-container">
			{ 'Metal' === genre ? (
				<Fragment>
					<div>
						<h2>The Band</h2>
						<div><img className="band-pic" src={attributes.bandPic} /></div>
						<div className="band-info">{attributes.bandInfo}</div>
					</div>
					<div>
						<h2>The Lyrics</h2>
						<div className="song-lyrics">{attributes.songLyrics}</div>
					</div>
				</Fragment>
			) : (
				'This is not a Metal Song 😕!'
			)}
			</div>
		</>
	);
}
