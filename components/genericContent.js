import React from "react";
import styled from "@emotion/styled";

/*
 ** Styling for content like the type you get from the CMS, generic HTML, etc.
 */

export const GenericContent = styled.div`
	p,
	ul {
		margin: 1rem 0;
	}

	a {
		color: #528AD5;
		text-decoration: underline;
	}

	ul,
	ol {
		padding-left: 1.5rem;
	}
	ul {
		list-style: disc;
	}
	ol {
		list-style: decimal;
	}
	li {
		margin: 0.5rem 0;
	}

	div > iframe,
	.twitter-tweet,
	p > img,
	& > img,
	& > iframe,
	& > iframe {
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
	}
	& > iframe[src^="https://www.youtube.com"] {
		aspect-ratio: 16/9;
		height: auto;
		width: 100%;
	}

	/*
	** headings
	*/
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 1.5em 0 0.25em;
		line-height: 1;
	}

	h1 {
		font-size: 1.9rem;
		font-weight: 800;
	}

	h2 {
		font-size: 1.563rem;
		font-weight: 600;
	}

	h3 {
		font-size: 1.25rem;
	}

	h4,
	h5,
	h6 {
		font-size: 1.25rem;
		font-weight: bold;
	}
`;
export default GenericContent;
