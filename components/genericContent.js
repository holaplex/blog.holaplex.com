import React from "react";
import styled from "@emotion/styled";

/*
** Styling for content like the type you get from the CMS, generic HTML, etc.
*/

export const GenericContentElement = styled.div`
	p, ul {
		margin: 1rem 0;
	}

	a {
		color: white;
		text-decoration: underline;
	}

	ul, ol {
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

	div > iframe, .twitter-tweet {
		margin-left: auto;
		margin-right: auto;
	}
`;

/**
 * A basic wrapper element for text content, usually parsed from markdown. Applies typical styling to paragraph tags, links, ol/ul, etc.
 * @param {object} props Component props
 * @param {string} props.children Content to be wrapped
 */
const GenericContent = (props) => {
	return <GenericContentElement {...props}>{props.children}</GenericContentElement>
};

export default GenericContent;