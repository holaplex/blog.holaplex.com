import { fetchPostContent } from "../../lib/posts";
import Layout from "../../components/layout";
import Metadata from "../../components/metadata";
import Section from "../../components/section";
import Container from "../../components/container";

import { Post } from "../../components/blogIndex";
import { getTagHref } from "../../utils/tags";
import formatTagName from "../../utils/formatTagName";

export default function TagPage({ tag, posts }) {
	return (
		<Layout>
			<Metadata title={formatTagName(tag) + " | Holaplex"} slug={getTagHref(tag)} />
			<Section>
				<Container variant="slim">
					<div className="w-full lg:w-11/12 mx-auto mb-10">
						<p className="mt-0 text-center">posts about</p>
						<h1 className="mt-0 text-center">{formatTagName(tag)}</h1>
					</div>
					<div>
						{posts.map((post) => (
							<Post {...post} key={post.slug} />
						))}
					</div>
				</Container>
			</Section>
		</Layout>
	);
}

export const getStaticPaths = async () => {
	const tags = new Array();
	fetchPostContent().map((it) => {
		if (it.tags && !it.draftmode) {
			for (let index = 0; index < it.tags.length; index++) {
				const tag = it.tags[index];
				if (!tags.includes(tag)) {
					tags.push(tag.toLowerCase().trim());
				}
			}
		}
	});
	const paths = tags.map((value) => {
		return getTagHref(value);
	});
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const posts = [];
	fetchPostContent().map((it) => {
		if (it.tags && !it.draftmode) {
			for (let index = 0; index < it.tags.length; index++) {
				const element = it.tags[index];
				if (params.tag.toLowerCase().trim() === element.toLowerCase().trim()) {
					posts.push(it);
					break;
				}
			}
		}
	});
	return {
		props: {
			tag: params.tag,
			posts: posts,
		},
	};
};
