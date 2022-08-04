import React from "react";
import GenericContent from "../genericContent";
import NewsletterForm from "../newsletter-form";

const Footer = () => {
	return (
		<div className="mt-4 pb-10">
			<nav className="max-w-7xl mx-auto w-full px-2 py-8 box-border flex flex-col justify-center items-center text-center">
				<p className="mb-4">Stay up to date with Holaplex</p>
				<NewsletterForm />
			</nav>
		</div>
	);
};

export default Footer;
