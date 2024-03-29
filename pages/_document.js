import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

					{/* Current tag manager ID is from enterprise site */}

					{/* Google Tag Manager *//*}
					<script dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-PZJC5WH');`}} />
					/*{/* End Google Tag Manager */}
				</Head>
				<body className="bg-black">
					<Main />
					<NextScript />

					{/*<noscript>
						<iframe
							src="https://www.googletagmanager.com/ns.html?id=GTM-PZJC5WH"
							height="0"
							width="0"
							style={{ display: "none", visibility: "hidden" }}
						/>
					</noscript>*/}
				</body>
			</Html>
		);
	}
}
