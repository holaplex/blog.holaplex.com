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
						<HomeContent />
					</GenericContent>
				</Container>
			</Section>

		</Layout>
	);
}