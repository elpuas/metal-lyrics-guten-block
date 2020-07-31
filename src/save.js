/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	return (
		<div className="band-container">
				<div>
					<h2><span>The Band 💀</span></h2>
					<div className="flex-container">
						<div className="row">
							<div className="column">
								<img className="band-pic" src={attributes.bandPic} />
							</div>
							<div className="band-info column">{attributes.bandInfo}</div>
						</div>
					</div>

				</div>
				<div>
					<h2><span>The Lyrics 🤟</span></h2>
					<div className="song-lyrics">{attributes.songLyrics}</div>
				</div>
		</div>
	);
}
