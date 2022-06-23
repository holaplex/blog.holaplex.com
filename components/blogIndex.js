import { attributes, react as HomeContent } from '../content/home.md';

import Layout from './layout';
import Section from './section';
import Container from './container';
import Metadata from './metadata';
import Link from 'next/link';
import formatDate from '../utils/formatDate';
import Pagination from './pagination';

function Post(props) {
	const { slug, date, title, image } = props;

	return <Link href={`/post/${slug}`}>
		<a>
			<div className='p-4 border border-gray-600 my-4 rounded-xl'>
				<h2 className='mt-0'>{title}</h2>
				{image && <img className='aspect-video w-full object-cover' src={'/' + image} alt="" />}
				<p className='mt-4 mb-0'>{formatDate(date)}</p>
			</div>
		</a>
	</Link>
}

export default function BlogIndex({ posts, pagination }) {
	let { title } = attributes;
	return (
		<Layout theme='theme-primary'>
			<Metadata title={title} />

			<Section>
				<Container variant="slim">
					{posts ? posts.map(it => <Post key={it.slug} {...it} />) : <></>}
				</Container>
				<Container variant="slim">
					<Pagination data={pagination} />
				</Container>
			</Section>
		</Layout>
	);
}
