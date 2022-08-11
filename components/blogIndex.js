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

export function Post(props) {
	const { slug, date, title, image, tags } = props;

	return (
		<Link href={`/post/${slug}`}>
			<a>
				<div className="p-4 border border-gray-600 my-4 rounded-xl">
					<h2 className="mt-0">{title}</h2>
					{image && <img className="aspect-video w-full object-cover" src={"/" + image} alt="" />}
					<div className="mt-4 mb-0 flex justify-between items-center">
						<span>{formatDate(date)}</span>
						<span className="truncate w-1/2 text-right">
							{tags &&
								tags
									.map((tag) => tag)
									.splice(0, 3)
									.join(" - ")}
						</span>
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
	})

	categories.sort((a, b) => {
		return b.count - a.count;
	});
	const categoryElements = [];
	for (let index = 0; index < Math.min(6, categories.length); index++) {
		const category = categories[index];
		categoryElements.push(
			<Link href={getTagHref(category.name)} key={category.name}>
				<a>
					{category.name} - {category.count}
				</a>
			</Link>
		);
	}

	return (
		<Layout theme="theme-primary">
			<Metadata title={title} />

			<Section>
				<Container variant="wide" className="flex lg:flex-row flex-col gap-4 justify-center">
					<div className="max-w-xl">{posts ? posts.map((it) => <Post key={it.slug} {...it} />) : <></>}</div>
					<div className="hidden lg:flex flex-col gap-2 my-4">
						<span className="text-white">Featured Posts</span>
						<div className="w-full lg:w-48 flex flex-col gap-1">
							{FeaturedPosts}
						</div>
						<span className="text-white">Popular Topics</span>
						{categoryElements}
					</div>
				</Container>
				<Container variant="slim">
					<Pagination data={pagination} />
				</Container>
			</Section>
		</Layout>
	);
}
