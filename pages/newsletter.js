import Layout from '../components/layout';
import Section from '../components/section';
import Container from '../components/container';
import NewsletterForm from '../components/newsletter-form';
import { css } from '@emotion/react';


export default function Newsletter() {
	return (
		<Layout theme='theme-primary' nofooter={true}>

			<div css={css`
				min-height: 80vh;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			`}>
				<p className='text-xl mb-8'>Stay up to date with Holaplex</p>
				<NewsletterForm />
			</div>
		</Layout>
	);
}
