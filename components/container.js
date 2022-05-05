import styled from "@emotion/styled";
import React from "react";
import { GenericContentElement } from "./genericContent";

const Element = styled.div`
	& > *:first-child, & > ${GenericContentElement} > *:first-child {
		margin-top: 0;
	}
	& > *:last-child, & > ${GenericContentElement} > *:last-child {
		margin-bottom: 0;
	}
`;

/**
 * Constrains content to the center of the page, adds a background color, padding, margin, and rounded borders.
 * @param {object} props Component props
 * @param {string} props.className Appended to the existing tailwind classes
 * @returns 
 */
const Container = ({ children, className }) => {
	return <Element className={"max-w-5xl mx-auto w-11/12 p-4 md:p-8 bg-base-dark text-content rounded-2xl my-8 " + className}>
		{children}
	</Element>
};

export default Container;