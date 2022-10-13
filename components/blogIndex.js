import { attributes, react as HomeContent } from "../content/home.md";

import Layout from "./layout";
import Section from "./section";
import Container from "./container";
import Metadata from "./metadata";
import Link from "next/link";
import formatDate from "../utils/formatDate";
import Pagination from "./pagination";
import { getTagHref } from "../utils/tags";
import SuggestedPosts from "./SuggestedPosts";
import PostThumbnail from "./PostThumbnail";
import formatTagName from "../utils/formatTagName";
import { formatSlug } from "../utils/formatSlug";
import { css } from "@emotion/react";
import Button from "./button";

export function Post(props) {
	const { slug, date, title, image, tags } = props;

	return (
		<Link href={`/post/${formatSlug(slug)}`}>
			<a>
				<div className="mb-8 rounded-xl">
					{image && <img className="aspect-video w-full object-cover border border-gray-8200 rounded-md" src={"/" + image} alt="" />}
					<h5 className="mt-0 text-base">{title}</h5>
					<div className="mt-1 mb-0 flex justify-between items-center gap-8">
						<span>{formatDate(date)}</span>
						<div>
							{(tags && tags.length > 0) ? <div className="bg-gray-100 text-black rounded-3xl px-3 py-1 m-1 inline-block">
								{formatTagName(tags[0])}
							</div> : <></>}
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
}

export default function BlogIndex({ posts, pagination, categories, featured }) {
	let { title } = attributes;

	const FeaturedPosts = featured.map(post => {
		return <PostThumbnail post={post} key={post.slug} />
	}).splice(0, 3)

	categories.sort((a, b) => {
		return b.count - a.count;
	});
	const categoryElements = [];
	for (let index = 0; index < Math.min(6, categories.length); index++) {
		const category = categories[index];
		categoryElements.push(
			<Link href={getTagHref(category.name)} key={category.name}>
				<a>
					<div className="bg-gray-100 rounded-3xl px-3 py-1 m-1 inline-block">
						{formatTagName(category.name)}
					</div>
				</a>
			</Link>
		);
	}

	return (
		<Layout theme="theme-primary">
			<Metadata title={title} />

			<Section className="text-white text-center relative -mt-24 pt-24 bg-[#030E37] overflow-hidden" css={css`
				background: linear-gradient(270deg, #030D31 6.74%, #030E3B 52.46%, #030C35 54.7%, #010C2C 64.64%, #010825 99.17%);
			`}>
				<div className="absolute rounded-full w-96 h-24 bg-[#6680F8] top-1/4 left-[10%] blur-[120px]" />
				<div className="absolute rounded-full w-24 h-48 bg-[#B4419F] bottom-1/4 left-[10%] blur-[120px]" />
				<div className="absolute rounded-full w-24 h-48 bg-[#B4419F] bottom-1/3 right-[10%] blur-[120px]" />

				<Container variant="wide" className="flex flex-col lg:my-12 justify-center items-center relative z-50">
					<p>Enterprise-grade NFT Solutions at Scale</p>
					<h1 className="mt-4">Blogs</h1>
				</Container>
			</Section>

			<Section>
				<Container variant="wide" className="flex lg:flex-row flex-col gap-4 justify-center">
					<div className="max-w-2xl">{posts ? posts.map((it) => <Post key={it.slug} {...it} />) : <></>}</div>
					<div className="hidden lg:flex flex-col gap-2">
						<div className="border border-gray-200 rounded-md p-2 max-w-[13.25rem]">
							<p>Featured Posts</p>
							<div className="w-full lg:w-48">
								{FeaturedPosts}
							</div>
						</div>
						<div className="border border-gray-200 rounded-md p-2 max-w-[13.25rem]">
							<p>Popular Topics</p>
							{categoryElements}
						</div>
					</div>
				</Container>
				<Container variant="slim">
					<Pagination data={pagination} />
				</Container>
			</Section>
		</Layout>
	);
}
