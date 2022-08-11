import config from "../lib/config";
import { countPosts, getCategories, listPostContent, getFeaturedPosts } from "../lib/posts";

import BlogIndex from "../components/blogIndex";
export default BlogIndex;

export const getStaticProps = async (context) => {
	let page = 1;
	page = parseInt(context.params.page[0], 10);
	const posts = listPostContent(page, config.posts_per_page); // config.posts_per_page);
	const categories = getCategories();
	const pagination = {
		current: page,
		pages: Math.ceil(countPosts() / config.posts_per_page),
	};
	const featured = getFeaturedPosts();
	return {
		props: {
			posts,
			pagination,
			categories,
			featured,
			page: 0,
		},
	};
};

export async function getStaticPaths() {
	const paths = [];

	for (let index = 0; index < Math.ceil(countPosts() / config.posts_per_page); index++) {
		paths.push({
			params: {
				page: [String(index + 1)],
			},
		});
	}

	return {
		paths,
		fallback: false, // See the "fallback" section below
	};
}
