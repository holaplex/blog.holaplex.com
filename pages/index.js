import { attributes, react as HomeContent } from '../content/home.md';

import Layout from '../components/layout';
import Section from '../components/section';
import Container from '../components/container';
import Metadata from '../components/metadata';
import GenericContent from '../components/genericContent';
import config from "../lib/config";
import { countPosts, listPostContent } from "../lib/posts";
import Link from 'next/link';

function Post({ slug, date, title, image }) {

	return <Link href={`/post/${slug}`}>
		<a>
			<div>
				<h2>{title}</h2>
				{image && <img className='aspect-video w-full object-cover' src={'/' + image} alt="" />}
				<p>{date}</p>
			</div>
		</a>
	</Link>
}

export default function Home({ posts, pagination }) {
	let { title, text } = attributes;

	console.log(pagination);
	return (
		<Layout theme='theme-primary'>
			<Metadata title={title} />

			<Section>
				<Container variant="slim">
					{posts.map(it => <Post key={it.slug} {...it} />)}
				</Container>
			</Section>
		</Layout>
	);
}

export const getStaticProps = async () => {
	const posts = listPostContent(1, config.posts_per_page);
	const pagination = {
		current: 1,
		pages: Math.ceil(countPosts() / config.posts_per_page),
	};
	return {
		props: {
			posts,
			pagination,
		},
	};
};