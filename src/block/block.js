
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

import { ColorPalette } from '@wordpress/components';
import { withState } from '@wordpress/compose';

const MyColorPalette = withState( {
	color: '#f00',
} )( ( { color, setState, onChange } ) => {
	const colors = [
		{ name: 'red', color: '#f00' },
		{ name: 'white', color: '#fff' },
		{ name: 'blue', color: '#00f' },
	];
	return (
		<ColorPalette
			colors={ colors }
			value={ color }
			onChange={ ( color ) => {
				onChange( color );
				setState( { color } );
			} }
		/>
	);
} );

registerBlockType( 'cgb/block-test-block', {
	title: __( 'test-block - CGB Block' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'test-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		numberContent: {
			type: 'string',
			source: 'html',
			selector: 'span',
		},
		titleContent: {
			type: 'string',
			source: 'html',
			selector: 'h3',
		},
		subTitleContent: {
			type: 'string',
			source: 'html',
			selector: 'span',
		},
		mainContent: {
			type: 'string',
			source: 'html',
			selector: 'div',
		},
		background: {
			type: 'string',
		},
		color: {
			type: 'string',
		},
	},
	edit: ( props ) => {
		const bgstyle = {
			background: props.attributes.background,
		};

		const txcolor = {
			color: props.attributes.color,
		};

		return (
			<div className={ props.className } style={ bgstyle }>
				背景色:
				<MyColorPalette onChange={ ( background ) => props.setAttributes( { background } ) }></MyColorPalette>
				文字のいろ:
				<MyColorPalette onChange={ ( color ) => props.setAttributes( { color: color } ) }></MyColorPalette>
				<div>
					<div className="number">
						<RichText
							hag="span"
							className="text"
							value={ props.attributes.numberContent }
							formattingControls={ [ 'bold', 'italic' ] }
							onChange={ ( numberContent ) => props.setAttributes( { numberContent } ) }
							placeholder={ __( 'ロゴ...' ) }
						/>
						<div className="bar"></div>
					</div>
					<div className="titlebox">
						<RichText
							hag="div"
							className="title-text"
							value={ props.attributes.titleContent }
							formattingControls={ [ 'bold', 'italic' ] }
							onChange={ ( titleContent ) => props.setAttributes( { titleContent } ) }
							placeholder={ __( 'タイトル...' ) }
						/>
						<RichText
							hag="span"
							className="sub-title-text"
							style={ txcolor }
							value={ props.attributes.subTitleContent }
							formattingControls={ [ 'bold', 'italic' ] }
							onChange={ ( subTitleContent ) => props.setAttributes( { subTitleContent } ) }
							placeholder={ __( 'サブタイトル...' ) }
						/>
					</div>
					<div className="bar-black"></div>
					<RichText
						hag="div"
						className="main-text"
						value={ props.attributes.mainContent }
						formattingControls={ [ 'bold', 'italic' ] }
						onChange={ ( mainContent ) => props.setAttributes( { mainContent } ) }
						placeholder={ __( '本文...' ) }
					/>
				</div>
			</div>
		);
	},
	save: ( props ) => {
		const bgstyle = {
			background: props.attributes.background,
		};

		const txcolor = {
			color: props.attributes.color,
		};

		return (
			<div className={ props.className } style={ bgstyle } >
				<div>
					<div className="number">
						<RichText.Content
							tagName="span"
							className="text"
							value={ props.attributes.numberContent }
						/>
						<div className="bar"></div>
					</div>
					<div className="titlebox">
						<RichText.Content
							tagName="div"
							className="title-text"
							value={ props.attributes.titleContent }
						/>
						<RichText.Content
							tagName="span"
							className="sub-title-text"
							style={ txcolor }
							value={ props.attributes.subTitleContent }
						/>
					</div>
					<div className="bar-black"></div>
					<RichText.Content
						tagName="div"
						className="main-text"
						value={ props.attributes.mainContent }
					/>
				</div>
			</div>
		);
	},
} );
