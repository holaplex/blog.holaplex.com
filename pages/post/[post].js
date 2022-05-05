import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchPostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';

import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Layout from "../../components/layout";
import Metadata from "../../components/metadata";
import GenericContent from "../../components/genericContent";
import Section from "../../components/section";
import Container from "../../components/container";

const components = { YouTube, TwitterTweetEmbed };
const slugToPostContent = (postContents => {
	let hash = {}
	postContents.forEach(it => hash[it.slug] = it)
	return hash;
})(fetchPostContent());

export default function Post({
	title,
	dateString,
	slug,
	description = "",
	source,
}) {
	const content = hydrate(source, { components })
	return (
		<Layout>
			<Metadata
				title={title}
				date={parseISO(dateString)}
				slug={slug}
				description={description}
			/>
			<Section>
				<Container>
					<GenericContent>
						{content}
					</GenericContent>
				</Container>
			</Section>
		</Layout>
	)
}

export const getStaticPaths = async () => {
	const paths = fetchPostContent().map(it => "/post/" + it.slug);
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const slug = params.post
	const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
	const { content, data } = matter(source, {
		engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) }
	});
	const mdxSource = await renderToString(content, { components, scope: data });
	return {
		props: {
			title: data.title,
			dateString: data.date,
			slug: data.slug,
			description: "",
			source: mdxSource
		},
	};
};