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
	description,
	source,
	image,
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
					<div className="w-full lg:w-11/12 mx-auto">
						<h1 className="mt-0">{title}</h1>
					</div>
					{image && <img src={'/' + image}
						className='w-full mx-auto mt-4 mb-12'
						alt=''
					/>}
					<div className="w-full lg:w-11/12 mx-auto">
						<GenericContent>
							{content}
						</GenericContent>
					</div>
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
			image: data.image ? data.image : false,
			source: mdxSource
		},
	};
};