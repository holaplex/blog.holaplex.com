import React from "react";

const Footer = () => {
	return (<div className="mt-20 bg-gray-800 p-10">
		<nav className="max-w-7xl mx-auto w-full px-2 py-8 box-border flex justify-between">
			<div>
				<b>Holaplex</b>
				<br />
				©️ {new Date().getFullYear()}
				<p>
					The only truly open-sourced, decentralized &amp; community-governed NFT platform on Solana.
				</p>
			</div>
		</nav>
	</div>);
};

export default Footer;