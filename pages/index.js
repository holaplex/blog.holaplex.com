import { attributes, react as HomeContent } from '../content/home.md';

import { css } from '@emotion/react';
import Layout from '../components/layout';
import Section from '../components/section';
import Container from '../components/container';
import Metadata from '../components/metadata';
import GenericContent from '../components/genericContent';

export default function Home() {
	let { title, text } = attributes;

	return (
		<Layout theme='theme-primary'>
			<Metadata title={title} />

			<Section>

				<Container>
					<GenericContent>
						<h1>{title}</h1>
						<p>{text}</p>

						<HomeContent />
					</GenericContent>
				</Container>


				<Container className='theme-dark'>
					<h2>About</h2>
					<p>
						Further information about this project can be found online.
					</p>
				</Container>


				<Container className='theme-light'>
					<h2>Cool alternating section</h2>
					<p>
						Alternative text inside this alternated section.
					</p>
				</Container>

			</Section>

		</Layout>
	);
}